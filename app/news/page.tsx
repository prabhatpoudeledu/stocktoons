"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, TrendingUp, Clock, ExternalLink, Bookmark, Share2, Filter } from "lucide-react"
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
        return "text-green-600 bg-green-50"
      case "negative":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
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
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Market News</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay informed with the latest financial news, market updates, and investment insights
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search news, stocks, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
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
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {searchQuery && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {isSearching ? "Searching..." : `Found ${filteredNews.length} results for "${searchQuery}"`}
              </p>
              <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Featured Story */}
      {featuredStory && !searchQuery && (
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={featuredStory.image || "/placeholder.svg"}
                alt={featuredStory.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-red-100 text-red-800">Featured</Badge>
                <Badge className={getSentimentColor(featuredStory.sentiment || "neutral")}>
                  {featuredStory.sentiment || "neutral"}
                </Badge>
                <Badge className={getImportanceColor(featuredStory.importance || "medium")}>
                  {featuredStory.importance || "medium"} priority
                </Badge>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{featuredStory.title}</h2>

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
                        <Badge variant="outline" className="hover:bg-blue-50 cursor-pointer">
                          {stock}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Link href={`/news/${featuredStory.id}`}>
                  <Button>Read Full Article</Button>
                </Link>
                {featuredStory.url && featuredStory.url !== "#" && (
                  <Button variant="outline" asChild>
                    <a href={featuredStory.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Source
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Results</h2>
              {filteredNews.length === 0 && !isSearching && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600">Try adjusting your search terms or browse our latest news below.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {!searchQuery && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest News</h2>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNews.map((article) => (
              <NewsCard key={article.id} article={article} size="compact" showBookmark />
            ))}
          </div>

          {filteredNews.length === 0 && !loading && !searchQuery && (
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No news available</h3>
                <p className="text-gray-600">Check back later for the latest market updates and financial news.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending News */}
          {trendingNews.length > 0 && !searchQuery && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  Trending Now
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingNews.map((article, index) => (
                  <div key={article.id}>
                    <Link href={`/news/${article.id}`}>
                      <div className="space-y-2 hover:bg-gray-50 p-2 rounded cursor-pointer">
                        <h4 className="font-medium text-sm leading-tight line-clamp-2">{article.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{formatTimeAgo(article.publishedAt)}</span>
                          <Badge className={getSentimentColor(article.sentiment || "neutral")} variant="outline">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-500" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.slice(1).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
