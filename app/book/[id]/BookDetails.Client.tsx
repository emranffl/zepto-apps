"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookDetailsAPIProps } from "@/services/api/book-details"
import { useWishlistStore } from "@/zustand/wishlist"
import { Book, ChevronLeft, Download, Globe, Heart, Library, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const BookDetails = ({
  title,
  authors,
  translators,
  subjects,
  bookshelves,
  languages,
  copyright,
  media_type,
  formats,
  download_count,
  id,
}: BookDetailsAPIProps) => {
  const { wishlist, toggleWishlist } = useWishlistStore()
  const isWishlisted = wishlist.includes(id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* // + Back Button */}
      <Link href="/" className="mb-6 inline-block">
        <Button variant="outline" size="sm">
          <ChevronLeft className="mr-2 size-5 text-gray-700" />
          Back to Books
        </Button>
      </Link>

      <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
        {/* // + Left Column - Image and Quick Info */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={formats["image/jpeg"]}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Book ID:</span>
                <Badge variant="outline">{id}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Downloads:</span>
                <Badge variant="secondary">{download_count.toLocaleString()}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type:</span>
                <Badge>{media_type}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Copyright:</span>
                <Badge variant={copyright ? "destructive" : "secondary"}>
                  {copyright ? "Protected" : "Public Domain"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* // + Right Column - Main Content */}
        <div className="space-y-6">
          <Card className="relative">
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
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="download">Download</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  {/* Authors Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="size-5 text-gray-700" />
                      <h3 className="font-semibold">{authors.length > 1 ? "Authors" : "Author"}</h3>
                    </div>
                    <div className="grid gap-2">
                      {authors.map((author, index) => (
                        <div key={index} className="text-sm">
                          {author.name}
                          <span className="text-muted-foreground">
                            {` (${author.birth_year} - ${author.death_year})`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* // + Translators Section (if any) */}
                  {translators.length > 0 && (
                    <>
                      <div className="space-y-2">
                        <h3 className="font-semibold">Translators</h3>
                        <div className="grid gap-2">
                          {translators.map((translator, index) => (
                            <div key={index} className="text-sm">
                              {translator.name}
                              {(translator.birth_year || translator.death_year) && (
                                <span className="text-muted-foreground">
                                  {` (${translator.birth_year ?? "?"} - ${translator.death_year ?? "?"})`}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Separator />
                    </>
                  )}

                  {/* // + Genres Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Book className="size-5 text-gray-700" />
                      <h3 className="font-semibold">{subjects.length > 1 ? "Genres" : "Genre"}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* // + Bookshelves Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Library className="size-5 text-gray-700" />
                      <h3 className="font-semibold">Bookshelves</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {bookshelves.map((shelf, index) => (
                        <Badge key={index} variant="outline">
                          {shelf}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* // + Languages Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="size-5 text-gray-700" />
                      <h3 className="font-semibold">Languages</h3>
                    </div>
                    <div className="flex gap-2">
                      {languages.map((lang, index) => (
                        <Badge key={index} variant={"secondary"}>
                          {lang.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="download" className="space-y-4">
                  <div className="grid gap-4">
                    {Object.entries(formats).map(([format, url]) => (
                      <div key={format} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{format}</span>
                        <Button asChild size="sm">
                          <Link href={url} target="_blank">
                            <Download className="mr-2 size-5 text-gray-700" />
                            Download
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BookDetails
