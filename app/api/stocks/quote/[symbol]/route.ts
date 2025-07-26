import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  try {
    const symbol = params.symbol.toUpperCase()
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY

    if (!apiKey) {
      throw new Error("API key not available")
    }

    // Fetch real-time quote
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
    )
    const data = await response.json()

    if (data["Global Quote"]) {
      const quote = data["Global Quote"]
      const price = Number.parseFloat(quote["05. price"]) || 0
      const change = Number.parseFloat(quote["09. change"]) || 0
      const changePercent = Number.parseFloat(quote["10. change percent"].replace("%", "")) || 0
      const volume = Number.parseInt(quote["06. volume"]) || 0
      const open = Number.parseFloat(quote["02. open"]) || 0
      const high = Number.parseFloat(quote["03. high"]) || 0
      const low = Number.parseFloat(quote["04. low"]) || 0
      const previousClose = Number.parseFloat(quote["08. previous close"]) || 0

      const stockData = {
        symbol: symbol,
        name: getCompanyName(symbol),
        price: price,
        change: change,
        changePercent: changePercent,
        positive: change >= 0,
        volume: formatVolume(volume),
        marketCap: getMarketCap(symbol),
        open: open,
        high: high,
        low: low,
        previousClose: previousClose,
        dayRange: `${low.toFixed(2)} - ${high.toFixed(2)}`,
        lastUpdated: new Date().toISOString(),
      }

      return NextResponse.json({ stock: stockData })
    }

    // Mock real-time stock data with safe numeric values
    const basePrice = 100 + Math.random() * 400 // Random base price between 100-500
    const changePercent = (Math.random() - 0.5) * 6 // Random change between -3% to +3%
    const change = (basePrice * changePercent) / 100
    const newPrice = Math.max(basePrice + change, 1) // Ensure price is never negative

    const stockData = {
      symbol: symbol,
      name: getCompanyName(symbol),
      price: Number.parseFloat(newPrice.toFixed(2)),
      change: Number.parseFloat(change.toFixed(2)),
      changePercent: Number.parseFloat(changePercent.toFixed(2)),
      positive: change >= 0,
      volume: formatVolume(Math.floor(Math.random() * 100000000 + 10000000)),
      marketCap: "$" + Math.floor(Math.random() * 500 + 100) + "B",
      high: Number.parseFloat((newPrice + Math.random() * 10).toFixed(2)),
      low: Number.parseFloat((newPrice - Math.random() * 10).toFixed(2)),
      open: Number.parseFloat((newPrice + (Math.random() - 0.5) * 5).toFixed(2)),
      previousClose: Number.parseFloat((newPrice - change).toFixed(2)),
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json({ stock: stockData })
  } catch (error) {
    console.error(`Error fetching quote for ${params.symbol}:`, error)

    // Return safe mock data for the requested symbol
    const mockData = getMockStockData(params.symbol.toUpperCase())
    return NextResponse.json({ stock: mockData })
  }
}

function getMockStockData(symbol: string) {
  const mockStocks: { [key: string]: any } = {
    AAPL: {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 3.68,
      changePercent: 2.14,
      positive: true,
      volume: "52.3M",
      marketCap: "$2.8T",
      open: 172.15,
      high: 176.89,
      low: 171.23,
      previousClose: 171.75,
      dayRange: "171.23 - 176.89",
      lastUpdated: new Date().toISOString(),
    },
    MSFT: {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 338.11,
      change: 5.98,
      changePercent: 1.8,
      positive: true,
      volume: "28.7M",
      marketCap: "$2.5T",
      open: 334.5,
      high: 340.25,
      low: 333.12,
      previousClose: 332.13,
      dayRange: "333.12 - 340.25",
      lastUpdated: new Date().toISOString(),
    },
    UNH: {
      symbol: "UNH",
      name: "UnitedHealth Group Inc.",
      price: 542.87,
      change: 8.45,
      changePercent: 1.58,
      positive: true,
      volume: "3.2M",
      marketCap: "$512B",
      open: 538.2,
      high: 545.6,
      low: 537.15,
      previousClose: 534.42,
      dayRange: "537.15 - 545.60",
      lastUpdated: new Date().toISOString(),
    },
  }

  return (
    mockStocks[symbol] || {
      symbol: symbol,
      name: `${symbol} Corp.`,
      price: 100.0,
      change: 1.5,
      changePercent: 1.52,
      positive: true,
      volume: "1.2M",
      marketCap: "$50B",
      open: 99.25,
      high: 101.75,
      low: 98.5,
      previousClose: 98.5,
      dayRange: "98.50 - 101.75",
      lastUpdated: new Date().toISOString(),
    }
  )
}

function getCompanyName(symbol: string): string {
  const names: { [key: string]: string } = {
    AAPL: "Apple Inc.",
    MSFT: "Microsoft Corp.",
    GOOGL: "Alphabet Inc.",
    TSLA: "Tesla Inc.",
    AMZN: "Amazon.com Inc.",
    NVDA: "NVIDIA Corp.",
    META: "Meta Platforms Inc.",
    NFLX: "Netflix Inc.",
    UNH: "UnitedHealth Group Inc.",
    JNJ: "Johnson & Johnson",
    V: "Visa Inc.",
    WMT: "Walmart Inc.",
  }
  return names[symbol] || `${symbol} Corp.`
}

function getMarketCap(symbol: string): string {
  const marketCaps: { [key: string]: string } = {
    AAPL: "$2.8T",
    MSFT: "$2.5T",
    GOOGL: "$1.6T",
    TSLA: "$789B",
    AMZN: "$1.5T",
    NVDA: "$1.1T",
    META: "$756B",
    NFLX: "$189B",
    UNH: "$512B",
    JNJ: "$445B",
    V: "$489B",
    WMT: "$567B",
  }
  return marketCaps[symbol] || "N/A"
}

function formatVolume(volume: number): string {
  if (isNaN(volume) || volume === 0) {
    return "N/A"
  }

  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(1)}M`
  } else if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}K`
  }
  return volume.toString()
}
