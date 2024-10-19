"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  onPageChange: (newPage: number) => void
  hasNextPage: boolean
  hasPreviousPage: boolean
  isLoading: boolean
}

const Pagination = ({
  currentPage,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
  isLoading,
}: PaginationProps) => {
  return (
    <div className="col-span-full grid h-12 grid-cols-2 gap-5">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || !hasPreviousPage || isLoading}
        className="flex h-full justify-between rounded-xl"
      >
        <ChevronLeft />
        Previous
      </Button>
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage || isLoading}
        className="flex h-full justify-between rounded-xl"
      >
        Next
        <ChevronRight />
      </Button>
    </div>
  )
}

export default Pagination
