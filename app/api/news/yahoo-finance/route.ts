import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Since direct RSS fetching might be blocked by CORS, let's return mock Yahoo Finance-style data
    // In production, you would use a proper RSS parser service or proxy

    const mockYahooNews = [
      {
        title: "Stock Market Reaches New Highs Amid Economic Optimism",
        summary:
          "Major indices continue their upward trajectory as investors remain confident about economic recovery prospects. The S&P 500 and Nasdaq both posted gains in today's trading session.",
        pubDate: new Date().toISOString(),
        link: "https://finance.yahoo.com/news/stock-market-highs",
        image: "/placeholder.svg?height=400&width=600&text=Market+Highs",
      },
      {
        title: "Tech Stocks Lead Market Rally on AI Innovation",
        summary:
          "Technology companies surge as artificial intelligence developments drive investor enthusiasm. NVIDIA, Microsoft, and Google parent Alphabet all posted significant gains.",
        pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        link: "https://finance.yahoo.com/news/tech-stocks-rally",
        image: "/placeholder.svg?height=400&width=600&text=Tech+Rally",
      },
      {
        title: "Federal Reserve Signals Potential Rate Changes",
        summary:
          "Fed officials hint at possible monetary policy adjustments in upcoming meetings, causing mixed reactions across financial markets.",
        pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        link: "https://finance.yahoo.com/news/fed-rate-signals",
        image: "/placeholder.svg?height=400&width=600&text=Fed+News",
      },
      {
        title: "Energy Sector Shows Strong Performance",
        summary:
          "Oil and gas companies outperform broader market as energy prices stabilize and demand outlook improves globally.",
        pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        link: "https://finance.yahoo.com/news/energy-sector-performance",
        image: "/placeholder.svg?height=400&width=600&text=Energy+Sector",
      },
      {
        title: "Banking Sector Earnings Beat Expectations",
        summary:
          "Major banks report stronger-than-expected quarterly results, boosting confidence in the financial sector's stability.",
        pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        link: "https://finance.yahoo.com/news/banking-earnings",
        image: "/placeholder.svg?height=400&width=600&text=Banking+News",
      },
    ]

    return NextResponse.json({ items: mockYahooNews })
  } catch (error) {
    console.error("Yahoo Finance API error:", error)

    // Return basic fallback data
    return NextResponse.json({
      items: [
        {
          title: "Market Update Available",
          summary: "Financial markets continue to show activity. Check back for the latest updates.",
          pubDate: new Date().toISOString(),
          link: "https://finance.yahoo.com",
          image: "/placeholder.svg?height=400&width=600&text=Market+Update",
        },
      ],
    })
  }
}
