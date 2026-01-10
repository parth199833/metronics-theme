import { Skeleton } from "@/components/ui/skeleton"

export default function ViewAllDataLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  )
}
