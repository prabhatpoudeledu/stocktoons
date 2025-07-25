"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { newsService, type NewsArticle } from "@/services/news-service"

const marketData = [
  { symbol: "S&P 500", value: "4,567.89", change: "+1.2%", positive: true },
  { symbol: "NASDAQ", value: "14,234.56", change: "+0.8%", positive: true },
  { symbol: "DOW", value: "34,567.12", change: "-0.3%", positive: false },
  { symbol: "RUSSELL", value: "2,123.45", change: "+0.5%", positive: true },
]

const topStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$175.43", change: "+2.1%", positive: true },
  { symbol: "MSFT", name: "Microsoft", price: "$338.11", change: "+1.8%", positive: true },
  { symbol: "GOOGL", name: "Alphabet", price: "$127.89", change: "-0.5%", positive: false },
  { symbol: "TSLA", name: "Tesla", price: "$248.50", change: "+3.2%", positive: true },
]

export function HomePageAdult() {
  const [hotNews, setHotNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHotNews = async () => {
      try {
        const news = await newsService.getHotNews()
        setHotNews(news.slice(0, 3)) // Show only top 3 hot news
      } catch (error) {
        console.error("Error fetching hot news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHotNews()
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

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50"
      case "negative":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to StockToons Professional</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your comprehensive platform for market analysis, portfolio management, and investment insights
        </p>
      </div>

      {/* Hot News Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            Breaking Market News
          </CardTitle>
          <Link href="/news">
            <Button variant="outline" size="sm">
              View All News
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {hotNews.map((article, index) => (
                <div key={article.id}>
                  <Link href={`/news/${article.id}`}>
                    <div className="hover:bg-gray-50 p-3 rounded-lg cursor-pointer transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-gray-900 leading-tight line-clamp-2">{article.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{article.summary}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(article.publishedAt)}
                            </span>
                            <span>{article.source}</span>
                            <Badge className={getSentimentColor(article.sentiment || "neutral")} variant="outline">
                              {article.sentiment || "neutral"}
                            </Badge>
                            {article.importance === "high" && (
                              <Badge className="bg-red-100 text-red-800">Breaking</Badge>
                            )}
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
                        {article.image && (
                          <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            className="w-20 h-16 object-cover rounded flex-shrink-0"
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                  {index < hotNews.length - 1 && <div className="border-b border-gray-100 my-3"></div>}
                </div>
              ))}

              {hotNews.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No breaking news at the moment</p>
                  <Link href="/news">
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Browse All News
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketData.map((market) => (
          <Card key={market.symbol}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{market.symbol}</p>
                  <p className="text-2xl font-bold text-gray-900">{market.value}</p>
                </div>
                <div className={`flex items-center ${market.positive ? "text-green-600" : "text-red-600"}`}>
                  {market.positive ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{market.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions and Top Stocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/analysis">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <PieChart className="h-4 w-4 mr-2" />
                Market Analysis
              </Button>
            </Link>
            <Link href="/watchlist">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                My Watchlist
              </Button>
            </Link>
            <Link href="/stocks/categories">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Browse Stocks
              </Button>
            </Link>
            <Link href="/search">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Stock Search
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Top Performing Stocks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topStocks.map((stock) => (
              <Link key={stock.symbol} href={`/stocks/${stock.symbol}`}>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="font-semibold text-gray-900">{stock.symbol}</p>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{stock.price}</p>
                    <p className={`text-sm ${stock.positive ? "text-green-600" : "text-red-600"}`}>{stock.change}</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
