"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Building2 } from "lucide-react"
import Link from "next/link"

interface StockCardProps {
  symbol: string
  name: string
  price: number
  change: number
  sector?: string
  volume?: string
  className?: string
}

export default function StockCard({
  symbol,
  name,
  price,
  change,
  sector = "Unknown",
  volume,
  className = "",
}: StockCardProps) {
  const isPositive = change >= 0
  const changeIcon = isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />
  const changeColor = isPositive ? "text-emerald-600" : "text-rose-600"
  const borderColor = isPositive ? "border-emerald-200" : "border-rose-200"
  const bgGradient = isPositive ? "from-emerald-50 to-emerald-100" : "from-rose-50 to-rose-100"

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  return (
    <Link href={`/stocks/${symbol}`}>
      <Card
        className={`
        bg-gradient-to-br ${bgGradient} 
        border-4 ${borderColor} 
        hover:shadow-2xl 
        transition-all duration-500 
        transform hover:scale-105 
        rounded-3xl 
        cursor-pointer
        ${className}
      `}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-800 text-lg">{symbol}</h3>
                <Badge variant="outline" className="text-xs bg-white/80 text-slate-700 border-slate-300">
                  {sector}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 truncate font-medium">{name}</p>
            </div>
            <div className={`p-2 rounded-full ${isPositive ? "bg-emerald-100" : "bg-rose-100"}`}>
              <TrendingUp className={`h-5 w-5 ${changeColor}`} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-slate-800">{formatPrice(price)}</span>
              <div className={`flex items-center gap-1 ${changeColor} font-bold`}>
                {changeIcon}
                <span>{Math.abs(change).toFixed(2)}%</span>
              </div>
            </div>

            {volume && (
              <div className="flex items-center justify-between pt-3 border-t border-white/50">
                <div className="flex items-center gap-2 text-slate-600">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Volume</span>
                </div>
                <span className="text-sm font-bold text-slate-700">{volume}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
