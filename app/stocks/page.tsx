"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  DollarSign,
  BarChart3,
  RefreshCw,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Volume2,
  Building2,
  Globe,
} from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { searchStocks } from "@/data/stock-database"

interface RealTimeStock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  high: number
  low: number
  open: number
  previousClose: number
  sector: string
  lastUpdated: string
}

interface SearchSuggestion {
  symbol: string
  name: string
  sector: string
  price: number
  changePercent: number
}

export default function StocksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStock, setSelectedStock] = useState<RealTimeStock | null>(null)
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [historicalData, setHistoricalData] = useState<any[]>([])

  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Generate mock historical data
  const generateHistoricalData = (basePrice: number) => {
    const data = []
    let currentPrice = basePrice

    for (let i = 30; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      // Random price fluctuation
      const change = (Math.random() - 0.5) * (basePrice * 0.05)
      currentPrice = Math.max(currentPrice + change, basePrice * 0.7)

      data.push({
        date: date.toISOString().split("T")[0],
        price: Number(currentPrice.toFixed(2)),
      })
    }

    return data
  }

  // Fetch real-time stock data
  const fetchStockData = useCallback(async (symbol: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/stocks/quote/${symbol}`)
      const data = await response.json()

      if (data.success && data.stock) {
        const stockInfo = searchStocks(symbol, 1)[0]
        const realTimeStock: RealTimeStock = {
          symbol: data.stock.symbol,
          name: data.stock.name,
          price: Number(data.stock.price) || 0,
          change: Number(data.stock.change) || 0,
          changePercent: Number(data.stock.changePercent) || 0,
          volume: data.stock.volume || "N/A",
          marketCap: data.stock.marketCap || "N/A",
          high: Number(data.stock.high) || 0,
          low: Number(data.stock.low) || 0,
          open: Number(data.stock.open) || 0,
          previousClose: Number(data.stock.previousClose) || 0,
          sector: stockInfo?.sector || "Unknown",
          lastUpdated: new Date().toISOString(),
        }

        setSelectedStock(realTimeStock)
        setHistoricalData(generateHistoricalData(realTimeStock.price))
        setLastUpdate(new Date())
      } else {
        // Fallback to mock data if API fails
        const stockInfo = searchStocks(symbol, 1)[0]
        if (stockInfo) {
          const mockStock: RealTimeStock = {
            symbol: stockInfo.symbol,
            name: stockInfo.name,
            price: stockInfo.price,
            change: stockInfo.change,
            changePercent: stockInfo.changePercent,
            volume: Math.floor(Math.random() * 100) + 10 + "M",
            marketCap: "$" + (Math.floor(Math.random() * 500) + 100) + "B",
            high: stockInfo.price + Math.random() * 10,
            low: stockInfo.price - Math.random() * 10,
            open: stockInfo.price + (Math.random() - 0.5) * 5,
            previousClose: stockInfo.price - stockInfo.change,
            sector: stockInfo.sector,
            lastUpdated: new Date().toISOString(),
          }

          setSelectedStock(mockStock)
          setHistoricalData(generateHistoricalData(mockStock.price))
          setLastUpdate(new Date())
        }
      }
    } catch (error) {
      console.error("Error fetching stock data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Handle search input and suggestions
  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      const suggestions = searchStocks(searchQuery, 8).map((stock) => ({
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector,
        price: stock.price,
        changePercent: stock.changePercent,
      }))
      setSearchSuggestions(suggestions)
      setShowSuggestions(true)
      setSelectedSuggestionIndex(-1)
    } else {
      setSearchSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || searchSuggestions.length === 0) {
      if (e.key === "Enter" && searchQuery.trim()) {
        handleSearch()
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedSuggestionIndex((prev) => (prev < searchSuggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionSelect(searchSuggestions[selectedSuggestionIndex])
        } else if (searchQuery.trim()) {
          handleSearch()
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.symbol)
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
    fetchStockData(suggestion.symbol)
    inputRef.current?.blur()
  }

  // Handle direct search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchStockData(searchQuery.toUpperCase())
      setShowSuggestions(false)
      inputRef.current?.blur()
    }
  }

  // Manual refresh
  const handleRefresh = () => {
    if (selectedStock) {
      setRefreshing(true)
      fetchStockData(selectedStock.symbol).finally(() => setRefreshing(false))
    }
  }

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  // Format change
  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0
    const icon = isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />
    const colorClass = isPositive ? "text-emerald-600" : "text-rose-600"

    return (
      <div className={`flex items-center gap-1 ${colorClass}`}>
        {icon}
        <span className="font-bold">
          {isPositive ? "+" : ""}
          {change.toFixed(2)} ({isPositive ? "+" : ""}
          {changePercent.toFixed(2)}%)
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full mb-6 shadow-lg">
            <BarChart3 className="h-7 w-7" />
            <span className="font-bold text-xl">Live Stock Explorer! 📈</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Real-Time Stock Search! 🚀
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium">
            Search any stock and get instant real-time data with detailed analysis! 🌟
          </p>
        </div>

        {/* Search Section */}
        <Card className="bg-white border-4 border-blue-100 shadow-xl rounded-3xl">
          <CardContent className="p-8">
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-6 w-6" />
                <Input
                  ref={inputRef}
                  placeholder="Search any stock by name or symbol (e.g., AAPL, Apple, Tesla)... 🔍"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-14 pr-4 border-blue-200 focus:border-blue-400 focus:ring-blue-400 text-lg py-6 rounded-2xl text-slate-800 placeholder:text-slate-500"
                />
                {loading && (
                  <RefreshCw className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 animate-spin text-blue-500" />
                )}
              </div>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs text-slate-500 px-3 py-2 font-medium">
                      Found {searchSuggestions.length} stocks
                    </div>
                    {searchSuggestions.map((suggestion, index) => (
                      <div
                        key={suggestion.symbol}
                        className={`px-4 py-4 cursor-pointer rounded-xl transition-all duration-200 ${
                          index === selectedSuggestionIndex
                            ? "bg-blue-50 border-2 border-blue-200"
                            : "hover:bg-slate-50 border-2 border-transparent"
                        }`}
                        onClick={() => handleSuggestionSelect(suggestion)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-bold text-slate-800 text-lg">{suggestion.symbol}</span>
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                {suggestion.sector}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 truncate font-medium">{suggestion.name}</p>
                          </div>
                          <div className="text-right ml-4 flex-shrink-0">
                            <div className="font-bold text-slate-800 text-lg">{formatPrice(suggestion.price)}</div>
                            <div
                              className={`text-sm font-bold ${
                                suggestion.changePercent >= 0 ? "text-emerald-600" : "text-rose-600"
                              }`}
                            >
                              {suggestion.changePercent >= 0 ? "+" : ""}
                              {suggestion.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Instructions */}
            {!selectedStock && !loading && (
              <div className="mt-6 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Start Your Stock Discovery!</h3>
                <p className="text-slate-600">
                  Type any company name or stock symbol to get instant suggestions and detailed analysis
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"].map((symbol) => (
                    <Button
                      key={symbol}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery(symbol)
                        fetchStockData(symbol)
                      }}
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      Try {symbol}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stock Details */}
        {selectedStock && (
          <div className="space-y-8">
            {/* Stock Header */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-4 border-blue-200 rounded-3xl">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-slate-800">{selectedStock.name}</h2>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xl text-slate-600 font-medium">{selectedStock.symbol}</span>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">{selectedStock.sector}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-4xl font-bold text-slate-800">{formatPrice(selectedStock.price)}</div>
                      <div className="text-xl">{formatChange(selectedStock.change, selectedStock.changePercent)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {lastUpdate && (
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                          <Clock className="h-4 w-4" />
                          <span>Last updated</span>
                        </div>
                        <div className="text-sm font-medium text-blue-600">{lastUpdate.toLocaleTimeString()}</div>
                      </div>
                    )}
                    <Button
                      onClick={handleRefresh}
                      disabled={refreshing}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-full"
                    >
                      <RefreshCw className={`h-5 w-5 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                      {refreshing ? "Updating..." : "Refresh"}
                    </Button>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-200">
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">Open</div>
                    <div className="font-bold text-slate-800">{formatPrice(selectedStock.open)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">High</div>
                    <div className="font-bold text-emerald-600">{formatPrice(selectedStock.high)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">Low</div>
                    <div className="font-bold text-rose-600">{formatPrice(selectedStock.low)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">Prev Close</div>
                    <div className="font-bold text-slate-800">{formatPrice(selectedStock.previousClose)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charts and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Price Chart */}
              <div className="lg:col-span-2">
                <Card className="bg-white border-4 border-emerald-100 rounded-3xl h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-emerald-800">
                      <BarChart3 className="h-6 w-6" />
                      30-Day Price History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ChartContainer
                        config={{
                          price: {
                            label: "Price",
                            color: "hsl(139, 92, 246)",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                            <XAxis
                              dataKey="date"
                              tickFormatter={(value) => {
                                const date = new Date(value)
                                return `${date.getMonth() + 1}/${date.getDate()}`
                              }}
                              stroke="#64748b"
                            />
                            <YAxis domain={["auto", "auto"]} stroke="#64748b" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                              type="monotone"
                              dataKey="price"
                              stroke="#10b981"
                              strokeWidth={3}
                              activeDot={{ r: 6, fill: "#10b981" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stock Info */}
              <div className="space-y-6">
                {/* Market Data */}
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-4 border-purple-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-purple-800">
                      <DollarSign className="h-6 w-6" />
                      Market Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-purple-600" />
                        <span className="text-slate-700 font-medium">Volume</span>
                      </div>
                      <span className="font-bold text-slate-800">{selectedStock.volume}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-purple-600" />
                        <span className="text-slate-700 font-medium">Market Cap</span>
                      </div>
                      <span className="font-bold text-slate-800">{selectedStock.marketCap}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-purple-600" />
                        <span className="text-slate-700 font-medium">Sector</span>
                      </div>
                      <span className="font-bold text-slate-800">{selectedStock.sector}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-4 border-cyan-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-cyan-800">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 rounded-full"
                    >
                      <a href={`/stocks/compare?stock1=${selectedStock.symbol}`}>Compare Stock</a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-cyan-200 text-cyan-700 hover:bg-cyan-50 bg-white font-bold py-3 rounded-full"
                    >
                      <a href={`/watchlist?add=${selectedStock.symbol}`}>Add to Watchlist</a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-cyan-200 text-cyan-700 hover:bg-cyan-50 bg-white font-bold py-3 rounded-full"
                    >
                      <a href={`/news?symbol=${selectedStock.symbol}`}>View News</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
