"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Star,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Clock,
  X,
  Zap,
  Target,
  BarChart3,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { searchStocks, type StockData } from "@/data/stock-database"

const sectors = ["All", "Technology", "Healthcare", "Financial", "Consumer Discretionary", "Energy", "Industrials"]
const priceRanges = [
  { value: "all", label: "All Prices 💰" },
  { value: "under50", label: "Under $50 🪙" },
  { value: "50to200", label: "$50 - $200 💵" },
  { value: "200to500", label: "$200 - $500 💸" },
  { value: "over500", label: "Over $500 🏆" },
]

const sortOptions = [
  { value: "relevance", label: "Most Relevant 🎯" },
  { value: "alphabetical", label: "A to Z 📝" },
  { value: "price-low", label: "Price: Low to High 📈" },
  { value: "price-high", label: "Price: High to Low 📉" },
  { value: "change-positive", label: "Biggest Gainers 🚀" },
  { value: "change-negative", label: "Biggest Losers 📉" },
]

export default function SearchPage() {
  const router = useRouter()
  const { user, isInWatchlist, addToWatchlist } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<StockData[]>([])
  const [filteredResults, setFilteredResults] = useState<StockData[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [error, setError] = useState("")
  const [addingSymbol, setAddingSymbol] = useState<string | null>(null)
  const [selectedSector, setSelectedSector] = useState("All")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const popularSearches = [
    "AAPL 🍎",
    "TSLA ⚡",
    "NVDA 🎮",
    "MSFT 💻",
    "AMZN 📦",
    "GOOG 🔍",
    "META 📱",
    "NFLX 🎬",
    "AMD 🔥",
    "PYPL 💳",
  ]

  const trendingStocks = [
    { symbol: "NVDA", reason: "AI boom continues! 🤖" },
    { symbol: "TSLA", reason: "Electric future! ⚡" },
    { symbol: "AAPL", reason: "iPhone magic! 📱" },
    { symbol: "MSFT", reason: "Cloud power! ☁️" },
  ]

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem("recentStockSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Enhanced search with filters
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchStocks(searchQuery, 20)
      setSearchResults(results)

      // Generate suggestions
      const suggestions = results
        .slice(0, 5)
        .map((stock) => stock.symbol)
        .filter((symbol) => symbol.toLowerCase().includes(searchQuery.toLowerCase()))

      setSearchSuggestions(suggestions)
      setShowDropdown(true)
      setSelectedIndex(-1)
    } else {
      setSearchResults([])
      setShowDropdown(false)
      setSearchSuggestions([])
    }
  }, [searchQuery])

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...searchResults]

    // Sector filter
    if (selectedSector !== "All") {
      filtered = filtered.filter((stock) => stock.sector === selectedSector)
    }

    // Price range filter
    if (priceRange !== "all") {
      filtered = filtered.filter((stock) => {
        switch (priceRange) {
          case "under50":
            return stock.price < 50
          case "50to200":
            return stock.price >= 50 && stock.price <= 200
          case "200to500":
            return stock.price > 200 && stock.price <= 500
          case "over500":
            return stock.price > 500
          default:
            return true
        }
      })
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "alphabetical":
          return a.symbol.localeCompare(b.symbol)
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "change-positive":
          return b.changePercent - a.changePercent
        case "change-negative":
          return a.changePercent - b.changePercent
        default: // relevance
          const aMatch = (a.symbol + a.name).toLowerCase().includes(searchQuery.toLowerCase())
          const bMatch = (b.symbol + b.name).toLowerCase().includes(searchQuery.toLowerCase())
          if (aMatch && !bMatch) return -1
          if (!aMatch && bMatch) return 1
          return a.symbol.localeCompare(b.symbol)
      }
    })

    setFilteredResults(filtered)
  }, [searchResults, selectedSector, priceRange, sortBy, searchQuery])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || searchSuggestions.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < searchSuggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < searchSuggestions.length) {
          handleSearch(searchSuggestions[selectedIndex])
        } else if (searchQuery.trim()) {
          handleSearch(searchQuery)
        }
        break
      case "Escape":
        setShowDropdown(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleSearch = (query: string) => {
    const cleanQuery = query.replace(/[^\w\s]/gi, "").trim()
    if (cleanQuery) {
      setSearchQuery(cleanQuery)
      setShowDropdown(false)

      // Add to recent searches
      const updated = [cleanQuery, ...recentSearches.filter((s) => s !== cleanQuery)].slice(0, 8)
      setRecentSearches(updated)
      localStorage.setItem("recentStockSearches", JSON.stringify(updated))
    }
  }

  const handleStockSelect = (stock: StockData) => {
    setSearchQuery(stock.symbol)
    setShowDropdown(false)
    router.push(`/stocks/${stock.symbol}`)
  }

  const handlePopularSearch = (symbol: string) => {
    const cleanSymbol = symbol.replace(/[^\w]/gi, "").trim()
    handleSearch(cleanSymbol)
  }

  const handleAddToWatchlist = async (symbol: string) => {
    if (!user) {
      router.push(`/login?redirect=/search`)
      return
    }

    setAddingSymbol(symbol)
    setError("")

    try {
      const result = await addToWatchlist(symbol)
      if (result.success) {
        toast({
          title: "Added to watchlist! ⭐",
          description: `${symbol} has been added to your watchlist`,
        })
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Failed to add to watchlist. Please try again.")
    } finally {
      setAddingSymbol(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0
    const icon = isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />
    const colorClass = isPositive ? "text-emerald-600" : "text-rose-600"

    return (
      <span className={`flex items-center text-xs ${colorClass} font-bold`}>
        {icon}
        {Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <div className="container py-8">
        <Toaster />

        {error && (
          <Alert variant="destructive" className="mb-4 border-rose-200 bg-rose-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-8 py-4 rounded-full mb-6 shadow-lg">
            <Search className="h-7 w-7" />
            <span className="font-bold text-xl">Stock Search Adventure! 🔍</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Find Amazing Stocks! 🌟
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Discover incredible companies and build your dream investment portfolio! 🚀
          </p>
        </div>

        {/* Enhanced Search Section */}
        <Card className="bg-white border-4 border-indigo-100 shadow-xl rounded-3xl mb-8">
          <CardContent className="p-8">
            <div className="relative mb-6" ref={searchRef}>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-violet-500" />
                  <Input
                    ref={inputRef}
                    placeholder="Search for awesome stocks! (e.g., AAPL, Apple, Tesla) 🔍"
                    className="pl-12 pr-12 bg-violet-50 border-2 border-violet-200 focus:border-violet-400 text-lg py-4 rounded-2xl font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                      if (searchSuggestions.length > 0) {
                        setShowDropdown(true)
                      }
                    }}
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("")
                        setShowDropdown(false)
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-violet-500 hover:bg-violet-100 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Button
                  onClick={() => handleSearch(searchQuery)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Search! 🚀
                </Button>
              </div>

              {/* Search Suggestions Dropdown */}
              {showDropdown && (searchSuggestions.length > 0 || recentSearches.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-violet-200 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                  {searchSuggestions.length > 0 && (
                    <div className="p-4">
                      <h4 className="font-bold text-violet-700 mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Quick Suggestions ⚡
                      </h4>
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(suggestion)}
                          className={`w-full text-left p-3 rounded-xl text-slate-700 transition-all duration-300 font-medium ${
                            index === selectedIndex ? "bg-violet-100 text-violet-800" : "hover:bg-violet-50"
                          }`}
                        >
                          🔍 {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  {recentSearches.length > 0 && (
                    <div className="p-4 border-t-2 border-violet-100">
                      <h4 className="font-bold text-violet-700 mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Recent Searches 🕐
                      </h4>
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full text-left p-3 hover:bg-violet-50 rounded-xl text-slate-700 transition-all duration-300 flex items-center justify-between font-medium"
                        >
                          <span>⏰ {search}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              const updated = recentSearches.filter((_, i) => i !== index)
                              setRecentSearches(updated)
                              localStorage.setItem("recentStockSearches", JSON.stringify(updated))
                            }}
                            className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600 rounded-full"
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
                <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-emerald-500" />
                  Popular Stock Searches 🌟
                </h4>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      onClick={() => handlePopularSearch(search)}
                      className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-full font-bold transform hover:scale-105 transition-all duration-300"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Advanced Filters Toggle */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="border-2 border-violet-200 text-violet-700 hover:bg-violet-50 rounded-full font-bold"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showAdvancedFilters ? "Hide" : "Show"} Advanced Filters 🎛️
              </Button>

              {searchQuery && (
                <div className="text-slate-600 font-medium">Found {filteredResults.length} awesome stocks! 🎉</div>
              )}
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-6 p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border-2 border-violet-200">
                <h4 className="font-bold text-violet-800 mb-4 text-lg">🎛️ Advanced Search Filters</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">🏢 Sector</label>
                    <Select value={selectedSector} onValueChange={setSelectedSector}>
                      <SelectTrigger className="border-2 border-violet-200 focus:border-violet-400 rounded-xl bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}{" "}
                            {sector === "Technology"
                              ? "💻"
                              : sector === "Healthcare"
                                ? "🏥"
                                : sector === "Financial"
                                  ? "🏦"
                                  : "🏢"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">💰 Price Range</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger className="border-2 border-violet-200 focus:border-violet-400 rounded-xl bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">📊 Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="border-2 border-violet-200 focus:border-violet-400 rounded-xl bg-white">
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
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Tabs */}
        <Tabs defaultValue="results" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border-4 border-indigo-200 rounded-2xl p-2 mb-8">
            <TabsTrigger
              value="results"
              className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              🔍 Search Results
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              🔥 Trending
            </TabsTrigger>
            <TabsTrigger
              value="tips"
              className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              💡 Search Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="results">
            {/* Search Results */}
            {searchQuery ? (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  🔍 Search Results for "{searchQuery}"
                </h2>

                {filteredResults.length === 0 ? (
                  <Card className="bg-white border-4 border-indigo-100 rounded-3xl">
                    <CardContent className="p-10 text-center">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">No stocks found! 😅</h3>
                      <p className="text-slate-600 text-lg mb-6">
                        Try different search terms or adjust your filters! 🎛️
                      </p>
                      <Button
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedSector("All")
                          setPriceRange("all")
                          setSortBy("relevance")
                        }}
                        className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold px-6 py-3 rounded-full"
                      >
                        Clear All Filters ✨
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResults.map((stock) => {
                      const inWatchlist = isInWatchlist(stock.symbol)

                      return (
                        <Card
                          key={stock.symbol}
                          className="bg-white border-4 border-indigo-100 hover:border-emerald-300 transition-all duration-300 transform hover:scale-105 rounded-3xl shadow-lg hover:shadow-2xl"
                        >
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-bold text-xl text-slate-800">{stock.symbol}</h3>
                                  <Badge
                                    variant="outline"
                                    className="bg-violet-50 text-violet-700 border-violet-300 font-bold rounded-full"
                                  >
                                    {stock.sector === "Technology"
                                      ? "💻"
                                      : stock.sector === "Healthcare"
                                        ? "🏥"
                                        : stock.sector === "Financial"
                                          ? "🏦"
                                          : "🏢"}{" "}
                                    {stock.sector}
                                  </Badge>
                                </div>
                                <p className="text-slate-600 font-medium mb-3 line-clamp-2">{stock.name}</p>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-slate-800">
                                      {formatPrice(stock.price)}
                                    </span>
                                    {formatChange(stock.change, stock.changePercent)}
                                  </div>
                                </div>
                              </div>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-full"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  if (!inWatchlist) {
                                    handleAddToWatchlist(stock.symbol)
                                  }
                                }}
                                disabled={addingSymbol === stock.symbol || inWatchlist}
                              >
                                {addingSymbol === stock.symbol ? (
                                  <Loader2 className="h-5 w-5 animate-spin text-violet-500" />
                                ) : (
                                  <Star
                                    className={`h-5 w-5 transition-colors ${
                                      inWatchlist
                                        ? "fill-emerald-400 text-emerald-400"
                                        : "text-slate-400 hover:text-emerald-400"
                                    }`}
                                  />
                                )}
                              </Button>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleStockSelect(stock)}
                                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-full"
                              >
                                View Details 📊
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Card className="bg-white border-4 border-indigo-100 rounded-3xl">
                <CardContent className="p-10 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">Start Your Stock Adventure! 🚀</h3>
                  <p className="text-slate-600 text-lg">
                    Search for any stock symbol or company name to discover amazing investment opportunities! ✨
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="trending">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                🔥 Trending Stocks Right Now!
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingStocks.map((trending, index) => {
                  const stock = searchStocks(trending.symbol, 1)[0]
                  if (!stock) return null

                  const inWatchlist = isInWatchlist(stock.symbol)

                  return (
                    <Card
                      key={stock.symbol}
                      className="bg-gradient-to-br from-rose-50 to-pink-50 border-4 border-rose-200 hover:border-rose-300 transition-all duration-300 transform hover:scale-105 rounded-3xl shadow-lg"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 font-bold rounded-full px-3 py-1">
                            🔥 #{index + 1} Trending
                          </Badge>
                        </div>

                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-xl text-slate-800 mb-1">{stock.symbol}</h3>
                            <p className="text-slate-600 font-medium mb-2">{stock.name}</p>
                            <p className="text-rose-700 font-bold text-sm mb-3">{trending.reason}</p>

                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-slate-800">{formatPrice(stock.price)}</span>
                              {formatChange(stock.change, stock.changePercent)}
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full"
                            onClick={() => {
                              if (!inWatchlist) {
                                handleAddToWatchlist(stock.symbol)
                              }
                            }}
                            disabled={addingSymbol === stock.symbol || inWatchlist}
                          >
                            {addingSymbol === stock.symbol ? (
                              <Loader2 className="h-5 w-5 animate-spin text-rose-500" />
                            ) : (
                              <Star
                                className={`h-5 w-5 transition-colors ${
                                  inWatchlist ? "fill-rose-400 text-rose-400" : "text-slate-400 hover:text-rose-400"
                                }`}
                              />
                            )}
                          </Button>
                        </div>

                        <Button
                          onClick={() => handleStockSelect(stock)}
                          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-full"
                        >
                          Explore This Trend! 🚀
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tips">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                💡 Pro Search Tips & Tricks!
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-4 border-emerald-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-emerald-800 flex items-center gap-2">
                      <Target className="h-6 w-6" />🎯 Search Like a Pro!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold">📝</span>
                      <p className="text-emerald-800">
                        <strong>Symbol Search:</strong> Type "AAPL" to find Apple quickly!
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold">🏢</span>
                      <p className="text-emerald-800">
                        <strong>Company Name:</strong> Search "Tesla" or "Microsoft" by name!
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold">⚡</span>
                      <p className="text-emerald-800">
                        <strong>Quick Tips:</strong> Use arrow keys to navigate suggestions!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-violet-100 to-purple-100 border-4 border-violet-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-violet-800 flex items-center gap-2">
                      <Filter className="h-6 w-6" />
                      🎛️ Filter Magic!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-violet-600 font-bold">🏢</span>
                      <p className="text-violet-800">
                        <strong>By Sector:</strong> Find all tech stocks or healthcare companies!
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-violet-600 font-bold">💰</span>
                      <p className="text-violet-800">
                        <strong>Price Range:</strong> Filter by your budget - from $1 to $1000+!
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-violet-600 font-bold">📊</span>
                      <p className="text-violet-800">
                        <strong>Smart Sorting:</strong> Find biggest gainers or best deals!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-rose-100 to-pink-100 border-4 border-rose-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-rose-800 flex items-center gap-2">
                      <Star className="h-6 w-6" />⭐ Watchlist Power!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-rose-600 font-bold">⭐</span>
                      <p className="text-rose-800">
                        <strong>Save Favorites:</strong> Click the star to add stocks to your watchlist!
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-rose-600 font-bold">📱</span>
                      <p className="text-rose-800">
                        <strong>Track Progress:</strong> Monitor your favorite stocks easily!
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-rose-600 font-bold">🚀</span>
                      <p className="text-rose-800">
                        <strong>Quick Access:</strong> View all saved stocks in one place!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-cyan-100 to-blue-100 border-4 border-cyan-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-cyan-800 flex items-center gap-2">
                      <BarChart3 className="h-6 w-6" />📊 Analysis Tools!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-600 font-bold">📈</span>
                      <p className="text-cyan-800">
                        <strong>Price Trends:</strong> See if stocks are going up or down!
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-600 font-bold">🔍</span>
                      <p className="text-cyan-800">
                        <strong>Deep Dive:</strong> Click "View Details" for complete analysis!
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-600 font-bold">⚖️</span>
                      <p className="text-cyan-800">
                        <strong>Compare:</strong> Use our comparison tool to pick the best!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Fun Search Challenges */}
              <Card className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 border-4 border-indigo-200 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-indigo-800 text-center text-2xl">🎮 Fun Search Challenges!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-2xl border-2 border-indigo-200">
                      <div className="text-3xl mb-2">🍎</div>
                      <h4 className="font-bold text-indigo-800 mb-2">Fruit Company Challenge</h4>
                      <p className="text-indigo-700 text-sm">
                        Can you find the famous fruit company that makes iPhones?
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handleSearch("Apple")}
                        className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
                      >
                        Try It! 🔍
                      </Button>
                    </div>

                    <div className="text-center p-4 bg-white rounded-2xl border-2 border-indigo-200">
                      <div className="text-3xl mb-2">⚡</div>
                      <h4 className="font-bold text-indigo-800 mb-2">Electric Car Quest</h4>
                      <p className="text-indigo-700 text-sm">Find the company making the coolest electric cars!</p>
                      <Button
                        size="sm"
                        onClick={() => handleSearch("Tesla")}
                        className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
                      >
                        Search! ⚡
                      </Button>
                    </div>

                    <div className="text-center p-4 bg-white rounded-2xl border-2 border-indigo-200">
                      <div className="text-3xl mb-2">🎮</div>
                      <h4 className="font-bold text-indigo-800 mb-2">Gaming Giant Hunt</h4>
                      <p className="text-indigo-700 text-sm">Discover the company behind Xbox and Windows!</p>
                      <Button
                        size="sm"
                        onClick={() => handleSearch("Microsoft")}
                        className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
                      >
                        Explore! 🎮
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
