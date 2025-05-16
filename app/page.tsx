import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, GamepadIcon, BarChart3 } from "lucide-react"
import StockCard from "@/components/stock-card"

export default function Home() {
  const trendingStocks = [
    { symbol: "TSLA", name: "Tesla, Inc." },
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "NVDA", name: "NVIDIA Corporation" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-indigo-700">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Make Finance Fun with StockToons</h1>
          <p className="text-xl text-white/90 mb-8">Learn, Play, and Invest with AI-powered tools for all ages</p>
          <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-white/90">
            <Link href="/learn">Explore Now</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-background border border-muted">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Learn</h3>
                    <p className="text-muted-foreground">
                      Understand stocks, markets, and financial terms through animated lessons.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border border-muted">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-pink-100 p-2 rounded-full">
                    <GamepadIcon className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Play</h3>
                    <p className="text-muted-foreground">
                      Engage in interactive games and quizzes to reinforce your knowledge.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border border-muted">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Explore</h3>
                    <p className="text-muted-foreground">
                      Track stock insights with charts, AI summaries, and bite-sized videos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Stocks Section */}
      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Trending Stocks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingStocks.map((stock) => (
              <StockCard key={stock.symbol} symbol={stock.symbol} name={stock.name} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
