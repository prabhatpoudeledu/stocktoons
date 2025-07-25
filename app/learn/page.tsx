"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  BookOpen,
  Trophy,
  Clock,
  Users,
  Star,
  CheckCircle,
  PlayCircle,
  FileText,
  Calculator,
  TrendingUp,
  PieChart,
  Shield,
  Target,
  Lightbulb,
  Award,
  Lock,
} from "lucide-react"
import { useDisplayMode } from "@/contexts/display-mode-context"

interface Course {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  progress: number
  lessons: number
  enrolled: number
  rating: number
  instructor: string
  topics: string[]
  isLocked?: boolean
}

interface LearningPath {
  id: string
  title: string
  description: string
  courses: string[]
  totalDuration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

const courses: Course[] = [
  {
    id: "stock-basics",
    title: "Stock Market Fundamentals",
    description: "Learn the essential concepts of stock markets, how they work, and why companies go public.",
    duration: "2h 30m",
    difficulty: "Beginner",
    progress: 75,
    lessons: 12,
    enrolled: 15420,
    rating: 4.8,
    instructor: "Sarah Johnson",
    topics: ["What are stocks?", "Stock exchanges", "Market participants", "Stock prices"],
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis Mastery",
    description: "Master chart patterns, indicators, and technical analysis tools to make informed trading decisions.",
    duration: "4h 15m",
    difficulty: "Intermediate",
    progress: 30,
    lessons: 18,
    enrolled: 8930,
    rating: 4.7,
    instructor: "Michael Chen",
    topics: ["Chart patterns", "Moving averages", "RSI", "MACD", "Support & Resistance"],
  },
  {
    id: "fundamental-analysis",
    title: "Fundamental Analysis Deep Dive",
    description: "Analyze company financials, ratios, and economic indicators to evaluate stock value.",
    duration: "3h 45m",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 15,
    enrolled: 6750,
    rating: 4.9,
    instructor: "David Rodriguez",
    topics: ["Financial statements", "P/E ratios", "DCF models", "Industry analysis"],
  },
  {
    id: "portfolio-management",
    title: "Portfolio Management Strategies",
    description: "Build and manage diversified portfolios with proper risk management techniques.",
    duration: "3h 20m",
    difficulty: "Advanced",
    progress: 0,
    lessons: 14,
    enrolled: 4200,
    rating: 4.6,
    instructor: "Lisa Wang",
    topics: ["Asset allocation", "Diversification", "Risk management", "Rebalancing"],
    isLocked: true,
  },
  {
    id: "options-trading",
    title: "Options Trading Fundamentals",
    description: "Understand options contracts, strategies, and how to use them for hedging and speculation.",
    duration: "5h 10m",
    difficulty: "Advanced",
    progress: 0,
    lessons: 22,
    enrolled: 3100,
    rating: 4.5,
    instructor: "Robert Kim",
    topics: ["Call options", "Put options", "Greeks", "Strategies", "Risk management"],
    isLocked: true,
  },
  {
    id: "crypto-investing",
    title: "Cryptocurrency Investment Guide",
    description: "Navigate the world of digital assets and blockchain technology for investment opportunities.",
    duration: "2h 55m",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 11,
    enrolled: 9800,
    rating: 4.4,
    instructor: "Alex Thompson",
    topics: ["Blockchain basics", "Major cryptocurrencies", "DeFi", "Wallet security"],
  },
]

const learningPaths: LearningPath[] = [
  {
    id: "beginner-investor",
    title: "Complete Beginner Investor",
    description: "Start from zero and build a solid foundation in investing",
    courses: ["stock-basics", "fundamental-analysis", "portfolio-management"],
    totalDuration: "9h 35m",
    difficulty: "Beginner",
  },
  {
    id: "technical-trader",
    title: "Technical Trading Expert",
    description: "Master technical analysis and short-term trading strategies",
    courses: ["stock-basics", "technical-analysis", "options-trading"],
    totalDuration: "11h 55m",
    difficulty: "Intermediate",
  },
  {
    id: "long-term-investor",
    title: "Long-term Wealth Builder",
    description: "Focus on fundamental analysis and long-term wealth building",
    courses: ["stock-basics", "fundamental-analysis", "portfolio-management"],
    totalDuration: "9h 35m",
    difficulty: "Intermediate",
  },
]

export default function LearnPage() {
  const { displayMode } = useDisplayMode()
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-yellow-500"
      case "Advanced":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyTextColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600"
      case "Intermediate":
        return "text-yellow-600"
      case "Advanced":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="w-full rounded-lg bg-card chart-pattern p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">
              {displayMode === "kids" ? "Learn About Money & Investing!" : "Master Financial Markets"}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {displayMode === "kids"
                ? "Fun and easy lessons to understand how money works and grows!"
                : "Comprehensive courses from beginner to advanced level investing"}
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm">50,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm">4.7 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm">Certificate Included</span>
              </div>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              {displayMode === "kids" ? "Start Learning!" : "Start Learning Today"}
            </Button>
          </div>
          <div className="hidden md:block relative z-10">
            <div className="relative h-64 w-full">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Learning+Dashboard"
                alt="Learning dashboard"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <div className="flex gap-2">
              <Badge variant="outline">All Levels</Badge>
              <Badge variant="outline">Self-Paced</Badge>
              <Badge variant="outline">Certificate</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                className={`bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer ${course.isLocked ? "opacity-60" : ""}`}
                onClick={() => !course.isLocked && setSelectedCourse(course)}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                    {course.isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{course.rating}</span>
                      <span className="text-xs text-muted-foreground">({course.enrolled.toLocaleString()})</span>
                    </div>
                    <Button size="sm" variant={course.progress > 0 ? "default" : "outline"} disabled={course.isLocked}>
                      {course.isLocked ? "Locked" : course.progress > 0 ? "Continue" : "Start"}
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground">Instructor: {course.instructor}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="paths" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Learning Paths</h2>
            <p className="text-muted-foreground">Structured learning journeys to achieve your investment goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="bg-card border border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getDifficultyColor(path.difficulty)}>{path.difficulty}</Badge>
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{path.totalDuration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{path.courses.length} courses</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Included Courses:</h4>
                    {path.courses.map((courseId) => {
                      const course = courses.find((c) => c.id === courseId)
                      return (
                        <div key={courseId} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{course?.title}</span>
                        </div>
                      )
                    })}
                  </div>

                  <Button className="w-full">Start Learning Path</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Interactive Learning</h2>
            <p className="text-muted-foreground">Hands-on tools and simulations to practice your skills</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 mt-4">
                  <div className="w-24 h-24 bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Calculator className="h-12 w-12 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Investment Calculator</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Calculate compound interest, returns, and plan your investments
                </p>
                <Button variant="outline" className="mt-auto bg-transparent">
                  Open Calculator
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 mt-4">
                  <div className="w-24 h-24 bg-green-900/30 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-12 w-12 text-green-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Stock Simulator</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Practice trading with virtual money in real market conditions
                </p>
                <Button variant="outline" className="mt-auto bg-transparent">
                  Start Simulation
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 mt-4">
                  <div className="w-24 h-24 bg-purple-900/30 rounded-full flex items-center justify-center">
                    <PieChart className="h-12 w-12 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Portfolio Builder</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Build and analyze diversified investment portfolios
                </p>
                <Button variant="outline" className="mt-auto bg-transparent">
                  Build Portfolio
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 mt-4">
                  <div className="w-24 h-24 bg-red-900/30 rounded-full flex items-center justify-center">
                    <Shield className="h-12 w-12 text-red-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Risk Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Evaluate your risk tolerance and investment profile
                </p>
                <Button variant="outline" className="mt-auto bg-transparent">
                  Take Assessment
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 mt-4">
                  <div className="w-24 h-24 bg-yellow-900/30 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-12 w-12 text-yellow-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Market Quiz</h3>
                <p className="text-sm text-muted-foreground mb-4">Test your knowledge with interactive quizzes</p>
                <Button variant="outline" className="mt-auto bg-transparent">
                  Start Quiz
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 mt-4">
                  <div className="w-24 h-24 bg-indigo-900/30 rounded-full flex items-center justify-center">
                    <Award className="h-12 w-12 text-indigo-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Achievement Center</h3>
                <p className="text-sm text-muted-foreground mb-4">Track your progress and earn learning badges</p>
                <Button variant="outline" className="mt-auto bg-transparent">
                  View Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Learning Resources</h2>
            <p className="text-muted-foreground">Additional materials to supplement your learning journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Study Guides & Cheat Sheets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm">Financial Ratios Quick Reference</span>
                  <Button size="sm" variant="ghost">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm">Technical Analysis Patterns</span>
                  <Button size="sm" variant="ghost">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm">Investment Terms Glossary</span>
                  <Button size="sm" variant="ghost">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm">Portfolio Allocation Guide</span>
                  <Button size="sm" variant="ghost">
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5" />
                  Video Library
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium">Market Basics Explained</span>
                    <p className="text-xs text-muted-foreground">15 min • Beginner</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium">Reading Financial Statements</span>
                    <p className="text-xs text-muted-foreground">22 min • Intermediate</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium">Options Strategies Deep Dive</span>
                    <p className="text-xs text-muted-foreground">35 min • Advanced</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium">Crypto Investment Guide</span>
                    <p className="text-xs text-muted-foreground">28 min • Intermediate</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Video Section */}
          <Card className="bg-card">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-video bg-secondary/50 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=400&width=700&text=Featured+Video+Thumbnail"
                    alt="Featured video thumbnail"
                    width={700}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90 w-16 h-16">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold mb-2">Building Your First Investment Portfolio</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Learn how to create a diversified portfolio that matches your risk tolerance and investment goals.
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge>Featured</Badge>
                    <span className="text-sm">45 minutes</span>
                    <span className="text-sm">Intermediate</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Course Detail Modal/Overlay */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge className={getDifficultyColor(selectedCourse.difficulty)} className="mb-2">
                    {selectedCourse.difficulty}
                  </Badge>
                  <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
                  <p className="text-muted-foreground mt-2">{selectedCourse.description}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{selectedCourse.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">{selectedCourse.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{selectedCourse.enrolled.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{selectedCourse.rating} rating</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">What you'll learn:</h4>
                <div className="space-y-2">
                  {selectedCourse.topics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Instructor</h4>
                <p className="text-sm text-muted-foreground">{selectedCourse.instructor}</p>
              </div>

              {selectedCourse.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Your Progress</span>
                    <span>{selectedCourse.progress}%</span>
                  </div>
                  <Progress value={selectedCourse.progress} className="h-2" />
                </div>
              )}

              <div className="flex gap-3">
                <Button className="flex-1">{selectedCourse.progress > 0 ? "Continue Learning" : "Start Course"}</Button>
                <Button variant="outline">Add to Watchlist</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
