"use client"

import { Button } from "@/components/ui/button"
import { QUERY } from "@/query.config"
import { getBookList } from "@/services/api/book-list"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import BookCard from "./BookCard"

const Grid = () => {
  const [state, setState] = useState({ pageNumber: 1, searchText: "" })

  const { data } = useQuery({
    queryKey: [QUERY.BOOK.LIST({ pageNumber: state.pageNumber, searchText: state.searchText }).key],
    queryFn: async () =>
      await getBookList({ pageNumber: state.pageNumber, searchText: state.searchText }),
  })

  if (!data) return <div>error</div>

  return (
    <>
      {/* // + Card grid */}
      <div className="grid gap-5 xl:grid-cols-2">
        <pre className="col-span-full whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
        {data.results.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* // + Pagination */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => setState((prev) => ({ ...prev, pageNumber: prev.pageNumber - 1 }))}
          disabled={state.pageNumber === 1 || data.previous === null}
          // className="btn btn-primary"
        >
          Previous
        </Button>
        <Button
          onClick={() => setState((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }))}
          disabled={data.next === null}
          // className="btn btn-primary"
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default Grid
