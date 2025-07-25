"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { searchStocks, type StockData } from "@/data/stock-database"

interface NavbarSearchProps {
  className?: string
  placeholder?: string
}

export default function NavbarSearch({ className, placeholder = "Search stocks" }: NavbarSearchProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<StockData[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchStocks(searchQuery, 5)
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
    if (!showDropdown || searchResults.length === 0) {
      if (e.key === "Enter") {
        handleSearch(e)
      }
      return
    }

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
        inputRef.current?.blur()
        break
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/stocks/${searchQuery.toUpperCase()}`)
      setShowDropdown(false)
      setSearchQuery("")
      inputRef.current?.blur()
    }
  }

  const handleStockSelect = (stock: StockData) => {
    setSearchQuery("")
    setShowDropdown(false)
    inputRef.current?.blur()
    router.push(`/stocks/${stock.symbol}`)
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
        {Math.abs(changePercent).toFixed(1)}%
      </span>
    )
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder={placeholder}
            className={className}
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
      </form>

      {/* Autocomplete Dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
          {searchResults.map((stock, index) => (
            <div
              key={stock.symbol}
              className={`px-3 py-2 cursor-pointer border-b border-border last:border-b-0 hover:bg-accent transition-colors ${
                index === selectedIndex ? "bg-accent" : ""
              }`}
              onClick={() => handleStockSelect(stock)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{stock.symbol}</span>
                    <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded text-nowrap">
                      {stock.sector}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{stock.name}</p>
                </div>
                <div className="text-right ml-2 flex-shrink-0">
                  <div className="font-semibold text-xs">{formatPrice(stock.price)}</div>
                  <div className="mt-0.5">{formatChange(stock.change, stock.changePercent)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
