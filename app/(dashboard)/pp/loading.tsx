import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function PublicProfileLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Profile card skeleton */}
      <Card className="p-6">
        <div className="flex items-start space-x-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-64" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
