import { getAPIResponse } from "@/utils/get-api-response"

export interface BookListAPIProps {
  count: number
  next: string
  previous: string | null
  results: Result[]
}

interface Result {
  id: number
  title: string
  authors: Author[]
  translators: Translator[]
  subjects: string[]
  bookshelves: string[]
  languages: string[]
  copyright: boolean
  media_type: string
  formats: Formats
  download_count: number
}

interface Author {
  name: string
  birth_year: number
  death_year: number
}

interface Translator {
  name: string
  birth_year?: number
  death_year?: number
}

interface Formats {
  "text/html": string
  "application/epub+zip": string
  "application/x-mobipocket-ebook": string
  "application/rdf+xml": string
  "image/jpeg": string
  "text/plain; charset=us-ascii": string
  "application/octet-stream": string
  "text/html; charset=utf-8"?: string
  "text/plain; charset=utf-8"?: string
  "text/plain; charset=iso-8859-1"?: string
  "text/html; charset=iso-8859-1"?: string
  "text/html; charset=us-ascii"?: string
}

interface GetBookListProps {
  pageNumber: number
  searchText: string
}

export const getBookList = async (
  { pageNumber = 1, searchText = "" }: GetBookListProps,
  wishlistIds: number[] | undefined = undefined,
) => {
  const data = await getAPIResponse({
    apiPath: searchText
      ? `/books?page=${pageNumber}&search=${searchText}`
      : wishlistIds
        ? `/books?ids=${wishlistIds.join(",")}`
        : `/books?page=${pageNumber}`,
  })
  return data as BookListAPIProps
}
