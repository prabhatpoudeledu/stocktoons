"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, ArrowRight, RefreshCw } from "lucide-react"
import Link from "next/link"
import { newsService, type NewsArticle } from "@/services/news-service"
import { useDisplayMode } from "@/contexts/display-mode-context"

export function HotNewsBanner() {
  const [hotNews, setHotNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { displayMode } = useDisplayMode()

  useEffect(() => {
    const fetchHotNews = async () => {
      try {
        setLoading(true)
        const news = await newsService.getHotNews()
        setHotNews(news.slice(0, 3))
      } catch (error) {
        console.error("Error fetching hot news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHotNews()
  }, [])

  useEffect(() => {
    if (hotNews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % hotNews.length)
      }, 5000) // Change every 5 seconds

      return () => clearInterval(interval)
    }
  }, [hotNews.length])

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

  const getSentimentEmoji = (sentiment?: string) => {
    if (displayMode === "kids") {
      switch (sentiment) {
        case "positive":
          return "😊"
        case "negative":
          return "😔"
        default:
          return "📰"
      }
    }
    return ""
  }

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
  }

  if (loading) {
    return (
      <Card className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <RefreshCw className="h-5 w-5 animate-spin text-orange-500" />
            <div className="animate-pulse">
              <div className="h-4 bg-orange-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-orange-200 rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (hotNews.length === 0) {
    return null
  }

  const currentNews = hotNews[currentIndex]

  return (
    <Card className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-red-500" />
                {displayMode === "kids" && <span className="text-2xl">{getSentimentEmoji(currentNews.sentiment)}</span>}
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-red-500 text-white">{displayMode === "kids" ? "🔥 Hot News!" : "Breaking"}</Badge>
                <Badge variant="outline" className="border-orange-300">
                  {currentNews.category}
                </Badge>
                {currentNews.sentiment && (
                  <Badge className={getSentimentColor(currentNews.sentiment)}>{currentNews.sentiment}</Badge>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTimeAgo(currentNews.publishedAt)}
                </div>
              </div>

              <h3 className="font-bold text-lg leading-tight text-gray-900">
                <Link href={`/news/${currentNews.id}`} className="hover:text-primary">
                  {displayMode === "kids" && currentNews.title.length > 80
                    ? currentNews.title.substring(0, 80) + "..."
                    : currentNews.title}
                </Link>
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {displayMode === "kids" && currentNews.summary.length > 120
                  ? currentNews.summary.substring(0, 120) + "..."
                  : currentNews.summary.length > 150
                    ? currentNews.summary.substring(0, 150) + "..."
                    : currentNews.summary}
              </p>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Source: {currentNews.source}</span>
                {currentNews.relatedStocks && currentNews.relatedStocks.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Related:</span>
                    <div className="flex gap-1">
                      {currentNews.relatedStocks.slice(0, 3).map((stock) => (
                        <Link key={stock} href={`/stocks/${stock}`}>
                          <Badge
                            variant="outline"
                            className="text-xs hover:bg-primary hover:text-primary-foreground cursor-pointer"
                          >
                            {stock}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-shrink-0">
            <Link href={`/news/${currentNews.id}`}>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                {displayMode === "kids" ? "Read Story! 📖" : "Read More"}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>

            <Link href="/news">
              <Button
                variant="outline"
                size="sm"
                className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
              >
                {displayMode === "kids" ? "All News 🗞️" : "All News"}
              </Button>
            </Link>
          </div>
        </div>

        {/* News indicator dots */}
        {hotNews.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {hotNews.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-orange-500" : "bg-orange-200"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
