import { type NextRequest, NextResponse } from "next/server"

// Server-side news fetching with proper environment variables
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const source = searchParams.get("source") || "all"

    let articles: any[] = []

    // Try to fetch from multiple sources using server-side environment variables
    try {
      // Alpha Vantage News (server-side only with proper env var)
      const alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY // Server-side only
      if (alphaVantageKey && (source === "all" || source === "alphavantage")) {
        const alphaResponse = await fetch(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${alphaVantageKey}&limit=10`,
          {
            headers: {
              "User-Agent": "StockToons/1.0",
            },
          },
        )

        if (alphaResponse.ok) {
          const alphaData = await alphaResponse.json()
          if (alphaData.feed && Array.isArray(alphaData.feed)) {
            const alphaArticles = alphaData.feed.slice(0, 5).map((item: any, index: number) => ({
              id: `alpha-${Date.now()}-${index}`,
              title: item.title || "Market Update",
              summary: item.summary || "Financial market news update",
              content: item.summary || "Financial market news update",
              category: "Finance",
              source: "Alpha Vantage",
              image:
                item.banner_image ||
                `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(item.title || "Market News")}`,
              publishedAt: item.time_published || new Date().toISOString(),
              url: item.url || "#",
              author: item.authors?.[0] || "Alpha Vantage",
              relatedStocks: item.ticker_sentiment?.map((t: any) => t.ticker).slice(0, 5) || [],
            }))
            articles.push(...alphaArticles)
          }
        }
      }

      // NewsAPI (server-side only with proper env var)
      const newsApiKey = process.env.NEWS_API_KEY // Server-side only
      if (newsApiKey && (source === "all" || source === "newsapi")) {
        const newsResponse = await fetch(
          `https://newsapi.org/v2/everything?q=stock+market+finance&sortBy=publishedAt&pageSize=10&apiKey=${newsApiKey}`,
          {
            headers: {
              "User-Agent": "StockToons/1.0",
            },
          },
        )

        if (newsResponse.ok) {
          const newsData = await newsResponse.json()
          if (newsData.articles && Array.isArray(newsData.articles)) {
            const newsArticles = newsData.articles.slice(0, 5).map((item: any, index: number) => ({
              id: `news-${Date.now()}-${index}`,
              title: item.title || "Business News",
              summary: item.description || "Latest business and market news",
              content: item.content || item.description || "Latest business and market news",
              category: "Business",
              source: item.source?.name || "NewsAPI",
              image:
                item.urlToImage ||
                `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(item.title || "Business News")}`,
              publishedAt: item.publishedAt || new Date().toISOString(),
              url: item.url || "#",
              author: item.author || "Staff Writer",
              relatedStocks: [],
            }))
            articles.push(...newsArticles)
          }
        }
      }

      // Yahoo Finance RSS (free, no API key required)
      if (source === "all" || source === "yahoo") {
        try {
          const yahooResponse = await fetch("https://feeds.finance.yahoo.com/rss/2.0/headline", {
            headers: {
              "User-Agent": "StockToons/1.0",
            },
          })

          if (yahooResponse.ok) {
            const yahooText = await yahooResponse.text()
            // Simple RSS parsing for demonstration
            const titleMatches = yahooText.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g)
            const linkMatches = yahooText.match(/<link>(.*?)<\/link>/g)
            const descMatches = yahooText.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/g)

            if (titleMatches && linkMatches && descMatches) {
              const yahooArticles = titleMatches.slice(1, 4).map((titleMatch, index) => {
                const title = titleMatch.replace(/<title><!\[CDATA\[/, "").replace(/\]\]><\/title>/, "")
                const link = linkMatches[index + 1]?.replace(/<link>/, "").replace(/<\/link>/, "") || "#"
                const description =
                  descMatches[index]?.replace(/<description><!\[CDATA\[/, "").replace(/\]\]><\/description>/, "") || ""

                return {
                  id: `yahoo-${Date.now()}-${index}`,
                  title: title || "Yahoo Finance News",
                  summary: description || "Latest financial news from Yahoo Finance",
                  content: description || "Latest financial news from Yahoo Finance",
                  category: "Finance",
                  source: "Yahoo Finance",
                  image: `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(title || "Yahoo Finance")}`,
                  publishedAt: new Date().toISOString(),
                  url: link,
                  author: "Yahoo Finance",
                  relatedStocks: [],
                }
              })
              articles.push(...yahooArticles)
            }
          }
        } catch (yahooError) {
          console.warn("Yahoo Finance RSS fetch failed:", yahooError)
        }
      }
    } catch (apiError) {
      console.warn("External API fetch failed:", apiError)
    }

    // If no external articles, return enhanced mock data
    if (articles.length === 0) {
      articles = [
        {
          id: `mock-${Date.now()}-1`,
          title: "Stock Market Reaches New Highs Amid Economic Optimism",
          summary:
            "Major indices continue their upward trajectory as investors remain confident about economic recovery prospects and corporate earnings growth.",
          content:
            "The stock market has been showing remarkable resilience and growth, with major indices posting significant gains over the past week. Investors are optimistic about the economic outlook, driven by strong corporate earnings reports and positive economic indicators. The S&P 500 has gained 2.4% this week, while the NASDAQ has risen 1.8%. Technology stocks are leading the rally, with artificial intelligence and cloud computing companies showing particularly strong performance.",
          category: "Finance",
          source: "Market News",
          image: "/placeholder.svg?height=400&width=600&text=Market+Highs",
          publishedAt: new Date().toISOString(),
          url: "#",
          author: "Financial Reporter",
          relatedStocks: ["SPY", "QQQ", "DIA", "AAPL", "MSFT"],
        },
        {
          id: `mock-${Date.now()}-2`,
          title: "Tech Giants Report Strong Q4 Earnings, AI Investments Pay Off",
          summary:
            "Technology companies surge as artificial intelligence developments drive investor enthusiasm and revenue growth.",
          content:
            "The technology sector is experiencing unprecedented growth, with AI-focused companies leading the charge. Major tech giants including Microsoft, Google, and NVIDIA are reporting earnings that significantly exceed analyst expectations. The companies' continued investment in artificial intelligence technologies is paying dividends, with AI-related revenue streams showing triple-digit growth rates.",
          category: "Technology",
          source: "Tech Today",
          image: "/placeholder.svg?height=400&width=600&text=Tech+Earnings",
          publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          url: "#",
          author: "Tech Analyst",
          relatedStocks: ["NVDA", "MSFT", "GOOGL", "AAPL", "META"],
        },
        {
          id: `mock-${Date.now()}-3`,
          title: "Federal Reserve Maintains Interest Rates, Signals Cautious Approach",
          summary:
            "Fed officials maintain current rates while monitoring inflation data and employment figures closely.",
          content:
            "The Federal Reserve has decided to maintain current interest rates at their latest meeting, citing the need to carefully monitor economic conditions. Fed Chair Jerome Powell emphasized the importance of data-driven decisions, particularly regarding inflation trends and employment statistics. Market participants are interpreting this as a cautiously optimistic signal about the economy's stability.",
          category: "Economy",
          source: "Economic Times",
          image: "/placeholder.svg?height=400&width=600&text=Fed+Meeting",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          url: "#",
          author: "Economic Reporter",
          relatedStocks: ["TLT", "IEF", "SHY", "GLD", "DXY"],
        },
        {
          id: `mock-${Date.now()}-4`,
          title: "Renewable Energy Stocks Surge on New Climate Legislation",
          summary: "Clean energy companies outperform broader market as new environmental policies drive investment.",
          content:
            "The renewable energy sector is experiencing a significant rally following the announcement of new climate legislation. Solar, wind, and battery technology companies are seeing substantial gains as investors anticipate increased government support and private investment in clean energy infrastructure. The clean energy ETF has gained 15% this month alone.",
          category: "Energy",
          source: "Energy Weekly",
          image: "/placeholder.svg?height=400&width=600&text=Clean+Energy",
          publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          url: "#",
          author: "Energy Correspondent",
          relatedStocks: ["ICLN", "PBW", "QCLN", "TSLA", "ENPH"],
        },
        {
          id: `mock-${Date.now()}-5`,
          title: "Healthcare Sector Shows Resilience Amid Market Volatility",
          summary: "Pharmaceutical and biotech companies maintain steady growth despite broader market uncertainties.",
          content:
            "The healthcare sector continues to demonstrate its defensive characteristics, with pharmaceutical giants and biotech companies showing steady performance even as other sectors experience volatility. Recent drug approvals and promising clinical trial results are driving investor confidence in the sector's long-term prospects.",
          category: "Healthcare",
          source: "Health Finance",
          image: "/placeholder.svg?height=400&width=600&text=Healthcare+Stocks",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          url: "#",
          author: "Healthcare Reporter",
          relatedStocks: ["JNJ", "PFE", "UNH", "ABBV", "MRK"],
        },
        {
          id: `mock-${Date.now()}-6`,
          title: "Cryptocurrency Market Stabilizes After Recent Volatility",
          summary: "Digital assets show signs of stabilization as institutional adoption continues to grow.",
          content:
            "The cryptocurrency market is showing signs of stabilization after a period of high volatility. Bitcoin and Ethereum have found support levels, while institutional adoption continues to drive long-term confidence. Several major corporations have announced plans to integrate blockchain technology into their operations.",
          category: "Finance",
          source: "Crypto News",
          image: "/placeholder.svg?height=400&width=600&text=Crypto+Market",
          publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          url: "#",
          author: "Crypto Analyst",
          relatedStocks: ["COIN", "MSTR", "SQ", "PYPL", "NVDA"],
        },
      ]
    }

    // Shuffle articles to provide variety
    const shuffledArticles = articles.sort(() => Math.random() - 0.5)

    return NextResponse.json({
      success: true,
      articles: shuffledArticles,
      count: shuffledArticles.length,
      timestamp: new Date().toISOString(),
      sources: {
        alphaVantage: !!process.env.ALPHA_VANTAGE_API_KEY,
        newsApi: !!process.env.NEWS_API_KEY,
        yahoo: true, // Always available (RSS)
      },
    })
  } catch (error) {
    console.error("External news API error:", error)

    // Return mock data as fallback
    const fallbackArticles = [
      {
        id: `fallback-${Date.now()}-1`,
        title: "Market Update: Stocks Show Mixed Performance",
        summary: "Financial markets display varied performance across different sectors today.",
        content:
          "Today's trading session showed mixed results across major indices, with technology stocks leading gains while energy shares faced some pressure.",
        category: "Finance",
        source: "Market Update",
        image: "/placeholder.svg?height=400&width=600&text=Market+Update",
        publishedAt: new Date().toISOString(),
        url: "#",
        author: "Market Reporter",
        relatedStocks: ["SPY", "QQQ"],
      },
      {
        id: `fallback-${Date.now()}-2`,
        title: "Economic Indicators Point to Steady Growth",
        summary: "Recent economic data suggests continued stability in key growth metrics.",
        content:
          "Economic indicators released this week point to steady growth across multiple sectors, with employment and consumer spending showing positive trends.",
        category: "Economy",
        source: "Economic News",
        image: "/placeholder.svg?height=400&width=600&text=Economic+Growth",
        publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        url: "#",
        author: "Economic Analyst",
        relatedStocks: ["DIA", "IWM"],
      },
    ]

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch external news",
        articles: fallbackArticles,
        count: fallbackArticles.length,
        fallback: true,
      },
      { status: 200 }, // Return 200 with fallback data instead of error
    )
  }
}
