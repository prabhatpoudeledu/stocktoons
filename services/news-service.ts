import { mockNewsData } from "@/data/news-data"

export interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  category: string
  source: string
  image: string
  publishedAt: string
  relatedStocks: string[]
  trending?: boolean
  featured?: boolean
  url?: string
  author?: string
  sentiment?: "positive" | "negative" | "neutral"
  importance?: "high" | "medium" | "low"
}

class NewsService {
  private cache: Map<string, { data: NewsArticle[]; timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  async fetchAllNews(): Promise<NewsArticle[]> {
    const cacheKey = "all-news"
    const cached = this.cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      // Fetch from our secure API route instead of directly from external APIs
      const response = await fetch("/api/news/external", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      let newsData = data.articles || []

      // If no external articles, use mock data
      if (newsData.length === 0) {
        newsData = mockNewsData
      }

      // Process the news data
      const processedNews = newsData.map((article: any, index: number) => {
        const processedArticle: NewsArticle = {
          id: article.id || `news-${Date.now()}-${index}`,
          title: article.title || "Untitled News",
          summary: article.summary || article.description || "No summary available",
          content: article.content || article.summary || article.description || "No content available",
          category: article.category || "General",
          source: article.source || "Unknown Source",
          image:
            article.image ||
            article.urlToImage ||
            `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(article.title || "News")}`,
          publishedAt: article.publishedAt || article.pubDate || new Date().toISOString(),
          relatedStocks: Array.isArray(article.relatedStocks) ? article.relatedStocks : [],
          url: article.url || article.link || "#",
          author: article.author || "Staff Writer",
          sentiment: this.analyzeSentiment(article.title + " " + (article.summary || article.description || "")),
          importance: index < 3 ? ("high" as const) : index < 6 ? ("medium" as const) : ("low" as const),
          trending: index < 5,
          featured: index === 0,
        }
        return processedArticle
      })

      this.cache.set(cacheKey, { data: processedNews, timestamp: Date.now() })
      return processedNews
    } catch (error) {
      console.error("Error fetching news:", error)

      // Return enhanced mock data as fallback
      const enhancedMockData = mockNewsData.map((article, index) => ({
        ...article,
        sentiment: this.analyzeSentiment(article.title + " " + article.summary),
        importance: index < 3 ? ("high" as const) : index < 6 ? ("medium" as const) : ("low" as const),
        trending: index < 5,
        featured: index === 0,
      }))

      return enhancedMockData
    }
  }

  private analyzeSentiment(text: string): "positive" | "negative" | "neutral" {
    if (!text) return "neutral"

    const positiveWords = [
      "surge",
      "rise",
      "gain",
      "up",
      "bullish",
      "growth",
      "profit",
      "beat",
      "strong",
      "rally",
      "boom",
      "success",
      "increase",
      "advance",
      "climb",
      "soar",
      "jump",
      "outperform",
      "exceed",
      "positive",
      "optimistic",
      "confident",
      "robust",
    ]

    const negativeWords = [
      "fall",
      "drop",
      "decline",
      "down",
      "bearish",
      "loss",
      "miss",
      "weak",
      "crash",
      "plunge",
      "slump",
      "fail",
      "decrease",
      "retreat",
      "tumble",
      "sink",
      "underperform",
      "disappoint",
      "negative",
      "pessimistic",
      "concern",
      "volatile",
    ]

    const lowerText = text.toLowerCase()
    const positiveCount = positiveWords.filter((word) => lowerText.includes(word)).length
    const negativeCount = negativeWords.filter((word) => lowerText.includes(word)).length

    if (positiveCount > negativeCount) return "positive"
    if (negativeCount > positiveCount) return "negative"
    return "neutral"
  }

  async getHotNews(): Promise<NewsArticle[]> {
    const allNews = await this.fetchAllNews()
    return allNews
      .filter(
        (news) =>
          news.trending ||
          news.featured ||
          news.importance === "high" ||
          new Date().getTime() - new Date(news.publishedAt).getTime() < 2 * 60 * 60 * 1000,
      )
      .slice(0, 5)
  }

  async getFeaturedStory(): Promise<NewsArticle | null> {
    const allNews = await this.fetchAllNews()
    return allNews.find((news) => news.featured) || allNews[0] || null
  }

  async searchNews(query: string): Promise<NewsArticle[]> {
    const allNews = await this.fetchAllNews()

    if (!query.trim()) {
      return allNews
    }

    const searchTerm = query.toLowerCase()

    return allNews
      .map((article) => {
        let relevanceScore = 0

        // Title matches get highest score
        if (article.title.toLowerCase().includes(searchTerm)) {
          relevanceScore += 10
        }

        // Category matches
        if (article.category.toLowerCase().includes(searchTerm)) {
          relevanceScore += 8
        }

        // Source matches
        if (article.source.toLowerCase().includes(searchTerm)) {
          relevanceScore += 6
        }

        // Summary matches
        if (article.summary.toLowerCase().includes(searchTerm)) {
          relevanceScore += 5
        }

        // Content matches
        if (article.content.toLowerCase().includes(searchTerm)) {
          relevanceScore += 3
        }

        // Related stocks matches
        if (article.relatedStocks.some((stock) => stock.toLowerCase().includes(searchTerm))) {
          relevanceScore += 7
        }

        // Author matches
        if (article.author && article.author.toLowerCase().includes(searchTerm)) {
          relevanceScore += 4
        }

        return { ...article, relevanceScore }
      })
      .filter((article) => article.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .map(({ relevanceScore, ...article }) => article) // Remove relevanceScore from final result
  }

  async refreshNews(): Promise<NewsArticle[]> {
    // Clear cache to force fresh fetch
    this.cache.clear()
    return this.fetchAllNews()
  }

  // Get news by category
  async getNewsByCategory(category: string): Promise<NewsArticle[]> {
    const allNews = await this.fetchAllNews()
    if (category.toLowerCase() === "all") {
      return allNews
    }
    return allNews.filter((article) => article.category.toLowerCase() === category.toLowerCase())
  }

  // Get trending news
  async getTrendingNews(): Promise<NewsArticle[]> {
    const allNews = await this.fetchAllNews()
    return allNews.filter((article) => article.trending).slice(0, 10)
  }
}

export const newsService = new NewsService()
