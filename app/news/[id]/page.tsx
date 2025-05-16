"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Share2, Bookmark, BookmarkCheck, ExternalLink } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { formatDistanceToNow, format } from "date-fns"
import NewsCard from "@/components/news-card"

// Import the mock news data
import { mockNewsData } from "@/data/news-data"

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { user } = useAuth()
  const [savedArticles, setSavedArticles] = useState<string[]>([])
  const [article, setArticle] = useState<any>(null)
  const [relatedArticles, setRelatedArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the article in our mock data
    const foundArticle = mockNewsData.find((news) => news.id === id)

    if (foundArticle) {
      setArticle(foundArticle)

      // Find related articles (same category, excluding current article)
      const related = mockNewsData
        .filter((news) => news.category === foundArticle.category && news.id !== id)
        .slice(0, 3)

      setRelatedArticles(related)
    } else {
      // Article not found, redirect to news page
      router.push("/news")
    }

    setLoading(false)

    // Load saved articles from localStorage
    if (user) {
      const saved = localStorage.getItem(`stocktoons_saved_articles_${user.id}`)
      if (saved) {
        setSavedArticles(JSON.parse(saved))
      }
    }
  }, [id, router, user])

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

  // Format full date
  const formatFullDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy 'at' h:mm a")
    } catch (error) {
      return "recent date"
    }
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse">Loading article...</div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div>Article not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Toaster />

      {/* Back button */}
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to News
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <article>
            {/* Article header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-primary/20 text-primary border-primary/30">{article.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatFullDate(article.publishedAt)}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <span>Source: {article.source}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {article.relatedStocks.map((stock: string) => (
                    <Link key={stock} href={`/stocks/${stock}`}>
                      <Badge variant="outline" className="bg-secondary/50 hover:bg-secondary">
                        ${stock}
                      </Badge>
                    </Link>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => toggleSaveArticle(article.id)} className="h-9 w-9">
                    {savedArticles.includes(article.id) ? (
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

            {/* Featured image */}
            <div className="mb-6 relative">
              <div className="aspect-[16/9] relative">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
            </div>

            {/* Article content */}
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-xl font-medium mb-6">{article.summary}</p>
              {article.content.split("\n\n").map((paragraph: string, index: number) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article footer */}
            <div className="border-t border-border pt-6">
              <div className="flex flex-wrap justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  <p>Published {formatDate(article.publishedAt)}</p>
                  <p>Source: {article.source}</p>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant={savedArticles.includes(article.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSaveArticle(article.id)}
                    className={savedArticles.includes(article.id) ? "bg-primary hover:bg-primary/90" : ""}
                  >
                    {savedArticles.includes(article.id) ? (
                      <>
                        <BookmarkCheck className="mr-2 h-4 w-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="lg:col-span-1">
          {/* Related stocks */}
          <Card className="bg-card border border-border mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Related Stocks</h3>
              <div className="space-y-4">
                {article.relatedStocks.map((stock: string) => (
                  <Link key={stock} href={`/stocks/${stock}`} className="block">
                    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md hover:bg-secondary/50 transition-colors">
                      <div className="font-medium">${stock}</div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related articles */}
          <div>
            <h3 className="text-lg font-bold mb-4">Related Articles</h3>
            <div className="space-y-4">
              {relatedArticles.length > 0 ? (
                relatedArticles.map((relatedArticle) => (
                  <NewsCard
                    key={relatedArticle.id}
                    id={relatedArticle.id}
                    title={relatedArticle.title}
                    summary={relatedArticle.summary}
                    image={relatedArticle.image}
                    category={relatedArticle.category}
                    publishedAt={relatedArticle.publishedAt}
                    source={relatedArticle.source}
                    compact
                  />
                ))
              ) : (
                <Card className="bg-card border border-border">
                  <CardContent className="p-4 text-center">
                    <p className="text-muted-foreground">No related articles found</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
