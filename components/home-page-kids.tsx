"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gamepad2, BookOpen, Play, Trophy, TrendingUp, Coins, Target, Gift } from "lucide-react"
import Link from "next/link"
import { NewsWidget } from "./news-widget"

export function HomePageKids() {
  const learningProgress = [
    { topic: "What are Stocks?", progress: 85, color: "from-purple-300 to-pink-300" },
    { topic: "Saving Money", progress: 60, color: "from-blue-300 to-cyan-300" },
    { topic: "Smart Spending", progress: 40, color: "from-green-300 to-emerald-300" },
    { topic: "Investment Basics", progress: 25, color: "from-teal-300 to-cyan-300" },
  ]

  const funActivities = [
    {
      title: "Stock Simulator",
      description: "Practice trading with virtual money! 🎯",
      icon: TrendingUp,
      href: "/kids/simulator",
      gradient: "from-purple-300 to-pink-300",
      emoji: "📈",
    },
    {
      title: "Money Games",
      description: "Learn while having fun! 🎮",
      icon: Gamepad2,
      href: "/games",
      gradient: "from-blue-300 to-cyan-300",
      emoji: "🎲",
    },
    {
      title: "Learning Videos",
      description: "Watch and learn about money! 📺",
      icon: Play,
      href: "/videos",
      gradient: "from-green-300 to-emerald-300",
      emoji: "🎬",
    },
    {
      title: "Read & Learn",
      description: "Discover money secrets! 📚",
      icon: BookOpen,
      href: "/learn",
      gradient: "from-teal-300 to-cyan-300",
      emoji: "📖",
    },
  ]

  const achievements = [
    { name: "First Trade", earned: true, icon: "🏆" },
    { name: "Money Saver", earned: true, icon: "💰" },
    { name: "Smart Investor", earned: false, icon: "🧠" },
    { name: "Stock Expert", earned: false, icon: "⭐" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 via-blue-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 animate-bounce">
            Welcome to StockToons Kids! 🌟
          </h1>
          <p className="text-purple-700 text-lg">Let's learn about money and stocks together!</p>
        </div>

        {/* Fun Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card">
            <CardHeader className="bg-gradient-to-r from-purple-300 to-pink-300 text-purple-800 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Coins className="h-6 w-6" />
                <span>Virtual Money</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">$10,000</div>
              <p className="text-purple-600 font-medium">Ready to invest! 💪</p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader className="bg-gradient-to-r from-blue-300 to-cyan-300 text-blue-800 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Target className="h-6 w-6" />
                <span>Missions Done</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">7/10</div>
              <p className="text-blue-600 font-medium">Almost there! 🚀</p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader className="bg-gradient-to-r from-green-300 to-emerald-300 text-green-800 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Trophy className="h-6 w-6" />
                <span>Level</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">Level 3</div>
              <p className="text-green-600 font-medium">Money Explorer! 🗺️</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Progress */}
        <Card className="card">
          <CardHeader className="bg-gradient-to-r from-purple-300 to-pink-300 text-purple-800 rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span>Your Learning Journey 📚</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {learningProgress.map((item, index) => (
                <div key={item.topic} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{item.topic}</span>
                    <Badge className={`bg-gradient-to-r ${item.color} text-white border-0`}>{item.progress}%</Badge>
                  </div>
                  <Progress value={item.progress} className="h-3 bg-gray-200" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fun Activities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 text-center">
            Fun Activities! 🎉
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {funActivities.map((activity) => (
              <Link key={activity.title} href={activity.href}>
                <Card className="card cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${activity.gradient} flex items-center justify-center group-hover:animate-bounce`}
                    >
                      <span className="text-3xl">{activity.emoji}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 text-lg">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <Card className="card">
          <CardHeader className="bg-gradient-to-r from-teal-300 to-cyan-300 text-teal-800 rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-6 w-6" />
              <span>Your Achievements 🏆</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.name}
                  className={`p-4 rounded-lg text-center transition-all duration-300 ${
                    achievement.earned
                      ? "bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 hover:scale-105"
                      : "bg-gray-100 border border-gray-200 opacity-60"
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className={`text-sm font-medium ${achievement.earned ? "text-purple-700" : "text-gray-500"}`}>
                    {achievement.name}
                  </div>
                  {achievement.earned && <div className="text-xs text-purple-600 mt-1">Earned! ✨</div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Challenge */}
        <Card className="card">
          <CardHeader className="bg-gradient-to-r from-green-300 to-emerald-300 text-green-800 rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Gift className="h-6 w-6" />
              <span>Today's Challenge 🎯</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-200 to-emerald-200 flex items-center justify-center">
                <span className="text-3xl">🎪</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Learn about Apple Stock!</h3>
              <p className="text-gray-600 mb-4">
                Discover what makes Apple such a popular company and why people invest in it.
              </p>
              <Link href="/stocks/AAPL">
                <Button className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white">
                  Start Challenge! 🚀
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Kid-Friendly News */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Fun Money News! 📰
            </h2>
            <Link href="/news">
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent">
                Read More News
              </Button>
            </Link>
          </div>
          <NewsWidget limit={3} />
        </div>
      </div>
    </div>
  )
}
