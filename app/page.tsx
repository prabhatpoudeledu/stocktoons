import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, Maximize2, BookOpen, GamepadIcon, BarChart3 } from "lucide-react"
import NewsWidget from "@/components/news-widget"

export default function Home() {
  const trendingStocks = [
    { symbol: "TSLA", name: "Tesla, Inc.", price: 742.5, change: 2.3 },
    { symbol: "AAPL", name: "Apple Inc.", price: 182.63, change: 1.5 },
    { symbol: "NVDA", name: "NVIDIA Corporation", price: 875.28, change: -1.2 },
  ]

  const upcomingEarnings = [
    { symbol: "TSLA", name: "Tesla, Inc.", color: "#E82127" },
    { symbol: "META", name: "Meta", color: "#0668E1" },
    { symbol: "NVDA", name: "NVIDIA", color: "#76B900" },
    { symbol: "NKE", name: "Nike", color: "#000000" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Make Finance Fun with StockToons</h1>
          <p className="text-xl text-white/90 mb-8">Learn, Play, and Invest with AI-powered tools for all ages</p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/learn">Explore Now</Link>
          </Button>
        </div>
      </section>

      {/* Video Section - Moved up as requested */}
      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Daily Stock News Summary</h2>
          <Card className="overflow-hidden chart-pattern">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-video bg-card/50 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=400&width=700&text=Daily+Market+Update"
                    alt="Video thumbnail"
                    width={700}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold mb-1">Market Recap: Tech Stocks Rally</h3>
                  <div className="flex items-center mt-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Pause className="h-4 w-4" />
                    </Button>
                    <div className="h-1 flex-1 mx-2 bg-muted rounded-full">
                      <div className="h-full w-1/3 bg-primary rounded-full"></div>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* News and Intro to Stock Basics Section */}
      <section className="w-full py-12 bg-secondary/30 candle-pattern">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 md:p-8">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-4">Intro to Stock Basics</h2>
                    <p className="text-xl text-muted-foreground mb-6">
                      Start your investing journey with fundamental stock concepts
                    </p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Get Started
                    </Button>
                  </div>
                  <div className="hidden md:block relative z-10">
                    <div className="relative h-64 w-full">
                      <Image
                        src="/placeholder.svg?height=400&width=600&text=Stock+Chart"
                        alt="Stock chart"
                        width={600}
                        height={400}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <NewsWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Learn, Play, and Explore</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-900/30 p-2 rounded-full">
                    <BookOpen className="h-6 w-6 text-primary" />
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

            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-pink-900/30 p-2 rounded-full">
                    <GamepadIcon className="h-6 w-6 text-pink-400" />
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

            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-900/30 p-2 rounded-full">
                    <BarChart3 className="h-6 w-6 text-green-400" />
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

      {/* Interactive Learning Section */}
      <section className="w-full py-12 bg-secondary/30 chart-pattern">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Interactive Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 mt-4">
                  <div className="w-24 h-24 bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🤖</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Stock Market Game</h3>
                <p className="text-sm text-muted-foreground mb-4">Practice trading in a risk-free environment</p>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 mt-4">
                  <div className="w-24 h-24 bg-pink-900/30 rounded-full flex items-center justify-center">
                    <span className="text-3xl">📝</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Quizzes</h3>
                <p className="text-sm text-muted-foreground mb-4">Test your knowledge with interactive quizzes</p>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 mt-4">
                  <div className="w-24 h-24 bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-3xl">💡</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Concept Builder</h3>
                <p className="text-sm text-muted-foreground mb-4">Visualize complex financial concepts</p>
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
              <Link key={stock.symbol} href={`/stocks/${stock.symbol}`} className="block">
                <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{stock.symbol}</h3>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">${stock.price.toFixed(2)}</p>
                        <p className={stock.change >= 0 ? "positive text-sm" : "negative text-sm"}>
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change}%
                        </p>
                      </div>
                    </div>
                    <div className="h-12 w-full bg-secondary/50 rounded-md overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Chart preview</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Earnings */}
      <section className="w-full py-12 bg-secondary/30 candle-pattern">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 relative z-10">Upcoming Earnings</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {upcomingEarnings.map((company, index) => (
              <Link key={index} href={`/stocks/${company.symbol}`}>
                <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="mb-2">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${company.color}30` }}
                      >
                        <span className="text-2xl font-bold" style={{ color: company.color }}>
                          {company.symbol.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <p className="text-lg font-bold">{company.symbol}</p>
                    <p className="text-sm text-muted-foreground">{company.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
