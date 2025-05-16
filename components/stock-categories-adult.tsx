"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { stockCategories, getStocksByCategory } from "@/data/stock-categories"

export default function StockCategoriesAdult() {
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
    router.push(`/stocks/${symbol}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold flex-1">
          {selectedCategory
            ? `${stockCategories.find((c) => c.id === selectedCategory)?.name} Stocks`
            : "Stock Categories"}
        </h1>
        {selectedCategory && (
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
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
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardHeader className={`${category.color} text-white rounded-t-lg`}>
                <CardTitle className="flex items-center gap-2">
                  <span className="p-2 bg-white/20 rounded-full">
                    <lucide-icon name={category.icon} className="h-6 w-6" />
                  </span>
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription>{category.description}</CardDescription>
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
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleStockSelect(stock.symbol)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{stock.name}</CardTitle>
                    <p className="text-sm text-gray-500">{stock.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${stock.price.toFixed(2)}</p>
                    <p className={`text-sm ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 line-clamp-3">{stock.description}</p>
                <div className="mt-4 flex justify-end">
                  <Button size="sm" className="flex items-center gap-1">
                    View Details
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
