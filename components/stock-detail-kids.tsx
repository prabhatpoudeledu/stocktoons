"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Info } from "lucide-react"
import { getStockBySymbol, getCategoryById } from "@/data/stock-categories"
import { useRouter } from "next/navigation"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock historical data for the chart
const generateHistoricalData = (price: number, days = 30) => {
  const data = []
  let currentPrice = price

  for (let i = days; i >= 0; i--) {
    // Random price fluctuation between -2% and +2%
    const change = currentPrice * (Math.random() * 0.04 - 0.02)
    currentPrice = Number((currentPrice + change).toFixed(2))

    data.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: currentPrice,
    })
  }

  return data
}

interface StockDetailKidsProps {
  symbol: string
}

export default function StockDetailKids({ symbol }: StockDetailKidsProps) {
  const router = useRouter()
  const stock = getStockBySymbol(symbol)

  if (!stock) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <Card className="border-4 border-purple-300 rounded-xl shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold text-purple-700">Company not found</h2>
            <Button
              className="mt-6 text-lg font-bold border-2 border-purple-300 hover:bg-purple-100"
              onClick={() => router.push("/kids/stocks/categories")}
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Categories
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const category = getCategoryById(stock.category)
  const historicalData = generateHistoricalData(stock.price)

  // Determine color theme based on stock change
  const themeColor = stock.change >= 0 ? "green" : "red"
  const bgColor = stock.change >= 0 ? "bg-green-50" : "bg-red-50"
  const borderColor = stock.change >= 0 ? "border-green-300" : "border-red-300"
  const headerBgColor = stock.change >= 0 ? "bg-green-100" : "bg-red-100"
  const textColor = stock.change >= 0 ? "text-green-700" : "text-red-700"
  const buttonBgColor = stock.change >= 0 ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className={`w-full border-4 rounded-xl shadow-lg ${borderColor} ${bgColor}`}>
        <CardHeader className={headerBgColor}>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className={`text-3xl font-bold ${textColor}`}>{stock.name}</CardTitle>
              <CardDescription className={`text-xl ${textColor}`}>{stock.symbol}</CardDescription>
            </div>
            <Button
              variant="outline"
              className="text-lg font-bold border-2 border-purple-300 hover:bg-purple-100 bg-transparent"
              onClick={() => router.push("/kids/stocks/categories")}
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Categories
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className={`border-4 ${borderColor} rounded-xl shadow-md`}>
              <CardHeader className={headerBgColor}>
                <CardTitle className={`text-2xl ${textColor}`}>Price</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold">${stock.price.toFixed(2)}</span>
                  <span className={`text-xl ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stock.change >= 0 ? "↑" : "↓"} {Math.abs(stock.change).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className={`border-4 ${borderColor} rounded-xl shadow-md`}>
              <CardHeader className={headerBgColor}>
                <CardTitle className={`text-2xl ${textColor}`}>Historical Data</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer
                  config={{
                    price: {
                      label: "Price",
                      color: `hsl(var(--${themeColor}-500))`,
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="price" stroke={`var(--color-price)`} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className={`mt-6 border-4 ${borderColor} rounded-xl shadow-md`}>
            <CardHeader className={headerBgColor}>
              <CardTitle className={`text-2xl ${textColor}`}>About {stock.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">What They Do:</h3>
                  <p className="text-lg">{stock.kidsDescription}</p>
                </div>

                <div>
                  <h3 className="font-medium text-lg">Category:</h3>
                  <p className="text-lg">{category?.name}</p>
                </div>

                <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
                  <h3 className="font-bold text-blue-800">Did You Know?</h3>
                  <p className="text-blue-800">
                    When a stock price goes {stock.change >= 0 ? "up" : "down"}, it means the company is worth{" "}
                    {stock.change >= 0 ? "more" : "less"} money than before!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-center gap-4">
            <Button
              className={buttonBgColor}
              onClick={() => router.push(`/kids/stocks/compare?stock1=${stock.symbol}`)}
            >
              <Info className="mr-2 h-5 w-5" /> Compare With Another Stock
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
