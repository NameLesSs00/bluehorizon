"use client";

import Image from "next/image";
import BlogCard, { BlogCardData } from "./BlogCard";

interface BlogsGridSectionProps {
  blogs: BlogCardData[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onResetFilters?: () => void;
}

export default function BlogsGridSection({
  blogs,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters,
}: BlogsGridSectionProps) {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-10 mb-20 sm:mb-28">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-[430px] animate-pulse rounded-[24px] border border-[#E1E7E3] bg-[#F3F5F3]"
            />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[24px] border border-[#E1E7E3] bg-white p-12 sm:p-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1EC]">
            <Image
              src="/Blogs/svg (5).svg"
              alt="No articles"
              width={24}
              height={24}
            />
          </div>
          <h2
            className="text-xl sm:text-2xl font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            No Articles Found
          </h2>
          <p
            className="mt-2 text-sm text-[#6B7570] max-w-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            We couldn&apos;t find any articles matching your search or selected filter.
            Try searching for something else or clearing your filters.
          </p>
          {onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-6 rounded-full bg-[#145C4B] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#0F473A]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && !isLoading && (
        <nav
          aria-label="Blog pages"
          className="mt-12 sm:mt-16 flex items-center justify-center gap-2"
        >
          {/* Previous Page Button */}
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            aria-label="Previous Page"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E1E7E3] bg-white transition-colors hover:bg-[#F3F5F3] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Image
              src="/Blogs/Vector (1).svg"
              alt="Previous"
              width={6}
              height={10}
            />
          </button>

          {/* Numeric Page Buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#145C4B] text-white shadow-sm"
                    : "border border-[#E1E7E3] bg-white text-[#202326] hover:bg-[#F3F5F3]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Page Button */}
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            aria-label="Next Page"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E1E7E3] bg-white transition-colors hover:bg-[#F3F5F3] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Image
              src="/Blogs/Vector.svg"
              alt="Next"
              width={6}
              height={10}
            />
          </button>
        </nav>
      )}
    </section>
  );
}

