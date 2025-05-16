"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getStockBySymbol, getCategoryById } from "@/data/stock-categories"

// Mock historical data for the chart
const generateHistoricalData = (basePrice: number) => {
  const data = []
  let currentPrice = basePrice

  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // Random price fluctuation
    const change = (Math.random() - 0.5) * 5
    currentPrice = Math.max(currentPrice + change, 1)

    data.push({
      date: date.toISOString().split("T")[0],
      price: Number.parseFloat(currentPrice.toFixed(2)),
    })
  }

  return data
}

interface StockDetailAdultProps {
  symbol: string
}

export default function StockDetailAdult({ symbol }: StockDetailAdultProps) {
  const router = useRouter()
  const stock = getStockBySymbol(symbol)

  if (!stock) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold flex-1">Stock Not Found</h1>
          <Button
            variant="outline"
            onClick={() => router.push("/stocks/categories")}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Categories
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>The stock with symbol {symbol} could not be found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const category = getCategoryById(stock.category)
  const historicalData = generateHistoricalData(stock.price)

  // Handle back button click
  const handleBack = () => {
    router.push("/stocks/categories")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold flex-1">
          {stock.name} ({stock.symbol})
        </h1>
        <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Categories
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Price History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    price: {
                      label: "Price",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return `${date.getMonth() + 1}/${date.getDate()}`
                        }}
                      />
                      <YAxis domain={["auto", "auto"]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="price" stroke="var(--color-price)" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Current Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold">${stock.price.toFixed(2)}</p>
                <p className={`text-lg ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)} ({stock.change >= 0 ? "+" : ""}
                  {((stock.change / (stock.price - stock.change)) * 100).toFixed(2)}%)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Category</h3>
                  <p>{category?.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p>{stock.description}</p>
                </div>

                <div className="pt-4 flex justify-center">
                  <Button onClick={() => router.push(`/stocks/compare?stock1=${stock.symbol}`)}>
                    Compare with Another Stock
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
