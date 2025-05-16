import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, Maximize2 } from "lucide-react"

export default function LearnPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="w-full rounded-lg bg-slate-800 p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Intro to Stock Basics</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Start your investing journey with fundamental stock concepts
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </div>
          <div className="hidden md:block">
            <div className="relative h-64 w-full">
              <Image src="/placeholder.svg?height=400&width=600" alt="Stock chart" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Learning Section */}
      <h2 className="text-2xl font-bold mb-6">Interactive Learning</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-slate-800 hover:bg-slate-700 transition-colors">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="mb-4 mt-4">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Robot icon"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Stock Market Game</h3>
            <p className="text-sm text-muted-foreground mb-4">Practice trading in a risk-free environment</p>
            <Button variant="outline" className="mt-auto">
              Play Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 hover:bg-slate-700 transition-colors">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="mb-4 mt-4">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Quiz icon"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">Quizzes</h3>
            <p className="text-sm text-muted-foreground mb-4">Test your knowledge with interactive quizzes</p>
            <Button variant="outline" className="mt-auto">
              Start Quiz
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 hover:bg-slate-700 transition-colors">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="mb-4 mt-4">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Lightbulb icon"
                width={100}
                height={100}
                className="rounded-full"
              />
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
      <Card className="bg-slate-800 mb-12">
        <CardContent className="p-0">
          <div className="relative">
            <div className="aspect-video bg-slate-900 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=700"
                alt="Video thumbnail"
                width={700}
                height={400}
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
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
                <div className="h-1 flex-1 mx-2 bg-gray-600 rounded-full">
                  <div className="h-full w-1/3 bg-white rounded-full"></div>
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

      {/* Upcoming Earnings */}
      <h2 className="text-2xl font-bold mb-6">Upcoming Earnings</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["TSLA", "META", "NVDA", "NKE"].map((symbol, index) => (
          <Link key={index} href={`/stocks/${symbol}`}>
            <Card className="bg-white hover:bg-gray-100 transition-colors">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="mb-2">
                  <Image
                    src={`/placeholder.svg?height=60&width=60&text=${symbol}`}
                    alt={symbol}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <p className="text-lg font-bold text-slate-900">{symbol}</p>
                <p className="text-sm text-slate-600">
                  {symbol === "TSLA"
                    ? "Tesla, Inc."
                    : symbol === "META"
                      ? "Meta"
                      : symbol === "NVDA"
                        ? "NVIDIA"
                        : "Nike"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
