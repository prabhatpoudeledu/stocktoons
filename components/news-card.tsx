"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ExternalLink, Bookmark, Share2, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"

interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  category: string
  source: string
  image: string
  publishedAt: string
  relatedStocks: string[]
  trending?: boolean
  featured?: boolean
  url?: string
  author?: string
  sentiment?: "positive" | "negative" | "neutral"
  importance?: "high" | "medium" | "low"
}

interface NewsCardProps {
  article: NewsArticle
  size?: "default" | "compact" | "large"
  showBookmark?: boolean
  showShare?: boolean
  className?: string
}

export function NewsCard({
  article,
  size = "default",
  showBookmark = false,
  showShare = false,
  className = "",
}: NewsCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { user } = useAuth()

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

      if (diffInMinutes < 1) return "Just now"
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    } catch {
      return "Recently"
    }
  }

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getImportanceColor = (importance?: string) => {
    switch (importance) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
  }

  const handleBookmark = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to bookmark articles",
      })
      return
    }

    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Article Bookmarked",
      description: isBookmarked ? "Article removed from your bookmarks" : "Article saved to your bookmarks",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.origin + `/news/${article.id}`,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/news/${article.id}`)
      toast({
        title: "Link Copied",
        description: "Article link copied to clipboard",
      })
    }
  }

  if (size === "compact") {
    return (
      <Card className={`hover:shadow-md transition-shadow ${className}`}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
                {article.sentiment && (
                  <Badge className={`text-xs ${getSentimentColor(article.sentiment)}`}>{article.sentiment}</Badge>
                )}
                {article.trending && (
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>

              <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                <Link href={`/news/${article.id}`} className="hover:text-primary">
                  {article.title}
                </Link>
              </h3>

              <p className="text-xs text-muted-foreground line-clamp-2">{article.summary}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(article.publishedAt)}</span>
                  <span>•</span>
                  <span>{article.source}</span>
                </div>

                <div className="flex items-center gap-1">
                  {showBookmark && (
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleBookmark}>
                      <Bookmark className={`h-3 w-3 ${isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                  )}
                  {showShare && (
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleShare}>
                      <Share2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {article.image && (
              <div className="flex-shrink-0">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={80}
                  height={60}
                  className="rounded object-cover"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <div className="relative">
        {article.image && (
          <div className="aspect-video relative">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-t-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary text-white">{article.category}</Badge>
          {article.importance === "high" && <Badge className="bg-red-500 text-white">Breaking</Badge>}
          {article.trending && (
            <Badge className="bg-orange-500 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTimeAgo(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.source}</span>
            {article.author && (
              <>
                <span>•</span>
                <span>{article.author}</span>
              </>
            )}
          </div>

          <h2 className="text-xl font-bold leading-tight line-clamp-2">
            <Link href={`/news/${article.id}`} className="hover:text-primary">
              {article.title}
            </Link>
          </h2>

          <p className="text-muted-foreground line-clamp-3">{article.summary}</p>

          {article.relatedStocks && article.relatedStocks.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Related:</span>
              {article.relatedStocks.slice(0, 4).map((stock) => (
                <Link key={stock} href={`/stocks/${stock}`}>
                  <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                    {stock}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            {article.sentiment && <Badge className={getSentimentColor(article.sentiment)}>{article.sentiment}</Badge>}
            {article.importance && (
              <Badge className={getImportanceColor(article.importance)}>{article.importance} priority</Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <Link href={`/news/${article.id}`}>
                <Button size="sm">Read More</Button>
              </Link>
              {article.url && article.url !== "#" && (
                <Button variant="outline" size="sm" asChild>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Source
                  </a>
                </Button>
              )}
            </div>

            <div className="flex gap-1">
              {showBookmark && (
                <Button variant="ghost" size="sm" onClick={handleBookmark} className="h-8 w-8 p-0">
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                </Button>
              )}
              {showShare && (
                <Button variant="ghost" size="sm" onClick={handleShare} className="h-8 w-8 p-0">
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NewsCard
