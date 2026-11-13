"use client";

import { FiChevronRight, FiChevronLeft, FiInbox } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import { RentalItem } from "@/models/rental";
import RentalUnitCard from "./RentalUnitCard";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  containerStaggerVariants,
  cardItemVariants,
} from "@/shared/utils/animations";

interface RentalUnitsGridProps {
  units: RentalItem[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}

export default function RentalUnitsGrid({
  units,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters,
}: RentalUnitsGridProps) {
  const { t, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const shouldReduceMotion = useReducedMotion();
  const displayUnits = units;

  return (
    <div className="flex-1">
      {/* Section Header */}
      <div className="mb-6 sm:mb-8">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {t("rent.grid.title")}
        </h2>
        <p
          className="mt-1.5 text-xs sm:text-sm text-[#65706B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("rent.grid.subtitle")}
        </p>
      </div>

      {/* Grid or Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="overflow-hidden rounded-[20px] border border-[#D9E2EE] bg-white p-4"
            >
              <div className="h-44 w-full animate-pulse rounded-[14px] bg-[#E5ECF6]" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-[#D9E2EE]" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-[#E5ECF6]" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-[#F0F3FA]" />
              </div>
            </div>
          ))}
        </div>
      ) : displayUnits.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-[24px] border border-[#D9E2EE] bg-white p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E5ECF6] text-[#2B5FA6]">
            <FiInbox className="h-7 w-7" />
          </div>
          <h3
            className="mt-4 text-lg font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("rent.grid.noUnitsTitle")}
          </h3>
          <p
            className="mt-1.5 max-w-md text-xs sm:text-sm text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("rent.grid.noUnitsSubtitle")}
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 rounded-[12px] bg-[#2B5FA6] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#1B3A6B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("rent.grid.resetFilters")}
          </button>
        </div>
      ) : (
        /* Units Grid with Staggered Fade-In */
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={containerStaggerVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayUnits.map((unit) => (
            <motion.div key={unit.id} variants={cardItemVariants}>
              <RentalUnitCard unit={unit} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D9E2EE] pt-6">
          <span className="text-xs sm:text-sm text-[#65706B]">
            {t("rent.grid.showing")
              .replace("{page}", String(currentPage))
              .replace("{total}", String(totalPages))}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#D9E2EE] bg-white text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:opacity-40 disabled:pointer-events-none"
              aria-label={t("rent.grid.prevPage")}
            >
              {isRtl ? (
                <FiChevronRight className="h-4 w-4" />
              ) : (
                <FiChevronLeft className="h-4 w-4" />
              )}
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page)}
                  className={`flex h-9 w-9 items-center justify-center rounded-[10px] text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#2B5FA6] text-white"
                      : "border border-[#D9E2EE] bg-white text-[#202326] hover:bg-[#F0F3FA]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#D9E2EE] bg-white text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:opacity-40 disabled:pointer-events-none"
              aria-label={t("rent.grid.nextPage")}
            >
              {isRtl ? (
                <FiChevronLeft className="h-4 w-4" />
              ) : (
                <FiChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
