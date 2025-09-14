"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations("tasks.pagination")
  
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        {t("previous")}
      </Button>
      
      <div className="text-sm text-muted-foreground">
        {startItem}-{endItem} {t("of")} {totalItems}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2"
      >
        {t("next")}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
