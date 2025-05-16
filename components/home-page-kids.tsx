"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Gamepad2, Video, Rocket, PiggyBank, BarChart3, PieChart } from "lucide-react"

export default function HomePageKids() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">Welcome to StockToons Kids!</h1>
        <p className="text-xl text-purple-600">Learn about money and stocks in a fun way!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-4 border-purple-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-3"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-purple-700 flex items-center">
              <Rocket className="mr-2 h-6 w-6 text-purple-500" /> Stock Simulator
            </CardTitle>
            <CardDescription className="text-purple-600">Practice investing with play money!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Try buying and selling stocks without using real money. Learn how the stock market works while having fun!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-lg rounded-full"
              onClick={() => router.push("/kids/simulator")}
            >
              Start Simulator
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-4 border-blue-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-blue-700 flex items-center">
              <BarChart3 className="mr-2 h-6 w-6 text-blue-500" /> Stock Categories
            </CardTitle>
            <CardDescription className="text-blue-600">Explore different types of companies</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Discover different types of companies grouped by what they do, from technology to food to entertainment!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg rounded-full"
              onClick={() => router.push("/kids/stocks/categories")}
            >
              Explore Categories
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-4 border-green-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-3"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-green-700 flex items-center">
              <PieChart className="mr-2 h-6 w-6 text-green-500" /> Compare Stocks
            </CardTitle>
            <CardDescription className="text-green-600">See how companies are different</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Compare two companies side by side to see how they're different and learn what makes each one special!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-lg rounded-full"
              onClick={() => router.push("/kids/stocks/compare")}
            >
              Compare Stocks
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-4 border-yellow-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-400 h-3"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-yellow-700 flex items-center">
              <PiggyBank className="mr-2 h-6 w-6 text-yellow-500" /> Savings Calculator
            </CardTitle>
            <CardDescription className="text-yellow-600">Watch your money grow!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              See how your money can grow over time when you save regularly. It's like magic, but it's math!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-lg rounded-full"
              onClick={() => router.push("/kids/savings")}
            >
              Try Calculator
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-4 border-red-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-400 to-rose-400 h-3"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-red-700 flex items-center">
              <Video className="mr-2 h-6 w-6 text-red-500" /> Fun Videos
            </CardTitle>
            <CardDescription className="text-red-600">Watch and learn about money</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Watch fun videos that explain money, saving, and investing in a way that's easy to understand!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-lg rounded-full"
              onClick={() => router.push("/kids/videos")}
            >
              Watch Videos
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-4 border-orange-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-amber-400 h-3"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-orange-700 flex items-center">
              <Gamepad2 className="mr-2 h-6 w-6 text-orange-500" /> Money Games
            </CardTitle>
            <CardDescription className="text-orange-600">Play and learn at the same time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Play fun games that teach you about money, saving, and investing. Learning can be super fun!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 text-lg rounded-full"
              onClick={() => router.push("/kids/games")}
            >
              Play Games
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="border-4 border-purple-200 rounded-xl overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-purple-700">Did You Know?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg text-gray-700">
            If you saved $1 every day for a year and put it in a savings account, you could have over $365 plus extra
            money from interest!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-lg rounded-full"
            onClick={() => router.push("/kids/learn")}
          >
            Learn More Fun Facts
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
