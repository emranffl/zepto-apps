import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { BookListAPIProps } from "@/services/api/book-list"
import { useWishlistStore } from "@/zustand/wishlist"
import { Book, Heart, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const BookCard = ({ book }: { book: BookListAPIProps["results"][0] }) => {
  const { authors, title, id, formats, subjects } = book
  const { wishlist, toggleWishlist } = useWishlistStore()
  const isWishlisted = wishlist.includes(id)

  return (
    <>
      <Card className="w-full max-w-5xl transition-all hover:shadow-lg">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-[230px_1fr]">
            {/* // + Book Cover */}
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
              <Image
                src={formats["image/jpeg"]}
                alt={title}
                className="object-cover transition-transform hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, 250px"
                priority
              />
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleWishlist(id)
                }}
                variant={"outline"}
                className="absolute right-2 top-2 size-10 rounded-full bg-slate-500/20 p-1 text-background backdrop-blur-sm hover:text-red-700"
                aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                {isWishlisted ? (
                  <Heart className="size-6 fill-red-700 text-red-700" />
                ) : (
                  <Heart className="size-6" />
                )}
              </Button>
            </div>

            {/* // +  Content */}
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="relative text-2xl font-bold tracking-tight hover:text-blue-600">
                  <Link href={`/book/${id}`} className="absolute inset-0 z-10" />
                  {title}
                </h2>
                <small className="text-muted-foreground">Book ID: {id}</small>
              </div>

              <Separator />

              {/* // + Authors Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="size-5 text-gray-700" />
                  <h3 className="font-semibold">{authors.length > 1 ? "Authors" : "Author"}</h3>
                </div>
                <ScrollArea className="">
                  {authors.map((author, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-sm">
                        {author.name}
                        <span className="text-xs text-muted-foreground">
                          {author.birth_year || author.death_year
                            ? ` (${author.birth_year ?? "?"} - ${author.death_year ?? "?"})`
                            : ""}
                        </span>
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </div>

              <Separator />

              {/* // + Genres Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Book className="size-5 text-gray-700" />
                  <h3 className="font-semibold">{subjects.length > 1 ? "Genres" : "Genre"}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subjects.slice(0, 5).map((subject, index) => (
                    <Badge key={index} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                  {subjects.length > 5 && (
                    <Badge variant="outline" className="font-light">
                      +{subjects.length - 5}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookCard
