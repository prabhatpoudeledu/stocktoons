import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function StockComparisonLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-64" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <Skeleton className="h-10 w-32 mx-auto mb-2" />
                <Skeleton className="h-6 w-24 mx-auto" />
              </div>

              <Skeleton className="h-px w-full" />

              <div>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <Skeleton className="h-px w-full" />

              <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="flex justify-center mt-6">
                <Skeleton className="h-10 w-48" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <Skeleton className="h-10 w-32 mx-auto mb-2" />
                <Skeleton className="h-6 w-24 mx-auto" />
              </div>

              <Skeleton className="h-px w-full" />

              <div>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <Skeleton className="h-px w-full" />

              <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="flex justify-center mt-6">
                <Skeleton className="h-10 w-48" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
