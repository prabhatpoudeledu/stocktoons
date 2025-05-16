import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface NewsCardProps {
  id: string
  title: string
  summary?: string
  image: string
  category: string
  publishedAt: string
  source: string
  compact?: boolean
}

export default function NewsCard({
  id,
  title,
  summary,
  image,
  category,
  publishedAt,
  source,
  compact = false,
}: NewsCardProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return "recently"
    }
  }

  return (
    <Link href={`/news/${id}`}>
      <Card className="bg-card border border-border hover:border-primary/50 transition-colors overflow-hidden">
        <div className={compact ? "flex items-start" : ""}>
          <div className={compact ? "flex-shrink-0 w-24 h-24 relative" : "relative"}>
            <div className={compact ? "w-full h-full" : "aspect-[16/9] relative"}>
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover"
                sizes={compact ? "96px" : "(max-width: 768px) 100vw, 33vw"}
              />
            </div>
          </div>
          <CardContent className={compact ? "flex-1 p-3" : "p-4"}>
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              {!compact && <Badge className="mr-2 text-xs">{category}</Badge>}
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDate(publishedAt)}</span>
              {!compact && (
                <>
                  <span className="mx-1">•</span>
                  <span>{source}</span>
                </>
              )}
            </div>
            <h3 className={`font-bold mb-1 ${compact ? "text-sm line-clamp-2" : "text-lg line-clamp-2"}`}>{title}</h3>
            {!compact && summary && <p className="text-sm text-muted-foreground line-clamp-2">{summary}</p>}
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
