// components/PaginationComponent.tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
}

export const PaginationComponent = ({
  totalPages,
  currentPage,
  onPageClick,
}: PaginationProps) => {
  // logic for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages > 1) {
      pageNumbers.push(1);
    }

    // Show pages around the current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pageNumbers.push("..."); // Add ellipsis if there's a gap
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("..."); // Add ellipsis if there's a gap before the last page
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent className="font-sans text-black dark:text-white">
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious
              href="#"
              onClick={() => onPageClick(currentPage - 1)}
            />
          ) : (
            <span className="text-gray-400 cursor-not-allowed">Previous</span>
          )}
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <PaginationItem key={index}>
              <span>...</span>
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => onPageClick(page as number)}
                className={currentPage === page ? "text-red-600" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationNext
              href="#"
              onClick={() => onPageClick(currentPage + 1)}
            />
          ) : (
            <span className="text-gray-400 cursor-not-allowed">Next</span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
