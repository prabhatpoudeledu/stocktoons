"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Star, ArrowUp, ArrowDown, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import NewsCard from "@/components/news-card"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Update the StockPage component to be a client component with watchlist functionality
export default function StockPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params
  const { user, isInWatchlist, addToWatchlist, removeFromWatchlist } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Mock data - in a real app, this would come from an API
  const stockData = {
    name:
      symbol === "TSLA"
        ? "Tesla, Inc."
        : symbol === "AAPL"
          ? "Apple Inc."
          : symbol === "NVDA"
            ? "NVIDIA Corporation"
            : `${symbol} Corp.`,
    price:
      symbol === "TSLA"
        ? 742.5
        : symbol === "AAPL"
          ? 182.63
          : symbol === "NVDA"
            ? 875.28
            : Math.floor(Math.random() * 1000),
    change:
      symbol === "TSLA"
        ? 2.3
        : symbol === "AAPL"
          ? 1.5
          : symbol === "NVDA"
            ? -1.2
            : (Math.random() * 5 - 2.5).toFixed(2),
    open: 735.2,
    high: 748.6,
    low: 731.8,
    volume: "12.5M",
    marketCap: "752.8B",
    pe: 98.2,
  }

  const newsItems = [
    {
      title: `${stockData.name} expands Gigafactory`,
      content: `${stockData.name} is expanding its Texas Gigafactory to meet increased demand for EVs. Source: Reuters`,
    },
    {
      title: `${stockData.name} reports strong quarterly results`,
      content: `${stockData.name} exceeded analyst expectations with quarterly revenue growth of 25%. Source: Bloomberg`,
    },
    {
      title: `Analyst upgrades ${stockData.name} to "Buy"`,
      content: `Morgan Stanley has upgraded ${stockData.name} from "Hold" to "Buy" with a new price target. Source: CNBC`,
    },
  ]

  const isPositive = Number.parseFloat(stockData.change.toString()) >= 0
  const changeColor = isPositive ? "positive" : "negative"
  const changeSymbol = isPositive ? "+" : ""
  const changeIcon = isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />

  const inWatchlist = isInWatchlist(symbol)

  const handleWatchlistAction = async () => {
    if (!user) {
      router.push(`/login?redirect=/stocks/${symbol}`)
      return
    }

    setIsLoading(true)
    setNotification(null)

    try {
      let result
      if (inWatchlist) {
        result = await removeFromWatchlist(symbol)
      } else {
        result = await addToWatchlist(symbol)
      }

      if (result.success) {
        toast({
          title: result.message,
          description: inWatchlist
            ? `${symbol} has been removed from your watchlist`
            : `${symbol} has been added to your watchlist`,
        })
      } else {
        setNotification({ type: "error", message: result.message })
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "An error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <Toaster />

      {notification && (
        <Alert variant={notification.type === "success" ? "default" : "destructive"} className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {symbol} - {stockData.name}
          </h1>
          <div className="flex items-center mt-1">
            <span className="text-xl font-semibold mr-2">${stockData.price.toFixed(2)}</span>
            <span className={`${changeColor} flex items-center`}>
              {changeIcon}
              <span className="ml-1">
                {changeSymbol}
                {stockData.change}%
              </span>
            </span>
          </div>
        </div>
        <Button
          className={
            inWatchlist
              ? "mt-4 md:mt-0 bg-secondary hover:bg-secondary/80 border border-yellow-500/50"
              : "mt-4 md:mt-0 bg-secondary hover:bg-secondary/80"
          }
          onClick={handleWatchlistAction}
          disabled={isLoading}
        >
          <Star className={`mr-2 h-4 w-4 ${inWatchlist ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}`} />
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 bg-card chart-pattern">
          <CardContent className="p-6 flex items-center justify-center h-64">
            <p className="text-muted-foreground">[Interactive Chart Placeholder]</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Stock Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Open</span>
                <span>${stockData.open}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">High</span>
                <span>${stockData.high}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Low</span>
                <span>${stockData.low}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume</span>
                <span>{stockData.volume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap</span>
                <span>{stockData.marketCap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">P/E Ratio</span>
                <span>{stockData.pe}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {newsItems.map((news, index) => (
          <NewsCard key={index} title={news.title} content={news.content} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">TrendView Chart</h2>
      <Card className="bg-card candle-pattern">
        <CardContent className="p-6 flex items-center justify-center h-96 relative z-10">
          <p className="text-muted-foreground">[TradingView Chart Widget Placeholder]</p>
        </CardContent>
      </Card>
    </div>
  )
}
