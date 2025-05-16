"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Newspaper, ArrowRight } from "lucide-react"
import NewsCard from "@/components/news-card"
import { mockNewsData } from "@/data/news-data"

export default function NewsWidget() {
  const [latestNews, setLatestNews] = useState<any[]>([])

  useEffect(() => {
    // Get the latest 3 news articles
    const latest = [...mockNewsData]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3)

    setLatestNews(latest)
  }, [])

  return (
    <Card className="bg-card border border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">
          <Newspaper className="h-5 w-5 inline-block mr-2 text-primary" />
          Latest Market News
        </CardTitle>
        <Button asChild variant="ghost" size="sm" className="text-primary">
          <Link href="/news">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {latestNews.map((news) => (
            <NewsCard
              key={news.id}
              id={news.id}
              title={news.title}
              image={news.image}
              category={news.category}
              publishedAt={news.publishedAt}
              source={news.source}
              compact
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
