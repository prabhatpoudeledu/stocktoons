"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StockCard from "@/components/stock-card"
import { Search, TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, PieChart, Target } from "lucide-react"
import Link from "next/link"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: string
  sector: string
}

export default function StocksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("trending")
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - replace with real API calls
  const mockStocks: Stock[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 2.15,
      changePercent: 1.24,
      volume: 45678900,
      marketCap: "2.8T",
      sector: "Technology",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 142.56,
      change: -1.23,
      changePercent: -0.85,
      volume: 23456789,
      marketCap: "1.8T",
      sector: "Technology",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 378.85,
      change: 4.67,
      changePercent: 1.25,
      volume: 34567890,
      marketCap: "2.9T",
      sector: "Technology",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 248.42,
      change: -5.23,
      changePercent: -2.06,
      volume: 56789012,
      marketCap: "789B",
      sector: "Automotive",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 145.86,
      change: 1.89,
      changePercent: 1.31,
      volume: 28901234,
      marketCap: "1.5T",
      sector: "E-commerce",
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 875.28,
      change: 12.45,
      changePercent: 1.44,
      volume: 67890123,
      marketCap: "2.2T",
      sector: "Technology",
    },
  ]

  const marketIndices = [
    { name: "S&P 500", value: "4,567.89", change: "+1.24%", positive: true },
    { name: "Dow Jones", value: "35,432.10", change: "+0.87%", positive: true },
    { name: "NASDAQ", value: "14,789.23", change: "+1.56%", positive: true },
    { name: "Russell 2000", value: "2,123.45", change: "-0.34%", positive: false },
  ]

  const topSectors = [
    { name: "Technology", change: "+2.34%", positive: true, stocks: 145 },
    { name: "Healthcare", change: "+1.87%", positive: true, stocks: 89 },
    { name: "Finance", change: "+0.92%", positive: true, stocks: 67 },
    { name: "Energy", change: "-1.23%", positive: false, stocks: 34 },
    { name: "Consumer", change: "+0.45%", positive: true, stocks: 78 },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStocks(mockStocks)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const trendingStocks = stocks.filter((stock) => stock.changePercent > 0).slice(0, 6)
  const decliningStocks = stocks.filter((stock) => stock.changePercent < 0).slice(0, 6)
  const mostActiveStocks = [...stocks].sort((a, b) => b.volume - a.volume).slice(0, 6)

  const getTabStocks = () => {
    switch (selectedTab) {
      case "trending":
        return trendingStocks
      case "declining":
        return decliningStocks
      case "active":
        return mostActiveStocks
      default:
        return filteredStocks
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gradient-to-r from-purple-200 to-pink-200 rounded w-1/4 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gradient-to-r from-purple-100 to-pink-100 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <BarChart3 className="h-6 w-6" />
            <span className="font-bold text-lg">Stock Market Center</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Live Stock Market Data
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Track real-time stock prices, market trends, and investment opportunities across global markets
          </p>
        </div>

        {/* Market Indices */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {marketIndices.map((index, i) => (
            <Card key={i} className="bg-white border-2 border-purple-100 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-800 mb-2">{index.name}</h3>
                <div className="text-2xl font-bold text-gray-800 mb-1">{index.value}</div>
                <div className={`text-sm font-semibold ${index.positive ? "text-green-600" : "text-red-600"}`}>
                  {index.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Quick Actions */}
        <Card className="bg-white border-2 border-purple-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 h-4 w-4" />
                <Input
                  placeholder="Search stocks by symbol or company name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Link href="/stocks/compare">
                    <PieChart className="h-4 w-4 mr-2" />
                    Compare Stocks
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                >
                  <Link href="/stocks/categories">
                    <Target className="h-4 w-4 mr-2" />
                    Browse Sectors
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Stock Lists */}
          <div className="lg:col-span-3">
            <Card className="bg-white border-2 border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Stock Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-4 bg-purple-50">
                    <TabsTrigger
                      value="trending"
                      className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Trending
                    </TabsTrigger>
                    <TabsTrigger
                      value="declining"
                      className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                    >
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Declining
                    </TabsTrigger>
                    <TabsTrigger
                      value="active"
                      className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      Most Active
                    </TabsTrigger>
                    <TabsTrigger
                      value="search"
                      className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search Results
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="trending" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {trendingStocks.map((stock) => (
                        <StockCard
                          key={stock.symbol}
                          symbol={stock.symbol}
                          name={stock.name}
                          price={stock.price}
                          change={stock.changePercent}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="declining" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {decliningStocks.map((stock) => (
                        <StockCard
                          key={stock.symbol}
                          symbol={stock.symbol}
                          name={stock.name}
                          price={stock.price}
                          change={stock.changePercent}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="active" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mostActiveStocks.map((stock) => (
                        <StockCard
                          key={stock.symbol}
                          symbol={stock.symbol}
                          name={stock.name}
                          price={stock.price}
                          change={stock.changePercent}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="search" className="mt-6">
                    {searchQuery ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredStocks.map((stock) => (
                          <StockCard
                            key={stock.symbol}
                            symbol={stock.symbol}
                            name={stock.name}
                            price={stock.price}
                            change={stock.changePercent}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Search className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Start searching</h3>
                        <p className="text-gray-600">Enter a stock symbol or company name to find stocks</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Sectors */}
            <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <PieChart className="h-5 w-5 text-blue-600" />
                  Top Sectors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topSectors.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-800">{sector.name}</div>
                      <div className="text-sm text-gray-600">{sector.stocks} stocks</div>
                    </div>
                    <div className={`font-bold ${sector.positive ? "text-green-600" : "text-red-600"}`}>
                      {sector.change}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market Stats */}
            <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Market Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Total Stocks</span>
                  <span className="font-bold text-green-800">8,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Advancing</span>
                  <span className="font-bold text-green-800">4,892</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Declining</span>
                  <span className="font-bold text-red-600">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Unchanged</span>
                  <span className="font-bold text-gray-600">508</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Link href="/watchlist">
                    <Target className="h-4 w-4 mr-2" />
                    My Watchlist
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                >
                  <Link href="/analysis">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Market Analysis
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                >
                  <Link href="/news">
                    <Activity className="h-4 w-4 mr-2" />
                    Market News
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Market Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700 mb-1">$47.2T</div>
              <div className="text-purple-600 font-semibold">Total Market Cap</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-100 to-pink-200 border-2 border-pink-200">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-700 mb-1">2.8B</div>
              <div className="text-pink-600 font-semibold">Daily Volume</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700 mb-1">+1.24%</div>
              <div className="text-blue-600 font-semibold">Market Change</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700 mb-1">847</div>
              <div className="text-green-600 font-semibold">New Highs</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
