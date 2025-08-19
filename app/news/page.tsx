"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, TrendingUp, Clock, ExternalLink, Bookmark, Share2, Filter, Globe, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NewsCard } from "@/components/news-card"
import { newsService, type NewsArticle } from "@/services/news-service"
import Link from "next/link"
import { useRouter } from "next/navigation"

const categories = ["All", "Technology", "Finance", "Economy", "Healthcare", "Energy", "Business"]

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [featuredStory, setFeaturedStory] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const [allNews, featured] = await Promise.all([newsService.fetchAllNews(), newsService.getFeaturedStory()])
        setNews(allNews)
        setFeaturedStory(featured)
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Debounced search
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true)
        try {
          const results = await newsService.searchNews(searchQuery)
          setSearchResults(results)
        } catch (error) {
          console.error("Search error:", error)
          setSearchResults([])
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [searchQuery])

  const filteredNews = useMemo(() => {
    const newsToFilter = searchQuery.trim() ? searchResults : news

    if (selectedCategory === "All") {
      return newsToFilter
    }

    return newsToFilter.filter((article) => article.category.toLowerCase() === selectedCategory.toLowerCase())
  }, [news, searchResults, selectedCategory, searchQuery])

  const trendingNews = useMemo(() => {
    return news.filter((article) => article.trending && article.id !== featuredStory?.id).slice(0, 5)
  }, [news, featuredStory])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200"
      case "negative":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gradient-to-r from-purple-200 to-pink-200 rounded w-1/4 mx-auto"></div>
            <div className="h-64 bg-gradient-to-r from-purple-100 to-pink-100 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gradient-to-r from-blue-100 to-cyan-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full mb-6">
            <Globe className="h-6 w-6" />
            <span className="font-bold text-lg">Financial News Center</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Market News & Insights
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Stay informed with the latest financial news, market updates, and investment insights from trusted sources
            worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white border-2 border-purple-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 h-4 w-4" />
                <Input
                  placeholder="Search news, stocks, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                        : "border-purple-200 text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {searchQuery && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  {isSearching ? "Searching..." : `Found ${filteredNews.length} results for "${searchQuery}"`}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="text-purple-600 hover:bg-purple-50"
                >
                  Clear search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Featured Story */}
        {featuredStory && !searchQuery && (
          <Card className="overflow-hidden bg-white border-2 border-purple-100 shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredStory.image || "/placeholder.svg"}
                  alt={featuredStory.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                  <Badge className={`${getSentimentColor(featuredStory.sentiment || "neutral")} border`}>
                    {featuredStory.sentiment || "neutral"}
                  </Badge>
                  <Badge className={`${getImportanceColor(featuredStory.importance || "medium")} border`}>
                    {featuredStory.importance || "medium"} priority
                  </Badge>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 leading-tight">{featuredStory.title}</h2>

                <p className="text-gray-600 leading-relaxed">{featuredStory.summary}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatTimeAgo(featuredStory.publishedAt)}
                  </span>
                  <span>{featuredStory.source}</span>
                  <span>{featuredStory.author}</span>
                </div>

                {featuredStory.relatedStocks && featuredStory.relatedStocks.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Related Stocks:</p>
                    <div className="flex gap-2 flex-wrap">
                      {featuredStory.relatedStocks.map((stock) => (
                        <Link key={stock} href={`/stocks/${stock}`}>
                          <Badge
                            variant="outline"
                            className="hover:bg-purple-50 cursor-pointer border-purple-200 text-purple-700"
                          >
                            {stock}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Link href={`/news/${featuredStory.id}`}>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Read Full Article
                    </Button>
                  </Link>
                  {featuredStory.url && featuredStory.url !== "#" && (
                    <Button
                      variant="outline"
                      asChild
                      className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                    >
                      <a href={featuredStory.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Source
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main News Content */}
          <div className="lg:col-span-3 space-y-6">
            {searchQuery && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Search Results
                </h2>
                {filteredNews.length === 0 && !isSearching && (
                  <Card className="bg-white border-2 border-purple-100">
                    <CardContent className="p-8 text-center">
                      <Search className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No articles found</h3>
                      <p className="text-gray-600">Try adjusting your search terms or browse our latest news below.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {!searchQuery && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Latest News
                </h2>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.map((article) => (
                <NewsCard key={article.id} article={article} size="compact" showBookmark />
              ))}
            </div>

            {filteredNews.length === 0 && !loading && !searchQuery && (
              <Card className="bg-white border-2 border-purple-100">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No news available</h3>
                  <p className="text-gray-600">Check back later for the latest market updates and financial news.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending News */}
            {trendingNews.length > 0 && !searchQuery && (
              <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Trending Now
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trendingNews.map((article, index) => (
                    <div key={article.id}>
                      <Link href={`/news/${article.id}`}>
                        <div className="space-y-2 hover:bg-purple-50 p-2 rounded cursor-pointer">
                          <h4 className="font-medium text-sm leading-tight line-clamp-2 text-gray-800">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span>{formatTimeAgo(article.publishedAt)}</span>
                            <Badge className={`${getSentimentColor(article.sentiment || "neutral")} border text-xs`}>
                              {article.sentiment || "neutral"}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                      {index < trendingNews.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Market Categories */}
            <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Filter className="h-5 w-5 text-blue-600" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.slice(1).map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "text-blue-700 hover:bg-blue-50"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* News Statistics */}
            <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Today's Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Articles Published</span>
                  <span className="font-bold text-green-800">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Breaking News</span>
                  <span className="font-bold text-green-800">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Market Updates</span>
                  <span className="font-bold text-green-800">89</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
