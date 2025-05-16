import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, Maximize2 } from "lucide-react"

export default function LearnPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="w-full rounded-lg bg-card chart-pattern p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">Intro to Stock Basics</h1>
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
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Learning Section */}
      <h2 className="text-2xl font-bold mb-6">Interactive Learning</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="mb-4 mt-4">
              <div className="w-24 h-24 bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Stock Market Game</h3>
            <p className="text-sm text-muted-foreground mb-4">Practice trading in a risk-free environment</p>
            <Button variant="outline" className="mt-auto">
              Play Now
            </Button>
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
            <Button variant="outline" className="mt-auto">
              Start Quiz
            </Button>
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
            <Button variant="outline" className="mt-auto">
              Explore
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Video Section */}
      <h2 className="text-2xl font-bold mb-6">AI-Generated Video Explanations</h2>
      <Card className="bg-card mb-12">
        <CardContent className="p-0">
          <div className="relative">
            <div className="aspect-video bg-secondary/50 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=700&text=Video+Thumbnail"
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
              <h3 className="text-xl font-bold mb-1">Saving & Investing for Kids</h3>
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

      {/* Learning Modules */}
      <h2 className="text-2xl font-bold mb-6">Learning Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          "Understanding Stock Markets",
          "Technical Analysis Basics",
          "Fundamental Analysis",
          "Investment Strategies",
          "Risk Management",
          "Portfolio Diversification",
        ].map((module, index) => (
          <Card key={index} className="bg-card border border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">{module}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Learn the essential concepts and strategies behind successful {module.toLowerCase()}.
              </p>
              <Button variant="outline" size="sm">
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
