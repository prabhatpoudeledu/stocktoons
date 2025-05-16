"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Clock, Share2, Bookmark, BookmarkCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { formatDistanceToNow } from "date-fns"

// Mock news data
const mockNewsData = [
  {
    id: "news-1",
    title: "Fed Signals Potential Rate Cut as Inflation Cools",
    summary:
      "The Federal Reserve indicated it may consider rate cuts in the coming months as inflation shows signs of easing, boosting market sentiment.",
    content:
      "The Federal Reserve signaled on Wednesday that it could begin cutting interest rates in the coming months if inflation continues to cool, a shift in tone that sent stocks higher. Fed Chair Jerome Powell noted that while the labor market remains strong, recent data shows inflation moving closer to the central bank's 2% target. \"We're seeing progress, and if that progress continues, we could begin adjusting our policy stance as soon as the next few meetings,\" Powell said during a press conference. The S&P 500 rose 1.2% following the announcement, with rate-sensitive tech stocks leading the gains. Economists now predict the first rate cut could come as early as September, though Powell emphasized that decisions would remain data-dependent.",
    category: "Economy",
    source: "Financial Times",
    image: "/placeholder.svg?height=400&width=600&text=Fed+Meeting",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    relatedStocks: ["SPY", "QQQ", "TLT"],
    trending: true,
    featured: true,
  },
  {
    id: "news-2",
    title: "Apple Unveils New AI Features for iPhone, Stock Surges",
    summary:
      "Apple announced a suite of AI-powered features coming to iPhones later this year, sending the company's stock to new all-time highs.",
    content:
      "Apple unveiled a comprehensive set of artificial intelligence features for its iPhone and other devices on Monday, marking the company's biggest push into AI to date. The new capabilities, collectively called Apple Intelligence, will allow users to generate images, summarize texts, and interact with a more advanced version of Siri. The announcement, made during Apple's annual Worldwide Developers Conference (WWDC), was well-received by investors, with the company's stock climbing 3.5% to reach a new all-time high. Analysts noted that the features put Apple in direct competition with other tech giants like Google and Microsoft in the race to integrate AI into consumer products. The new AI features will be available on iPhone 15 Pro models and newer devices when iOS 18 is released this fall.",
    category: "Technology",
    source: "Bloomberg",
    image: "/placeholder.svg?height=400&width=600&text=Apple+Event",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    relatedStocks: ["AAPL", "MSFT", "GOOGL"],
    trending: true,
  },
  {
    id: "news-3",
    title: "Tesla Deliveries Beat Expectations, Shares Rally",
    summary:
      "Tesla reported stronger-than-expected vehicle deliveries for the second quarter, easing concerns about demand and boosting the stock.",
    content:
      "Tesla delivered 466,000 vehicles in the second quarter, exceeding analyst expectations of 445,000, according to figures released by the electric vehicle maker on Sunday. The better-than-anticipated results helped alleviate concerns about softening demand for electric vehicles amid higher interest rates and increased competition. Tesla's shares jumped over 7% in early trading on Monday, recouping some of the losses from earlier in the year. The company attributed the strong performance to price adjustments and the popularity of its Model Y crossover. CEO Elon Musk stated on social media that he expects the second half of the year to show continued growth as production ramps up at factories in Texas and Berlin.",
    category: "Automotive",
    source: "Reuters",
    image: "/placeholder.svg?height=400&width=600&text=Tesla+Factory",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    relatedStocks: ["TSLA", "RIVN", "GM"],
    trending: true,
  },
  {
    id: "news-4",
    title: "NVIDIA Announces Next-Generation AI Chips, Expands Lead",
    summary:
      "NVIDIA unveiled its next-generation AI processors, further cementing its dominance in the booming artificial intelligence market.",
    content:
      "NVIDIA announced its next-generation AI chips on Tuesday, introducing the Blackwell architecture that the company claims delivers up to 4x the performance of its current Hopper chips. The announcement, made at NVIDIA's GTC conference, highlights the company's continued dominance in the AI chip market that has propelled its stock up more than 200% over the past year. CEO Jensen Huang emphasized that the new chips are designed to meet the growing demand for training and running large language models that power generative AI applications. Cloud providers including Amazon, Google, and Microsoft have already committed to deploying the new chips when they become available later this year. Analysts estimate that the new products could add billions to NVIDIA's already soaring revenue.",
    category: "Technology",
    source: "CNBC",
    image: "/placeholder.svg?height=400&width=600&text=NVIDIA+Chips",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    relatedStocks: ["NVDA", "AMD", "INTC"],
  },
  {
    id: "news-5",
    title: "Amazon Expands Healthcare Push with New Pharmacy Service",
    summary:
      "Amazon is expanding its healthcare offerings with a new prescription delivery service, intensifying competition in the pharmacy sector.",
    content:
      "Amazon announced on Thursday an expansion of its healthcare business with a new prescription delivery service that promises to deliver medications within hours in select cities. The move represents a significant escalation of Amazon's ambitions in the healthcare space and sent shares of traditional pharmacy chains like CVS and Walgreens down by 3-5%. The new service, called Amazon Pharmacy Plus, will initially be available in 10 major U.S. cities with plans to expand to 30 cities by the end of the year. Amazon Prime members will receive the service at no additional cost. \"We're applying Amazon's logistics expertise to healthcare to make getting prescriptions as easy as ordering anything else on Amazon,\" said Neil Lindsay, senior vice president of Amazon Health Services. The announcement comes as Amazon continues to look for growth opportunities beyond its core e-commerce business.",
    category: "Healthcare",
    source: "Wall Street Journal",
    image: "/placeholder.svg?height=400&width=600&text=Amazon+Pharmacy",
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    relatedStocks: ["AMZN", "CVS", "WBA"],
  },
  {
    id: "news-6",
    title: "Oil Prices Surge as Middle East Tensions Escalate",
    summary:
      "Crude oil prices jumped more than 3% as geopolitical tensions in the Middle East raised concerns about potential supply disruptions.",
    content:
      'Oil prices surged more than 3% on Friday as escalating tensions in the Middle East raised fears about potential disruptions to global crude supplies. Brent crude, the international benchmark, rose to $86 per barrel, while U.S. West Texas Intermediate crude climbed to $82 per barrel. The spike came after reports of increased military activity near major oil shipping routes in the region. Energy analysts warned that any conflict affecting the Strait of Hormuz, through which about 20% of the world\'s oil passes, could lead to significantly higher prices. "The geopolitical premium is back in oil prices," said John Smith, chief oil analyst at Energy Capital Research. "Markets are pricing in the risk of supply disruptions, even though actual production hasn\'t been affected yet." Energy stocks rallied on the news, with major oil companies like Exxon Mobil and Chevron seeing gains of 2-3%.',
    category: "Commodities",
    source: "Bloomberg",
    image: "/placeholder.svg?height=400&width=600&text=Oil+Rigs",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
    relatedStocks: ["XOM", "CVX", "USO"],
  },
  {
    id: "news-7",
    title: "JPMorgan Reports Record Quarterly Profit, Boosts Outlook",
    summary:
      "JPMorgan Chase reported its highest-ever quarterly profit and raised its full-year outlook, signaling strength in the banking sector.",
    content:
      "JPMorgan Chase reported a record quarterly profit on Friday, easily beating analyst expectations and raising its outlook for the full year. The largest U.S. bank by assets posted a profit of $13.4 billion for the second quarter, up 21% from a year earlier, driven by strong performance in its investment banking and trading divisions. CEO Jamie Dimon expressed cautious optimism about the U.S. economy, noting that consumer spending remains resilient despite higher interest rates. \"The U.S. economy continues to be resilient, with consumers still spending and businesses in good shape, though we remain alert to a number of significant geopolitical and economic risks,\" Dimon said in a statement. The bank raised its full-year net interest income guidance to $89 billion from $87 billion previously. JPMorgan's results often set the tone for the banking sector's earnings season, and other major banks are scheduled to report next week.",
    category: "Finance",
    source: "Financial Times",
    image: "/placeholder.svg?height=400&width=600&text=JPMorgan+HQ",
    publishedAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(), // 28 hours ago
    relatedStocks: ["JPM", "BAC", "GS"],
  },
  {
    id: "news-8",
    title: "Meta Platforms Announces New VR Headset, Expands Metaverse Push",
    summary:
      "Meta unveiled its next-generation virtual reality headset and announced new partnerships to expand its metaverse ecosystem.",
    content:
      "Meta Platforms announced its next-generation virtual reality headset on Wednesday, featuring improved resolution, a slimmer design, and a lower price point than its predecessor. The Meta Quest 3 Lite, priced at $299, represents the company's effort to make VR technology more accessible to mainstream consumers. During the announcement, CEO Mark Zuckerberg also revealed new partnerships with major entertainment and gaming companies to expand the content available in Meta's metaverse. \"We're making significant progress in building the metaverse and making it accessible to more people,\" Zuckerberg said during the company's Connect conference. Despite skepticism from some investors about the billions being spent on metaverse development, Meta's shares rose 2% following the announcement, with analysts noting that the lower-priced headset could accelerate adoption. The company also provided updates on its AI initiatives, including new AI features coming to Instagram and WhatsApp.",
    category: "Technology",
    source: "The Verge",
    image: "/placeholder.svg?height=400&width=600&text=Meta+VR+Headset",
    publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
    relatedStocks: ["META", "RBLX", "U"],
  },
  {
    id: "news-9",
    title: "Retail Sales Decline Unexpectedly in June, Consumer Concerns Rise",
    summary:
      "U.S. retail sales fell unexpectedly in June, raising concerns about consumer spending and economic growth in the second half of the year.",
    content:
      'U.S. retail sales unexpectedly declined in June, falling 0.3% from the previous month, according to data released by the Commerce Department on Thursday. Economists had forecast a 0.2% increase. The drop in consumer spending, which accounts for more than two-thirds of U.S. economic activity, has raised concerns about the strength of the economy heading into the second half of the year. The decline was broad-based, with decreases in spending at auto dealerships, furniture stores, and online retailers. Only gasoline stations and restaurants saw modest increases. "This is a concerning sign that consumers are becoming more cautious with their spending," said Jane Smith, chief economist at Global Economics Research. "It suggests that higher interest rates and persistent inflation are starting to weigh more heavily on household budgets." The data prompted some economists to lower their GDP growth forecasts for the second quarter, with several major banks now expecting growth of around 2% annualized, down from previous estimates of 2.5-3%.',
    category: "Economy",
    source: "Reuters",
    image: "/placeholder.svg?height=400&width=600&text=Retail+Shopping",
    publishedAt: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString(), // 42 hours ago
    relatedStocks: ["WMT", "TGT", "AMZN"],
  },
  {
    id: "news-10",
    title: "Microsoft Acquires Cybersecurity Firm for $5 Billion",
    summary:
      "Microsoft announced the acquisition of a leading cybersecurity company in a $5 billion deal to enhance its security offerings.",
    content:
      "Microsoft announced on Monday that it has agreed to acquire cybersecurity firm CyberShield for $5 billion, in one of the largest security acquisitions of the year. The deal will allow Microsoft to integrate CyberShield's advanced threat detection and response capabilities into its cloud and enterprise security products. \"Security is a top priority for every organization today, and this acquisition significantly enhances our ability to protect customers in an increasingly complex threat landscape,\" said Microsoft CEO Satya Nadella in a statement. The acquisition comes amid rising concerns about cybersecurity following several high-profile attacks on major corporations and government agencies. CyberShield, founded in 2015, has developed AI-powered security tools that are used by many Fortune 500 companies. The deal is expected to close by the end of the year, subject to regulatory approval. Microsoft's shares rose 1.5% following the announcement, while other cybersecurity stocks saw mixed reactions as investors assessed the competitive implications.",
    category: "Technology",
    source: "CNBC",
    image: "/placeholder.svg?height=400&width=600&text=Cybersecurity",
    publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 48 hours ago
    relatedStocks: ["MSFT", "CRWD", "PANW"],
  },
]

// Categories for filtering
const categories = ["All", "Technology", "Finance", "Economy", "Healthcare", "Automotive", "Commodities"]

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [savedArticles, setSavedArticles] = useState<string[]>([])
  const { user } = useAuth()
  const [newsData, setNewsData] = useState(mockNewsData)

  // Load saved articles from localStorage on component mount
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`stocktoons_saved_articles_${user.id}`)
      if (saved) {
        setSavedArticles(JSON.parse(saved))
      }
    }
  }, [user])

  // Filter news based on search query and active category
  const filteredNews = newsData.filter((news) => {
    const matchesSearch =
      searchQuery === "" ||
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "All" || news.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Featured news (first article that is marked as featured)
  const featuredNews = newsData.find((news) => news.featured)

  // Trending news (excluding the featured one)
  const trendingNews = newsData.filter((news) => news.trending && news.id !== featuredNews?.id).slice(0, 3)

  // Handle saving/unsaving articles
  const toggleSaveArticle = (articleId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to save articles",
      })
      return
    }

    let updatedSavedArticles
    if (savedArticles.includes(articleId)) {
      updatedSavedArticles = savedArticles.filter((id) => id !== articleId)
      toast({
        title: "Article Removed",
        description: "Article removed from your saved list",
      })
    } else {
      updatedSavedArticles = [...savedArticles, articleId]
      toast({
        title: "Article Saved",
        description: "Article saved to your reading list",
      })
    }

    setSavedArticles(updatedSavedArticles)
    localStorage.setItem(`stocktoons_saved_articles_${user.id}`, JSON.stringify(updatedSavedArticles))
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return "recently"
    }
  }

  return (
    <div className="container py-8">
      <Toaster />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Market News</h1>
          <p className="text-muted-foreground mt-1">Stay updated with the latest financial news and market insights</p>
        </div>

        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search news..."
              className="pl-9 bg-secondary/50 border-border focus:border-primary w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Featured News */}
      {featuredNews && !searchQuery && activeCategory === "All" && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Story</h2>
          <Card className="bg-card border border-border overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 relative">
                <div className="aspect-[16/9] lg:aspect-auto lg:h-full relative">
                  <Image
                    src={featuredNews.image || "/placeholder.svg"}
                    alt={featuredNews.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-white">{featuredNews.category}</Badge>
                </div>
              </div>
              <div className="lg:col-span-2 p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatDate(featuredNews.publishedAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{featuredNews.source}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{featuredNews.title}</h3>
                <p className="text-muted-foreground mb-4">{featuredNews.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredNews.relatedStocks.map((stock) => (
                    <Link key={stock} href={`/stocks/${stock}`}>
                      <Badge variant="outline" className="bg-secondary/50 hover:bg-secondary">
                        ${stock}
                      </Badge>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
                    <Link href={`/news/${featuredNews.id}`}>Read Full Story</Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSaveArticle(featuredNews.id)}
                      className="h-9 w-9"
                    >
                      {savedArticles.includes(featuredNews.id) ? (
                        <BookmarkCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Trending News */}
      {trendingNews.length > 0 && !searchQuery && activeCategory === "All" && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingNews.map((news) => (
              <Card key={news.id} className="bg-card border border-border overflow-hidden">
                <div className="relative">
                  <div className="aspect-[16/9] relative">
                    <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary text-white">{news.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDate(news.publishedAt)}</span>
                    <span className="mx-1">•</span>
                    <span>{news.source}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{news.summary}</p>
                  <div className="flex justify-between items-center">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/news/${news.id}`}>Read More</Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => toggleSaveArticle(news.id)} className="h-8 w-8">
                      {savedArticles.includes(news.id) ? (
                        <BookmarkCheck className="h-4 w-4 text-primary" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
        <TabsList className="bg-secondary/50 mb-6 flex flex-wrap h-auto p-1">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="flex-grow">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {filteredNews.length === 0 ? (
              <Card className="bg-card border border-border">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No news articles found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredNews.map((news) => (
                  <Card key={news.id} className="bg-card border border-border overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1 relative">
                        <div className="aspect-[4/3] md:h-full relative">
                          <Image
                            src={news.image || "/placeholder.svg"}
                            alt={news.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-3 p-4 md:p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className="bg-primary/20 text-primary border-primary/30">{news.category}</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{formatDate(news.publishedAt)}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span>Source: {news.source}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                        <p className="text-muted-foreground mb-4">{news.summary}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {news.relatedStocks.map((stock) => (
                            <Link key={stock} href={`/stocks/${stock}`}>
                              <Badge variant="outline" className="bg-secondary/50 hover:bg-secondary">
                                ${stock}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                            <Link href={`/news/${news.id}`}>Read Full Story</Link>
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleSaveArticle(news.id)}
                              className="h-8 w-8"
                            >
                              {savedArticles.includes(news.id) ? (
                                <BookmarkCheck className="h-4 w-4 text-primary" />
                              ) : (
                                <Bookmark className="h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
