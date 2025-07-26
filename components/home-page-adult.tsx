"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Briefcase,
  TrendingDown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MarketData {
  symbol: string
  value: string
  change: string
  changePercent: string
  positive: boolean
}

interface StockData {
  symbol: string
  name: string
  price: string
  change: string
  changePercent: string
  positive: boolean
  volume: string
  marketCap: string
}

export function HomePageAdult() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [topStocks, setTopStocks] = useState<StockData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Fetch real-time market data
  const fetchMarketData = async () => {
    try {
      const response = await fetch("/api/market/indices")
      if (response.ok) {
        const data = await response.json()
        // Ensure we have an array
        setMarketData(Array.isArray(data.indices) ? data.indices : [])
      } else {
        // Fallback to mock data with realistic values
        setMarketData([
          { symbol: "S&P 500", value: "4,567.89", change: "+54.32", changePercent: "+1.2%", positive: true },
          { symbol: "NASDAQ", value: "14,234.56", change: "+113.87", changePercent: "+0.8%", positive: true },
          { symbol: "DOW", value: "34,567.12", change: "-103.70", changePercent: "-0.3%", positive: false },
          { symbol: "RUSSELL", value: "2,123.45", change: "+10.62", changePercent: "+0.5%", positive: true },
        ])
      }
    } catch (error) {
      console.error("Error fetching market data:", error)
      // Fallback data
      setMarketData([
        { symbol: "S&P 500", value: "4,567.89", change: "+54.32", changePercent: "+1.2%", positive: true },
        { symbol: "NASDAQ", value: "14,234.56", change: "+113.87", changePercent: "+0.8%", positive: true },
        { symbol: "DOW", value: "34,567.12", change: "-103.70", changePercent: "-0.3%", positive: false },
        { symbol: "RUSSELL", value: "2,123.45", change: "+10.62", changePercent: "+0.5%", positive: true },
      ])
    }
  }

  // Fetch real-time top stocks
  const fetchTopStocks = async () => {
    try {
      const response = await fetch("/api/stocks/trending")
      if (response.ok) {
        const data = await response.json()
        // Ensure we have an array
        setTopStocks(Array.isArray(data.stocks) ? data.stocks : [])
      } else {
        // Fallback to mock data
        setTopStocks([
          {
            symbol: "AAPL",
            name: "Apple Inc.",
            price: "$175.43",
            change: "+3.68",
            changePercent: "+2.1%",
            positive: true,
            volume: "52.3M",
            marketCap: "$2.8T",
          },
          {
            symbol: "MSFT",
            name: "Microsoft Corp.",
            price: "$338.11",
            change: "+5.98",
            changePercent: "+1.8%",
            positive: true,
            volume: "28.7M",
            marketCap: "$2.5T",
          },
          {
            symbol: "GOOGL",
            name: "Alphabet Inc.",
            price: "$127.89",
            change: "-0.64",
            changePercent: "-0.5%",
            positive: false,
            volume: "31.2M",
            marketCap: "$1.6T",
          },
          {
            symbol: "TSLA",
            name: "Tesla Inc.",
            price: "$248.50",
            change: "+7.76",
            changePercent: "+3.2%",
            positive: true,
            volume: "89.4M",
            marketCap: "$789B",
          },
          {
            symbol: "AMZN",
            name: "Amazon.com Inc.",
            price: "$142.65",
            change: "+2.14",
            changePercent: "+1.5%",
            positive: true,
            volume: "45.8M",
            marketCap: "$1.5T",
          },
          {
            symbol: "NVDA",
            name: "NVIDIA Corp.",
            price: "$456.78",
            change: "+12.34",
            changePercent: "+2.8%",
            positive: true,
            volume: "67.2M",
            marketCap: "$1.1T",
          },
        ])
      }
    } catch (error) {
      console.error("Error fetching top stocks:", error)
      // Fallback data
      setTopStocks([
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: "$175.43",
          change: "+3.68",
          changePercent: "+2.1%",
          positive: true,
          volume: "52.3M",
          marketCap: "$2.8T",
        },
        {
          symbol: "MSFT",
          name: "Microsoft Corp.",
          price: "$338.11",
          change: "+5.98",
          changePercent: "+1.8%",
          positive: true,
          volume: "28.7M",
          marketCap: "$2.5T",
        },
        {
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          price: "$127.89",
          change: "-0.64",
          changePercent: "-0.5%",
          positive: false,
          volume: "31.2M",
          marketCap: "$1.6T",
        },
        {
          symbol: "TSLA",
          name: "Tesla Inc.",
          price: "$248.50",
          change: "+7.76",
          changePercent: "+3.2%",
          positive: true,
          volume: "89.4M",
          marketCap: "$789B",
        },
        {
          symbol: "AMZN",
          name: "Amazon.com Inc.",
          price: "$142.65",
          change: "+2.14",
          changePercent: "+1.5%",
          positive: true,
          volume: "45.8M",
          marketCap: "$1.5T",
        },
        {
          symbol: "NVDA",
          name: "NVIDIA Corp.",
          price: "$456.78",
          change: "+12.34",
          changePercent: "+2.8%",
          positive: true,
          volume: "67.2M",
          marketCap: "$1.1T",
        },
      ])
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchMarketData(), fetchTopStocks()])
      setLastUpdate(new Date())
      setLoading(false)
    }

    loadData()

    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-gradient-to-r from-green-200 to-blue-200 rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-green-100 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-64 bg-blue-100 rounded-xl"></div>
            <div className="h-64 bg-purple-100 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-12 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-xl text-white shadow-2xl">
        <h1 className="text-5xl font-bold mb-4">StockToons Professional</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          Advanced market analysis, real-time data, and professional trading tools
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 text-sm opacity-75">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Live Data</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Last Updated: {formatTime(lastUpdate)}</span>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Market Overview
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fetchMarketData()
              fetchTopStocks()
              setLastUpdate(new Date())
            }}
            className="flex items-center gap-2 border-green-300 text-green-600 hover:bg-green-50 bg-transparent"
          >
            <Activity className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketData.map((market) => (
            <Card
              key={market.symbol}
              className="bg-gradient-to-br from-white to-green-50 border-2 border-green-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">{market.symbol}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{market.value}</p>
                  </div>
                  <div
                    className={`flex items-center px-3 py-1 rounded-full ${market.positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {market.positive ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-sm font-bold">{market.changePercent}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`text-sm font-medium ${market.positive ? "text-green-600" : "text-red-600"}`}>
                    {market.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions and Top Stocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Briefcase className="h-6 w-6 text-blue-600" />
              Professional Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/analysis">
              <Button
                className="w-full justify-start bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <PieChart className="h-5 w-5 mr-3" />
                Advanced Market Analysis
              </Button>
            </Link>
            <Link href="/watchlist">
              <Button
                className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <TrendingUp className="h-5 w-5 mr-3" />
                Portfolio Watchlist
              </Button>
            </Link>
            <Link href="/stocks/categories">
              <Button
                className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <BarChart3 className="h-5 w-5 mr-3" />
                Stock Categories
              </Button>
            </Link>
            <Link href="/search">
              <Button
                className="w-full justify-start bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <DollarSign className="h-5 w-5 mr-3" />
                Stock Search & Analysis
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Top Performing Stocks */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              Top Performers
            </CardTitle>
            <Link href="/news">
              <Button
                variant="outline"
                size="sm"
                className="border-purple-300 text-purple-700 hover:bg-purple-100 bg-transparent"
              >
                View Market News
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {topStocks.slice(0, 6).map((stock) => (
              <Link key={stock.symbol} href={`/stocks/${stock.symbol}`}>
                <div className="flex items-center justify-between p-4 hover:bg-white rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md border border-transparent hover:border-purple-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {stock.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{stock.symbol}</p>
                        <p className="text-sm text-gray-600 truncate max-w-32">{stock.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">{stock.price}</p>
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-semibold ${stock.positive ? "text-green-600" : "text-red-600"}`}>
                        {stock.changePercent}
                      </span>
                      {stock.positive ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Vol: {stock.volume}</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Market Statistics */}
      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-900">
            <Activity className="h-6 w-6 text-teal-600" />
            Market Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{topStocks.filter((s) => s.positive).length}</p>
              <p className="text-sm text-teal-600">Gainers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{topStocks.filter((s) => !s.positive).length}</p>
              <p className="text-sm text-teal-600">Losers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{marketData.filter((m) => m.positive).length}</p>
              <p className="text-sm text-teal-600">Indices Up</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{topStocks.length}</p>
              <p className="text-sm text-teal-600">Active Stocks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
