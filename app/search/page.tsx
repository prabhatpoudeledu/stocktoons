"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, TrendingUp } from "lucide-react"

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

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

  return (
    <div className="container py-8">
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
        {popularSearches.map((symbol) => (
          <Card
            key={symbol}
            className="bg-card border border-border hover:border-primary/50 cursor-pointer transition-colors"
            onClick={() => handlePopularSearch(symbol)}
          >
            <CardContent className="p-4 text-center">
              <p className="font-bold">{symbol}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Search Tips</h2>
      <Card className="bg-card border border-border">
        <CardContent className="p-6">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Search by stock symbol (e.g., AAPL for Apple)</li>
            <li>Search is case-insensitive</li>
            <li>You can also search for topics in the Learn section</li>
            <li>Click on any stock to view detailed information</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
