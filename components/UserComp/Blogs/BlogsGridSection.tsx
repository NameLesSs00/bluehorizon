"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import BlogCard, { BlogCardData } from "./BlogCard";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  containerStaggerVariants,
  cardItemVariants,
} from "@/shared/utils/animations";

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
  const { t, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-10 mb-20 sm:mb-28">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-[430px] animate-pulse rounded-[24px] border border-[#D9E2EE] bg-[#F0F3FA]"
            />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[24px] border border-[#D9E2EE] bg-white p-12 sm:p-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5ECF6]">
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
            {t("blogs.grid.noArticlesTitle")}
          </h2>
          <p
            className="mt-2 max-w-md text-xs sm:text-sm text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("blogs.grid.noArticlesSubtitle")}
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="mt-6 rounded-full bg-[#1B3A6B] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-[#162E56]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("blogs.grid.resetFilters")}
            </button>
          )}
        </div>
      ) : (
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={containerStaggerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          {blogs.map((blog) => (
            <motion.div key={blog.id} variants={cardItemVariants}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D9E2EE] pt-6">
          <span
            className="text-xs sm:text-sm text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("blogs.grid.showing")
              .replace("{page}", String(currentPage))
              .replace("{total}", String(totalPages))}
          </span>

          <div className="flex items-center gap-2">
            {/* Prev button */}
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#D9E2EE] bg-white text-xs font-semibold text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t("blogs.grid.prevPage")}
            >
              {isRtl ? "\u2192" : "\u2190"}
            </button>

            {/* Page number buttons */}
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNumber = idx + 1;
              const isActive = pageNumber === currentPage;
              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`flex h-9 w-9 items-center justify-center rounded-[10px] text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#1B3A6B] text-white"
                      : "border border-[#D9E2EE] bg-white text-[#202326] hover:bg-[#F0F3FA]"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next button */}
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#D9E2EE] bg-white text-xs font-semibold text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t("blogs.grid.nextPage")}
            >
              {isRtl ? "\u2190" : "\u2192"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
