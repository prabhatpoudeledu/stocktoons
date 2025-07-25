"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, TrendingUp, Star, AlertCircle, Loader2, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { searchStocks, type StockData } from "@/data/stock-database"

export default function SearchPage() {
  const router = useRouter()
  const { user, isInWatchlist, addToWatchlist } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<StockData[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [error, setError] = useState("")
  const [addingSymbol, setAddingSymbol] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const popularSearches = ["AAPL", "TSLA", "NVDA", "MSFT", "AMZN", "GOOG"]

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchStocks(searchQuery, 8)
      setSearchResults(results)
      setShowDropdown(true)
      setSelectedIndex(-1)
    } else {
      setSearchResults([])
      setShowDropdown(false)
    }
  }, [searchQuery])

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
    if (!showDropdown || searchResults.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleStockSelect(searchResults[selectedIndex])
        } else if (searchQuery.trim()) {
          handleSearch(e)
        }
        break
      case "Escape":
        setShowDropdown(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/stocks/${searchQuery.toUpperCase()}`)
      setShowDropdown(false)
    }
  }

  const handleStockSelect = (stock: StockData) => {
    setSearchQuery(stock.symbol)
    setShowDropdown(false)
    router.push(`/stocks/${stock.symbol}`)
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
    const colorClass = isPositive ? "text-green-600" : "text-red-600"

    return (
      <span className={`flex items-center text-xs ${colorClass}`}>
        {icon}
        {Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
      </span>
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

      <h1 className="text-3xl font-bold mb-8">Search Stocks</h1>

      <div className="relative mb-8" ref={searchRef}>
        <form onSubmit={handleSearch}>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder="Enter stock symbol or company name (e.g., AAPL, Apple)"
                className="pl-10 bg-secondary/50 border-border focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (searchResults.length > 0) {
                    setShowDropdown(true)
                  }
                }}
                autoComplete="off"
              />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Search
            </Button>
          </div>
        </form>

        {/* Autocomplete Dropdown */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
            {searchResults.map((stock, index) => (
              <div
                key={stock.symbol}
                className={`px-4 py-3 cursor-pointer border-b border-border last:border-b-0 hover:bg-accent transition-colors ${
                  index === selectedIndex ? "bg-accent" : ""
                }`}
                onClick={() => handleStockSelect(stock)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{stock.symbol}</span>
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {stock.sector}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 truncate">{stock.name}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-semibold text-sm">{formatPrice(stock.price)}</div>
                    <div className="mt-1">{formatChange(stock.change, stock.changePercent)}</div>
                  </div>
                </div>
              </div>
            ))}
            {searchResults.length === 8 && (
              <div className="px-4 py-2 text-center text-xs text-muted-foreground border-t border-border">
                Showing top 8 results. Press Enter to search for "{searchQuery}"
              </div>
            )}
          </div>
        )}

        {/* No results message */}
        {showDropdown && searchQuery.trim() && searchResults.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50">
            <div className="px-4 py-3 text-center text-muted-foreground">
              No stocks found for "{searchQuery}". Press Enter to search anyway.
            </div>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4 flex items-center">
        <TrendingUp className="mr-2 h-5 w-5" />
        Popular Searches
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {popularSearches.map((symbol) => {
          const inWatchlist = isInWatchlist(symbol)
          const stockData = searchStocks(symbol, 1)[0]

          return (
            <Card key={symbol} className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold">{symbol}</p>
                    {stockData && (
                      <div className="text-xs text-muted-foreground mt-1">{formatPrice(stockData.price)}</div>
                    )}
                  </div>
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
                {stockData && <div className="mb-2">{formatChange(stockData.change, stockData.changePercent)}</div>}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-transparent"
                    onClick={() => handlePopularSearch(symbol)}
                  >
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
            <li>Search by stock symbol (e.g., AAPL for Apple) or company name</li>
            <li>Use arrow keys to navigate through search suggestions</li>
            <li>Press Enter to select a highlighted result or search directly</li>
            <li>Click on any stock to view detailed information</li>
            <li>Click the star icon to add a stock to your watchlist</li>
            <li>View and manage your watchlist in the Watchlist section</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
