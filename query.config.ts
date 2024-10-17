/**
 * List of all the query keys in the app for data fetching/mutation
 */
export const QUERY = {
  BOOK: {
    LIST: ({ pageNumber, searchText }: { pageNumber: number | string; searchText: string }) => {
      return { key: `book-list-${pageNumber}-${searchText}` as const }
    },
    DYNAMIC: (slug: string) => {
      return { key: `book-details-${slug}` as const }
    },
  },
}
