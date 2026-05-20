import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/utils/cn";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange?.(page);
  };

  return (
    <nav className={cn("flex items-center justify-center gap-3", className)}>
      <button
        type="button"
        disabled={!canGoPrevious}
        onClick={() => handlePageChange(currentPage - 1)}
        className="border-border-deactivated text-text-secondary hover:bg-background-dark disabled:text-text-deactivated flex size-10 items-center justify-center rounded-lg border transition-colors disabled:cursor-not-allowed"
      >
        <ChevronLeft className="size-5" strokeWidth={2.25} />
      </button>

      <div className="flex items-center gap-3">
        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => handlePageChange(page)}
              className={cn(
                "text-label-03 flex size-10 items-center justify-center rounded-lg transition-colors",
                isActive
                  ? "bg-primary-800 text-text-inverse"
                  : "text-text-secondary hover:bg-background-dark bg-transparent",
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!canGoNext}
        onClick={() => handlePageChange(currentPage + 1)}
        className="border-border-deactivated text-text-secondary hover:bg-background-dark disabled:text-text-deactivated flex size-10 items-center justify-center rounded-lg border transition-colors disabled:cursor-not-allowed"
      >
        <ChevronRight className="size-5" strokeWidth={2.25} />
      </button>
    </nav>
  );
};
