import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalysisLoading() {
  return (
    <div className="container py-8">
      <Skeleton className="h-10 w-64 mb-8" />
      <Skeleton className="h-6 w-full max-w-2xl mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Card key={index} className="bg-card overflow-hidden border border-border">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="bg-secondary/50 flex items-center justify-center p-6">
                  <Skeleton className="h-20 w-20 rounded-full" />
                </div>
                <CardContent className="p-6 md:col-span-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
      </div>

      <Skeleton className="h-8 w-48 mb-6" />
      <Card className="bg-card mb-12 border border-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-10 w-40" />
            </div>
            <div className="hidden md:block">
              <Skeleton className="h-[300px] w-full rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
