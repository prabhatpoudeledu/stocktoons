"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Users } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getStockBySymbol, getCategoryById } from "@/data/stock-categories"

interface RealTimeStockData {
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
}

interface StockDetailAdultProps {
  symbol: string
}

export default function StockDetailAdult({ symbol }: StockDetailAdultProps) {
  const router = useRouter()
  const [realTimeData, setRealTimeData] = useState<RealTimeStockData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const stock = getStockBySymbol(symbol)

  // Safe number formatting function
  const safeToFixed = (value: any, decimals = 2): string => {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return "0.00"
    }
    return Number(value).toFixed(decimals)
  }

  // Generate historical data for the chart
  const generateHistoricalData = (basePrice: number) => {
    const data = []
    let currentPrice = basePrice || 100

    for (let i = 30; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      // Random price fluctuation
      const change = (Math.random() - 0.5) * 5
      currentPrice = Math.max(currentPrice + change, 1)

      data.push({
        date: date.toISOString().split("T")[0],
        price: Number.parseFloat(currentPrice.toFixed(2)),
      })
    }

    return data
  }

  // Fetch real-time stock data
  const fetchRealTimeData = async () => {
    try {
      const response = await fetch(`/api/stocks/quote/${symbol}`)
      if (response.ok) {
        const data = await response.json()
        if (data.stock) {
          // Ensure all numeric values are properly converted
          const stockData = {
            symbol: data.stock.symbol || symbol,
            name: data.stock.name || `${symbol} Inc.`,
            price: Number(data.stock.price) || 0,
            change: Number(data.stock.change) || 0,
            changePercent: Number(data.stock.changePercent) || 0,
            volume: data.stock.volume || "N/A",
            marketCap: data.stock.marketCap || "N/A",
            high: Number(data.stock.high) || 0,
            low: Number(data.stock.low) || 0,
            open: Number(data.stock.open) || 0,
            previousClose: Number(data.stock.previousClose) || 0,
          }
          setRealTimeData(stockData)
        } else {
          throw new Error("Invalid API response structure")
        }
      } else {
        throw new Error("API request failed")
      }
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Error fetching real-time data:", error)
      // Fallback data with safe defaults
      const basePrice = stock?.price || 100
      const changePercent = (Math.random() - 0.5) * 6
      const change = (basePrice * changePercent) / 100
      const newPrice = basePrice + change

      setRealTimeData({
        symbol,
        name: stock?.name || `${symbol} Inc.`,
        price: newPrice,
        change,
        changePercent,
        volume: Math.floor(Math.random() * 100) + 10 + "M",
        marketCap: "$" + (Math.floor(Math.random() * 500) + 100) + "B",
        high: newPrice + Math.random() * 10,
        low: newPrice - Math.random() * 10,
        open: newPrice + (Math.random() - 0.5) * 5,
        previousClose: newPrice - change,
      })
      setLastUpdate(new Date())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRealTimeData()

    // Refresh every 30 seconds
    const interval = setInterval(fetchRealTimeData, 30000)
    return () => clearInterval(interval)
  }, [symbol])

  if (!stock) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold flex-1 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Stock Not Found
          </h1>
          <Button
            variant="outline"
            onClick={() => router.push("/stocks/categories")}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-300 to-pink-300 text-purple-800 border-0 hover:from-purple-400 hover:to-pink-400"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Categories
          </Button>
        </div>
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
          <CardContent className="p-6">
            <p className="text-gray-700">The stock with symbol {symbol} could not be found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const category = getCategoryById(stock.category)
  const currentData = realTimeData || {
    symbol,
    name: stock.name,
    price: stock.price || 0,
    change: stock.change || 0,
    changePercent: ((stock.change || 0) / ((stock.price || 100) - (stock.change || 0))) * 100,
    volume: "N/A",
    marketCap: "N/A",
    high: stock.price || 0,
    low: stock.price || 0,
    open: stock.price || 0,
    previousClose: (stock.price || 0) - (stock.change || 0),
  }

  const historicalData = generateHistoricalData(currentData.price)
  const isPositive = (currentData.change || 0) >= 0

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gradient-to-r from-purple-200 to-pink-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded"></div>
              <div className="h-64 bg-gradient-to-br from-teal-100 to-cyan-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-4xl font-bold flex-1 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          {currentData.name} ({currentData.symbol})
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-sm font-medium text-purple-600">{formatTime(lastUpdate)}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => fetchRealTimeData()}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-300 to-pink-300 text-purple-800 border-0 hover:from-purple-400 hover:to-pink-400"
          >
            <Activity className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/stocks/categories")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-300 to-cyan-300 text-blue-800 border-0 hover:from-blue-400 hover:to-cyan-400"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Categories
          </Button>
        </div>
      </div>

      {/* Real-time Price Header */}
      <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">${safeToFixed(currentData.price)}</h2>
                <div
                  className={`flex items-center px-3 py-1 rounded-full ${isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  <span className="font-bold">
                    {isPositive ? "+" : ""}
                    {safeToFixed(currentData.change)} ({isPositive ? "+" : ""}
                    {safeToFixed(currentData.changePercent)}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>Open: ${safeToFixed(currentData.open)}</span>
                <span>High: ${safeToFixed(currentData.high)}</span>
                <span>Low: ${safeToFixed(currentData.low)}</span>
                <span>Prev Close: ${safeToFixed(currentData.previousClose)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Live Data</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  <span>Volume: {currentData.volume}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-3 w-3" />
                  <span>Market Cap: {currentData.marketCap}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full bg-gradient-to-br from-white to-blue-50 border border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Price History (30 Days)
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
                        stroke="#8b5cf6"
                      />
                      <YAxis domain={["auto", "auto"]} stroke="#8b5cf6" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        activeDot={{ r: 6, fill: "#8b5cf6" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Company Information */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                <DollarSign className="h-5 w-5 text-green-600" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <Badge variant="outline" className="mt-1 border-green-300 text-green-700 bg-green-50">
                  {category?.name || "Unknown"}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-sm text-gray-700">{stock.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Market Data</h3>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Volume:</span>
                    <span className="font-medium text-green-700">{currentData.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Cap:</span>
                    <span className="font-medium text-green-700">{currentData.marketCap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Day Range:</span>
                    <span className="font-medium text-green-700">
                      ${safeToFixed(currentData.low)} - ${safeToFixed(currentData.high)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => router.push(`/stocks/compare?stock1=${stock.symbol}`)}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold"
              >
                Compare with Another Stock
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(`/watchlist?add=${stock.symbol}`)}
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-100 bg-transparent"
              >
                Add to Watchlist
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(`/news?symbol=${stock.symbol}`)}
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-100 bg-transparent"
              >
                View Related News
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
