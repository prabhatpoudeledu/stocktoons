import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function KidsStockDetailLoading() {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="w-full border-4 border-gray-200 rounded-xl shadow-lg">
        <CardHeader className="bg-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-4 border-gray-200 rounded-xl shadow-md">
              <CardHeader className="bg-gray-100">
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-4 border-gray-200 rounded-xl shadow-md">
              <CardHeader className="bg-gray-100">
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="p-6">
                <Skeleton className="h-[300px] w-full rounded-lg" />
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 border-4 border-gray-200 rounded-xl shadow-md">
            <CardHeader className="bg-gray-100">
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-40" />
                </div>

                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-center">
            <Skeleton className="h-10 w-64 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
