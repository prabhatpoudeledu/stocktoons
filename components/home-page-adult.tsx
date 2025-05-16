"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ArrowRight, TrendingUp, BarChart3, PieChart, BookOpen, Video, Gamepad2 } from "lucide-react"
import NewsWidget from "@/components/news-widget"

export default function HomePageAdult() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2 bg-gradient-to-br from-blue-950/40 to-indigo-950/40 border-blue-900/50">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold">Welcome to StockToons</CardTitle>
            <CardDescription className="text-base md:text-lg">
              Your gateway to understanding the stock market and building wealth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              StockToons provides educational resources, market insights, and tools to help you make informed investment
              decisions.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-900/20">
                Market Education
              </Badge>
              <Badge variant="outline" className="bg-blue-900/20">
                Stock Analysis
              </Badge>
              <Badge variant="outline" className="bg-blue-900/20">
                Investment Tools
              </Badge>
              <Badge variant="outline" className="bg-blue-900/20">
                Portfolio Tracking
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            {!user ? (
              <Button onClick={() => router.push("/signup")} className="w-full sm:w-auto">
                Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => router.push("/watchlist")} className="w-full sm:w-auto">
                View Your Watchlist <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-green-950/40 to-emerald-950/40 border-green-900/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" /> Market Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>S&P 500</span>
                <span className="font-medium text-green-600">+1.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Nasdaq</span>
                <span className="font-medium text-green-600">+1.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Dow Jones</span>
                <span className="font-medium text-green-600">+0.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Russell 2000</span>
                <span className="font-medium text-red-600">-0.3%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/news")}>
              Latest Market News
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" /> Stock Categories
            </CardTitle>
            <CardDescription>Browse stocks by industry sector</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Explore stocks organized by industry categories to discover investment opportunities in different sectors.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/stocks/categories")}>
              Browse Categories
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" /> Stock Comparison
            </CardTitle>
            <CardDescription>Compare stocks side by side</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Compare key metrics and performance data between different stocks to make more informed investment
              decisions.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/stocks/compare")}>
              Compare Stocks
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" /> Learning Resources
            </CardTitle>
            <CardDescription>Educational content for investors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Video className="h-4 w-4 mr-2 text-blue-500" />
                <span>Video Tutorials</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                <span>Investment Guides</span>
              </div>
              <div className="flex items-center">
                <Gamepad2 className="h-4 w-4 mr-2 text-blue-500" />
                <span>Interactive Lessons</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/learn")}>
              Start Learning
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Latest Market News</h2>
        <NewsWidget />
      </div>
    </div>
  )
}
