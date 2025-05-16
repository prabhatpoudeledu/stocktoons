import { Card, CardContent } from "@/components/ui/card"

interface NewsCardProps {
  title: string
  content: string
}

export default function NewsCard({ title, content }: NewsCardProps) {
  return (
    <Card className="bg-card border border-border hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  )
}
