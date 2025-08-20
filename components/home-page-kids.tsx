"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gamepad2, BookOpen, Play, Trophy, TrendingUp, Coins, Target, Gift, Star, Rocket } from "lucide-react"
import Link from "next/link"
import { NewsWidget } from "./news-widget"

export function HomePageKids() {
  const learningProgress = [
    { topic: "What are Stocks?", progress: 85, color: "from-emerald-300 to-emerald-400" },
    { topic: "Saving Money", progress: 60, color: "from-blue-300 to-blue-400" },
    { topic: "Smart Spending", progress: 40, color: "from-purple-300 to-purple-400" },
    { topic: "Investment Basics", progress: 25, color: "from-cyan-300 to-cyan-400" },
  ]

  const funActivities = [
    {
      title: "Stock Simulator",
      description: "Practice trading with virtual money! 🎯",
      icon: TrendingUp,
      href: "/kids/simulator",
      gradient: "from-emerald-400 to-emerald-500",
      emoji: "📈",
    },
    {
      title: "Money Games",
      description: "Learn while having fun! 🎮",
      icon: Gamepad2,
      href: "/games",
      gradient: "from-blue-400 to-blue-500",
      emoji: "🎲",
    },
    {
      title: "Learning Videos",
      description: "Watch and learn about money! 📺",
      icon: Play,
      href: "/videos",
      gradient: "from-purple-400 to-purple-500",
      emoji: "🎬",
    },
    {
      title: "Read & Learn",
      description: "Discover money secrets! 📚",
      icon: BookOpen,
      href: "/learn",
      gradient: "from-cyan-400 to-cyan-500",
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gradient-primary mb-4 animate-bounce">
            Welcome to StockToons Kids! 🌟
          </h1>
          <p className="text-purple-700 text-xl font-medium">Let's learn about money and stocks together!</p>
        </div>

        {/* Fun Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-primary">
            <CardHeader className="bg-gradient-to-r from-emerald-300 to-emerald-400 text-emerald-800 rounded-t-3xl">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Coins className="h-6 w-6" />
                <span>Virtual Money</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">$10,000</div>
              <p className="text-emerald-600 font-bold">Ready to invest! 💪</p>
            </CardContent>
          </Card>

          <Card className="card-secondary">
            <CardHeader className="bg-gradient-to-r from-blue-300 to-blue-400 text-blue-800 rounded-t-3xl">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Target className="h-6 w-6" />
                <span>Missions Done</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">7/10</div>
              <p className="text-blue-600 font-bold">Almost there! 🚀</p>
            </CardContent>
          </Card>

          <Card className="card-accent">
            <CardHeader className="bg-gradient-to-r from-purple-300 to-purple-400 text-purple-800 rounded-t-3xl">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Trophy className="h-6 w-6" />
                <span>Level</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">Level 3</div>
              <p className="text-purple-600 font-bold">Money Explorer! 🗺️</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Progress */}
        <Card className="card-primary">
          <CardHeader className="bg-gradient-to-r from-emerald-300 to-blue-300 text-slate-800 rounded-t-3xl">
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span>Your Learning Journey 📚</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {learningProgress.map((item, index) => (
                <div key={item.topic} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">{item.topic}</span>
                    <Badge className={`bg-gradient-to-r ${item.color} text-white border-0 font-bold`}>
                      {item.progress}%
                    </Badge>
                  </div>
                  <Progress value={item.progress} className="h-4 bg-slate-200" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fun Activities */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gradient-secondary mb-6 text-center">Fun Activities! 🎉</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {funActivities.map((activity) => (
              <Link key={activity.title} href={activity.href}>
                <Card className="card-primary cursor-pointer group hover-lift">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${activity.gradient} flex items-center justify-center group-hover:animate-bounce shadow-lg`}
                    >
                      <span className="text-4xl">{activity.emoji}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2 text-lg">{activity.title}</h3>
                    <p className="text-sm text-slate-600">{activity.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <Card className="bg-gradient-to-r from-cyan-100 to-blue-100 border-4 border-cyan-200 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-cyan-800">
              <Trophy className="h-6 w-6" />
              <span>Your Achievements 🏆</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.name}
                  className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                    achievement.earned
                      ? "bg-gradient-to-r from-emerald-100 to-emerald-200 border-2 border-emerald-300 hover:scale-105 shadow-lg"
                      : "bg-slate-100 border-2 border-slate-200 opacity-60"
                  }`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <div className={`text-sm font-bold ${achievement.earned ? "text-emerald-700" : "text-slate-500"}`}>
                    {achievement.name}
                  </div>
                  {achievement.earned && <div className="text-xs text-emerald-600 mt-1 font-medium">Earned! ✨</div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Challenge */}
        <Card className="bg-gradient-to-r from-purple-100 to-rose-100 border-4 border-purple-200 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <Gift className="h-6 w-6" />
              <span>Today's Challenge 🎯</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-200 to-rose-200 flex items-center justify-center shadow-lg">
                <span className="text-4xl">🎪</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Learn about Apple Stock!</h3>
              <p className="text-slate-600 mb-4 text-lg">
                Discover what makes Apple such a popular company and why people invest in it.
              </p>
              <Link href="/stocks/AAPL">
                <Button className="btn-primary text-lg px-8 py-4">Start Challenge! 🚀</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Kid-Friendly News */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gradient-accent">Fun Money News! 📰</h2>
            <Link href="/news">
              <Button
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-white font-bold rounded-2xl"
              >
                Read More News
              </Button>
            </Link>
          </div>
          <NewsWidget limit={3} />
        </div>

        {/* Fun Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-emerald-400 to-emerald-500 border-4 border-emerald-300 text-white rounded-3xl shadow-xl">
            <CardContent className="p-6 text-center">
              <Rocket className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">2,847</div>
              <div className="font-bold text-sm">Kids Learning!</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-400 to-blue-500 border-4 border-blue-300 text-white rounded-3xl shadow-xl">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">15,290</div>
              <div className="font-bold text-sm">Fun Lessons!</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-400 to-purple-500 border-4 border-purple-300 text-white rounded-3xl shadow-xl">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">98.7%</div>
              <div className="font-bold text-sm">Happy Kids!</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-400 to-cyan-500 border-4 border-cyan-300 text-white rounded-3xl shadow-xl">
            <CardContent className="p-6 text-center">
              <Gift className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">4.9/5</div>
              <div className="font-bold text-sm">Parent Love!</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
