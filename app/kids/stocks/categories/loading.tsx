import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function KidsStockCategoriesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-64" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(9)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="border-2 border-gray-200 rounded-xl overflow-hidden">
              <CardHeader className="bg-gray-100">
                <Skeleton className="h-8 w-40 mb-2" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex justify-center">
                  <Skeleton className="h-10 w-32 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
