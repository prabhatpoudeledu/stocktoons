"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Award,
  HelpCircle,
  DollarSign,
  Briefcase,
  Search,
  MessageSquare,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import KidsSimulatorHelp from "@/components/kids-simulator-help"
import StockResearchCard from "@/components/stock-research-card"
import VirtualAdvisor from "@/components/virtual-advisor"

// Real stock data with kid-friendly descriptions
const availableStocks = [
  {
    id: "aapl",
    name: "Apple",
    symbol: "AAPL",
    price: 188.52,
    change: 1.2,
    description: "Makes iPhones, iPads, and computers that people use every day!",
    color: "#A2AAAD",
    icon: "🍎",
    whatTheyDo:
      "Apple creates technology products like iPhones, iPads, and Mac computers. They also make software and services like Apple Music and Apple TV+.",
    customers: "Millions of people around the world use Apple products",
    whyBuy: [
      "Many people love and use Apple products",
      "They make new and exciting technology",
      "They have stores all over the world",
    ],
    funFacts: [
      "Apple started in a garage in 1976!",
      "The first Apple logo had Isaac Newton sitting under an apple tree.",
      "Apple's headquarters looks like a giant spaceship!",
    ],
  },
  {
    id: "msft",
    name: "Microsoft",
    symbol: "MSFT",
    price: 417.23,
    change: -0.5,
    description: "Creates Windows computers and Xbox video game systems!",
    color: "#00A4EF",
    icon: "💻",
    whatTheyDo:
      "Microsoft makes the Windows operating system that runs on many computers. They also make Xbox video game consoles and Office software like Word and Excel.",
    customers: "Schools, businesses, and gamers use Microsoft products",
    whyBuy: [
      "Almost every business uses Microsoft software",
      "They make popular Xbox video games",
      "They're working on exciting new technology",
    ],
    funFacts: [
      "Microsoft was started by Bill Gates when he was only 19 years old!",
      "The Xbox was named that because it uses DirectX technology.",
      "Microsoft's campus has treehouses where employees can work!",
    ],
  },
  {
    id: "dis",
    name: "Disney",
    symbol: "DIS",
    price: 101.32,
    change: 0.8,
    description: "Makes movies, TV shows, and has theme parks around the world!",
    color: "#113CCF",
    icon: "🏰",
    whatTheyDo:
      "Disney creates movies and TV shows, runs theme parks like Disney World, and owns channels like ESPN. They also own Marvel, Star Wars, and Pixar!",
    customers: "Families and people of all ages who love entertainment",
    whyBuy: [
      "They own many popular characters and movies",
      "Millions of people visit their theme parks",
      "They have Disney+, a popular streaming service",
    ],
    funFacts: [
      "Disney was founded in 1923, over 100 years ago!",
      "Mickey Mouse was almost named Mortimer Mouse.",
      "There are hidden Mickeys throughout Disney parks for visitors to find!",
    ],
  },
  {
    id: "nke",
    name: "Nike",
    symbol: "NKE",
    price: 93.45,
    change: -1.1,
    description: "Makes popular shoes, clothes, and sports equipment!",
    color: "#FF6B6B",
    icon: "👟",
    whatTheyDo:
      "Nike designs and sells athletic shoes, clothing, and equipment. Many famous athletes wear Nike products and appear in their commercials.",
    customers: "Athletes and people who like comfortable, stylish clothing",
    whyBuy: [
      "Their products are popular all over the world",
      "Many famous athletes partner with Nike",
      "They're always creating new designs",
    ],
    funFacts: [
      "The Nike 'swoosh' logo was designed by a student for just $35!",
      "The company was originally called 'Blue Ribbon Sports'.",
      "Nike is named after the Greek goddess of victory!",
    ],
  },
  {
    id: "sbux",
    name: "Starbucks",
    symbol: "SBUX",
    price: 77.18,
    change: 0.3,
    description: "Coffee shops that serve drinks and snacks all over the world!",
    color: "#00704A",
    icon: "☕",
    whatTheyDo:
      "Starbucks runs coffee shops where people can buy coffee, tea, and food. They have stores in countries all around the world.",
    customers: "People who enjoy coffee and a place to relax or work",
    whyBuy: [
      "They have thousands of stores worldwide",
      "Many people visit Starbucks every day",
      "They're always creating new drinks and treats",
    ],
    funFacts: [
      "Starbucks is named after a character in the book Moby Dick!",
      "The original Starbucks logo had a twin-tailed mermaid (siren).",
      "The largest Starbucks in the world is in Chicago and is 35,000 square feet!",
    ],
  },
  {
    id: "mcd",
    name: "McDonald's",
    symbol: "MCD",
    price: 254.82,
    change: 1.5,
    description: "Fast food restaurants famous for hamburgers and french fries!",
    color: "#FFC72C",
    icon: "🍔",
    whatTheyDo:
      "McDonald's runs fast food restaurants that serve hamburgers, chicken, french fries, and more. They have restaurants in almost every country.",
    customers: "People looking for quick, affordable meals",
    whyBuy: [
      "They have over 38,000 restaurants worldwide",
      "Millions of people eat at McDonald's every day",
      "They own valuable real estate all over the world",
    ],
    funFacts: [
      "The McDonald's 'M' logo is called the Golden Arches!",
      "The Monopoly game at McDonald's started in 1987.",
      "McDonald's sells more than 6.5 million hamburgers every day!",
    ],
  },
  {
    id: "nflx",
    name: "Netflix",
    symbol: "NFLX",
    price: 631.87,
    change: 2.3,
    description: "Streaming service with movies and TV shows you can watch anytime!",
    color: "#E50914",
    icon: "📺",
    whatTheyDo:
      "Netflix is a streaming service where people can watch movies and TV shows on their devices. They also create their own original shows and movies.",
    customers: "People who enjoy watching movies and TV shows at home",
    whyBuy: [
      "Millions of people subscribe to Netflix",
      "They create popular original shows and movies",
      "They're available in almost every country",
    ],
    funFacts: [
      "Netflix started as a DVD rental service that mailed DVDs to people's homes!",
      "Netflix users watch over 1 billion hours of content every week.",
      "The Netflix 'ta-dum' sound before shows was almost a goat sound instead!",
    ],
  },
  {
    id: "amzn",
    name: "Amazon",
    symbol: "AMZN",
    price: 178.15,
    change: -0.2,
    description: "Online store where you can buy almost anything and have it delivered!",
    color: "#FF9900",
    icon: "📦",
    whatTheyDo:
      "Amazon is an online marketplace where people can buy almost anything. They also have services like Prime Video and make devices like the Echo.",
    customers: "People who shop online and businesses that use their cloud services",
    whyBuy: [
      "Millions of people shop on Amazon every day",
      "They deliver packages quickly all over the world",
      "They're always expanding into new businesses",
    ],
    funFacts: [
      "Amazon started as an online bookstore in 1994!",
      "The Amazon logo has an arrow from A to Z, showing they sell everything.",
      "Amazon ships over 1.6 million packages every day!",
    ],
  },
]

// Missions data
const missions = [
  {
    id: "mission-1",
    title: "First Investment",
    description: "Buy your first stock",
    reward: 100,
    icon: "🚀",
    completed: false,
  },
  {
    id: "mission-2",
    title: "Diversify",
    description: "Own 3 different stocks",
    reward: 200,
    icon: "🌈",
    completed: false,
  },
  {
    id: "mission-3",
    title: "Patient Investor",
    description: "Hold a stock for 5 days",
    reward: 300,
    icon: "⏳",
    completed: false,
  },
  {
    id: "mission-4",
    title: "Smart Selling",
    description: "Sell a stock for profit",
    reward: 250,
    icon: "💰",
    completed: false,
  },
]

export default function KidsStockSimulator() {
  const { toast } = useToast()
  const [virtualMoney, setVirtualMoney] = useState(1000)
  const [portfolio, setPortfolio] = useState<any[]>([])
  const [currentDay, setCurrentDay] = useState(1)
  const [showHelp, setShowHelp] = useState(false)
  const [completedMissions, setCompletedMissions] = useState<string[]>([])
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [xpToNextLevel, setXpToNextLevel] = useState(500)
  const [selectedStock, setSelectedStock] = useState<any>(null)
  const [showAdvisor, setShowAdvisor] = useState(true)

  // Initialize from localStorage on component mount
  useEffect(() => {
    const savedSimulator = localStorage.getItem("stocktoons_kids_simulator")
    if (savedSimulator) {
      const data = JSON.parse(savedSimulator)
      setVirtualMoney(data.virtualMoney || 1000)
      setPortfolio(data.portfolio || [])
      setCurrentDay(data.currentDay || 1)
      setCompletedMissions(data.completedMissions || [])
      setLevel(data.level || 1)
      setXp(data.xp || 0)
      setXpToNextLevel(data.xpToNextLevel || 500)
    }

    // Show advisor by default for new users
    if (!localStorage.getItem("stocktoons_advisor_dismissed")) {
      setShowAdvisor(true)
    } else {
      setShowAdvisor(localStorage.getItem("stocktoons_advisor_dismissed") !== "true")
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(
      "stocktoons_kids_simulator",
      JSON.stringify({
        virtualMoney,
        portfolio,
        currentDay,
        completedMissions,
        level,
        xp,
        xpToNextLevel,
      }),
    )
  }, [virtualMoney, portfolio, currentDay, completedMissions, level, xp, xpToNextLevel])

  // Check for mission completion
  useEffect(() => {
    // First Investment mission
    if (portfolio.length > 0 && !completedMissions.includes("mission-1")) {
      completeAMission("mission-1")
    }

    // Diversify mission
    const uniqueStocks = new Set(portfolio.map((item) => item.symbol))
    if (uniqueStocks.size >= 3 && !completedMissions.includes("mission-2")) {
      completeAMission("mission-2")
    }

    // Other missions would be checked in the appropriate places
  }, [portfolio, completedMissions])

  const completeAMission = (missionId: string) => {
    if (completedMissions.includes(missionId)) return

    const mission = missions.find((m) => m.id === missionId)
    if (!mission) return

    // Add mission to completed list
    setCompletedMissions([...completedMissions, missionId])

    // Add XP
    addXp(mission.reward)

    // Show toast
    toast({
      title: "Mission Complete! 🎉",
      description: `You completed: ${mission.title}. +${mission.reward} XP!`,
    })
  }

  const addXp = (amount: number) => {
    const newXp = xp + amount
    setXp(newXp)

    // Check for level up
    if (newXp >= xpToNextLevel) {
      setLevel(level + 1)
      setXp(newXp - xpToNextLevel)
      setXpToNextLevel(Math.floor(xpToNextLevel * 1.5)) // Increase XP needed for next level

      toast({
        title: "Level Up! 🌟",
        description: `Congratulations! You're now level ${level + 1}!`,
      })
    }
  }

  const buyStock = (stock: any) => {
    if (virtualMoney < stock.price) {
      toast({
        title: "Not enough money!",
        description: "You don't have enough money to buy this stock.",
        variant: "destructive",
      })
      return
    }

    // Add to portfolio
    const existingStock = portfolio.find((item) => item.symbol === stock.symbol)
    if (existingStock) {
      // Update existing stock
      const updatedPortfolio = portfolio.map((item) =>
        item.symbol === stock.symbol
          ? {
              ...item,
              shares: item.shares + 1,
              totalCost: item.totalCost + stock.price,
              averagePrice: (item.totalCost + stock.price) / (item.shares + 1),
            }
          : item,
      )
      setPortfolio(updatedPortfolio)
    } else {
      // Add new stock
      setPortfolio([
        ...portfolio,
        {
          ...stock,
          shares: 1,
          totalCost: stock.price,
          averagePrice: stock.price,
          purchaseDay: currentDay,
        },
      ])
    }

    // Deduct money
    setVirtualMoney(virtualMoney - stock.price)

    toast({
      title: "Stock Purchased!",
      description: `You bought 1 share of ${stock.name} (${stock.symbol})`,
    })
  }

  const sellStock = (stock: any) => {
    const existingStock = portfolio.find((item) => item.symbol === stock.symbol)
    if (!existingStock || existingStock.shares <= 0) {
      toast({
        title: "No shares to sell!",
        description: "You don't have any shares of this stock to sell.",
        variant: "destructive",
      })
      return
    }

    // Calculate profit/loss
    const currentPrice = availableStocks.find((s) => s.symbol === stock.symbol)?.price || 0
    const profitLoss = currentPrice - existingStock.averagePrice

    // Check for "Smart Selling" mission
    if (profitLoss > 0 && !completedMissions.includes("mission-4")) {
      completeAMission("mission-4")
    }

    // Update portfolio
    if (existingStock.shares === 1) {
      // Remove stock if selling last share
      setPortfolio(portfolio.filter((item) => item.symbol !== stock.symbol))
    } else {
      // Update shares count
      const updatedPortfolio = portfolio.map((item) =>
        item.symbol === stock.symbol
          ? {
              ...item,
              shares: item.shares - 1,
              totalCost: item.totalCost - item.averagePrice,
            }
          : item,
      )
      setPortfolio(updatedPortfolio)
    }

    // Add money from sale
    setVirtualMoney(virtualMoney + currentPrice)

    toast({
      title: "Stock Sold!",
      description: `You sold 1 share of ${stock.name} (${stock.symbol}) for $${currentPrice.toFixed(2)}`,
    })
  }

  const advanceDay = () => {
    // Update current day
    setCurrentDay(currentDay + 1)

    // Update stock prices (in a real app, this would be more sophisticated)
    const updatedStocks = availableStocks.map((stock) => {
      // Random price change between -5% and +5%
      const changePercent = (Math.random() * 10 - 5) / 100
      const newPrice = Math.max(1, stock.price * (1 + changePercent))
      const newChange = changePercent * 100

      return {
        ...stock,
        price: Number.parseFloat(newPrice.toFixed(2)),
        change: Number.parseFloat(newChange.toFixed(2)),
      }
    })

    // Check for "Patient Investor" mission
    if (portfolio.some((stock) => currentDay - stock.purchaseDay >= 5) && !completedMissions.includes("mission-3")) {
      completeAMission("mission-3")
    }

    toast({
      title: "New Day!",
      description: `It's now Day ${currentDay + 1}. Stock prices have changed!`,
    })
  }

  const resetSimulator = () => {
    if (confirm("Are you sure you want to reset the simulator? This will erase all your progress!")) {
      setVirtualMoney(1000)
      setPortfolio([])
      setCurrentDay(1)
      setCompletedMissions([])
      setLevel(1)
      setXp(0)
      setXpToNextLevel(500)
      localStorage.removeItem("stocktoons_kids_simulator")

      toast({
        title: "Simulator Reset",
        description: "Your simulator has been reset to the beginning.",
      })
    }
  }

  const openResearch = (stock: any) => {
    setSelectedStock(stock)
  }

  const closeResearch = () => {
    setSelectedStock(null)
  }

  const toggleAdvisor = () => {
    const newState = !showAdvisor
    setShowAdvisor(newState)
    localStorage.setItem("stocktoons_advisor_dismissed", (!newState).toString())
  }

  const closeAdvisor = () => {
    setShowAdvisor(false)
    localStorage.setItem("stocktoons_advisor_dismissed", "true")
  }

  // Calculate total portfolio value
  const portfolioValue = portfolio.reduce((total, stock) => {
    const currentPrice = availableStocks.find((s) => s.symbol === stock.symbol)?.price || 0
    return total + currentPrice * stock.shares
  }, 0)

  // Calculate total profit/loss
  const totalProfitLoss = portfolio.reduce((total, stock) => {
    const currentPrice = availableStocks.find((s) => s.symbol === stock.symbol)?.price || 0
    return total + (currentPrice - stock.averagePrice) * stock.shares
  }, 0)

  return (
    <div className="container py-8">
      <Toaster />

      {showHelp && <KidsSimulatorHelp onClose={() => setShowHelp(false)} />}
      {selectedStock && <StockResearchCard stock={selectedStock} onClose={closeResearch} />}
      {showAdvisor && (
        <VirtualAdvisor
          portfolio={portfolio}
          virtualMoney={virtualMoney}
          currentDay={currentDay}
          onClose={closeAdvisor}
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Stock Adventure</h1>
          <p className="text-muted-foreground">Learn about investing with your own virtual money!</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowHelp(true)}>
            <HelpCircle className="mr-2 h-4 w-4" />
            How to Play
          </Button>
          <Button variant="outline" onClick={toggleAdvisor}>
            <MessageSquare className="mr-2 h-4 w-4" />
            {showAdvisor ? "Hide Advisor" : "Show Advisor"}
          </Button>
          <Button onClick={advanceDay}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Next Day
          </Button>
        </div>
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-4 flex items-center">
            <DollarSign className="h-8 w-8 mr-3" />
            <div>
              <p className="text-sm font-medium">Virtual Money</p>
              <p className="text-2xl font-bold">${virtualMoney.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <CardContent className="p-4 flex items-center">
            <Briefcase className="h-8 w-8 mr-3" />
            <div>
              <p className="text-sm font-medium">Portfolio Value</p>
              <p className="text-2xl font-bold">${portfolioValue.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-4 flex items-center">
            <Award className="h-8 w-8 mr-3" />
            <div>
              <p className="text-sm font-medium">Level {level}</p>
              <div className="w-full mt-1">
                <Progress value={(xp / xpToNextLevel) * 100} className="h-2 bg-white/20" />
                <p className="text-xs mt-1">
                  {xp} / {xpToNextLevel} XP
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-4 flex items-center">
            <TrendingUp className="h-8 w-8 mr-3" />
            <div>
              <p className="text-sm font-medium">Day {currentDay}</p>
              <p className="text-2xl font-bold">
                {totalProfitLoss >= 0 ? "+" : ""}${totalProfitLoss.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="market">
        <TabsList className="mb-6">
          <TabsTrigger value="market">Stock Market</TabsTrigger>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
        </TabsList>

        <TabsContent value="market">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableStocks.map((stock) => (
              <Card key={stock.id} className="overflow-hidden border-2" style={{ borderColor: stock.color }}>
                <div
                  className="h-2"
                  style={{
                    backgroundColor: stock.color,
                  }}
                ></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-xl"
                        style={{ backgroundColor: `${stock.color}30` }}
                      >
                        {stock.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{stock.name}</h3>
                        <p className="text-sm text-muted-foreground">{stock.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">${stock.price.toFixed(2)}</p>
                      <p
                        className={`text-sm flex items-center justify-end ${
                          stock.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stock.change >= 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <p className="text-sm mb-4">{stock.description}</p>

                  <div className="flex justify-between">
                    <Button
                      onClick={() => buyStock(stock)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      disabled={virtualMoney < stock.price}
                    >
                      Buy
                    </Button>
                    <Button
                      onClick={() => sellStock(stock)}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500/10"
                      disabled={!portfolio.some((item) => item.symbol === stock.symbol && item.shares > 0)}
                    >
                      Sell
                    </Button>
                    <Button
                      onClick={() => openResearch(stock)}
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Research
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio">
          {portfolio.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 text-6xl">🏦</div>
                <h3 className="text-xl font-bold mb-2">Your Portfolio is Empty</h3>
                <p className="text-muted-foreground mb-4">
                  Start building your portfolio by buying stocks in the Stock Market tab!
                </p>
                <Button asChild>
                  <Link href="#market" onClick={() => document.querySelector('[value="market"]')?.click()}>
                    Go to Stock Market
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Stocks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolio.map((stock) => {
                      const currentPrice = availableStocks.find((s) => s.symbol === stock.symbol)?.price || 0
                      const totalValue = currentPrice * stock.shares
                      const profitLoss = (currentPrice - stock.averagePrice) * stock.shares
                      const profitLossPercent = ((currentPrice - stock.averagePrice) / stock.averagePrice) * 100

                      return (
                        <div
                          key={stock.symbol}
                          className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                          style={{ borderColor: `${stock.color}50` }}
                        >
                          <div className="flex items-center">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-xl"
                              style={{ backgroundColor: `${stock.color}30` }}
                            >
                              {stock.icon}
                            </div>
                            <div>
                              <h3 className="font-bold">{stock.name}</h3>
                              <div className="flex items-center">
                                <Badge variant="outline">{stock.symbol}</Badge>
                                <span className="ml-2 text-sm text-muted-foreground">
                                  {stock.shares} {stock.shares === 1 ? "share" : "shares"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                            <div>
                              <p className="text-xs text-muted-foreground">Current Price</p>
                              <p className="font-medium">${currentPrice.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Average Cost</p>
                              <p className="font-medium">${stock.averagePrice.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Total Value</p>
                              <p className="font-medium">${totalValue.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Profit/Loss</p>
                              <p
                                className={`font-medium flex items-center ${
                                  profitLoss >= 0 ? "text-green-500" : "text-red-500"
                                }`}
                              >
                                {profitLoss >= 0 ? (
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDown className="h-3 w-3 mr-1" />
                                )}
                                ${Math.abs(profitLoss).toFixed(2)} ({profitLossPercent.toFixed(2)}%)
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 w-full md:w-auto">
                            <Button
                              onClick={() => buyStock(stock)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              disabled={virtualMoney < currentPrice}
                            >
                              Buy More
                            </Button>
                            <Button
                              onClick={() => sellStock(stock)}
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-500/10"
                            >
                              Sell
                            </Button>
                            <Button
                              onClick={() => openResearch(stock)}
                              size="sm"
                              variant="outline"
                              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
                            >
                              Research
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Investment</p>
                      <p className="text-2xl font-bold">
                        ${portfolio.reduce((total, stock) => total + stock.totalCost, 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Current Value</p>
                      <p className="text-2xl font-bold">${portfolioValue.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Profit/Loss</p>
                      <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {totalProfitLoss >= 0 ? "+" : ""}${totalProfitLoss.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="missions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((mission) => {
              const isCompleted = completedMissions.includes(mission.id)

              return (
                <Card
                  key={mission.id}
                  className={`border-2 ${isCompleted ? "border-green-500 bg-green-500/10" : "border-yellow-500/50"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center text-2xl mr-4">
                          {mission.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{mission.title}</h3>
                          <p className="text-sm text-muted-foreground">{mission.description}</p>
                        </div>
                      </div>
                      {isCompleted && <Badge className="bg-green-500 text-white">Completed</Badge>}
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-yellow-500" />
                        <span className="text-sm">{mission.reward} XP</span>
                      </div>
                      {!isCompleted && <Progress value={0} className="w-1/2 h-2" />}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-8 p-6 border border-dashed rounded-lg border-muted-foreground/50">
            <h3 className="text-xl font-bold mb-4">Game Controls</h3>
            <p className="text-muted-foreground mb-4">
              Use these controls to manage your game. Be careful with the reset button!
            </p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={resetSimulator}>
                Reset Simulator
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
