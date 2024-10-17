import { create } from "zustand"

interface WishlistState {
  wishlist: number[]
  toggleWishlist: (bookId: number) => void
}

const useWishlistStore = create<WishlistState>((set) => ({
  wishlist:
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("wishlist") || "[]") : [],

  toggleWishlist: (bookId) =>
    set((state) => {
      const isWishlisted = state.wishlist.includes(bookId)
      const updatedWishlist = isWishlisted
        ? state.wishlist.filter((id) => id !== bookId)
        : [...state.wishlist, bookId]

      // Update local storage
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

      return { wishlist: updatedWishlist }
    }),
}))

export { useWishlistStore }
