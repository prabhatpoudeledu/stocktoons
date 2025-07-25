"use client"

import { useState, useEffect, useCallback } from "react"
import { newsService, type NewsArticle } from "@/services/news-service"

interface UseNewsReturn {
  news: NewsArticle[]
  hotNews: NewsArticle[]
  featuredStory: NewsArticle | null
  loading: boolean
  error: string | null
  lastUpdate: Date | null
  searchResults: NewsArticle[]
  searchLoading: boolean
  searchError: string | null
  refetch: () => Promise<void>
  searchNews: (query: string) => Promise<void>
  clearSearch: () => void
}

export function useNews(): UseNewsReturn {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [hotNews, setHotNews] = useState<NewsArticle[]>([])
  const [featuredStory, setFeaturedStory] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  // Search-specific state
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [allNews, hotNewsData, featuredData] = await Promise.all([
        newsService.fetchAllNews(),
        newsService.getHotNews(),
        newsService.getFeaturedStory(),
      ])

      setNews(allNews)
      setHotNews(hotNewsData)
      setFeaturedStory(featuredData)
      setLastUpdate(new Date())
    } catch (err) {
      console.error("Error fetching news:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch news")
    } finally {
      setLoading(false)
    }
  }, [])

  const searchNews = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      setSearchLoading(true)
      setSearchError(null)

      // Get all news first
      const allNews = await newsService.fetchAllNews()

      // Filter news based on search query
      const filtered = allNews.filter((article) => {
        const searchTerm = query.toLowerCase()
        return (
          article.title.toLowerCase().includes(searchTerm) ||
          article.summary.toLowerCase().includes(searchTerm) ||
          article.content.toLowerCase().includes(searchTerm) ||
          article.category.toLowerCase().includes(searchTerm) ||
          article.source.toLowerCase().includes(searchTerm) ||
          article.relatedStocks.some((stock) => stock.toLowerCase().includes(searchTerm))
        )
      })

      // Sort by relevance (title matches first, then summary, then content)
      const sortedResults = filtered.sort((a, b) => {
        const searchTerm = query.toLowerCase()

        const aScore =
          (a.title.toLowerCase().includes(searchTerm) ? 3 : 0) +
          (a.summary.toLowerCase().includes(searchTerm) ? 2 : 0) +
          (a.content.toLowerCase().includes(searchTerm) ? 1 : 0)

        const bScore =
          (b.title.toLowerCase().includes(searchTerm) ? 3 : 0) +
          (b.summary.toLowerCase().includes(searchTerm) ? 2 : 0) +
          (b.content.toLowerCase().includes(searchTerm) ? 1 : 0)

        return bScore - aScore
      })

      setSearchResults(sortedResults)
    } catch (err) {
      console.error("Error searching news:", err)
      setSearchError(err instanceof Error ? err.message : "Failed to search news")
    } finally {
      setSearchLoading(false)
    }
  }, [])

  const clearSearch = useCallback(() => {
    setSearchResults([])
    setSearchError(null)
  }, [])

  const refetch = useCallback(async () => {
    await fetchNews()
  }, [fetchNews])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return {
    news,
    hotNews,
    featuredStory,
    loading,
    error,
    lastUpdate,
    searchResults,
    searchLoading,
    searchError,
    refetch,
    searchNews,
    clearSearch,
  }
}
