import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, GamepadIcon, Video, Lightbulb, TrendingUp, Search, MessageSquare } from 'lucide-react'

export default function HomePageKids() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-purple-600 to-blue-600">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Welcome to StockToons for Kids!</h1>
          <p className="text-xl text-white/90 mb-8">Learn about money and investing in a fun way!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link href="/learn">Start Learning</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white/20"
            >
              <Link href="/kids/simulator">
                <TrendingUp className="mr-2 h-5 w-5" />
                Try Stock Adventure
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Fun Categories */}
      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Explore and Learn</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/learn">
              <Card className="bg-blue-500/20 border-blue-500/30 hover:border-blue-500 transition-colors h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <BookOpen className="h-12 w-12 mb-4 text-blue-500" />
                  <h3 className="text-xl font-bold mb-2">Learn</h3>
                  <p className="text-sm">Fun lessons about money and saving</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/games">
              <Card className="bg-green-500/20 border-green-500/30 hover:border-green-500 transition-colors h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <GamepadIcon className="h-12 w-12 mb-4 text-green-500" />
                  <h3 className="text-xl font-bold mb-2">Games</h3>
                  <p className="text-sm">Play fun games and learn at the same time</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/videos">
              <Card className="bg-red-500/20 border-red-500/30 hover:border-red-500 transition-colors h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Video className="h-12 w-12 mb-4 text-red-500" />
                  <h3 className="text-xl font-bold mb-2">Videos</h3>
                  <p className="text-sm">Watch cool videos about money</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/learn">
              <Card className="bg-yellow-500/20 border-yellow-500/30 hover:border-yellow-500 transition-colors h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Lightbulb className="h-12 w-12 mb-4 text-yellow-500" />
                  <h3 className="text-xl font-bold mb-2">Activities</h3>
                  <p className="text-sm">Fun activities to practice what you learn</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* New Stock Adventure Promo */}
      <section className="w-full py-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Try Stock Adventure!</h2>
              <p className="text-lg mb-6">
                Learn how to invest with our fun stock market game! Buy and sell stocks, complete missions, and see if
                you can grow your money!
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  <Link href="/kids/simulator">Start Playing</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/learn">Learn More First</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-white/10 rounded-lg">
                  <Search className="h-5 w-5 mr-2 text-blue-400" />
                  <div>
                    <h3 className="font-bold text-sm">Research Real Companies</h3>
                    <p className="text-xs text-muted-foreground">Learn about real stocks like Apple and Disney!</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-white/10 rounded-lg">
                  <MessageSquare className="h-5 w-5 mr-2 text-purple-400" />
                  <div>
                    <h3 className="font-bold text-sm">Virtual Advisor</h3>
                    <p className="text-xs text-muted-foreground">Get tips from Penny, your investing helper!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-80">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Stock+Adventure+Game"
                alt="Stock Adventure Game"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="w-full py-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border border-border hover:border-primary/50 transition-colors overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=200&width=350&text=Saving+Money"
                  alt="Saving Money"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">What is Money?</h3>
                <p className="text-sm text-muted-foreground mb-4">Learn about what money is and how it works</p>
                <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/learn">Watch Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:border-primary/50 transition-colors overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=200&width=350&text=Saving+Game"
                  alt="Saving Game"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">Saving Challenge</h3>
                <p className="text-sm text-muted-foreground mb-4">Play a fun game about saving money for goals</p>
                <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/games">Play Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:border-primary/50 transition-colors overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=200&width=350&text=Stock+Basics"
                  alt="Stock Basics"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">What are Stocks?</h3>
                <p className="text-sm text-muted-foreground mb-4">Learn about stocks in a simple, fun way</p>
                <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/learn">Learn Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fun Stock Tools */}
      <section className="w-full py-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Fun Stock Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/50 hover:border-blue-500 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-3xl mb-4">
                  ⚖️
                </div>
                <h3 className="text-xl font-bold mb-2">Compare Stocks</h3>
                <p className="text-muted-foreground mb-4">
                  Pick different stocks and see how they compare! Learn what makes each company special.
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/kids/stocks/compare">Compare Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border-2 border-green-500/50 hover:border-green-500 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-3xl mb-4">
                  🗂️
                </div>
                <h3 className="text-xl font-bold mb-2">Stock Categories</h3>
                <p className="text-muted-foreground mb-4">
                  Explore different types of companies! See how they're grouped by what they do.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/kids/stocks/categories">Explore Categories</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Meet the StockToons Characters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Penny", "Buck", "Stella", "Max"].map((character, index) => (
              <Card key={index} className="bg-card border border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <span className="text-4xl">
                      {index === 0 ? "💰" : index === 1 ? "📈" : index === 2 ? "🌟" : "🚀"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{character}</h3>
                  <p className="text-sm text-muted-foreground">
                    {index === 0
                      ? "Teaches about saving"
                      : index === 1
                        ? "Explains investing"
                        : index === 2
                          ? "Shows how stocks work"
                          : "Talks about future goals"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Section */}
      <section className="w-full py-12 bg-blue-900/20">
        <div className="container px-4 md:px-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">For Parents</h2>
            <p className="text-muted-foreground mb-4">
              StockToons helps children learn about money, saving, and basic investing concepts in a fun,
              age-appropriate way. Our content is designed by financial education experts and child development
              specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline">
                <Link href="/about">Learn More</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/signup">Create Parent Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
