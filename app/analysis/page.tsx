import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { BarChart3, PieChart, TrendingUp, LineChart, ArrowRight, Layers, Target, Brain, Shield } from "lucide-react"

export default function AnalysisPage() {
  const analysisTools = [
    {
      title: "Technical Analysis",
      description: "Analyze stock price movements and patterns using advanced technical indicators and chart patterns",
      icon: <LineChart className="h-8 w-8 text-blue-600" />,
      level: "Intermediate to Advanced",
      path: "/analysis/technical",
      features: ["Chart Patterns", "Technical Indicators", "Price Action Analysis"],
      color: "blue",
    },
    {
      title: "Fundamental Analysis",
      description: "Evaluate companies based on financial statements, business metrics, and market position",
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      level: "All Levels",
      path: "/analysis/fundamental",
      features: ["Financial Ratios", "Earnings Analysis", "Company Valuation"],
      color: "green",
    },
    {
      title: "Portfolio Analysis",
      description: "Analyze your portfolio's performance, risk distribution, and diversification strategies",
      icon: <PieChart className="h-8 w-8 text-purple-600" />,
      level: "Intermediate",
      path: "/analysis/portfolio",
      features: ["Risk Assessment", "Asset Allocation", "Performance Tracking"],
      color: "purple",
    },
    {
      title: "Market Sector Analysis",
      description: "Compare performance across different market sectors and identify trending industries",
      icon: <Layers className="h-8 w-8 text-pink-600" />,
      level: "Advanced",
      path: "/analysis/sectors",
      features: ["Sector Comparison", "Industry Trends", "Market Rotation"],
      color: "pink",
    },
  ]

  const premiumFeatures = [
    {
      title: "AI Market Predictions",
      icon: <Brain className="h-6 w-6" />,
      description: "Advanced AI algorithms predict market movements",
      color: "purple",
    },
    {
      title: "Advanced Technical Indicators",
      icon: <LineChart className="h-6 w-6" />,
      description: "Professional-grade technical analysis tools",
      color: "blue",
    },
    {
      title: "Portfolio Optimization",
      icon: <Target className="h-6 w-6" />,
      description: "Optimize your portfolio for maximum returns",
      color: "green",
    },
    {
      title: "Risk Management Tools",
      icon: <Shield className="h-6 w-6" />,
      description: "Advanced risk assessment and management",
      color: "red",
    },
  ]

  const marketTrends = [
    { trend: "S&P 500 showing bullish momentum", type: "positive", icon: <TrendingUp className="h-4 w-4" /> },
    { trend: "Tech sector outperforming broader market", type: "positive", icon: <TrendingUp className="h-4 w-4" /> },
    { trend: "Energy sector showing consolidation", type: "neutral", icon: <TrendingUp className="h-4 w-4" /> },
    { trend: "Healthcare stocks gaining momentum", type: "positive", icon: <TrendingUp className="h-4 w-4" /> },
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-100 to-blue-200 border-blue-200 text-blue-800",
      green: "from-green-100 to-green-200 border-green-200 text-green-800",
      purple: "from-purple-100 to-purple-200 border-purple-200 text-purple-800",
      pink: "from-pink-100 to-pink-200 border-pink-200 text-pink-800",
      red: "from-red-100 to-red-200 border-red-200 text-red-800",
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full mb-6">
            <BarChart3 className="h-6 w-6" />
            <span className="font-bold text-lg">Investment Analysis Hub</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Professional Analysis Tools
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive tools to analyze stocks, markets, and investment opportunities with professional-grade
            insights.
          </p>
        </div>

        {/* Analysis Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {analysisTools.map((tool, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white border-2 border-purple-100"
            >
              <div className={`bg-gradient-to-r ${getColorClasses(tool.color)} p-6`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-full p-3 shadow-lg">{tool.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{tool.title}</h3>
                    <Badge className="bg-white/20 text-gray-700 border-white/30 mt-1">{tool.level}</Badge>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{tool.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold"
                >
                  <Link href={tool.path}>
                    Start Analysis <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Analysis Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Market Intelligence</h2>
          <Card className="bg-white border-2 border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                AI-Powered Market Analysis
              </h3>
            </div>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Current Market Trends</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Our AI-powered analysis identifies key market trends and potential opportunities based on real-time
                    data, historical patterns, and advanced machine learning algorithms.
                  </p>

                  <div className="space-y-3 mb-6">
                    {marketTrends.map((trend, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div
                          className={`${trend.type === "positive" ? "text-green-500" : trend.type === "negative" ? "text-red-500" : "text-blue-500"}`}
                        >
                          {trend.icon}
                        </div>
                        <span className="text-gray-700">{trend.trend}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold">
                    View Full Analysis <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-8 text-center">
                  <Image
                    src="/placeholder.svg?height=300&width=400&text=Market+Analysis+Chart"
                    alt="Market analysis chart"
                    width={400}
                    height={300}
                    className="rounded-lg mx-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Stock Comparison Tool
              </CardTitle>
              <CardDescription className="text-blue-700">
                Compare key metrics between multiple stocks side-by-side
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4 leading-relaxed">
                Analyze and compare financial metrics, performance indicators, and valuation ratios between different
                stocks to make informed investment decisions.
              </p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/stocks/compare">Compare Stocks</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Layers className="h-6 w-6" />
                Sector Analysis
              </CardTitle>
              <CardDescription className="text-green-700">
                Analyze performance trends across different industry sectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4 leading-relaxed">
                Identify which industries are outperforming the market and discover emerging investment opportunities
                across various sectors.
              </p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Link href="/stocks/categories">Explore Sectors</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Premium Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Premium Analysis Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br ${getColorClasses(feature.color)} border-2`}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-white shadow-lg mx-auto flex items-center justify-center">
                      <div
                        className={`${feature.color === "purple" ? "text-purple-600" : feature.color === "blue" ? "text-blue-600" : feature.color === "green" ? "text-green-600" : "text-red-600"}`}
                      >
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm mb-4 opacity-90">{feature.description}</p>
                  <Badge className="bg-white/20 border-white/30">Premium</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-700 mb-2">2,847</div>
              <div className="text-purple-600 font-semibold">Stocks Analyzed</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-100 to-pink-200 border-2 border-pink-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-pink-700 mb-2">15,290</div>
              <div className="text-pink-600 font-semibold">Analysis Reports</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-700 mb-2">98.7%</div>
              <div className="text-blue-600 font-semibold">Accuracy Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">4.9/5</div>
              <div className="text-green-600 font-semibold">User Rating</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
