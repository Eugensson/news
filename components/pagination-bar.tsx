"use client";

import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export const PaginationBar = ({
  currentPage,
  totalPages,
}: PaginationBarProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const generateDesktopPagination = () => {
    const pages: (number | string)[] = [1];

    let middlePages: (number | string)[] = [];
    if (currentPage <= 4) {
      middlePages = [2, 3, 4, 5];
    } else if (currentPage >= totalPages - 3) {
      middlePages = [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
      ];
    } else {
      middlePages = [currentPage - 1, currentPage, currentPage + 1];
    }

    if (Number(middlePages[0]) > 2) {
      pages.push("...");
    }
    pages.push(...middlePages);
    if (Number(middlePages[middlePages.length - 1]) < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages.slice(0, 7);
  };

  const renderPageItem = (page: number | string) => {
    if (typeof page === "number") {
      return (
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(page);
          }}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "border-2 border-primary",
            page === currentPage ? "bg-primary text-white" : ""
          )}
        >
          {page}
        </PaginationLink>
      );
    }
    return <PaginationEllipsis />;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className={cn(
              "border-2 border-primary",
              currentPage === 1 ? "pointer-events-none opacity-80" : ""
            )}
          />
        </PaginationItem>

        {isMobile ? (
          <>
            <PaginationItem key="ellipsis-1">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem key={`page-${currentPage}`}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage);
                }}
                aria-current="page"
                className="bg-primary text-white"
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem key="ellipsis-2">
              <PaginationEllipsis />
            </PaginationItem>
          </>
        ) : (
          generateDesktopPagination().map((page, index) => (
            <PaginationItem key={`page-${index}`}>
              {renderPageItem(page)}
            </PaginationItem>
          ))
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
            className={cn(
              "border-2 border-primary",
              currentPage === totalPages ? "pointer-events-none opacity-80" : ""
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
