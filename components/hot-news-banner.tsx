"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

interface NewsItem {
  id: string
  title: string
  summary: string
  sentiment: "positive" | "negative" | "neutral"
  importance: "high" | "medium" | "low"
  timestamp: string
  source: string
  url?: string
}

export function HotNewsBanner() {
  const [hotNews, setHotNews] = useState<NewsItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchHotNews = async () => {
      try {
        const response = await fetch("/api/news/fetch?type=breaking&limit=5")
        const data = await response.json()
        setHotNews(data.articles || [])
      } catch (error) {
        console.error("Error fetching hot news:", error)
        // Fallback hot news
        setHotNews([
          {
            id: "1",
            title: "Tech Stocks Rally as AI Innovation Continues",
            summary: "Major technology companies see significant gains following breakthrough AI announcements.",
            sentiment: "positive",
            importance: "high",
            timestamp: new Date().toISOString(),
            source: "Market Watch",
            url: "/news/1",
          },
          {
            id: "2",
            title: "Federal Reserve Maintains Interest Rates",
            summary: "Central bank keeps rates steady, signaling cautious approach to economic policy.",
            sentiment: "neutral",
            importance: "high",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            source: "Financial Times",
            url: "/news/2",
          },
        ])
      }
    }

    fetchHotNews()
  }, [])

  useEffect(() => {
    if (hotNews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % hotNews.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [hotNews.length])

  if (hotNews.length === 0) return null

  const currentNews = hotNews[currentIndex]

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500 text-white"
      case "negative":
        return "bg-red-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-green-100 text-green-700 border-green-200"
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white mb-6 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 animate-pulse" />
              <span className="font-bold text-sm">HOT NEWS</span>
            </div>
            <Badge className={getSentimentColor(currentNews.sentiment)}>{currentNews.sentiment.toUpperCase()}</Badge>
            <Badge className={`${getImportanceColor(currentNews.importance)} text-xs`}>
              {currentNews.importance.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm opacity-90">
            <Clock className="h-4 w-4" />
            <span>{new Date(currentNews.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="mt-3">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{currentNews.title}</h3>
          <p className="text-sm opacity-90 line-clamp-2 mb-3">{currentNews.summary}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs opacity-75">Source: {currentNews.source}</span>
            <div className="flex items-center space-x-2">
              {hotNews.length > 1 && (
                <div className="flex space-x-1">
                  {hotNews.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
              {currentNews.url && (
                <Link href={currentNews.url}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs"
                  >
                    Read More
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
