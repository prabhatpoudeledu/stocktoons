"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Star } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface StockCardProps {
  symbol: string
  name: string
  price: number
  change: number
  sector?: string
  volume?: string
}

export default function StockCard({ symbol, name, price, change, sector, volume }: StockCardProps) {
  const { user, isInWatchlist, addToWatchlist } = useAuth()
  const isPositive = change >= 0
  const inWatchlist = isInWatchlist(symbol)

  const handleAddToWatchlist = async () => {
    if (!user) return
    await addToWatchlist(symbol)
  }

  return (
    <Card className="card-primary hover-lift">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-xl text-slate-800">{symbol}</h3>
              {sector && (
                <Badge className="badge-secondary">
                  {sector === "Technology" ? "💻" : sector === "Healthcare" ? "🏥" : "🏢"} {sector}
                </Badge>
              )}
            </div>
            <p className="text-slate-600 font-medium mb-3 line-clamp-1">{name}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-slate-800">${price.toFixed(2)}</span>
                <div
                  className={`flex items-center gap-1 font-bold ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
                >
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>
                    {isPositive ? "+" : ""}
                    {change.toFixed(2)}%
                  </span>
                </div>
              </div>
              {volume && <p className="text-sm text-slate-500">Volume: {volume}</p>}
            </div>
          </div>

          {user && (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={handleAddToWatchlist}
              disabled={inWatchlist}
            >
              <Star
                className={`h-5 w-5 transition-colors ${
                  inWatchlist ? "fill-emerald-400 text-emerald-400" : "text-slate-400 hover:text-emerald-400"
                }`}
              />
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Link href={`/stocks/${symbol}`} className="flex-1">
            <Button className="w-full btn-primary">View Details 📊</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
