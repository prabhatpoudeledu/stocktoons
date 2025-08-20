"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StockCard from "@/components/stock-card"
import {
  Search,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  BarChart3,
  PieChart,
  Target,
  Sparkles,
} from "lucide-react"
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
    { name: "S&P 500", value: "4,567.89", change: "+1.24%", positive: true, emoji: "🚀" },
    { name: "Dow Jones", value: "35,432.10", change: "+0.87%", positive: true, emoji: "📈" },
    { name: "NASDAQ", value: "14,789.23", change: "+1.56%", positive: true, emoji: "💻" },
    { name: "Russell 2000", value: "2,123.45", change: "-0.34%", positive: false, emoji: "📊" },
  ]

  const topSectors = [
    {
      name: "Technology",
      change: "+2.34%",
      positive: true,
      stocks: 145,
      emoji: "💻",
      color: "from-violet-400 to-purple-500",
    },
    {
      name: "Healthcare",
      change: "+1.87%",
      positive: true,
      stocks: 89,
      emoji: "🏥",
      color: "from-emerald-400 to-teal-500",
    },
    { name: "Finance", change: "+0.92%", positive: true, stocks: 67, emoji: "🏦", color: "from-cyan-400 to-blue-500" },
    { name: "Energy", change: "-1.23%", positive: false, stocks: 34, emoji: "⚡", color: "from-rose-400 to-pink-500" },
    { name: "Consumer", change: "+0.45%", positive: true, stocks: 78, emoji: "🛍️", color: "from-orange-400 to-red-500" },
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
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gradient-to-r from-emerald-200 to-teal-200 rounded w-1/4 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gradient-to-r from-violet-100 to-purple-100 rounded-3xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-8 py-4 rounded-full mb-6 shadow-lg">
            <BarChart3 className="h-7 w-7" />
            <span className="font-bold text-xl">Stock Adventure Hub! 📈</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Explore Amazing Stocks! 🚀
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Discover real-time stock prices, cool market trends, and awesome investment opportunities! 🌟
          </p>
        </div>

        {/* Market Indices */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {marketIndices.map((index, i) => (
            <Card
              key={i}
              className="bg-white border-4 border-indigo-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 rounded-3xl"
            >
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-3">{index.emoji}</div>
                <h3 className="font-bold text-slate-800 mb-3 text-lg">{index.name}</h3>
                <div className="text-3xl font-bold text-slate-800 mb-2">{index.value}</div>
                <div className={`text-lg font-bold ${index.positive ? "text-emerald-600" : "text-rose-600"}`}>
                  {index.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Quick Actions */}
        <Card className="bg-white border-4 border-indigo-100 shadow-xl rounded-3xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-500 h-5 w-5" />
                <Input
                  placeholder="Search for awesome stocks by name or symbol... 🔍"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 border-violet-200 focus:border-violet-400 focus:ring-violet-400 text-lg py-4 rounded-2xl"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  asChild
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-6 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/stocks/compare">
                    <PieChart className="h-5 w-5 mr-2" />
                    Compare Stocks! 📊
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-violet-200 text-violet-700 hover:bg-violet-50 bg-transparent font-bold px-6 py-4 rounded-full"
                >
                  <Link href="/stocks/categories">
                    <Target className="h-5 w-5 mr-2" />
                    Explore Sectors! 🌍
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Stock Lists */}
          <div className="lg:col-span-3">
            <Card className="bg-white border-4 border-indigo-100 shadow-xl rounded-3xl">
              <CardHeader>
                <CardTitle className="text-slate-800 text-2xl font-bold flex items-center gap-3">
                  <Sparkles className="h-7 w-7 text-violet-600" />
                  Stock Market Explorer! 🚀
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-4 bg-violet-50 rounded-2xl p-2">
                    <TabsTrigger
                      value="trending"
                      className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white font-bold rounded-xl"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />🚀 Trending
                    </TabsTrigger>
                    <TabsTrigger
                      value="declining"
                      className="data-[state=active]:bg-rose-500 data-[state=active]:text-white font-bold rounded-xl"
                    >
                      <TrendingDown className="h-4 w-4 mr-2" />📉 Declining
                    </TabsTrigger>
                    <TabsTrigger
                      value="active"
                      className="data-[state=active]:bg-violet-500 data-[state=active]:text-white font-bold rounded-xl"
                    >
                      <Activity className="h-4 w-4 mr-2" />⚡ Most Active
                    </TabsTrigger>
                    <TabsTrigger
                      value="search"
                      className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white font-bold rounded-xl"
                    >
                      <Search className="h-4 w-4 mr-2" />🔍 Search
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="trending" className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <TabsContent value="declining" className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <TabsContent value="active" className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <TabsContent value="search" className="mt-8">
                    {searchQuery ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Start Your Stock Hunt! 🕵️‍♀️</h3>
                        <p className="text-slate-600 text-lg">
                          Type a stock name or symbol to discover amazing companies! 🌟
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Sectors */}
            <Card className="bg-gradient-to-br from-cyan-100 to-blue-100 border-4 border-cyan-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-800 text-xl">
                  <PieChart className="h-6 w-6 text-cyan-600" />🌍 Cool Sectors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topSectors.map((sector, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-cyan-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{sector.emoji}</div>
                      <div>
                        <div className="font-bold text-slate-800">{sector.name}</div>
                        <div className="text-sm text-slate-600">{sector.stocks} stocks 📈</div>
                      </div>
                    </div>
                    <div className={`font-bold text-lg ${sector.positive ? "text-emerald-600" : "text-rose-600"}`}>
                      {sector.change}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market Stats */}
            <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-4 border-emerald-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-emerald-800 text-xl">📊 Market Magic Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-2xl">
                  <span className="text-emerald-700 font-bold">📈 Total Stocks</span>
                  <span className="font-bold text-emerald-800 text-lg">8,247</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-2xl">
                  <span className="text-emerald-700 font-bold">🚀 Going Up</span>
                  <span className="font-bold text-emerald-800 text-lg">4,892</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-2xl">
                  <span className="text-emerald-700 font-bold">📉 Going Down</span>
                  <span className="font-bold text-rose-600 text-lg">2,847</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-2xl">
                  <span className="text-emerald-700 font-bold">😴 Staying Same</span>
                  <span className="font-bold text-slate-600 text-lg">508</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-violet-100 to-purple-100 border-4 border-violet-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-violet-800 text-xl">⚡ Quick Adventures</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  asChild
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-full"
                >
                  <Link href="/watchlist">
                    <Target className="h-5 w-5 mr-2" />
                    My Watchlist! 👀
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-violet-200 text-violet-700 hover:bg-violet-50 bg-transparent font-bold py-4 rounded-full"
                >
                  <Link href="/analysis">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Market Analysis! 🔍
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-violet-200 text-violet-700 hover:bg-violet-50 bg-transparent font-bold py-4 rounded-full"
                >
                  <Link href="/news">
                    <Activity className="h-5 w-5 mr-2" />
                    Market News! 📰
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Market Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-emerald-400 to-teal-500 border-4 border-emerald-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <DollarSign className="h-10 w-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">$47.2T</div>
              <div className="font-bold text-lg">Total Market Magic! 💰</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-violet-400 to-purple-500 border-4 border-violet-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <Activity className="h-10 w-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">2.8B</div>
              <div className="font-bold text-lg">Daily Trading Fun! 📊</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-rose-400 to-pink-500 border-4 border-rose-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <TrendingUp className="h-10 w-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">+1.24%</div>
              <div className="font-bold text-lg">Market Growth! 🚀</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-400 to-blue-500 border-4 border-cyan-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <BarChart3 className="h-10 w-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">847</div>
              <div className="font-bold text-lg">New High Scores! 🏆</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
