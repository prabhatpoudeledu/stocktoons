import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock market indices data with realistic values
    const marketIndices = [
      {
        symbol: "S&P 500",
        value: "4,567.89",
        change: "+54.32",
        changePercent: "+1.2%",
        positive: true,
      },
      {
        symbol: "NASDAQ",
        value: "14,234.56",
        change: "+113.87",
        changePercent: "+0.8%",
        positive: true,
      },
      {
        symbol: "DOW",
        value: "34,567.12",
        change: "-103.70",
        changePercent: "-0.3%",
        positive: false,
      },
      {
        symbol: "RUSSELL",
        value: "2,123.45",
        change: "+10.62",
        changePercent: "+0.5%",
        positive: true,
      },
    ]

    return NextResponse.json({
      indices: marketIndices,
      timestamp: new Date().toISOString(),
      success: true,
    })
  } catch (error) {
    console.error("Error in market indices API:", error)

    // Return fallback data even on error
    return NextResponse.json({
      indices: [
        {
          symbol: "S&P 500",
          value: "4,567.89",
          change: "+54.32",
          changePercent: "+1.2%",
          positive: true,
        },
        {
          symbol: "NASDAQ",
          value: "14,234.56",
          change: "+113.87",
          changePercent: "+0.8%",
          positive: true,
        },
      ],
      timestamp: new Date().toISOString(),
      success: false,
      error: "Using fallback data",
    })
  }
}
