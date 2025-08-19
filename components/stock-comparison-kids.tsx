"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Zap } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <h1 className="text-4xl font-bold flex-1 text-purple-700 animate-bounce-slow">Company Battle! ⚔️</h1>
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2 bg-card border-purple-300 text-purple-700 hover:bg-purple-100 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Companies
          </Button>
        </div>

        <Card className="mb-8 border-4 border-purple-300 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-purple-50">
          <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-8">
            <CardTitle className="text-center text-3xl font-bold">Pick Two Companies to Compare! 🥊</CardTitle>
            <p className="text-center text-xl text-purple-100 mt-2">Let's see which company is doing better!</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-2xl font-bold text-purple-700 mb-4">🥊 Fighter #1</label>
                <Select value={stock1} onValueChange={setStock1}>
                  <SelectTrigger className="border-4 border-purple-200 rounded-2xl h-16 text-lg bg-card shadow-lg">
                    <SelectValue placeholder="Choose your first company" />
                  </SelectTrigger>
                  <SelectContent>
                    {stocksWithCategories.map((stock) => (
                      <SelectItem key={stock.symbol} value={stock.symbol} className="text-lg py-3">
                        {stock.name} ({stock.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-2xl font-bold text-purple-700 mb-4">🥊 Fighter #2</label>
                <Select value={stock2} onValueChange={setStock2}>
                  <SelectTrigger className="border-4 border-purple-200 rounded-2xl h-16 text-lg bg-card shadow-lg">
                    <SelectValue placeholder="Choose your second company" />
                  </SelectTrigger>
                  <SelectContent>
                    {stocksWithCategories.map((stock) => (
                      <SelectItem key={stock.symbol} value={stock.symbol} className="text-lg py-3">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="border-4 border-blue-300 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16"></div>
                <CardTitle className="text-center text-3xl font-bold relative z-10">🥊 {stock1Data?.name}</CardTitle>
                <p className="text-center text-2xl font-medium text-blue-100 relative z-10">{stock1Data?.symbol}</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-800">${stock1Data?.price.toFixed(2)}</p>
                    <div
                      className={`flex items-center justify-center mt-4 text-2xl ${stock1Data?.change && stock1Data.change >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {stock1Data?.change && stock1Data.change >= 0 ? (
                        <span className="mr-2">📈</span>
                      ) : (
                        <span className="mr-2">📉</span>
                      )}
                      <span className="font-bold">
                        {stock1Data?.change && stock1Data.change >= 0 ? "+" : ""}
                        {stock1Data?.change.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-blue-100 p-6 rounded-2xl border-2 border-blue-200">
                    <h3 className="font-bold text-blue-700 mb-3 text-xl">What They Do:</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{stock1Data?.kidsDescription}</p>
                  </div>

                  <div className="w-full bg-blue-100 p-6 rounded-2xl border-2 border-blue-200">
                    <h3 className="font-bold text-blue-700 mb-3 text-xl">Category:</h3>
                    <p className="text-gray-700 text-lg">{stock1Data && getCategoryById(stock1Data.category)?.name}</p>
                  </div>

                  <Button
                    onClick={() => router.push(`/kids/stocks/${stock1}`)}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-full px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Learn More About {stock1Data?.name}! 🚀
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-pink-300 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16"></div>
                <CardTitle className="text-center text-3xl font-bold relative z-10">🥊 {stock2Data?.name}</CardTitle>
                <p className="text-center text-2xl font-medium text-pink-100 relative z-10">{stock2Data?.symbol}</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-800">${stock2Data?.price.toFixed(2)}</p>
                    <div
                      className={`flex items-center justify-center mt-4 text-2xl ${stock2Data?.change && stock2Data.change >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {stock2Data?.change && stock2Data.change >= 0 ? (
                        <span className="mr-2">📈</span>
                      ) : (
                        <span className="mr-2">📉</span>
                      )}
                      <span className="font-bold">
                        {stock2Data?.change && stock2Data.change >= 0 ? "+" : ""}
                        {stock2Data?.change.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-pink-100 p-6 rounded-2xl border-2 border-pink-200">
                    <h3 className="font-bold text-pink-700 mb-3 text-xl">What They Do:</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{stock2Data?.kidsDescription}</p>
                  </div>

                  <div className="w-full bg-pink-100 p-6 rounded-2xl border-2 border-pink-200">
                    <h3 className="font-bold text-pink-700 mb-3 text-xl">Category:</h3>
                    <p className="text-gray-700 text-lg">{stock2Data && getCategoryById(stock2Data.category)?.name}</p>
                  </div>

                  <Button
                    onClick={() => router.push(`/kids/stocks/${stock2}`)}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-full px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Learn More About {stock2Data?.name}! 🚀
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {stock1 && stock2 && (
          <Card className="border-4 border-teal-300 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-teal-50 to-cyan-50">
            <CardHeader className="bg-gradient-to-r from-teal-400 to-cyan-400 text-white p-8">
              <CardTitle className="text-center text-3xl font-bold">
                <div className="flex items-center justify-center gap-3">
                  <Zap className="h-8 w-8" />🏆 Battle Results! 🏆
                  <Zap className="h-8 w-8" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="bg-teal-100 p-6 rounded-2xl border-4 border-teal-200">
                  <h3 className="font-bold text-teal-800 mb-4 text-2xl text-center">💰 Price Battle!</h3>
                  <div className="flex items-center justify-center gap-6 text-2xl">
                    <span className="font-bold text-blue-600">
                      {stock1Data?.symbol}: ${stock1Data?.price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-3xl">⚔️</span>
                    <span className="font-bold text-pink-600">
                      {stock2Data?.symbol}: ${stock2Data?.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-center mt-4 text-teal-800 text-xl font-medium">
                    {stock1Data &&
                      stock2Data &&
                      (stock1Data.price > stock2Data.price
                        ? `🏆 ${stock1Data.symbol} costs $${(stock1Data.price - stock2Data.price).toFixed(2)} more than ${stock2Data.symbol}!`
                        : stock2Data.price > stock1Data.price
                          ? `🏆 ${stock2Data.symbol} costs $${(stock2Data.price - stock1Data.price).toFixed(2)} more than ${stock1Data.symbol}!`
                          : `🤝 Both companies cost the same amount!`)}
                  </p>
                </div>

                <div className="bg-green-100 p-6 rounded-2xl border-4 border-green-200">
                  <h3 className="font-bold text-green-800 mb-4 text-2xl text-center">📈 Today's Performance!</h3>
                  <div className="flex items-center justify-center gap-6 text-xl">
                    <div
                      className={`flex items-center font-bold ${stock1Data?.change && stock1Data.change >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      <span className="text-blue-600">{stock1Data?.symbol}:</span>
                      <span className="ml-2 text-2xl">
                        {stock1Data?.change && stock1Data.change >= 0 ? "📈" : "📉"}
                      </span>
                      <span className="ml-1">{Math.abs(stock1Data?.change || 0).toFixed(2)}</span>
                    </div>
                    <span className="text-gray-500 text-3xl">⚔️</span>
                    <div
                      className={`flex items-center font-bold ${stock2Data?.change && stock2Data.change >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      <span className="text-pink-600">{stock2Data?.symbol}:</span>
                      <span className="ml-2 text-2xl">
                        {stock2Data?.change && stock2Data.change >= 0 ? "📈" : "📉"}
                      </span>
                      <span className="ml-1">{Math.abs(stock2Data?.change || 0).toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-center mt-4 text-green-800 text-xl font-medium">
                    {stock1Data &&
                      stock2Data &&
                      (stock1Data.change > stock2Data.change
                        ? `🏆 ${stock1Data.symbol} is winning today!`
                        : stock2Data.change > stock1Data.change
                          ? `🏆 ${stock2Data.symbol} is winning today!`
                          : `🤝 Both companies are performing the same today!`)}
                  </p>
                </div>

                <div className="bg-purple-100 p-6 rounded-2xl border-4 border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-4 text-2xl text-center">🏢 Category Battle!</h3>
                  <div className="flex items-center justify-center gap-6 text-xl">
                    <span className="font-bold text-blue-600">
                      {stock1Data?.symbol}: {stock1Data && getCategoryById(stock1Data.category)?.name}
                    </span>
                    <span className="text-gray-500 text-3xl">⚔️</span>
                    <span className="font-bold text-pink-600">
                      {stock2Data?.symbol}: {stock2Data && getCategoryById(stock2Data.category)?.name}
                    </span>
                  </div>
                  <p className="text-center mt-4 text-purple-800 text-xl font-medium">
                    {stock1Data &&
                      stock2Data &&
                      (stock1Data.category === stock2Data.category
                        ? `🤝 Both companies are in the same category!`
                        : `🌟 These companies are in different categories!`)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
