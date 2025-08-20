"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Search,
  TrendingUp,
  Clock,
  ExternalLink,
  Bookmark,
  Share2,
  Filter,
  Star,
  Newspaper,
  X,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewsCard } from "@/components/news-card"
import { newsService, type NewsArticle } from "@/services/news-service"
import Link from "next/link"
import { useRouter } from "next/navigation"

const categories = ["All", "Technology", "Finance", "Economy", "Healthcare", "Energy", "Business"]
const sortOptions = [
  { value: "newest", label: "Newest First 🕐" },
  { value: "oldest", label: "Oldest First ⏰" },
  { value: "trending", label: "Most Popular 🔥" },
  { value: "relevance", label: "Most Relevant 🎯" },
]

const timeFilters = [
  { value: "all", label: "All Time 📅" },
  { value: "today", label: "Today 🌅" },
  { value: "week", label: "This Week 📆" },
  { value: "month", label: "This Month 🗓️" },
]

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [featuredStory, setFeaturedStory] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [timeFilter, setTimeFilter] = useState("all")
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set())
  const router = useRouter()

  // Popular search terms
  const popularSearches = [
    "Apple earnings 📱",
    "Tesla stock 🚗",
    "Bitcoin price 💰",
    "AI technology 🤖",
    "Market crash 📉",
    "Inflation news 💸",
    "Green energy ⚡",
    "Tech stocks 💻",
  ]

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

    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }

    // Load bookmarks from localStorage
    const bookmarks = localStorage.getItem("bookmarkedArticles")
    if (bookmarks) {
      setBookmarkedArticles(new Set(JSON.parse(bookmarks)))
    }
  }, [])

  // Enhanced search with suggestions
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true)
        try {
          const results = await newsService.searchNews(searchQuery)
          setSearchResults(results)

          // Generate search suggestions
          const suggestions = news
            .filter(
              (article) =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.summary.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .slice(0, 5)
            .map((article) => article.title.split(" ").slice(0, 3).join(" "))

          setSearchSuggestions([...new Set(suggestions)])
          setShowSuggestions(true)
        } catch (error) {
          console.error("Search error:", error)
          setSearchResults([])
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [searchQuery, news])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchQuery(query)
      setShowSuggestions(false)

      // Add to recent searches
      const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem("recentSearches", JSON.stringify(updated))
    }
  }

  const toggleBookmark = (articleId: string) => {
    const updated = new Set(bookmarkedArticles)
    if (updated.has(articleId)) {
      updated.delete(articleId)
    } else {
      updated.add(articleId)
    }
    setBookmarkedArticles(updated)
    localStorage.setItem("bookmarkedArticles", JSON.stringify([...updated]))
  }

  const filteredNews = useMemo(() => {
    let newsToFilter = searchQuery.trim() ? searchResults : news

    // Category filter
    if (selectedCategory !== "All") {
      newsToFilter = newsToFilter.filter((article) => article.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Time filter
    if (timeFilter !== "all") {
      const now = new Date()
      newsToFilter = newsToFilter.filter((article) => {
        const articleDate = new Date(article.publishedAt)
        const diffTime = now.getTime() - articleDate.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        switch (timeFilter) {
          case "today":
            return diffDays <= 1
          case "week":
            return diffDays <= 7
          case "month":
            return diffDays <= 30
          default:
            return true
        }
      })
    }

    // Sort
    return newsToFilter.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        case "trending":
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
        case "relevance":
          if (!searchQuery) return 0
          const aRelevance = (a.title + a.summary).toLowerCase().split(searchQuery.toLowerCase()).length
          const bRelevance = (b.title + b.summary).toLowerCase().split(searchQuery.toLowerCase()).length
          return bRelevance - aRelevance
        default: // newest
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
    })
  }, [news, searchResults, selectedCategory, searchQuery, sortBy, timeFilter])

  const trendingNews = useMemo(() => {
    return news.filter((article) => article.trending && article.id !== featuredStory?.id).slice(0, 5)
  }, [news, featuredStory])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-emerald-100 text-emerald-800 border-emerald-300"
      case "negative":
        return "bg-rose-100 text-rose-800 border-rose-300"
      default:
        return "bg-violet-100 text-violet-800 border-violet-300"
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-rose-100 text-rose-800 border-rose-300"
      case "medium":
        return "bg-violet-100 text-violet-800 border-violet-300"
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-300"
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
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gradient-to-r from-emerald-200 to-teal-200 rounded w-1/4 mx-auto"></div>
            <div className="h-64 bg-gradient-to-r from-violet-100 to-purple-100 rounded-3xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full mb-6 shadow-lg">
            <Newspaper className="h-7 w-7" />
            <span className="font-bold text-xl">News Adventure Center! 📰</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Discover Money News! 🌟
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Stay updated with the coolest financial news and market adventures from around the world! 🚀
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="bg-white border-4 border-indigo-100 shadow-xl rounded-3xl">
          <CardContent className="p-8">
            {/* Search Bar with Suggestions */}
            <div className="relative mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-500 h-5 w-5" />
                  <Input
                    placeholder="Search for exciting news, stocks, companies... 🔍"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                    className="pl-12 pr-12 border-violet-200 focus:border-violet-400 focus:ring-violet-400 text-lg py-4 rounded-2xl"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("")
                        setShowSuggestions(false)
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-violet-500 hover:bg-violet-100 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  {isSearching && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin h-5 w-5 border-2 border-violet-500 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => handleSearch(searchQuery)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-2xl"
                >
                  Search! 🔍
                </Button>
              </div>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (searchSuggestions.length > 0 || recentSearches.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-violet-200 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto">
                  {searchSuggestions.length > 0 && (
                    <div className="p-4">
                      <h4 className="font-bold text-violet-700 mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Suggestions ✨
                      </h4>
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(suggestion)}
                          className="w-full text-left p-2 hover:bg-violet-50 rounded-lg text-slate-700 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  {recentSearches.length > 0 && (
                    <div className="p-4 border-t border-violet-100">
                      <h4 className="font-bold text-violet-700 mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Recent Searches 🕐
                      </h4>
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full text-left p-2 hover:bg-violet-50 rounded-lg text-slate-700 transition-colors flex items-center justify-between"
                        >
                          <span>{search}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              const updated = recentSearches.filter((_, i) => i !== index)
                              setRecentSearches(updated)
                              localStorage.setItem("recentSearches", JSON.stringify(updated))
                            }}
                            className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Popular Searches */}
            {!searchQuery && (
              <div className="mb-6">
                <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-emerald-500" />
                  Popular Searches 🌟
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSearch(search.replace(/[^\w\s]/gi, "").trim())}
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-full font-medium"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Filters and Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">📂 Category</label>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`whitespace-nowrap font-bold rounded-full transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg"
                          : "border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 bg-white"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">🕐 Time Period</label>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="border-violet-200 focus:border-violet-400 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeFilters.map((filter) => (
                      <SelectItem key={filter.value} value={filter.value}>
                        {filter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">📊 Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-violet-200 focus:border-violet-400 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <div className="bg-violet-50 p-4 rounded-2xl border-2 border-violet-200">
                <p className="text-slate-700 font-medium">
                  {isSearching
                    ? "Searching for awesome news... 🔍"
                    : `Found ${filteredNews.length} cool articles about "${searchQuery}"! 🎉`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border-2 border-indigo-200 rounded-2xl p-2">
            <TabsTrigger
              value="all"
              className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              📰 All News
            </TabsTrigger>
            <TabsTrigger
              value="bookmarked"
              className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              🔖 Bookmarked
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              🔥 Trending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            {/* Featured Story */}
            {featuredStory && !searchQuery && (
              <Card className="overflow-hidden bg-white border-4 border-indigo-100 shadow-2xl rounded-3xl mb-8">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredStory.image || "/placeholder.svg"}
                      alt={featuredStory.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-10 space-y-6">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 font-bold px-4 py-2 rounded-full">
                        <Star className="h-4 w-4 mr-2" />
                        Super Featured! ⭐
                      </Badge>
                      <Badge
                        className={`${getSentimentColor(featuredStory.sentiment || "neutral")} border-2 font-bold rounded-full px-4 py-2`}
                      >
                        {featuredStory.sentiment || "neutral"} 😊
                      </Badge>
                      <Badge
                        className={`${getImportanceColor(featuredStory.importance || "medium")} border-2 font-bold rounded-full px-4 py-2`}
                      >
                        {featuredStory.importance || "medium"} priority 🚨
                      </Badge>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-800 leading-tight">{featuredStory.title}</h2>

                    <p className="text-slate-600 leading-relaxed text-lg">{featuredStory.summary}</p>

                    <div className="flex items-center gap-6 text-slate-500 font-medium">
                      <span className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        {formatTimeAgo(featuredStory.publishedAt)}
                      </span>
                      <span>📰 {featuredStory.source}</span>
                      <span>✍️ {featuredStory.author}</span>
                    </div>

                    {featuredStory.relatedStocks && featuredStory.relatedStocks.length > 0 && (
                      <div className="space-y-3">
                        <p className="font-bold text-slate-700 text-lg">Related Stocks: 📈</p>
                        <div className="flex gap-3 flex-wrap">
                          {featuredStory.relatedStocks.map((stock) => (
                            <Link key={stock} href={`/stocks/${stock}`}>
                              <Badge
                                variant="outline"
                                className="hover:bg-violet-50 cursor-pointer border-2 border-violet-200 text-violet-700 font-bold px-4 py-2 rounded-full transform hover:scale-105 transition-all duration-300"
                              >
                                {stock} 🚀
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Link href={`/news/${featuredStory.id}`}>
                        <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-6 py-3 rounded-full transform hover:scale-105 transition-all duration-300">
                          Read Full Story! 📖
                        </Button>
                      </Link>
                      {featuredStory.url && featuredStory.url !== "#" && (
                        <Button
                          variant="outline"
                          asChild
                          className="border-2 border-violet-200 text-violet-700 hover:bg-violet-50 bg-white font-bold px-6 py-3 rounded-full"
                        >
                          <a href={featuredStory.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Source 🔗
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleBookmark(featuredStory.id)}
                        className={`border-2 rounded-full w-12 h-12 transition-all duration-300 ${
                          bookmarkedArticles.has(featuredStory.id)
                            ? "border-rose-300 bg-rose-50 text-rose-600"
                            : "border-violet-200 text-violet-700 hover:bg-violet-50 bg-white"
                        }`}
                      >
                        <Bookmark
                          className={`h-5 w-5 ${bookmarkedArticles.has(featuredStory.id) ? "fill-current" : ""}`}
                        />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-2 border-violet-200 text-violet-700 hover:bg-violet-50 bg-white rounded-full w-12 h-12"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main News Content */}
              <div className="lg:col-span-3 space-y-8">
                {searchQuery && (
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
                      🔍 Search Results
                    </h2>
                    {filteredNews.length === 0 && !isSearching && (
                      <Card className="bg-white border-4 border-indigo-100 rounded-3xl">
                        <CardContent className="p-10 text-center">
                          <div className="text-6xl mb-4">🔍</div>
                          <h3 className="text-2xl font-bold text-slate-800 mb-3">No articles found! 😅</h3>
                          <p className="text-slate-600 text-lg">
                            Try different search words or check out our awesome news below! 👇
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {!searchQuery && (
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-6">
                      📰 Latest Cool News
                    </h2>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredNews.map((article) => (
                    <div key={article.id} className="relative">
                      <NewsCard article={article} size="compact" showBookmark />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(article.id)}
                        className={`absolute top-4 right-4 rounded-full w-8 h-8 p-0 transition-all duration-300 ${
                          bookmarkedArticles.has(article.id)
                            ? "bg-rose-100 text-rose-600 hover:bg-rose-200"
                            : "bg-white/80 text-slate-600 hover:bg-white"
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${bookmarkedArticles.has(article.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  ))}
                </div>

                {filteredNews.length === 0 && !loading && !searchQuery && (
                  <Card className="bg-white border-4 border-indigo-100 rounded-3xl">
                    <CardContent className="p-10 text-center">
                      <div className="text-6xl mb-4">📰</div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">No news right now! 😴</h3>
                      <p className="text-slate-600 text-lg">Check back later for more exciting market adventures! 🚀</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Trending News */}
                {trendingNews.length > 0 && !searchQuery && (
                  <Card className="bg-gradient-to-br from-rose-100 to-pink-100 border-4 border-rose-200 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-rose-800 text-xl">
                        <TrendingUp className="h-6 w-6 text-rose-600" />🔥 Trending Now!
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {trendingNews.map((article, index) => (
                        <div key={article.id}>
                          <Link href={`/news/${article.id}`}>
                            <div className="space-y-3 hover:bg-rose-50 p-3 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105">
                              <h4 className="font-bold text-slate-800 leading-tight line-clamp-2">{article.title}</h4>
                              <div className="flex items-center gap-3 text-xs text-slate-600">
                                <span>⏰ {formatTimeAgo(article.publishedAt)}</span>
                                <Badge
                                  className={`${getSentimentColor(article.sentiment || "neutral")} border text-xs font-bold rounded-full`}
                                >
                                  {article.sentiment || "neutral"} 😊
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
                <Card className="bg-gradient-to-br from-cyan-100 to-blue-100 border-4 border-cyan-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-cyan-800 text-xl">
                      <Filter className="h-6 w-6 text-cyan-600" />
                      🗂️ News Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {categories.slice(1).map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        className={`w-full justify-start font-bold rounded-full text-lg py-3 transition-all duration-300 transform hover:scale-105 ${
                          selectedCategory === category
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                            : "text-cyan-700 hover:bg-cyan-50 bg-white border-2 border-cyan-200"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category} 📂
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* News Statistics */}
                <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-4 border-emerald-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-emerald-800 text-xl">📊 Today's Fun Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-2xl border-2 border-emerald-200">
                      <span className="text-emerald-700 font-bold">📰 Articles Published</span>
                      <span className="font-bold text-emerald-800 text-lg">247</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-2xl border-2 border-emerald-200">
                      <span className="text-emerald-700 font-bold">🚨 Breaking News</span>
                      <span className="font-bold text-emerald-800 text-lg">12</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-2xl border-2 border-emerald-200">
                      <span className="text-emerald-700 font-bold">📈 Market Updates</span>
                      <span className="font-bold text-emerald-800 text-lg">89</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookmarked" className="mt-8">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                🔖 Your Bookmarked Articles
              </h2>

              {bookmarkedArticles.size === 0 ? (
                <Card className="bg-white border-4 border-indigo-100 rounded-3xl">
                  <CardContent className="p-10 text-center">
                    <div className="text-6xl mb-4">🔖</div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">No bookmarks yet! 📚</h3>
                    <p className="text-slate-600 text-lg">Start bookmarking articles you love to read them later! ⭐</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {news
                    .filter((article) => bookmarkedArticles.has(article.id))
                    .map((article) => (
                      <div key={article.id} className="relative">
                        <NewsCard article={article} size="compact" showBookmark />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(article.id)}
                          className="absolute top-4 right-4 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-full w-8 h-8 p-0"
                        >
                          <Bookmark className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-8">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                🔥 Trending Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {news
                  .filter((article) => article.trending)
                  .map((article) => (
                    <div key={article.id} className="relative">
                      <NewsCard article={article} size="compact" showBookmark />
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 font-bold rounded-full">
                        🔥 Trending
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(article.id)}
                        className={`absolute top-4 right-4 rounded-full w-8 h-8 p-0 transition-all duration-300 ${
                          bookmarkedArticles.has(article.id)
                            ? "bg-rose-100 text-rose-600 hover:bg-rose-200"
                            : "bg-white/80 text-slate-600 hover:bg-white"
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${bookmarkedArticles.has(article.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
