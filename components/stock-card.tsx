import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface StockCardProps {
  symbol: string
  name?: string
}

export default function StockCard({ symbol, name }: StockCardProps) {
  return (
    <Link href={`/stocks/${symbol}`}>
      <Card className="bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-1">{symbol}</h3>
          {name && <p className="text-sm text-muted-foreground mb-2">{name}</p>}
          <p className="text-sm text-muted-foreground">Quick insight + chart preview</p>
        </CardContent>
      </Card>
    </Link>
  )
}
