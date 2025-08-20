import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  LineChart,
  ArrowRight,
  Layers,
  Target,
  Brain,
  Shield,
  Sparkles,
  Zap,
  Telescope,
  Compass,
  Map,
  TelescopeIcon as Binoculars,
  Crown,
  Gem,
  Rocket,
  Star,
  Trophy,
  Globe,
  Calculator,
  BookOpen,
  Lightbulb,
} from "lucide-react"

export default function AnalysisPage() {
  const analysisTools = [
    {
      title: "Smart Chart Analysis",
      description:
        "Discover amazing patterns in stock charts with our super-smart analysis tools that make learning fun!",
      icon: <LineChart className="h-10 w-10 text-white" />,
      level: "Intermediate to Advanced",
      path: "/analysis/technical",
      features: ["Magic Chart Patterns", "Smart Indicators", "Price Predictions"],
      color: "from-emerald-400 to-teal-500",
      emoji: "📈",
      difficulty: 75,
      popularity: 92,
    },
    {
      title: "Company Detective",
      description: "Become a financial detective and uncover the secrets of how companies make money and grow!",
      icon: <BarChart3 className="h-10 w-10 text-white" />,
      level: "All Levels",
      path: "/analysis/fundamental",
      features: ["Money Detective Tools", "Company Report Cards", "Value Finder"],
      color: "from-violet-400 to-purple-500",
      emoji: "🔍",
      difficulty: 45,
      popularity: 88,
    },
    {
      title: "Portfolio Power-Up",
      description: "Transform your investment collection into a super-powered portfolio that grows stronger every day!",
      icon: <PieChart className="h-10 w-10 text-white" />,
      level: "Intermediate",
      path: "/analysis/portfolio",
      features: ["Risk Shield", "Balance Checker", "Growth Tracker"],
      color: "from-rose-400 to-pink-500",
      emoji: "💎",
      difficulty: 60,
      popularity: 85,
    },
    {
      title: "Market Explorer",
      description:
        "Explore different market worlds and discover which industries are having the most exciting adventures!",
      icon: <Layers className="h-10 w-10 text-white" />,
      level: "Advanced",
      path: "/analysis/sectors",
      features: ["Sector Safari", "Industry Adventures", "Trend Telescope"],
      color: "from-cyan-400 to-blue-500",
      emoji: "🌍",
      difficulty: 80,
      popularity: 78,
    },
  ]

  const sectorSafariFeatures = [
    {
      title: "Technology Jungle 🌿",
      description: "Explore the wild world of tech companies and AI innovations!",
      icon: <Rocket className="h-8 w-8" />,
      color: "from-emerald-400 to-teal-500",
      companies: ["Apple 🍎", "Microsoft 💻", "Google 🔍", "Tesla ⚡"],
      growth: "+15.2%",
      trend: "🚀 Soaring High!",
    },
    {
      title: "Healthcare Kingdom 🏰",
      description: "Discover companies that help keep people healthy and happy!",
      icon: <Shield className="h-8 w-8" />,
      color: "from-violet-400 to-purple-500",
      companies: ["Johnson & Johnson 🏥", "Pfizer 💊", "UnitedHealth 🩺", "Abbott 🔬"],
      growth: "+8.7%",
      trend: "💪 Growing Strong!",
    },
    {
      title: "Finance Castle 🏦",
      description: "Meet the money wizards who help manage the world's wealth!",
      icon: <Crown className="h-8 w-8" />,
      color: "from-rose-400 to-pink-500",
      companies: ["JPMorgan 🏛️", "Bank of America 💳", "Visa 💰", "Mastercard 🎯"],
      growth: "+12.1%",
      trend: "💎 Treasure Growing!",
    },
    {
      title: "Energy Empire ⚡",
      description: "Power up with companies that fuel our amazing world!",
      icon: <Zap className="h-8 w-8" />,
      color: "from-cyan-400 to-blue-500",
      companies: ["Exxon Mobil ⛽", "Chevron 🛢️", "NextEra Energy 🌱", "Solar Power Co ☀️"],
      growth: "+6.3%",
      trend: "⚡ Energizing!",
    },
    {
      title: "Consumer Paradise 🛍️",
      description: "Find companies that make the things we love to buy!",
      icon: <Gem className="h-8 w-8" />,
      color: "from-orange-400 to-red-500",
      companies: ["Amazon 📦", "Walmart 🛒", "Nike 👟", "Coca-Cola 🥤"],
      growth: "+9.8%",
      trend: "🎉 Party Time!",
    },
    {
      title: "Industrial Fortress 🏭",
      description: "Explore companies that build and create amazing things!",
      icon: <Target className="h-8 w-8" />,
      color: "from-indigo-400 to-purple-500",
      companies: ["Boeing ✈️", "Caterpillar 🚜", "3M 🔧", "General Electric ⚙️"],
      growth: "+4.2%",
      trend: "🔨 Building Up!",
    },
  ]

  const premiumFeatures = [
    {
      title: "AI Crystal Ball",
      icon: <Brain className="h-8 w-8" />,
      description: "Super-smart AI that predicts market magic!",
      color: "from-violet-400 to-purple-500",
      emoji: "🔮",
      features: ["Future Price Predictions", "Smart Trend Analysis", "Risk Warnings"],
    },
    {
      title: "Pro Chart Wizard",
      icon: <LineChart className="h-8 w-8" />,
      description: "Professional chart tools for market wizards!",
      color: "from-emerald-400 to-teal-500",
      emoji: "🧙‍♂️",
      features: ["Advanced Indicators", "Pattern Recognition", "Custom Alerts"],
    },
    {
      title: "Portfolio Optimizer",
      icon: <Target className="h-8 w-8" />,
      description: "Make your portfolio the best it can be!",
      color: "from-rose-400 to-pink-500",
      emoji: "🎯",
      features: ["Auto-Balancing", "Risk Management", "Performance Boost"],
    },
    {
      title: "Risk Guardian",
      icon: <Shield className="h-8 w-8" />,
      description: "Protect your investments like a superhero!",
      color: "from-cyan-400 to-blue-500",
      emoji: "🛡️",
      features: ["Danger Detection", "Safety Alerts", "Protection Plans"],
    },
  ]

  const marketTrends = [
    {
      trend: "Tech stocks are having a super fun party! 🎉",
      type: "positive",
      icon: <TrendingUp className="h-5 w-5" />,
      emoji: "🚀",
      percentage: "+15.2%",
      description: "AI and cloud computing are driving amazing growth!",
    },
    {
      trend: "Healthcare companies are growing strong! 💪",
      type: "positive",
      icon: <TrendingUp className="h-5 w-5" />,
      emoji: "🏥",
      percentage: "+8.7%",
      description: "New medicines and treatments are helping everyone!",
    },
    {
      trend: "Energy sector is taking a little rest 😴",
      type: "neutral",
      icon: <TrendingUp className="h-5 w-5" />,
      emoji: "⚡",
      percentage: "+2.1%",
      description: "Steady growth while transitioning to clean energy!",
    },
    {
      trend: "Finance companies are counting their coins! 🪙",
      type: "positive",
      icon: <TrendingUp className="h-5 w-5" />,
      emoji: "🏦",
      percentage: "+12.1%",
      description: "Banks are doing great with rising interest rates!",
    },
  ]

  const learningModules = [
    {
      title: "Chart Reading Basics",
      description: "Learn to read stock charts like a pro detective! 🕵️‍♀️",
      icon: <BookOpen className="h-6 w-6" />,
      difficulty: "Beginner",
      duration: "15 min",
      color: "from-emerald-400 to-teal-500",
    },
    {
      title: "Understanding P/E Ratios",
      description: "Discover what makes a stock expensive or cheap! 💰",
      icon: <Calculator className="h-6 w-6" />,
      difficulty: "Intermediate",
      duration: "20 min",
      color: "from-violet-400 to-purple-500",
    },
    {
      title: "Risk vs Reward",
      description: "Learn the balance between safety and growth! ⚖️",
      icon: <Lightbulb className="h-6 w-6" />,
      difficulty: "Advanced",
      duration: "25 min",
      color: "from-rose-400 to-pink-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-8 py-4 rounded-full mb-6 shadow-lg">
            <BarChart3 className="h-7 w-7" />
            <span className="font-bold text-xl">Smart Analysis Hub! 🧠</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Become a Market Detective! 🕵️‍♀️
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Use super cool tools to analyze stocks and discover amazing investment opportunities! 🌟
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border-4 border-indigo-200 rounded-2xl p-2 mb-8">
            <TabsTrigger
              value="tools"
              className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              🛠️ Analysis Tools
            </TabsTrigger>
            <TabsTrigger
              value="safari"
              className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              🌍 Sector Safari
            </TabsTrigger>
            <TabsTrigger
              value="premium"
              className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              ⭐ Premium
            </TabsTrigger>
            <TabsTrigger
              value="learn"
              className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              📚 Learn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tools">
            {/* Analysis Tools Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {analysisTools.map((tool, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white border-4 border-transparent hover:border-indigo-200 rounded-3xl"
                >
                  <div className={`bg-gradient-to-r ${tool.color} p-8 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="relative z-10 flex items-center gap-6">
                      <div className="bg-white/20 rounded-full p-4 shadow-lg backdrop-blur-sm">{tool.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{tool.title}</h3>
                        <Badge className="bg-white/20 text-white border-white/30 font-bold">{tool.level}</Badge>
                      </div>
                      <div className="text-4xl animate-bounce">{tool.emoji}</div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <p className="text-slate-600 mb-6 leading-relaxed text-lg">{tool.description}</p>

                    {/* Progress Indicators */}
                    <div className="mb-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-700">Difficulty Level</span>
                        <span className="text-sm font-bold text-slate-600">{tool.difficulty}%</span>
                      </div>
                      <Progress value={tool.difficulty} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-700">Popularity</span>
                        <span className="text-sm font-bold text-slate-600">{tool.popularity}%</span>
                      </div>
                      <Progress value={tool.popularity} className="h-2" />
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-slate-800 mb-3 text-lg">Cool Features:</h4>
                      <div className="flex flex-wrap gap-3">
                        {tool.features.map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-indigo-50 text-indigo-700 border-indigo-300 px-4 py-2 font-semibold"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      asChild
                      className={`w-full bg-gradient-to-r ${tool.color} hover:shadow-lg text-white font-bold text-lg py-4 rounded-full transform hover:scale-105 transition-all duration-300`}
                    >
                      <Link href={tool.path}>
                        Start Exploring! <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Analysis Section */}
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  🔮 Market Magic Intelligence
                </span>
              </h2>
              <Card className="bg-white border-4 border-indigo-100 overflow-hidden rounded-3xl shadow-2xl">
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Sparkles className="h-8 w-8" />
                    AI-Powered Market Insights! ✨
                  </h3>
                </div>
                <CardContent className="p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                      <h4 className="text-3xl font-bold text-slate-800 mb-6">What's Happening in the Market? 🌟</h4>
                      <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                        Our super-smart AI friends are watching the market 24/7 to find the coolest trends and most
                        exciting opportunities just for you!
                      </p>

                      <div className="space-y-4 mb-8">
                        {marketTrends.map((trend, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl border-2 border-indigo-100"
                          >
                            <div className="text-3xl">{trend.emoji}</div>
                            <div
                              className={`${trend.type === "positive" ? "text-emerald-500" : trend.type === "negative" ? "text-rose-500" : "text-violet-500"}`}
                            >
                              {trend.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-slate-700 font-medium text-lg">{trend.trend}</span>
                                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 font-bold">
                                  {trend.percentage}
                                </Badge>
                              </div>
                              <p className="text-slate-600 text-sm">{trend.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300">
                        See Full Magic Report! <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                    <div className="bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 rounded-3xl p-8 text-center border-4 border-indigo-200">
                      <div className="text-6xl mb-4">📊</div>
                      <h4 className="text-2xl font-bold text-slate-800 mb-4">Super Cool Charts!</h4>
                      <p className="text-slate-600 text-lg mb-6">
                        Interactive charts that make data fun and easy to understand!
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl border-2 border-indigo-200">
                          <div className="text-2xl mb-2">📈</div>
                          <div className="text-sm font-bold text-slate-700">Live Charts</div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border-2 border-indigo-200">
                          <div className="text-2xl mb-2">🎯</div>
                          <div className="text-sm font-bold text-slate-700">Smart Alerts</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safari">
            {/* Sector Safari Adventure */}
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  🌍 Sector Safari Adventure!
                </h2>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Explore different industry kingdoms and discover which sectors are having the most exciting
                  adventures! 🦁
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectorSafariFeatures.map((sector, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white border-4 border-indigo-100 rounded-3xl"
                  >
                    <div className={`bg-gradient-to-r ${sector.color} p-6 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <div className="relative z-10 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{sector.title}</h3>
                          <Badge className="bg-white/20 text-white border-white/30 font-bold">{sector.trend}</Badge>
                        </div>
                        <div className="bg-white/20 rounded-full p-3 shadow-lg backdrop-blur-sm">{sector.icon}</div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <p className="text-slate-600 mb-4 leading-relaxed">{sector.description}</p>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-slate-700">Growth Rate</span>
                          <span className="text-lg font-bold text-emerald-600">{sector.growth}</span>
                        </div>
                        <Progress value={Number.parseFloat(sector.growth)} className="h-3" />
                      </div>

                      <div className="mb-6">
                        <h4 className="font-bold text-slate-800 mb-3">Top Companies:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {sector.companies.map((company, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="bg-violet-50 text-violet-700 border-violet-300 font-medium text-xs p-2 justify-center"
                            >
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        asChild
                        className={`w-full bg-gradient-to-r ${sector.color} hover:shadow-lg text-white font-bold rounded-full transform hover:scale-105 transition-all duration-300`}
                      >
                        <Link href="/stocks/categories">
                          Explore This Sector! <Compass className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Safari Tools */}
              <Card className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 border-4 border-indigo-200 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-center text-3xl text-indigo-800">🔧 Safari Explorer Tools!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-white rounded-2xl border-2 border-indigo-200">
                      <Telescope className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                      <h4 className="font-bold text-indigo-800 mb-2">Trend Telescope 🔭</h4>
                      <p className="text-indigo-700 text-sm">Spot future trends before they happen!</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-2xl border-2 border-indigo-200">
                      <Map className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                      <h4 className="font-bold text-emerald-800 mb-2">Sector Map 🗺️</h4>
                      <p className="text-emerald-700 text-sm">Navigate through different industries!</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-2xl border-2 border-indigo-200">
                      <Binoculars className="h-12 w-12 text-rose-600 mx-auto mb-4" />
                      <h4 className="font-bold text-rose-800 mb-2">Company Finder 🔍</h4>
                      <p className="text-rose-700 text-sm">Discover hidden gem companies!</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-2xl border-2 border-indigo-200">
                      <Globe className="h-12 w-12 text-violet-600 mx-auto mb-4" />
                      <h4 className="font-bold text-violet-800 mb-2">Global Explorer 🌎</h4>
                      <p className="text-violet-700 text-sm">Explore markets around the world!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="premium">
            {/* Premium Features */}
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  ⭐ Super Premium Powers!
                </h2>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Unlock magical analysis tools that give you superpowers in the stock market! 🦸‍♀️
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {premiumFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105 rounded-3xl border-4 border-indigo-200 bg-white overflow-hidden"
                  >
                    <div className={`bg-gradient-to-r ${feature.color} p-8`}>
                      <div className="bg-white/20 rounded-full p-4 shadow-xl mx-auto mb-4 w-fit backdrop-blur-sm">
                        {feature.icon}
                      </div>
                      <div className="text-5xl mb-4">{feature.emoji}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                    </div>

                    <CardContent className="p-8">
                      <p className="text-slate-600 leading-relaxed mb-6 text-lg">{feature.description}</p>

                      <div className="mb-6">
                        <h4 className="font-bold text-slate-800 mb-3">Premium Features:</h4>
                        <div className="space-y-2">
                          {feature.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2 bg-violet-50 rounded-lg">
                              <Star className="h-4 w-4 text-violet-600" />
                              <span className="text-violet-700 font-medium">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 font-bold px-6 py-3 text-lg rounded-full">
                        Premium Magic! ✨
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Premium Benefits */}
              <Card className="bg-gradient-to-r from-violet-100 via-purple-100 to-indigo-100 border-4 border-violet-200 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-center text-3xl text-violet-800">🎁 Premium Member Benefits!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-white rounded-2xl border-2 border-violet-200">
                      <Trophy className="h-12 w-12 text-violet-600 mx-auto mb-4" />
                      <h4 className="font-bold text-violet-800 mb-2">VIP Access 👑</h4>
                      <p className="text-violet-700 text-sm">Get exclusive tools and features first!</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-2xl border-2 border-violet-200">
                      <Zap className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                      <h4 className="font-bold text-emerald-800 mb-2">Lightning Fast ⚡</h4>
                      <p className="text-emerald-700 text-sm">Super-speed analysis and real-time alerts!</p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-2xl border-2 border-violet-200">
                      <Shield className="h-12 w-12 text-rose-600 mx-auto mb-4" />
                      <h4 className="font-bold text-rose-800 mb-2">Expert Support 🛡️</h4>
                      <p className="text-rose-700 text-sm">24/7 help from our investment wizards!</p>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <Button className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold text-xl px-12 py-4 rounded-full transform hover:scale-105 transition-all duration-300">
                      Unlock Premium Powers! 🚀
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learn">
            {/* Learning Modules */}
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  📚 Learn Like a Pro!
                </h2>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Master the art of stock analysis with our fun and interactive learning modules! 🎓
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {learningModules.map((module, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white border-4 border-indigo-100 rounded-3xl"
                  >
                    <div className={`bg-gradient-to-r ${module.color} p-6`}>
                      <div className="bg-white/20 rounded-full p-3 shadow-lg backdrop-blur-sm w-fit mx-auto mb-4">
                        {module.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white text-center">{module.title}</h3>
                    </div>

                    <CardContent className="p-6">
                      <p className="text-slate-600 mb-4 leading-relaxed">{module.description}</p>

                      <div className="flex justify-between items-center mb-4">
                        <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-300 font-bold">
                          {module.difficulty}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                        >
                          ⏱️ {module.duration}
                        </Badge>
                      </div>

                      <Button
                        className={`w-full bg-gradient-to-r ${module.color} hover:shadow-lg text-white font-bold rounded-full transform hover:scale-105 transition-all duration-300`}
                      >
                        Start Learning! 📖
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Learning Path */}
              <Card className="bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 border-4 border-cyan-200 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-center text-3xl text-cyan-800">🛤️ Your Learning Adventure Path!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-cyan-200">
                      <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">Start with Basics 🌱</h4>
                        <p className="text-slate-600 text-sm">Learn what stocks are and how they work!</p>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">Completed ✅</Badge>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-cyan-200">
                      <div className="bg-violet-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">Chart Reading Magic 📊</h4>
                        <p className="text-slate-600 text-sm">Discover how to read stock charts like a wizard!</p>
                      </div>
                      <Badge className="bg-violet-100 text-violet-800 border-violet-300">In Progress 🔄</Badge>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-cyan-200">
                      <div className="bg-slate-300 text-slate-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">Advanced Analysis 🚀</h4>
                        <p className="text-slate-600 text-sm">Master professional analysis techniques!</p>
                      </div>
                      <Badge className="bg-slate-100 text-slate-600 border-slate-300">Locked 🔒</Badge>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full">
                      Continue Learning Journey! 🎓
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          <Card className="bg-gradient-to-br from-emerald-400 to-teal-500 border-4 border-emerald-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-3">📈</div>
              <div className="text-4xl font-bold mb-2">2,847</div>
              <div className="font-bold text-lg">Stocks Analyzed!</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-violet-400 to-purple-500 border-4 border-violet-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-3">📊</div>
              <div className="text-4xl font-bold mb-2">15,290</div>
              <div className="font-bold text-lg">Magic Reports!</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-rose-400 to-pink-500 border-4 border-rose-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <div className="text-4xl font-bold mb-2">98.7%</div>
              <div className="font-bold text-lg">Accuracy Rate!</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-400 to-blue-500 border-4 border-cyan-200 text-white rounded-3xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-3">⭐</div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="font-bold text-lg">User Love!</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
