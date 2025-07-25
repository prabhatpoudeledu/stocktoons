"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Star,
  Gift,
  BookOpen,
  Gamepad2,
  Video,
  Newspaper,
  Target,
  Award,
  Sparkles,
  Coins,
} from "lucide-react"
import Link from "next/link"
import { NewsWidget } from "@/components/news-widget"
import { HotNewsBanner } from "@/components/hot-news-banner"

export function HomePageKids() {
  const achievements = [
    { name: "First Stock Purchase", icon: Star, completed: true, points: 100 },
    { name: "Week Streak", icon: Target, completed: true, points: 50 },
    { name: "News Reader", icon: Newspaper, completed: false, points: 75 },
    { name: "Game Master", icon: Gamepad2, completed: false, points: 150 },
  ]

  const quickActions = [
    { name: "Play Stock Game", icon: Gamepad2, href: "/games", color: "from-purple-400 to-pink-400" },
    { name: "Watch Videos", icon: Video, href: "/videos", color: "from-blue-400 to-cyan-400" },
    { name: "Read News", icon: Newspaper, href: "/news", color: "from-green-400 to-emerald-400" },
    { name: "Learn Basics", icon: BookOpen, href: "/learn", color: "from-orange-400 to-red-400" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hot News Banner */}
        <HotNewsBanner />

        {/* Welcome Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text mb-4 bounce-gentle">
            Welcome to StockToons Kids! 🎉
          </h1>
          <p className="text-lg md:text-xl text-green-700 font-medium">
            Learn about money and stocks in the most fun way possible!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Progress & Achievements */}
          <div className="space-y-6">
            {/* Learning Progress */}
            <Card className="kids-mode card border-2 border-green-200 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Award className="h-5 w-5" />
                  Your Progress
                </CardTitle>
                <CardDescription className="text-green-600">Keep learning to unlock rewards!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-green-700">Learning Level</span>
                    <span className="text-sm text-green-600">Level 3</span>
                  </div>
                  <Progress value={65} className="h-3 bg-green-100" />
                  <p className="text-xs text-green-600 mt-1">350/500 XP to next level</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-green-700">Weekly Goal</span>
                    <span className="text-sm text-green-600">4/7 days</span>
                  </div>
                  <Progress value={57} className="h-3 bg-blue-100" />
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-yellow-600" />
                    <span className="font-bold text-yellow-700">StockCoins</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold">1,250</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="kids-mode card border-2 border-purple-200 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Sparkles className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 ${
                      achievement.completed
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-200"
                        : "bg-gray-50 border-gray-200 opacity-60"
                    }`}
                  >
                    <achievement.icon
                      className={`h-5 w-5 ${achievement.completed ? "text-green-600" : "text-gray-400"}`}
                    />
                    <div className="flex-1">
                      <p
                        className={`font-medium text-sm ${achievement.completed ? "text-green-700" : "text-gray-500"}`}
                      >
                        {achievement.name}
                      </p>
                      <p className={`text-xs ${achievement.completed ? "text-green-600" : "text-gray-400"}`}>
                        +{achievement.points} points
                      </p>
                    </div>
                    {achievement.completed && <Badge className="bg-green-500 text-white">✓</Badge>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Quick Actions */}
          <div className="space-y-6">
            <Card className="kids-mode card border-2 border-blue-200 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Target className="h-5 w-5" />
                  What do you want to do today?
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Button
                      className={`w-full h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${action.color} hover:scale-105 transform transition-all duration-200 text-white font-bold shadow-lg border-0 rounded-xl`}
                    >
                      <action.icon className="h-6 w-6" />
                      <span className="text-xs text-center leading-tight">{action.name}</span>
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Fun Stats */}
            <Card className="kids-mode card border-2 border-pink-200 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-pink-700">
                  <TrendingUp className="h-5 w-5" />
                  Your Fun Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700">12</div>
                    <div className="text-xs text-blue-600">Games Played</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">8</div>
                    <div className="text-xs text-green-600">Videos Watched</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-700">15</div>
                    <div className="text-xs text-purple-600">Articles Read</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg border border-orange-200">
                    <div className="text-2xl font-bold text-orange-700">5</div>
                    <div className="text-xs text-orange-600">Lessons Done</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - News & Updates */}
          <div className="space-y-6">
            <NewsWidget />

            {/* Today's Challenge */}
            <Card className="kids-mode card border-2 border-yellow-200 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-yellow-700">
                  <Gift className="h-5 w-5" />
                  Today's Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-4xl">🎯</div>
                  <h3 className="font-bold text-yellow-700">Stock Detective</h3>
                  <p className="text-sm text-yellow-600">
                    Find 3 companies that make toys and add them to your watchlist!
                  </p>
                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                    Start Challenge
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs text-yellow-600">
                    <Coins className="h-4 w-4" />
                    Reward: 200 StockCoins
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
