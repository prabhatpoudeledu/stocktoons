"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { stockCategories, getStocksByCategory } from "@/data/stock-categories"

export default function StockCategoriesKids() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  // Handle back button click
  const handleBack = () => {
    setSelectedCategory(null)
  }

  // Handle stock selection
  const handleStockSelect = (symbol: string) => {
    router.push(`/kids/stocks/${symbol}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold flex-1 text-purple-700">
          {selectedCategory
            ? `${stockCategories.find((c) => c.id === selectedCategory)?.name} Stocks`
            : "Stock Categories"}
        </h1>
        {selectedCategory && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2 bg-purple-100 border-purple-300 text-purple-700 hover:bg-purple-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Categories
          </Button>
        )}
      </div>

      {!selectedCategory ? (
        // Show categories
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stockCategories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-gray-200 rounded-xl overflow-hidden"
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardHeader className={`${category.kidsColor} text-white rounded-t-lg p-6`}>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <span className="p-3 bg-white/30 rounded-full">
                    <lucide-icon name={category.kidsIcon} className="h-7 w-7" />
                  </span>
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 pb-6">
                <p className="text-gray-700 text-lg">{category.kidsDescription}</p>
                <div className="mt-4 flex justify-center">
                  <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-6">Explore</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Show stocks in the selected category
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getStocksByCategory(selectedCategory).map((stock) => (
            <Card
              key={stock.symbol}
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-gray-200 rounded-xl overflow-hidden"
              onClick={() => handleStockSelect(stock.symbol)}
            >
              <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-purple-700">{stock.name}</CardTitle>
                    <p className="text-md font-medium text-blue-600">{stock.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">${stock.price.toFixed(2)}</p>
                    <p className={`text-md font-medium ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {stock.change >= 0 ? "↑" : "↓"} {Math.abs(stock.change).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-md text-gray-700 mb-4">{stock.kidsDescription}</p>
                <div className="flex justify-center">
                  <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-6 flex items-center gap-2">
                    Learn More
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
