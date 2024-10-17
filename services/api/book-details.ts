import { getAPIResponse } from "@/utils/get-api-response"

export interface BookDetailsAPIProps {
  id: number
  title: string
  authors: Author[]
  translators: Translators[]
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

interface Translators {
  name: string
  birth_year: number | null
  death_year: number | null
}

interface Formats {
  "text/html": string
  "application/epub+zip": string
  "application/x-mobipocket-ebook": string
  "application/rdf+xml": string
  "image/jpeg": string
  "application/octet-stream": string
  "text/plain; charset=us-ascii": string
}

export const getBookDetails = async (id: number | string) => {
  const data = await getAPIResponse({
    apiPath: `/books/${id}`,
  })
  return data as BookDetailsAPIProps
}
