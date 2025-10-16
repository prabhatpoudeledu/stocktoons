"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Lightbulb, ArrowRight, RotateCcw, Home, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  hint: string
  explanation: string
}

interface Level {
  id: number
  name: string
  title: string
  description: string
  questions: Question[]
  color: string
  bgGradient: string
  icon: string
}

const gameData: Level[] = [
  {
    id: 1,
    name: "Beginner",
    title: "🌟 Stock Market Basics",
    description: "Learn the fundamentals of stocks and investing!",
    color: "emerald",
    bgGradient: "from-emerald-400 to-cyan-500",
    icon: "🌱",
    questions: [
      {
        id: 1,
        question: "What is a stock?",
        options: [
          "A piece of candy 🍬",
          "A share of ownership in a company 🏢",
          "A type of bank account 🏦",
          "A video game 🎮",
        ],
        correctAnswer: 1,
        hint: "Think about owning a small piece of your favorite company like Apple or Disney!",
        explanation:
          "Great job! A stock represents a small piece of ownership in a company. When you buy stock, you become a shareholder and own a tiny part of that business!",
      },
      {
        id: 2,
        question: "What happens when a company does really well?",
        options: [
          "Stock price usually goes down 📉",
          "Stock price usually goes up 📈",
          "Nothing happens 😐",
          "The company disappears 💨",
        ],
        correctAnswer: 1,
        hint: "When people want something more because it's good, what happens to its price?",
        explanation:
          "Exactly right! When a company performs well and makes good products, more people want to buy its stock, which usually makes the price go up!",
      },
      {
        id: 3,
        question: "What is the stock market?",
        options: [
          "A grocery store 🛒",
          "A place where people buy and sell stocks 📊",
          "A type of school 🏫",
          "A playground 🎪",
        ],
        correctAnswer: 1,
        hint: "It's like a big marketplace, but instead of fruits and vegetables, people trade something else...",
        explanation:
          "Perfect! The stock market is like a giant marketplace where people buy and sell pieces of companies (stocks). It's where all the trading happens!",
      },
    ],
  },
  {
    id: 2,
    name: "Intermediate",
    title: "🚀 Investment Strategies",
    description: "Discover smart ways to invest your money!",
    color: "blue",
    bgGradient: "from-blue-400 to-purple-500",
    icon: "🎯",
    questions: [
      {
        id: 4,
        question: 'What does "diversification" mean in investing?',
        options: [
          "Buying only one stock 1️⃣",
          "Spreading investments across different companies 🌈",
          "Selling all your stocks 💸",
          "Buying only expensive stocks 💎",
        ],
        correctAnswer: 1,
        hint: "Remember the saying: Don't put all your eggs in one basket! 🥚🧺",
        explanation:
          "Awesome! Diversification means spreading your money across different investments to reduce risk. It's like having different toys instead of just one!",
      },
      {
        id: 5,
        question: "What is a dividend?",
        options: [
          "A math problem ➗",
          "Money a company pays to shareholders 💰",
          "A type of stock 📜",
          "A trading fee 💳",
        ],
        correctAnswer: 1,
        hint: "It's like getting a bonus or allowance for owning part of a company!",
        explanation:
          "Fantastic! A dividend is money that some companies pay to their shareholders as a reward for owning their stock. It's like getting paid for being an owner!",
      },
      {
        id: 6,
        question: 'What does "bull market" mean?',
        options: [
          "A market where bulls are sold 🐂",
          "When stock prices are generally rising 📈",
          "When stock prices are falling 📉",
          "A market that's closed 🚫",
        ],
        correctAnswer: 1,
        hint: "Think about how a bull moves - it charges forward and upward with its horns!",
        explanation:
          "Excellent! A bull market is when stock prices are generally going up over time, like a bull charging forward and upward!",
      },
    ],
  },
  {
    id: 3,
    name: "Advanced",
    title: "🏆 Market Mastery",
    description: "Master advanced concepts and become a stock market pro!",
    color: "purple",
    bgGradient: "from-purple-500 to-pink-500",
    icon: "👑",
    questions: [
      {
        id: 7,
        question: "What is market capitalization (market cap)?",
        options: [
          "The total value of all a company's stocks 💎",
          "The number of employees 👥",
          "The company's age 📅",
          "The CEO's salary 💵",
        ],
        correctAnswer: 0,
        hint: "It's how much the whole company is worth if you added up all its stock pieces!",
        explanation:
          "Outstanding! Market cap is the total value of all a company's stocks combined. It shows how much the entire company is worth in the stock market!",
      },
      {
        id: 8,
        question: "What does P/E ratio stand for?",
        options: [
          "Price-to-Earnings ratio 📊",
          "Profit-to-Expenses ratio 💰",
          "People-to-Employees ratio 👥",
          "Price-to-Energy ratio ⚡",
        ],
        correctAnswer: 0,
        hint: "It compares how much you pay for a stock versus how much money the company makes!",
        explanation:
          "Brilliant! P/E ratio (Price-to-Earnings) helps you see if a stock is expensive or cheap compared to how much profit the company makes!",
      },
      {
        id: 9,
        question: 'What does "volatility" mean in the stock market?',
        options: [
          "How loud the stock market is 🔊",
          "How much stock prices change up and down 🎢",
          "How many people trade stocks 👥",
          "How old a company is 📅",
        ],
        correctAnswer: 1,
        hint: "Think of a roller coaster - some rides are smooth, others are very bumpy and exciting!",
        explanation:
          "Amazing! Volatility measures how much a stock's price goes up and down. High volatility means big price swings, like a wild roller coaster ride!",
      },
    ],
  },
]

interface UserProgress {
  currentLevel: number
  currentQuestion: number
  completedLevels: number[]
  totalScore: number
  lastPlayed: string
  userId: string
}

export default function StockAdventurePage() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [progress, setProgress] = useState<UserProgress>({
    currentLevel: 0,
    currentQuestion: 0,
    completedLevels: [],
    totalScore: 0,
    lastPlayed: new Date().toISOString(),
    userId: "player_" + Math.random().toString(36).substr(2, 9),
  })
  const [gameCompleted, setGameCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showCelebration, setShowCelebration] = useState(false)

  // Load progress on component mount
  useEffect(() => {
    loadProgress()
  }, [])

  // Save progress whenever it changes
  useEffect(() => {
    if (!loading) {
      saveProgress()
    }
  }, [progress, loading])

  const loadProgress = async () => {
    try {
      // Load from localStorage first
      const localProgress = localStorage.getItem("stockAdventureProgress")
      if (localProgress) {
        const parsed = JSON.parse(localProgress)
        setProgress(parsed)
        setCurrentLevel(parsed.currentLevel)
        setCurrentQuestion(parsed.currentQuestion)

        // Check if game is completed
        if (parsed.completedLevels.length === gameData.length) {
          setGameCompleted(true)
        }
      }

      // Try to sync with server
      try {
        const response = await fetch("/api/progress")
        if (response.ok) {
          const serverProgress = await response.json()
          if (
            serverProgress &&
            serverProgress.lastPlayed > (localProgress ? JSON.parse(localProgress).lastPlayed : "")
          ) {
            setProgress(serverProgress)
            setCurrentLevel(serverProgress.currentLevel)
            setCurrentQuestion(serverProgress.currentQuestion)

            if (serverProgress.completedLevels.length === gameData.length) {
              setGameCompleted(true)
            }
          }
        }
      } catch (serverError) {
        console.log("Server sync failed, using local progress")
      }
    } catch (error) {
      console.error("Failed to load progress:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveProgress = async () => {
    try {
      // Save to localStorage
      localStorage.setItem("stockAdventureProgress", JSON.stringify(progress))

      // Try to save to server
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(progress),
        })
      } catch (serverError) {
        console.log("Server save failed, progress saved locally")
      }
    } catch (error) {
      console.error("Failed to save progress:", error)
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
    setShowResult(false)
    setShowHint(false)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const currentQ = gameData[currentLevel].questions[currentQuestion]
    const correct = selectedAnswer === currentQ.correctAnswer

    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      const newProgress = {
        ...progress,
        totalScore: progress.totalScore + 10,
        lastPlayed: new Date().toISOString(),
      }
      setProgress(newProgress)

      // Show celebration animation
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    }
  }

  const handleNextQuestion = () => {
    const isLastQuestion = currentQuestion === gameData[currentLevel].questions.length - 1
    const isLastLevel = currentLevel === gameData.length - 1

    if (isLastQuestion) {
      if (isLastLevel) {
        // Game completed!
        const newProgress = {
          ...progress,
          completedLevels: [...new Set([...progress.completedLevels, currentLevel])],
          lastPlayed: new Date().toISOString(),
        }
        setProgress(newProgress)
        setGameCompleted(true)
      } else {
        // Move to next level
        const newLevel = currentLevel + 1
        const newProgress = {
          ...progress,
          currentLevel: newLevel,
          currentQuestion: 0,
          completedLevels: [...new Set([...progress.completedLevels, currentLevel])],
          lastPlayed: new Date().toISOString(),
        }
        setProgress(newProgress)
        setCurrentLevel(newLevel)
        setCurrentQuestion(0)
      }
    } else {
      // Move to next question
      const newQuestion = currentQuestion + 1
      const newProgress = {
        ...progress,
        currentQuestion: newQuestion,
        lastPlayed: new Date().toISOString(),
      }
      setProgress(newProgress)
      setCurrentQuestion(newQuestion)
    }

    setSelectedAnswer(null)
    setShowResult(false)
    setShowHint(false)
  }

  const handleShowHint = () => {
    setShowHint(true)
  }

  const resetGame = () => {
    const resetProgress = {
      currentLevel: 0,
      currentQuestion: 0,
      completedLevels: [],
      totalScore: 0,
      lastPlayed: new Date().toISOString(),
      userId: "player_" + Math.random().toString(36).substr(2, 9),
    }
    setProgress(resetProgress)
    setCurrentLevel(0)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setShowHint(false)
    setGameCompleted(false)

    // Clear localStorage
    localStorage.removeItem("stockAdventureProgress")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-bold text-gray-700">Loading your adventure...</p>
          <p className="text-sm text-gray-500 mt-2">Get ready to learn about stocks! 🚀</p>
        </div>
      </div>
    )
  }

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-3xl mx-auto pt-8">
          <Card className="text-center p-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl">
            <CardContent className="space-y-6">
              <div className="text-8xl mb-4 animate-bounce">🏆</div>
              <h1 className="text-5xl font-bold mb-4">🎉 CONGRATULATIONS! 🎉</h1>
              <p className="text-2xl mb-6">{"You've completed the Stock Market Adventure!"}</p>
              <div className="bg-white/20 rounded-xl p-6 mb-6 backdrop-blur-sm">
                <p className="text-3xl font-bold mb-2">🌟 Final Score: {progress.totalScore} points</p>
                <p className="text-xl">📚 Levels Completed: {progress.completedLevels.length}/3</p>
                <p className="text-lg mt-2">🎓 You're now a Stock Market Expert!</p>
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={resetGame}
                  className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-6 py-3"
                  size="lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Play Again
                </Button>
                <Link href="/">
                  <Button className="bg-purple-700 hover:bg-purple-800 text-lg px-6 py-3" size="lg">
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentLevelData = gameData[currentLevel]
  const currentQuestionData = currentLevelData.questions[currentQuestion]
  const progressPercentage = ((currentQuestion + 1) / currentLevelData.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-8xl animate-ping">🎉</div>
        </div>
      )}

      <div className="max-w-5xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">🎮 Stock Market Adventure</h1>
          <p className="text-xl text-gray-600">Learn about stocks while having fun!</p>
        </div>

        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg">
            <CardContent className="p-6">
              <Trophy className="w-12 h-12 mx-auto mb-3" />
              <p className="font-bold text-lg">Total Score</p>
              <p className="text-3xl font-bold">{progress.totalScore}</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg">
            <CardContent className="p-6">
              <Star className="w-12 h-12 mx-auto mb-3" />
              <p className="font-bold text-lg">Current Level</p>
              <p className="text-3xl font-bold">{currentLevelData.name}</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="text-4xl mb-3">{currentLevelData.icon}</div>
              <p className="font-bold text-lg">Progress</p>
              <p className="text-3xl font-bold">
                {currentQuestion + 1}/{currentLevelData.questions.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Game Card */}
        <Card className={`bg-gradient-to-br ${currentLevelData.bgGradient} text-white mb-8 shadow-2xl`}>
          <CardHeader className="p-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="text-3xl mb-3">{currentLevelData.title}</CardTitle>
                <p className="text-xl text-white/90">{currentLevelData.description}</p>
              </div>
              <Badge variant="secondary" className="text-xl px-4 py-2 bg-white/20 text-white">
                Question {currentQuestion + 1} of {currentLevelData.questions.length}
              </Badge>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Level Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-white/20" />
            </div>
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="mb-8 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardTitle className="text-2xl">{currentQuestionData.question}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestionData.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`p-6 h-auto text-left justify-start text-lg transition-all duration-200 ${
                    selectedAnswer === index
                      ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg scale-105"
                      : "hover:bg-blue-50 hover:border-blue-300 hover:scale-102"
                  } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className="font-bold text-xl mr-3 bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {selectedAnswer === index && <CheckCircle className="w-6 h-6 ml-2" />}
                </Button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center flex-wrap mb-6">
              {!showResult && (
                <>
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-3"
                    size="lg"
                  >
                    Submit Answer 🚀
                  </Button>
                  <Button
                    onClick={handleShowHint}
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 bg-transparent"
                    size="lg"
                  >
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Need a Hint? 💡
                  </Button>
                </>
              )}
            </div>

            {/* Hint Card */}
            {showHint && (
              <Card className="mb-6 bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-8 h-8 text-cyan-600 mt-1" />
                    <div>
                      <p className="font-bold text-cyan-800 text-lg mb-2">💡 Hint:</p>
                      <p className="text-cyan-700 text-lg">{currentQuestionData.hint}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Result Card */}
            {showResult && (
              <Card
                className={`shadow-xl ${isCorrect ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200" : "bg-gradient-to-r from-red-50 to-pink-50 border-red-200"}`}
              >
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{isCorrect ? "🎉" : "🤔"}</div>
                    <h3 className={`text-2xl font-bold mb-4 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                      {isCorrect ? "🌟 Awesome! You got it right!" : "🤗 Oops! Not quite right, but that's okay!"}
                    </h3>
                    <p className={`mb-6 text-lg ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                      {currentQuestionData.explanation}
                    </p>
                    {isCorrect ? (
                      <Button
                        onClick={handleNextQuestion}
                        className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
                        size="lg"
                      >
                        <ArrowRight className="w-5 h-5 mr-2" />
                        {currentQuestion === currentLevelData.questions.length - 1
                          ? currentLevel === gameData.length - 1
                            ? "🏆 Complete Adventure!"
                            : "🚀 Next Level!"
                          : "➡️ Next Question"}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setShowResult(false)
                          setSelectedAnswer(null)
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                        size="lg"
                      >
                        🔄 Try Again
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Level Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {gameData.map((level, index) => (
            <Card
              key={level.id}
              className={`transition-all duration-200 shadow-lg ${
                index === currentLevel
                  ? "ring-4 ring-blue-500 bg-blue-50 scale-105"
                  : progress.completedLevels.includes(index)
                    ? "bg-green-50 ring-2 ring-green-300"
                    : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{level.icon}</div>
                <h3 className="font-bold text-lg mb-2">{level.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{level.questions.length} questions</p>
                <div className="flex justify-center gap-2">
                  {progress.completedLevels.includes(index) && (
                    <Badge className="bg-green-500 text-white">
                      <Trophy className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                  {index === currentLevel && (
                    <Badge className="bg-blue-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Current
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-600">
            Keep learning and have fun! 🌟 Remember: investing is about patience and smart choices! 💡
          </p>
        </div>
      </div>
    </div>
  )
}
