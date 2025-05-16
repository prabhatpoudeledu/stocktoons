import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import NewsCard from "@/components/news-card"

interface StockPageProps {
  params: {
    symbol: string
  }
}

export default function StockPage({ params }: StockPageProps) {
  const { symbol } = params

  // Mock data - in a real app, this would come from an API
  const stockData = {
    name:
      symbol === "TSLA"
        ? "Tesla, Inc."
        : symbol === "AAPL"
          ? "Apple Inc."
          : symbol === "NVDA"
            ? "NVIDIA Corporation"
            : `${symbol} Corp.`,
    price:
      symbol === "TSLA"
        ? 742.5
        : symbol === "AAPL"
          ? 182.63
          : symbol === "NVDA"
            ? 875.28
            : Math.floor(Math.random() * 1000),
    change:
      symbol === "TSLA"
        ? 2.3
        : symbol === "AAPL"
          ? 1.5
          : symbol === "NVDA"
            ? 3.2
            : (Math.random() * 5 - 2.5).toFixed(2),
  }

  const newsItems = [
    {
      title: `${stockData.name} expands Gigafactory`,
      content: `${stockData.name} is expanding its Texas Gigafactory to meet increased demand for EVs. Source: Reuters`,
    },
    {
      title: `${stockData.name} expands Gigafactory`,
      content: `${stockData.name} is expanding its Texas Gigafactory to meet increased demand for EVs. Source: Reuters`,
    },
    {
      title: `${stockData.name} expands Gigafactory`,
      content: `${stockData.name} is expanding its Texas Gigafactory to meet increased demand for EVs. Source: Reuters`,
    },
  ]

  const changeColor = Number.parseFloat(stockData.change.toString()) >= 0 ? "text-green-500" : "text-red-500"
  const changeSymbol = Number.parseFloat(stockData.change.toString()) >= 0 ? "+" : ""

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {symbol} - {stockData.name}
          </h1>
          <p className="flex items-center mt-1">
            <span className="text-xl font-semibold mr-2">${stockData.price}</span>
            <span className={`${changeColor}`}>
              ({changeSymbol}
              {stockData.change}%)
            </span>
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-background border border-muted hover:bg-muted">
          <Star className="mr-2 h-4 w-4 text-yellow-400" />
          Add to Watchlist
        </Button>
      </div>

      <Card className="mb-8 bg-slate-800">
        <CardContent className="p-6 flex items-center justify-center h-64">
          <p className="text-muted-foreground">[Mini Chart Placeholder]</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {newsItems.map((news, index) => (
          <NewsCard key={index} title={news.title} content={news.content} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">TrendView Chart</h2>
      <Card className="bg-slate-800">
        <CardContent className="p-6 flex items-center justify-center h-96">
          <p className="text-muted-foreground">[TradingView Chart Widget Placeholder]</p>
        </CardContent>
      </Card>
    </div>
  )
}
