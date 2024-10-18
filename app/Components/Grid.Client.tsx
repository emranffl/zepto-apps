"use client"

import { Button } from "@/components/ui/button"
import { QUERY } from "@/query.config"
import { getBookList } from "@/services/api/book-list"
import { useWishlistStore } from "@/zustand/wishlist"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import BookCard from "./BookCard"
import BookCardSkeleton from "./BookCard.Skeleton"

const Grid = ({ isWishlistRoute }: { isWishlistRoute?: true }) => {
  const [state, setState] = useState({ pageNumber: 1, searchText: "" })
  const { wishlist } = useWishlistStore()

  const { data, isLoading } = useQuery({
    queryKey: [
      QUERY.BOOK.LIST({ pageNumber: state.pageNumber, searchText: state.searchText }).key,
      isWishlistRoute ? wishlist : undefined,
    ],
    queryFn: async () =>
      await getBookList(
        { pageNumber: state.pageNumber, searchText: state.searchText },
        isWishlistRoute ? wishlist : undefined,
      ),
  })

  return (
    <>
      {/* // + Card grid */}
      <div className="grid gap-5 xl:grid-cols-2">
        {/* <pre className="col-span-full whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre> */}
        {data?.results.map((book) => <BookCard key={book.id} book={book} />)}

        {/* // + Loading Skeleton */}
        {isLoading && Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} />)}

        {/* // + Pagination */}
        {!isWishlistRoute && (
          <div className="col-span-full grid h-12 grid-cols-2 gap-5">
            <Button
              variant={"outline"}
              onClick={() => setState((prev) => ({ ...prev, pageNumber: prev.pageNumber - 1 }))}
              disabled={state.pageNumber === 1 || data?.previous === null || isLoading}
              className="flex h-full justify-between rounded-xl"
            >
              <ChevronLeft />
              Previous
            </Button>
            <Button
              variant={"outline"}
              onClick={() => setState((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }))}
              disabled={data?.next === null || isLoading}
              className="flex h-full justify-between rounded-xl"
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default Grid
