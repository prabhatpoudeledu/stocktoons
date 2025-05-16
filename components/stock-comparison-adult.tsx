"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, TrendingUp, TrendingDown, Info, DollarSign, BarChart, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

// Mock stock data
const stockData = {
  AAPL: {
    name: "Apple Inc.",
    price: 182.63,
    change: 1.5,
    marketCap: "2.8T",
    pe: 30.2,
    dividend: 0.5,
    volume: "32.5M",
    high52: 198.23,
    low52: 124.17,
    description:
      "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
  },
  MSFT: {
    name: "Microsoft Corporation",
    price: 328.79,
    change: 0.8,
    marketCap: "2.45T",
    pe: 35.1,
    dividend: 0.8,
    volume: "28.7M",
    high52: 366.78,
    low52: 213.43,
    description:
      "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.",
  },
  GOOGL: {
    name: "Alphabet Inc.",
    price: 134.99,
    change: -0.3,
    marketCap: "1.7T",
    pe: 25.8,
    dividend: 0,
    volume: "22.1M",
    high52: 142.38,
    low52: 83.34,
    description:
      "Alphabet Inc. offers various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.",
  },
  AMZN: {
    name: "Amazon.com, Inc.",
    price: 129.12,
    change: 2.1,
    marketCap: "1.3T",
    pe: 67.2,
    dividend: 0,
    volume: "35.2M",
    high52: 146.57,
    low52: 81.43,
    description:
      "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.",
  },
  TSLA: {
    name: "Tesla, Inc.",
    price: 742.5,
    change: 2.3,
    marketCap: "750B",
    pe: 75.6,
    dividend: 0,
    volume: "40.1M",
    high52: 900.4,
    low52: 620.57,
    description:
      "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.",
  },
  META: {
    name: "Meta Platforms, Inc.",
    price: 302.55,
    change: 1.2,
    marketCap: "780B",
    pe: 28.3,
    dividend: 0,
    volume: "18.9M",
    high52: 324.7,
    low52: 88.09,
    description:
      "Meta Platforms, Inc. develops products that enable people to connect and share with friends and family through mobile devices, personal computers, and other surfaces worldwide.",
  },
  NVDA: {
    name: "NVIDIA Corporation",
    price: 875.28,
    change: -1.2,
    marketCap: "2.1T",
    pe: 80.4,
    dividend: 0.04,
    volume: "45.3M",
    high52: 925.1,
    low52: 280.9,
    description:
      "NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally.",
  },
  JPM: {
    name: "JPMorgan Chase & Co.",
    price: 151.03,
    change: 0.5,
    marketCap: "435B",
    pe: 11.2,
    dividend: 2.8,
    volume: "10.2M",
    high52: 159.38,
    low52: 123.11,
    description:
      "JPMorgan Chase & Co. operates as a financial services company worldwide. It operates through four segments: Consumer & Community Banking, Corporate & Investment Bank, Commercial Banking, and Asset & Wealth Management.",
  },
  JNJ: {
    name: "Johnson & Johnson",
    price: 162.15,
    change: -0.7,
    marketCap: "390B",
    pe: 16.8,
    dividend: 2.9,
    volume: "7.5M",
    high52: 175.97,
    low52: 150.71,
    description:
      "Johnson & Johnson researches and develops, manufactures, and sells various products in the health care field worldwide.",
  },
  V: {
    name: "Visa Inc.",
    price: 235.44,
    change: 1.1,
    marketCap: "480B",
    pe: 31.5,
    dividend: 0.7,
    volume: "8.3M",
    high52: 250.18,
    low52: 208.76,
    description:
      "Visa Inc. operates as a payments technology company worldwide. The company facilitates digital payments among consumers, merchants, financial institutions, businesses, strategic partners, and government entities.",
  },
}

// All available stock symbols for autocomplete
const allStockSymbols = Object.keys(stockData)

export default function StockComparisonAdult() {
  const router = useRouter()
  const [stock1, setStock1] = useState("AAPL")
  const [stock2, setStock2] = useState("MSFT")
  const [stock1Input, setStock1Input] = useState("AAPL")
  const [stock2Input, setStock2Input] = useState("MSFT")
  const [stock1Suggestions, setStock1Suggestions] = useState<string[]>([])
  const [stock2Suggestions, setStock2Suggestions] = useState<string[]>([])
  const [showStock1Suggestions, setShowStock1Suggestions] = useState(false)
  const [showStock2Suggestions, setShowStock2Suggestions] = useState(false)

  const handleCompare = () => {
    if (allStockSymbols.includes(stock1Input) && allStockSymbols.includes(stock2Input)) {
      setStock1(stock1Input)
      setStock2(stock2Input)
    }
  }

  const handleStock1InputChange = (value: string) => {
    setStock1Input(value.toUpperCase())
    if (value.length > 0) {
      const filteredSuggestions = allStockSymbols.filter(
        (symbol) =>
          symbol.includes(value.toUpperCase()) || stockData[symbol].name.toUpperCase().includes(value.toUpperCase()),
      )
      setStock1Suggestions(filteredSuggestions)
      setShowStock1Suggestions(true)
    } else {
      setStock1Suggestions([])
      setShowStock1Suggestions(false)
    }
  }

  const handleStock2InputChange = (value: string) => {
    setStock2Input(value.toUpperCase())
    if (value.length > 0) {
      const filteredSuggestions = allStockSymbols.filter(
        (symbol) =>
          symbol.includes(value.toUpperCase()) || stockData[symbol].name.toUpperCase().includes(value.toUpperCase()),
      )
      setStock2Suggestions(filteredSuggestions)
      setShowStock2Suggestions(true)
    } else {
      setStock2Suggestions([])
      setShowStock2Suggestions(false)
    }
  }

  const selectStock1Suggestion = (symbol: string) => {
    setStock1Input(symbol)
    setShowStock1Suggestions(false)
  }

  const selectStock2Suggestion = (symbol: string) => {
    setStock2Input(symbol)
    setShowStock2Suggestions(false)
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowStock1Suggestions(false)
      setShowStock2Suggestions(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Stock Comparison</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Compare Stocks</CardTitle>
          <CardDescription>Select two stocks to compare their performance and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="stock1">First Stock</Label>
              <div className="relative">
                <Input
                  id="stock1"
                  placeholder="Enter stock symbol (e.g., AAPL)"
                  value={stock1Input}
                  onChange={(e) => handleStock1InputChange(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowStock1Suggestions(true)
                  }}
                  className="mb-2"
                />
                {showStock1Suggestions && stock1Suggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-card border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                    {stock1Suggestions.map((symbol) => (
                      <div
                        key={symbol}
                        className="px-4 py-2 hover:bg-accent cursor-pointer flex justify-between"
                        onClick={(e) => {
                          e.stopPropagation()
                          selectStock1Suggestion(symbol)
                        }}
                      >
                        <span className="font-medium">{symbol}</span>
                        <span className="text-muted-foreground">{stockData[symbol].name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="stock2">Second Stock</Label>
              <div className="relative">
                <Input
                  id="stock2"
                  placeholder="Enter stock symbol (e.g., MSFT)"
                  value={stock2Input}
                  onChange={(e) => handleStock2InputChange(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowStock2Suggestions(true)
                  }}
                  className="mb-2"
                />
                {showStock2Suggestions && stock2Suggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-card border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                    {stock2Suggestions.map((symbol) => (
                      <div
                        key={symbol}
                        className="px-4 py-2 hover:bg-accent cursor-pointer flex justify-between"
                        onClick={(e) => {
                          e.stopPropagation()
                          selectStock2Suggestion(symbol)
                        }}
                      >
                        <span className="font-medium">{symbol}</span>
                        <span className="text-muted-foreground">{stockData[symbol].name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button className="mt-4" onClick={handleCompare}>
            Compare
          </Button>
        </CardContent>
      </Card>

      {stock1 && stock2 && stockData[stock1] && stockData[stock2] && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{stock1}</CardTitle>
                  <CardDescription>{stockData[stock1].name}</CardDescription>
                </div>
                <Badge
                  className={
                    stockData[stock1].change >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                  }
                >
                  {stockData[stock1].change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stockData[stock1].change}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">${stockData[stock1].price}</div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Market Cap
                  </div>
                  <div className="font-medium">{stockData[stock1].marketCap}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <BarChart className="h-4 w-4 mr-2" />
                    P/E Ratio
                  </div>
                  <div className="font-medium">{stockData[stock1].pe}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <Activity className="h-4 w-4 mr-2" />
                    Volume
                  </div>
                  <div className="font-medium">{stockData[stock1].volume}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <Info className="h-4 w-4 mr-2" />
                    Dividend Yield
                  </div>
                  <div className="font-medium">{stockData[stock1].dividend}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    52-Week High
                  </div>
                  <div className="font-medium">${stockData[stock1].high52}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    52-Week Low
                  </div>
                  <div className="font-medium">${stockData[stock1].low52}</div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">About {stockData[stock1].name}</h3>
                <p className="text-sm text-muted-foreground">{stockData[stock1].description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{stock2}</CardTitle>
                  <CardDescription>{stockData[stock2].name}</CardDescription>
                </div>
                <Badge
                  className={
                    stockData[stock2].change >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                  }
                >
                  {stockData[stock2].change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stockData[stock2].change}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">${stockData[stock2].price}</div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Market Cap
                  </div>
                  <div className="font-medium">{stockData[stock2].marketCap}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <BarChart className="h-4 w-4 mr-2" />
                    P/E Ratio
                  </div>
                  <div className="font-medium">{stockData[stock2].pe}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <Activity className="h-4 w-4 mr-2" />
                    Volume
                  </div>
                  <div className="font-medium">{stockData[stock2].volume}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <Info className="h-4 w-4 mr-2" />
                    Dividend Yield
                  </div>
                  <div className="font-medium">{stockData[stock2].dividend}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    52-Week High
                  </div>
                  <div className="font-medium">${stockData[stock2].high52}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    52-Week Low
                  </div>
                  <div className="font-medium">${stockData[stock2].low52}</div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">About {stockData[stock2].name}</h3>
                <p className="text-sm text-muted-foreground">{stockData[stock2].description}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Price Change (YTD)</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-1/2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{stock1}</span>
                        <span
                          className={stockData[stock1].change >= 0 ? "text-sm text-green-500" : "text-sm text-red-500"}
                        >
                          {stockData[stock1].change}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            stockData[stock1].change >= 0 ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.abs(stockData[stock1].change) * 5}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{stock2}</span>
                        <span
                          className={stockData[stock2].change >= 0 ? "text-sm text-green-500" : "text-sm text-red-500"}
                        >
                          {stockData[stock2].change}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            stockData[stock2].change >= 0 ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.abs(stockData[stock2].change) * 5}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">P/E Ratio</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-1/2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{stock1}</span>
                        <span className="text-sm">{stockData[stock1].pe}</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${(stockData[stock1].pe / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{stock2}</span>
                        <span className="text-sm">{stockData[stock2].pe}</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${(stockData[stock2].pe / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Dividend Yield</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-1/2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{stock1}</span>
                        <span className="text-sm">{stockData[stock1].dividend}%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${stockData[stock1].dividend * 20}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{stock2}</span>
                        <span className="text-sm">{stockData[stock2].dividend}%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${stockData[stock2].dividend * 20}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
