import { type NextRequest, NextResponse } from "next/server"
import { newsService } from "@/services/news-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "all"
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    let articles
    switch (type) {
      case "hot":
        articles = await newsService.getHotNews()
        break
      case "featured":
        const featured = await newsService.getFeaturedStory()
        articles = featured ? [featured] : []
        break
      case "all":
      default:
        articles = await newsService.fetchAllNews()
        break
    }

    // Apply limit if specified
    if (limit > 0) {
      articles = articles.slice(0, limit)
    }

    return NextResponse.json({
      success: true,
      articles,
      count: articles.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
        articles: [],
        count: 0,
      },
      { status: 500 },
    )
  }
}
