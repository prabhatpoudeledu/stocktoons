"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, ExternalLink, RefreshCw } from "lucide-react"
import Link from "next/link"
import { newsService, type NewsArticle } from "@/services/news-service"

export function NewsWidget() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const hotNews = await newsService.getHotNews()
        setNews(hotNews.slice(0, 4))
      } catch (error) {
        console.error("Error fetching news for widget:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

      if (diffInMinutes < 1) return "Just now"
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    } catch {
      return "Recently"
    }
  }

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const refreshNews = async () => {
    try {
      setLoading(true)
      const freshNews = await newsService.refreshNews()
      setNews(freshNews.slice(0, 4))
    } catch (error) {
      console.error("Error refreshing news:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          Latest News
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={refreshNews} disabled={loading} className="h-8 w-8 p-0">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Link href="/news">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : news.length > 0 ? (
          news.map((article, index) => (
            <div key={article.id}>
              <Link href={`/news/${article.id}`}>
                <div className="space-y-2 hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    {article.importance === "high" && (
                      <Badge className="bg-red-100 text-red-800 text-xs">Breaking</Badge>
                    )}
                    {article.sentiment && (
                      <span className={`text-xs ${getSentimentColor(article.sentiment)}`}>{article.sentiment}</span>
                    )}
                  </div>

                  <h4 className="font-medium text-sm leading-tight line-clamp-2">{article.title}</h4>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(article.publishedAt)}</span>
                    </div>
                    <span>{article.source}</span>
                  </div>

                  {article.relatedStocks && article.relatedStocks.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {article.relatedStocks.slice(0, 3).map((stock) => (
                        <Badge key={stock} variant="outline" className="text-xs">
                          {stock}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
              {index < news.length - 1 && <div className="border-b border-gray-100 my-3"></div>}
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No news available</p>
            <Button variant="outline" size="sm" onClick={refreshNews} className="mt-2 bg-transparent">
              Try Again
            </Button>
          </div>
        )}

        <div className="pt-2 border-t">
          <Link href="/news">
            <Button variant="outline" className="w-full bg-transparent">
              View All News
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
