import { useEffect, useState } from "react"
import { BookListAPIProps } from "../api/book-list"

const useBookshelves = (books: BookListAPIProps["results"]) => {
  const [uniqueBookshelves, setUniqueBookshelves] = useState<string[]>([])

  useEffect(() => {
    if (books.length) {
      const allBookshelves = books
        .flatMap((book) => book.bookshelves)
        .filter((shelf, index, array) => array.indexOf(shelf) === index)

      setUniqueBookshelves(allBookshelves)
    }
  }, [books])

  return uniqueBookshelves
}

export { useBookshelves }
