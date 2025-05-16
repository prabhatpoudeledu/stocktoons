import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Play, Clock } from "lucide-react"

export default function VideosPage() {
  const videoCategories = [
    "Beginner Basics",
    "Stock Analysis",
    "Market Trends",
    "Investment Strategies",
    "Financial Literacy",
  ]

  const featuredVideos = [
    {
      title: "Understanding Stock Market Basics",
      duration: "5:24",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Stock+Basics",
      category: "Beginner Basics",
    },
    {
      title: "How to Read Financial Statements",
      duration: "8:15",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Financial+Statements",
      category: "Stock Analysis",
    },
    {
      title: "Investing for Kids: Saving & Growth",
      duration: "4:30",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Kids+Investing",
      category: "Financial Literacy",
    },
    {
      title: "Bull vs Bear Markets Explained",
      duration: "6:45",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Market+Types",
      category: "Market Trends",
    },
    {
      title: "Diversification Strategies",
      duration: "7:20",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Diversification",
      category: "Investment Strategies",
    },
    {
      title: "What are ETFs?",
      duration: "5:10",
      thumbnail: "/placeholder.svg?height=200&width=350&text=ETFs",
      category: "Beginner Basics",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Educational Videos</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Learn about investing through our AI-generated educational videos
      </p>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button variant="default" className="bg-primary hover:bg-primary/90">
          All Videos
        </Button>
        {videoCategories.map((category, index) => (
          <Button key={index} variant="outline">
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Video */}
      <h2 className="text-2xl font-bold mb-4">Featured</h2>
      <Card className="bg-card mb-8 overflow-hidden border border-border">
        <div className="relative">
          <Image
            src="/placeholder.svg?height=400&width=800&text=Featured+Video"
            alt="Featured video"
            width={800}
            height={400}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="icon" className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90">
              <Play className="h-8 w-8" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-2xl font-bold mb-2">Introduction to Investing</h3>
            <p className="text-muted-foreground mb-2">Learn the fundamentals of investing in the stock market</p>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">10:15</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Video Grid */}
      <h2 className="text-2xl font-bold mb-4">All Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {featuredVideos.map((video, index) => (
          <Card
            key={index}
            className="bg-card overflow-hidden border border-border hover:border-primary/50 transition-colors"
          >
            <div className="relative">
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                width={350}
                height={200}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90">
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {video.duration}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="text-xs text-blue-400 mb-1">{video.category}</div>
              <h3 className="font-bold mb-2">{video.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Videos</Button>
      </div>
    </div>
  )
}
