import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ArrowUp, ArrowDown, Trash2 } from "lucide-react"
import Link from "next/link"

export default function WatchlistPage() {
  const watchlistStocks = [
    { symbol: "TSLA", name: "Tesla, Inc.", price: 742.5, change: 2.3 },
    { symbol: "AAPL", name: "Apple Inc.", price: 182.63, change: 1.5 },
    { symbol: "NVDA", name: "NVIDIA Corporation", price: 875.28, change: 3.2 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 415.25, change: 0.8 },
    { symbol: "AMZN", name: "Amazon.com, Inc.", price: 178.35, change: -0.5 },
    { symbol: "GOOG", name: "Alphabet Inc.", price: 165.84, change: -1.2 },
  ]

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Star className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="gainers">Gainers</TabsTrigger>
          <TabsTrigger value="losers">Losers</TabsTrigger>
          <TabsTrigger value="custom">Custom Lists</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-card chart-pattern">
            <CardContent className="p-0 relative z-10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Symbol</th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-right py-3 px-4">Price</th>
                      <th className="text-right py-3 px-4">Change</th>
                      <th className="text-center py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchlistStocks.map((stock) => {
                      const isPositive = stock.change >= 0
                      const changeColor = isPositive ? "positive" : "negative"
                      const changeIcon = isPositive ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )
                      const changeSymbol = isPositive ? "+" : ""

                      return (
                        <tr key={stock.symbol} className="border-b border-border hover:bg-secondary/30">
                          <td className="py-3 px-4">
                            <Link href={`/stocks/${stock.symbol}`} className="font-bold hover:text-primary">
                              {stock.symbol}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{stock.name}</td>
                          <td className="py-3 px-4 text-right">${stock.price.toFixed(2)}</td>
                          <td className={`py-3 px-4 text-right ${changeColor} flex items-center justify-end`}>
                            {changeIcon}
                            <span className="ml-1">
                              {changeSymbol}
                              {stock.change}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gainers" className="space-y-4">
          <Card className="bg-card p-6">
            <p>Stocks with positive performance</p>
          </Card>
        </TabsContent>

        <TabsContent value="losers" className="space-y-4">
          <Card className="bg-card p-6">
            <p>Stocks with negative performance</p>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card className="bg-card p-6">
            <p>Your custom stock lists</p>
          </Card>
        </TabsContent>
      </Tabs>

      <h2 className="text-2xl font-bold mt-12 mb-6">Performance Overview</h2>
      <Card className="bg-card candle-pattern">
        <CardContent className="p-6 flex items-center justify-center h-64 relative z-10">
          <p className="text-muted-foreground">[Performance Chart Placeholder]</p>
        </CardContent>
      </Card>
    </div>
  )
}
