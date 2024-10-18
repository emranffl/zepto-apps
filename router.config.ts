/**
 * List of all the routes in the app for frontend rendering
 */
export const LINKS = {
  home: "/",
  BOOK: {
    DYNAMIC: (slug: string) => {
      return {
        home: `/book/${slug}`,
      } as const
    },
  },
  WISHLIST: {
    home: "/wishlist",
  },
} as const

/**
 * List of all the paths in the app for backend data fetching
 */
export const PATHS = {
  BOOK: {},
} as const
