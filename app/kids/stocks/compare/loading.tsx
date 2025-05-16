import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function KidsStockComparisonLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-64" />
      </div>

      <Card className="mb-8 border-2 border-gray-200 rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-100">
          <Skeleton className="h-8 w-64 mx-auto" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-2 border-gray-200 rounded-xl overflow-hidden">
          <CardHeader className="bg-gray-100">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-6 w-24 mx-auto" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <Skeleton className="h-10 w-32 mx-auto mb-2" />
                <Skeleton className="h-6 w-24 mx-auto" />
              </div>

              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 rounded-xl overflow-hidden">
          <CardHeader className="bg-gray-100">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-6 w-24 mx-auto" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <Skeleton className="h-10 w-32 mx-auto mb-2" />
                <Skeleton className="h-6 w-24 mx-auto" />
              </div>

              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
