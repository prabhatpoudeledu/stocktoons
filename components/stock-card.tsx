import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface StockCardProps {
  symbol: string
  name?: string
  price?: number
  change?: number
}

export default function StockCard({ symbol, name, price, change }: StockCardProps) {
  const isPositive = change && change >= 0
  const changeColor = isPositive ? "positive" : "negative"
  const changeSymbol = isPositive ? "+" : ""

  return (
    <Link href={`/stocks/${symbol}`}>
      <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold">{symbol}</h3>
              {name && <p className="text-sm text-muted-foreground">{name}</p>}
            </div>
            {price && change && (
              <div className="text-right">
                <p className="text-lg font-semibold">${price.toFixed(2)}</p>
                <p className={`${changeColor} text-sm`}>
                  {changeSymbol}
                  {change}%
                </p>
              </div>
            )}
          </div>
          <div className="h-12 w-full bg-secondary/50 rounded-md overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Chart preview</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
