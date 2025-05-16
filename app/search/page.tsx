"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, TrendingUp, Star, AlertCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function SearchPage() {
  const router = useRouter()
  const { user, isInWatchlist, addToWatchlist } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState("")
  const [addingSymbol, setAddingSymbol] = useState<string | null>(null)

  const popularSearches = ["AAPL", "TSLA", "NVDA", "MSFT", "AMZN", "GOOG"]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/stocks/${searchQuery.toUpperCase()}`)
    }
  }

  const handlePopularSearch = (symbol: string) => {
    router.push(`/stocks/${symbol}`)
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
          title: "Added to watchlist",
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

  return (
    <div className="container py-8">
      <Toaster />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <h1 className="text-3xl font-bold mb-8">Search Stocks</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
              className="pl-10 bg-secondary/50 border-border focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Search
          </Button>
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4 flex items-center">
        <TrendingUp className="mr-2 h-5 w-5" />
        Popular Searches
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {popularSearches.map((symbol) => {
          const inWatchlist = isInWatchlist(symbol)

          return (
            <Card key={symbol} className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold">{symbol}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 -mt-1 -mr-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!inWatchlist) {
                        handleAddToWatchlist(symbol)
                      }
                    }}
                    disabled={addingSymbol === symbol || inWatchlist}
                  >
                    {addingSymbol === symbol ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Star
                        className={`h-4 w-4 ${inWatchlist ? "fill-yellow-400 text-yellow-400" : "text-yellow-400"}`}
                      />
                    )}
                  </Button>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => handlePopularSearch(symbol)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <h2 className="text-xl font-bold mb-4">Search Tips</h2>
      <Card className="bg-card border border-border">
        <CardContent className="p-6">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Search by stock symbol (e.g., AAPL for Apple)</li>
            <li>Search is case-insensitive</li>
            <li>Click on any stock to view detailed information</li>
            <li>Click the star icon to add a stock to your watchlist</li>
            <li>View and manage your watchlist in the Watchlist section</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
