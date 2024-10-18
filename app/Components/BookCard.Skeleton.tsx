import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const BookCardSkeleton = () => {
  return (
    <Card className="w-full max-w-5xl">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-[230px_1fr]">
          {/* Book Cover Skeleton */}
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            <Skeleton className="h-full w-full" />
            {/* Wishlist button skeleton */}
            <Skeleton className="absolute right-2 top-2 size-10 rounded-full" />
          </div>

          {/* Content Skeleton */}
          <div className="flex flex-col space-y-4">
            {/* Title and ID */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4" /> {/* Title */}
              <Skeleton className="h-4 w-1/4" /> {/* Book ID */}
            </div>

            <Separator />

            {/* Authors Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="size-5" /> {/* Icon */}
                <Skeleton className="h-5 w-20" /> {/* "Author" text */}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" /> {/* Author name */}
                <Skeleton className="h-4 w-1/2" /> {/* Author name */}
              </div>
            </div>

            <Separator />

            {/* Genres Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="size-5" /> {/* Icon */}
                <Skeleton className="h-5 w-20" /> {/* "Genres" text */}
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Genre badges */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-24" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookCardSkeleton
