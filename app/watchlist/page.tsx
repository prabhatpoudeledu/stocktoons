"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ArrowUp, ArrowDown, Trash2, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Mock stock data function
const getStockData = (symbol: string) => {
  const mockData: Record<string, { name: string; price: number; change: number }> = {
    TSLA: { name: "Tesla, Inc.", price: 742.5, change: 2.3 },
    AAPL: { name: "Apple Inc.", price: 182.63, change: 1.5 },
    NVDA: { name: "NVIDIA Corporation", price: 875.28, change: 3.2 },
    MSFT: { name: "Microsoft Corporation", price: 415.25, change: 0.8 },
    AMZN: { name: "Amazon.com, Inc.", price: 178.35, change: -0.5 },
    GOOG: { name: "Alphabet Inc.", price: 165.84, change: -1.2 },
    META: { name: "Meta Platforms, Inc.", price: 485.39, change: 1.8 },
    AMD: { name: "Advanced Micro Devices, Inc.", price: 156.42, change: -0.7 },
    INTC: { name: "Intel Corporation", price: 32.18, change: -2.1 },
    NFLX: { name: "Netflix, Inc.", price: 625.89, change: 0.9 },
  }

  return (
    mockData[symbol] || {
      name: `${symbol} Corp.`,
      price: Math.floor(Math.random() * 1000),
      change: Math.random() * 5 - 2.5,
    }
  )
}

export default function WatchlistPage() {
  const { user, removeFromWatchlist } = useAuth()
  const [watchlistStocks, setWatchlistStocks] = useState<
    Array<{ symbol: string; name: string; price: number; change: number }>
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [removingSymbol, setRemovingSymbol] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      // Load watchlist data
      const stocks = user.watchlist.map((symbol) => {
        const data = getStockData(symbol)
        return {
          symbol,
          name: data.name,
          price: data.price,
          change: data.change,
        }
      })
      setWatchlistStocks(stocks)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [user])

  const handleRemoveFromWatchlist = async (symbol: string) => {
    setRemovingSymbol(symbol)
    try {
      const result = await removeFromWatchlist(symbol)
      if (result.success) {
        setWatchlistStocks((prev) => prev.filter((stock) => stock.symbol !== symbol))
        toast({
          title: "Removed from watchlist",
          description: `${symbol} has been removed from your watchlist`,
        })
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Failed to remove from watchlist. Please try again.")
    } finally {
      setRemovingSymbol(null)
    }
  }

  // Filter for gainers and losers
  const gainers = watchlistStocks.filter((stock) => stock.change >= 0)
  const losers = watchlistStocks.filter((stock) => stock.change < 0)

  if (isLoading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container py-8">
        <Card className="bg-card border border-border">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
            <p className="text-muted-foreground mb-6">Please log in to view and manage your watchlist</p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/login?redirect=/watchlist">Log In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Toaster />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/search">
            <Star className="mr-2 h-4 w-4" />
            Add Stock
          </Link>
        </Button>
      </div>

      {watchlistStocks.length === 0 ? (
        <Card className="bg-card border border-border">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding stocks to your watchlist to track their performance
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/search">Browse Stocks</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({watchlistStocks.length})</TabsTrigger>
            <TabsTrigger value="gainers">Gainers ({gainers.length})</TabsTrigger>
            <TabsTrigger value="losers">Losers ({losers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card className="bg-card chart-pattern">
              <CardContent className="p-0 relative z-10">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4">Symbol</th>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-right py-3 px-4">Price</th>
                        <th className="text-right py-3 px-4">Change</th>
                        <th className="text-center py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchlistStocks.map((stock) => {
                        const isPositive = stock.change >= 0
                        const changeColor = isPositive ? "positive" : "negative"
                        const changeIcon = isPositive ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                        const changeSymbol = isPositive ? "+" : ""

                        return (
                          <tr key={stock.symbol} className="border-b border-border hover:bg-secondary/30">
                            <td className="py-3 px-4">
                              <Link href={`/stocks/${stock.symbol}`} className="font-bold hover:text-primary">
                                {stock.symbol}
                              </Link>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">{stock.name}</td>
                            <td className="py-3 px-4 text-right">${stock.price.toFixed(2)}</td>
                            <td className={`py-3 px-4 text-right ${changeColor} flex items-center justify-end`}>
                              {changeIcon}
                              <span className="ml-1">
                                {changeSymbol}
                                {typeof stock.change === "number" ? stock.change.toFixed(2) : stock.change}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                onClick={() => handleRemoveFromWatchlist(stock.symbol)}
                                disabled={removingSymbol === stock.symbol}
                              >
                                {removingSymbol === stock.symbol ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gainers" className="space-y-4">
            <Card className="bg-card chart-pattern">
              <CardContent className="p-0 relative z-10">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4">Symbol</th>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-right py-3 px-4">Price</th>
                        <th className="text-right py-3 px-4">Change</th>
                        <th className="text-center py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gainers.map((stock) => (
                        <tr key={stock.symbol} className="border-b border-border hover:bg-secondary/30">
                          <td className="py-3 px-4">
                            <Link href={`/stocks/${stock.symbol}`} className="font-bold hover:text-primary">
                              {stock.symbol}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{stock.name}</td>
                          <td className="py-3 px-4 text-right">${stock.price.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right positive flex items-center justify-end">
                            <ArrowUp className="h-3 w-3" />
                            <span className="ml-1">
                              +{typeof stock.change === "number" ? stock.change.toFixed(2) : stock.change}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-red-500"
                              onClick={() => handleRemoveFromWatchlist(stock.symbol)}
                              disabled={removingSymbol === stock.symbol}
                            >
                              {removingSymbol === stock.symbol ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="losers" className="space-y-4">
            <Card className="bg-card chart-pattern">
              <CardContent className="p-0 relative z-10">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4">Symbol</th>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-right py-3 px-4">Price</th>
                        <th className="text-right py-3 px-4">Change</th>
                        <th className="text-center py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {losers.map((stock) => (
                        <tr key={stock.symbol} className="border-b border-border hover:bg-secondary/30">
                          <td className="py-3 px-4">
                            <Link href={`/stocks/${stock.symbol}`} className="font-bold hover:text-primary">
                              {stock.symbol}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{stock.name}</td>
                          <td className="py-3 px-4 text-right">${stock.price.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right negative flex items-center justify-end">
                            <ArrowDown className="h-3 w-3" />
                            <span className="ml-1">
                              {typeof stock.change === "number" ? stock.change.toFixed(2) : stock.change}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-red-500"
                              onClick={() => handleRemoveFromWatchlist(stock.symbol)}
                              disabled={removingSymbol === stock.symbol}
                            >
                              {removingSymbol === stock.symbol ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <h2 className="text-2xl font-bold mt-12 mb-6">Performance Overview</h2>
      <Card className="bg-card candle-pattern">
        <CardContent className="p-6 flex items-center justify-center h-64 relative z-10">
          {watchlistStocks.length === 0 ? (
            <p className="text-muted-foreground">Add stocks to your watchlist to see performance charts</p>
          ) : (
            <p className="text-muted-foreground">[Performance Chart Placeholder]</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
