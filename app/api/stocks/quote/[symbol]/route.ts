import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  try {
    const symbol = params.symbol.toUpperCase()

    // Mock stock quote data with realistic values
    const mockStockData = {
      AAPL: {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 175.43,
        change: 3.68,
        changePercent: 2.1,
        volume: "52.3M",
        marketCap: "$2.8T",
        high: 178.21,
        low: 172.15,
        open: 174.5,
        previousClose: 171.75,
      },
      MSFT: {
        symbol: "MSFT",
        name: "Microsoft Corp.",
        price: 338.11,
        change: 5.98,
        changePercent: 1.8,
        volume: "28.7M",
        marketCap: "$2.5T",
        high: 342.15,
        low: 335.2,
        open: 336.8,
        previousClose: 332.13,
      },
      GOOGL: {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 127.89,
        change: -0.64,
        changePercent: -0.5,
        volume: "31.2M",
        marketCap: "$1.6T",
        high: 129.45,
        low: 126.8,
        open: 128.5,
        previousClose: 128.53,
      },
    }

    // Get stock data or create random data for unknown symbols
    let stockData = mockStockData[symbol as keyof typeof mockStockData]

    if (!stockData) {
      // Generate random data for unknown symbols
      const basePrice = 100 + Math.random() * 200
      const changePercent = (Math.random() - 0.5) * 6
      const change = (basePrice * changePercent) / 100

      stockData = {
        symbol,
        name: `${symbol} Inc.`,
        price: Number((basePrice + change).toFixed(2)),
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        volume: `${Math.floor(Math.random() * 100) + 10}M`,
        marketCap: `$${Math.floor(Math.random() * 500) + 100}B`,
        high: Number((basePrice + change + Math.random() * 10).toFixed(2)),
        low: Number((basePrice + change - Math.random() * 10).toFixed(2)),
        open: Number((basePrice + change + (Math.random() - 0.5) * 5).toFixed(2)),
        previousClose: Number(basePrice.toFixed(2)),
      }
    }

    return NextResponse.json({
      stock: stockData,
      timestamp: new Date().toISOString(),
      success: true,
    })
  } catch (error) {
    console.error("Error in stock quote API:", error)

    // Return fallback data even on error
    return NextResponse.json({
      stock: {
        symbol: params.symbol.toUpperCase(),
        name: `${params.symbol.toUpperCase()} Inc.`,
        price: 100.0,
        change: 0.0,
        changePercent: 0.0,
        volume: "N/A",
        marketCap: "N/A",
        high: 100.0,
        low: 100.0,
        open: 100.0,
        previousClose: 100.0,
      },
      timestamp: new Date().toISOString(),
      success: false,
      error: "Using fallback data",
    })
  }
}
