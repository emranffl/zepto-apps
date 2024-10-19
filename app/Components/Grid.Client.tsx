"use client"

import { QUERY } from "@/query.config"
import { getBookList } from "@/services/api/book-list"
import { useBookshelves } from "@/services/hooks/useBookshelves"
import { useUserPreferencesStore } from "@/services/hooks/useUserPreferencesStore"
import { useWishlistStore } from "@/zustand/wishlist"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import BookCard from "./BookCard"
import BookCardSkeleton from "./BookCard.Skeleton"
import DebouncedSearchInput from "./DebounceInput.Client"
import Pagination from "./Pagination.Client"
import TopicFilter from "./TopicFilter.Client"

const Grid = ({ isWishlistRoute }: { isWishlistRoute?: true }) => {
  // * Fetch user preferences from Zustand
  const { pageNumber, searchText, topic, setPageNumber, setSearchText, setTopic } =
    useUserPreferencesStore()

  // * Fetch wishlist
  const { wishlist } = useWishlistStore()

  // * Handle input for search and filter
  const handleInput = (newValue: string, type: "searchText" | "topic") => {
    if (type === "searchText") {
      setSearchText(newValue)
    } else {
      setTopic(newValue)
    }
  }

  // * Fetch book list
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      QUERY.BOOK.LIST({
        pageNumber,
        searchText,
        topic,
      }).key,
      isWishlistRoute ? wishlist : undefined,
    ],
    queryFn: async () =>
      await getBookList({ pageNumber, searchText, topic }, isWishlistRoute ? wishlist : undefined),
  })

  // * Fetch bookshelves
  const bookshelves = useBookshelves(data?.results || [])

  // * Set Zustand state when component mounts
  useEffect(() => {
    // * Set page number to 1 when not on wishlist route
    if (!isWishlistRoute) {
      setPageNumber(1)
    }

    // * Set search text and topic to empty string when on wishlist route
    if (isWishlistRoute) {
      setSearchText("")
      setTopic("")
    }
  }, [isWishlistRoute, setPageNumber, setSearchText, setTopic])

  // + Error handling
  if (isError) {
    return <div className="text-center text-red-500">An error occurred, please try again later</div>
  }

  return (
    <>
      {/* // + Search & filter */}
      {!isWishlistRoute && (
        <div className="bx-container sticky top-10 z-10 grid gap-5 bg-background py-5 xl:top-16">
          <div className="flex items-center justify-end gap-2">
            <DebouncedSearchInput value={searchText} onChange={handleInput} />
            <TopicFilter bookshelves={bookshelves} onSelect={handleInput} selectedItem={topic} />
          </div>
        </div>
      )}

      {/* // + Card grid */}
      <div className="grid gap-5 xl:grid-cols-2">
        {data?.results.map((book) => <BookCard key={book.id} book={book} />)}

        {/* // + Loading Skeleton */}
        {isLoading && Array.from({ length: 4 }).map((_, i) => <BookCardSkeleton key={i} />)}

        {/* // + Pagination */}
        {!isWishlistRoute && (
          <Pagination
            currentPage={pageNumber}
            onPageChange={(newPage) => setPageNumber(newPage)}
            hasNextPage={data?.next !== null}
            hasPreviousPage={data?.previous !== null}
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  )
}

export default Grid
