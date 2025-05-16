import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { BarChart3, PieChart, TrendingUp, LineChart, ArrowRight, Layers, Briefcase } from "lucide-react"

export default function AnalysisPage() {
  const analysisTools = [
    {
      title: "Technical Analysis",
      description: "Analyze stock price movements and patterns using technical indicators",
      icon: <LineChart className="h-6 w-6 text-blue-500" />,
      level: "Intermediate to Advanced",
      path: "/analysis/technical",
    },
    {
      title: "Fundamental Analysis",
      description: "Evaluate companies based on financial statements and business metrics",
      icon: <BarChart3 className="h-6 w-6 text-green-500" />,
      level: "All Levels",
      path: "/analysis/fundamental",
    },
    {
      title: "Portfolio Analysis",
      description: "Analyze your portfolio's performance, risk, and diversification",
      icon: <PieChart className="h-6 w-6 text-purple-500" />,
      level: "Intermediate",
      path: "/analysis/portfolio",
    },
    {
      title: "Market Sector Analysis",
      description: "Compare performance across different market sectors and industries",
      icon: <Layers className="h-6 w-6 text-orange-500" />,
      level: "Advanced",
      path: "/analysis/sectors",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Investment Analysis Tools</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Professional tools to analyze stocks, markets, and investment opportunities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {analysisTools.map((tool, index) => (
          <Card key={index} className="bg-card overflow-hidden border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="bg-secondary/50 flex items-center justify-center p-6">
                <div className="h-20 w-20 rounded-full bg-background flex items-center justify-center">{tool.icon}</div>
              </div>
              <CardContent className="p-6 md:col-span-2">
                <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="bg-blue-900/20">
                    {tool.level}
                  </Badge>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Link href={tool.path}>Analyze</Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Featured Analysis</h2>
      <Card className="bg-card mb-12 border border-border chart-pattern">
        <CardContent className="p-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Market Trend Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Our AI-powered market analysis identifies key trends and potential market movements based on historical
                data and current market conditions.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                  <span>S&P 500 showing bullish momentum</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                  <span>Tech sector outperforming broader market</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-red-500 transform rotate-180" />
                  <span>Energy sector showing weakness</span>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                View Full Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="hidden md:block">
              <Image
                src="/placeholder.svg?height=300&width=500&text=Market+Trend+Chart"
                alt="Market trend chart"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle>Stock Comparison Tool</CardTitle>
            <CardDescription>Compare metrics between multiple stocks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our stock comparison tool allows you to analyze and compare key metrics between different stocks to make
              more informed investment decisions.
            </p>
            <Button asChild className="w-full">
              <Link href="/stocks/compare">Compare Stocks</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle>Sector Analysis</CardTitle>
            <CardDescription>Analyze performance by industry sector</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our sector analysis tool helps you identify which industries are performing well and where investment
              opportunities might exist.
            </p>
            <Button asChild className="w-full">
              <Link href="/stocks/categories">View Sectors</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">Premium Analysis Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "AI Market Predictions", icon: <Briefcase className="h-5 w-5" /> },
          { title: "Advanced Technical Indicators", icon: <LineChart className="h-5 w-5" /> },
          { title: "Portfolio Optimization", icon: <PieChart className="h-5 w-5" /> },
        ].map((feature, index) => (
          <Card key={index} className="bg-card border border-border">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="mb-2 mt-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-sm font-bold mb-1">{feature.title}</h3>
              <Badge variant="outline" className="bg-blue-900/20">
                Premium
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
