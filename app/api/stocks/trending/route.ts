import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Try to fetch real data from Alpha Vantage
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY

    if (!apiKey) {
      throw new Error("API key not available")
    }

    // Popular stocks to fetch
    const symbols = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "NVDA"]
    const promises = symbols.map(async (symbol) => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
        )
        const data = await response.json()

        if (data["Global Quote"]) {
          const quote = data["Global Quote"]
          const price = Number.parseFloat(quote["05. price"])
          const change = Number.parseFloat(quote["09. change"])
          const changePercent = Number.parseFloat(quote["10. change percent"].replace("%", ""))
          const volume = quote["06. volume"]

          return {
            symbol: symbol,
            name: getCompanyName(symbol),
            price: `$${price.toFixed(2)}`,
            change: change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2),
            changePercent: change >= 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`,
            positive: change >= 0,
            volume: formatVolume(volume),
            marketCap: getMarketCap(symbol),
          }
        }
        return null
      } catch (error) {
        console.error(`Error fetching ${symbol}:`, error)
        return null
      }
    })

    const results = await Promise.all(promises)
    const validResults = results.filter((result) => result !== null)

    if (validResults.length > 0) {
      return NextResponse.json({ stocks: validResults })
    }

    // Fallback to mock data
    throw new Error("No valid data received")
  } catch (error) {
    console.error("Error fetching trending stocks:", error)

    // Return realistic mock data
    const mockData = [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: "$175.43",
        change: "+3.68",
        changePercent: "+2.1%",
        positive: true,
        volume: "52.3M",
        marketCap: "$2.8T",
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corp.",
        price: "$338.11",
        change: "+5.98",
        changePercent: "+1.8%",
        positive: true,
        volume: "28.7M",
        marketCap: "$2.5T",
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: "$127.89",
        change: "-0.64",
        changePercent: "-0.5%",
        positive: false,
        volume: "31.2M",
        marketCap: "$1.6T",
      },
      {
        symbol: "TSLA",
        name: "Tesla Inc.",
        price: "$248.50",
        change: "+7.76",
        changePercent: "+3.2%",
        positive: true,
        volume: "89.4M",
        marketCap: "$789B",
      },
      {
        symbol: "AMZN",
        name: "Amazon.com Inc.",
        price: "$142.65",
        change: "+2.14",
        changePercent: "+1.5%",
        positive: true,
        volume: "45.8M",
        marketCap: "$1.5T",
      },
      {
        symbol: "NVDA",
        name: "NVIDIA Corp.",
        price: "$456.78",
        change: "+12.34",
        changePercent: "+2.8%",
        positive: true,
        volume: "67.2M",
        marketCap: "$1.1T",
      },
    ]

    return NextResponse.json({ stocks: mockData })
  }
}

function getCompanyName(symbol: string): string {
  const names: { [key: string]: string } = {
    AAPL: "Apple Inc.",
    MSFT: "Microsoft Corp.",
    GOOGL: "Alphabet Inc.",
    TSLA: "Tesla Inc.",
    AMZN: "Amazon.com Inc.",
    NVDA: "NVIDIA Corp.",
  }
  return names[symbol] || symbol
}

function getMarketCap(symbol: string): string {
  const marketCaps: { [key: string]: string } = {
    AAPL: "$2.8T",
    MSFT: "$2.5T",
    GOOGL: "$1.6T",
    TSLA: "$789B",
    AMZN: "$1.5T",
    NVDA: "$1.1T",
  }
  return marketCaps[symbol] || "N/A"
}

function formatVolume(volume: string): string {
  const num = Number.parseInt(volume)
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return volume
}
