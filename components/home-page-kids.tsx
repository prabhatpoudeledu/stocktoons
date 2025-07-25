"use client"

import { useState, useEffect } from "react"
import { Star, TrendingUp, BookOpen, Gamepad2, Trophy, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { newsService, type NewsArticle } from "@/services/news-service"

const achievements = [
  { name: "First Trade", icon: "🎯", completed: true },
  { name: "Stock Explorer", icon: "🔍", completed: true },
  { name: "News Reader", icon: "📰", completed: false },
  { name: "Portfolio Builder", icon: "💼", completed: false },
]

const funFacts = [
  "🎈 The stock market is like a giant playground for grown-ups!",
  '🌟 Companies sell tiny pieces of themselves called "shares"',
  "🎯 When you buy a share, you become a mini-owner of that company!",
  "🚀 Some stocks go up and down like a roller coaster!",
]

export function HomePageKids() {
  const [hotNews, setHotNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [currentFact, setCurrentFact] = useState(0)

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length)
    }, 4000)
    return () => clearInterval(interval)
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

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "😊"
      case "negative":
        return "😔"
      default:
        return "😐"
    }
  }

  const simplifyNewsTitle = (title: string) => {
    // Simplify complex financial terms for kids
    return title
      .replace(/\b(surge|rally|soar)\b/gi, "go up")
      .replace(/\b(plunge|crash|decline)\b/gi, "go down")
      .replace(/\b(earnings|revenue)\b/gi, "money made")
      .replace(/\b(acquisition|merger)\b/gi, "joining together")
      .replace(/\b(IPO|initial public offering)\b/gi, "new company on stock market")
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-2xl">
        <div className="text-6xl mb-4">🎈</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to StockToons Kids! 🌟</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn about money, stocks, and investing in a fun and easy way! 🚀
        </p>
      </div>

      {/* Hot News for Kids */}
      <Card className="border-2 border-orange-200 bg-orange-50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <TrendingUp className="h-5 w-5" />📰 What's Happening in the Money World?
          </CardTitle>
          <Link href="/news">
            <Button
              variant="outline"
              size="sm"
              className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
            >
              See All News 📖
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-orange-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-orange-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {hotNews.map((article, index) => (
                <div key={article.id}>
                  <Link href={`/news/${article.id}`}>
                    <div className="hover:bg-orange-100 p-4 rounded-xl cursor-pointer transition-colors border border-orange-200">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl flex-shrink-0">
                          {getSentimentEmoji(article.sentiment || "neutral")}
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-bold text-gray-900 leading-tight text-lg">
                            {simplifyNewsTitle(article.title)}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {article.summary.length > 100 ? article.summary.substring(0, 100) + "..." : article.summary}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatTimeAgo(article.publishedAt)}
                            </span>
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                              {article.category}
                            </Badge>
                            {article.importance === "high" && (
                              <Badge className="bg-red-100 text-red-800 border-red-300">🔥 Hot News!</Badge>
                            )}
                          </div>
                          {article.relatedStocks && article.relatedStocks.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              <span className="text-sm text-gray-600">Companies: </span>
                              {article.relatedStocks.slice(0, 3).map((stock) => (
                                <Badge
                                  key={stock}
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700 border-blue-300"
                                >
                                  {stock}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                  {index < hotNews.length - 1 && <div className="border-b border-orange-200 my-4"></div>}
                </div>
              ))}

              {hotNews.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-600">
                  <div className="text-4xl mb-4">📰</div>
                  <p className="text-lg">No exciting news right now!</p>
                  <p className="text-sm text-gray-500 mb-4">Check back later for cool money stories</p>
                  <Link href="/news">
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                    >
                      Explore All News 🔍
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fun Learning Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <BookOpen className="h-5 w-5" />📚 Learning Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Stock Basics</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Money Management</span>
                <span>50%</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <Link href="/learn">
              <Button className="w-full bg-green-600 hover:bg-green-700">Continue Learning! 🎓</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Fun Games */}
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Gamepad2 className="h-5 w-5" />🎮 Fun Games
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-sm text-gray-600 mb-4">Play games to learn about money and stocks!</p>
            </div>
            <Link href="/games">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Play Games! 🎲</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Trophy className="h-5 w-5" />🏆 My Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.name}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  achievement.completed ? "bg-yellow-100" : "bg-gray-100"
                }`}
              >
                <span className="text-xl">{achievement.icon}</span>
                <span className={`text-sm ${achievement.completed ? "text-yellow-800" : "text-gray-600"}`}>
                  {achievement.name}
                </span>
                {achievement.completed && <Star className="h-4 w-4 text-yellow-600 ml-auto" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Fun Fact */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6 text-center">
          <div className="text-3xl mb-4">💡</div>
          <h3 className="text-lg font-bold text-blue-800 mb-2">Did You Know?</h3>
          <p className="text-blue-700 text-lg">{funFacts[currentFact]}</p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/kids/simulator">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-pink-200 bg-pink-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="font-semibold text-pink-800">Stock Game</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/kids/stocks/categories">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🏢</div>
              <p className="font-semibold text-green-800">Companies</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/videos">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">📺</div>
              <p className="font-semibold text-blue-800">Videos</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/learn">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">📖</div>
              <p className="font-semibold text-purple-800">Learn</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
