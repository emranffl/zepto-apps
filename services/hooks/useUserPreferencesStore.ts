import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define the state interface
interface UserPreferencesState {
  pageNumber: number
  searchText: string
  topic: string
  setPageNumber: (pageNumber: number) => void
  setSearchText: (searchText: string) => void
  setTopic: (topic: string) => void
}

// Create the Zustand store with persistence
const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      pageNumber: 1,
      searchText: "",
      topic: "",
      setPageNumber: (pageNumber: number) => set({ pageNumber }),
      setSearchText: (searchText: string) => set({ searchText }),
      setTopic: (topic: string) => set({ topic }),
    }),
    {
      name: "user-preferences", // Name of the key in localStorage
    },
  ),
)

export { useUserPreferencesStore }
