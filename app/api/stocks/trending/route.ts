import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock trending stocks data with realistic values
    const trendingStocks = [
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

    return NextResponse.json({
      stocks: trendingStocks,
      timestamp: new Date().toISOString(),
      success: true,
    })
  } catch (error) {
    console.error("Error in trending stocks API:", error)

    // Return fallback data even on error
    return NextResponse.json({
      stocks: [
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
      ],
      timestamp: new Date().toISOString(),
      success: false,
      error: "Using fallback data",
    })
  }
}
