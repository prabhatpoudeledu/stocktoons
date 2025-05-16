"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, TrendingUp, TrendingDown, Zap } from "lucide-react"
import { stocksWithCategories, getCategoryById } from "@/data/stock-categories"

export default function StockComparisonKids() {
  const router = useRouter()
  const [stock1, setStock1] = useState("")
  const [stock2, setStock2] = useState("")

  const stock1Data = stocksWithCategories.find((s) => s.symbol === stock1)
  const stock2Data = stocksWithCategories.find((s) => s.symbol === stock2)

  // Handle back button click
  const handleBack = () => {
    router.push("/kids/stocks")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold flex-1 text-purple-700">Compare Stocks</h1>
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2 bg-purple-100 border-purple-300 text-purple-700 hover:bg-purple-200"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Stocks
        </Button>
      </div>

      <Card className="mb-8 border-2 border-purple-200 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100">
          <CardTitle className="text-center text-purple-700">Pick Two Stocks to Compare</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-purple-700 mb-2">First Stock</label>
              <Select value={stock1} onValueChange={setStock1}>
                <SelectTrigger className="border-2 border-purple-200 rounded-lg h-12">
                  <SelectValue placeholder="Choose a stock" />
                </SelectTrigger>
                <SelectContent>
                  {stocksWithCategories.map((stock) => (
                    <SelectItem key={stock.symbol} value={stock.symbol}>
                      {stock.name} ({stock.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-lg font-medium text-purple-700 mb-2">Second Stock</label>
              <Select value={stock2} onValueChange={setStock2}>
                <SelectTrigger className="border-2 border-purple-200 rounded-lg h-12">
                  <SelectValue placeholder="Choose a stock" />
                </SelectTrigger>
                <SelectContent>
                  {stocksWithCategories.map((stock) => (
                    <SelectItem key={stock.symbol} value={stock.symbol}>
                      {stock.name} ({stock.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {stock1 && stock2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-2 border-blue-200 rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200">
              <CardTitle className="text-center text-blue-700">{stock1Data?.name}</CardTitle>
              <p className="text-center text-blue-600 font-medium">{stock1Data?.symbol}</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-800">${stock1Data?.price.toFixed(2)}</p>
                  <div
                    className={`flex items-center justify-center mt-2 ${stock1Data?.change && stock1Data.change >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {stock1Data?.change && stock1Data.change >= 0 ? (
                      <TrendingUp className="h-5 w-5 mr-1" />
                    ) : (
                      <TrendingDown className="h-5 w-5 mr-1" />
                    )}
                    <span className="text-lg font-medium">
                      {stock1Data?.change && stock1Data.change >= 0 ? "+" : ""}
                      {stock1Data?.change.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-2">What They Do:</h3>
                  <p className="text-gray-700">{stock1Data?.kidsDescription}</p>
                </div>

                <div className="w-full bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-2">Category:</h3>
                  <p className="text-gray-700">{stock1Data && getCategoryById(stock1Data.category)?.name}</p>
                </div>

                <Button
                  onClick={() => router.push(`/kids/stocks/${stock1}`)}
                  className="bg-blue-600 hover:bg-blue-700 rounded-full px-6"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-200">
              <CardTitle className="text-center text-purple-700">{stock2Data?.name}</CardTitle>
              <p className="text-center text-purple-600 font-medium">{stock2Data?.symbol}</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-800">${stock2Data?.price.toFixed(2)}</p>
                  <div
                    className={`flex items-center justify-center mt-2 ${stock2Data?.change && stock2Data.change >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {stock2Data?.change && stock2Data.change >= 0 ? (
                      <TrendingUp className="h-5 w-5 mr-1" />
                    ) : (
                      <TrendingDown className="h-5 w-5 mr-1" />
                    )}
                    <span className="text-lg font-medium">
                      {stock2Data?.change && stock2Data.change >= 0 ? "+" : ""}
                      {stock2Data?.change.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-700 mb-2">What They Do:</h3>
                  <p className="text-gray-700">{stock2Data?.kidsDescription}</p>
                </div>

                <div className="w-full bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-700 mb-2">Category:</h3>
                  <p className="text-gray-700">{stock2Data && getCategoryById(stock2Data.category)?.name}</p>
                </div>

                <Button
                  onClick={() => router.push(`/kids/stocks/${stock2}`)}
                  className="bg-purple-600 hover:bg-purple-700 rounded-full px-6"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {stock1 && stock2 && (
        <Card className="mt-8 border-2 border-green-200 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-100 to-green-200">
            <CardTitle className="text-center text-green-700">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-6 w-6" />
                Stock Showdown
                <Zap className="h-6 w-6" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-700 mb-2">Price Comparison:</h3>
                <div className="flex items-center justify-center gap-4 text-lg">
                  <span className="font-bold">
                    {stock1Data?.symbol}: ${stock1Data?.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500">vs</span>
                  <span className="font-bold">
                    {stock2Data?.symbol}: ${stock2Data?.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-center mt-2 text-gray-700">
                  {stock1Data &&
                    stock2Data &&
                    (stock1Data.price > stock2Data.price
                      ? `${stock1Data.symbol} costs $${(stock1Data.price - stock2Data.price).toFixed(2)} more than ${stock2Data.symbol}`
                      : stock2Data.price > stock1Data.price
                        ? `${stock2Data.symbol} costs $${(stock2Data.price - stock1Data.price).toFixed(2)} more than ${stock1Data.symbol}`
                        : `Both stocks cost the same amount!`)}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-700 mb-2">Daily Change:</h3>
                <div className="flex items-center justify-center gap-4">
                  <div
                    className={`flex items-center ${stock1Data?.change && stock1Data.change >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    <span className="font-bold">{stock1Data?.symbol}:</span>
                    <span className="ml-1">
                      {stock1Data?.change && stock1Data.change >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(stock1Data?.change || 0).toFixed(2)}
                    </span>
                  </div>
                  <span className="text-gray-500">vs</span>
                  <div
                    className={`flex items-center ${stock2Data?.change && stock2Data.change >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    <span className="font-bold">{stock2Data?.symbol}:</span>
                    <span className="ml-1">
                      {stock2Data?.change && stock2Data.change >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(stock2Data?.change || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="text-center mt-2 text-gray-700">
                  {stock1Data &&
                    stock2Data &&
                    (stock1Data.change > stock2Data.change
                      ? `${stock1Data.symbol} is doing better today!`
                      : stock2Data.change > stock1Data.change
                        ? `${stock2Data.symbol} is doing better today!`
                        : `Both stocks are performing the same today!`)}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-700 mb-2">Categories:</h3>
                <div className="flex items-center justify-center gap-4 text-lg">
                  <span>
                    <span className="font-bold">{stock1Data?.symbol}:</span>{" "}
                    {stock1Data && getCategoryById(stock1Data.category)?.name}
                  </span>
                  <span className="text-gray-500">vs</span>
                  <span>
                    <span className="font-bold">{stock2Data?.symbol}:</span>{" "}
                    {stock2Data && getCategoryById(stock2Data.category)?.name}
                  </span>
                </div>
                <p className="text-center mt-2 text-gray-700">
                  {stock1Data &&
                    stock2Data &&
                    (stock1Data.category === stock2Data.category
                      ? `Both companies are in the same category!`
                      : `These companies are in different categories!`)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
