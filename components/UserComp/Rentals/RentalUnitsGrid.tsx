"use client";

import { FiChevronRight, FiInbox } from "react-icons/fi";
import { RentalItem } from "@/models/rental";
import RentalUnitCard from "./RentalUnitCard";
import { FALLBACK_RENTAL_UNITS } from "./rentalFallbacks";

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
  const displayUnits = units.length > 0 ? units : FALLBACK_RENTAL_UNITS;

  return (
    <div className="flex-1">
      {/* Section Header */}
      <div className="mb-6 sm:mb-8">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Available Units
        </h2>
        <p
          className="mt-1.5 text-xs sm:text-sm text-[#65706B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Explore top-tier residential units ready for immediate rent.
        </p>
      </div>

      {/* Grid or Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="overflow-hidden rounded-[20px] border border-[#E1E7E3] bg-white p-4"
            >
              <div className="h-48 w-full animate-pulse rounded-[16px] bg-[#E8F1EC]" />
              <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-[#E1E7E3]" />
              <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-[#F3F5F3]" />
              <div className="mt-4 h-9 w-full animate-pulse rounded-[10px] bg-[#F3F5F3]" />
            </div>
          ))}
        </div>
      ) : displayUnits.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[24px] border border-[#E1E7E3] bg-white px-6 py-16 text-center">
          <FiInbox className="h-10 w-10 text-[#9CA3AF]" />
          <h3
            className="mt-3 text-lg font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            No Rental Units Match Your Criteria
          </h3>
          <p
            className="mt-1 text-xs text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Try adjusting your search filters to find available properties.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 rounded-full bg-[#0F473A] px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayUnits.map((unit) => (
            <RentalUnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`flex h-9 w-9 items-center justify-center rounded-[10px] text-xs font-semibold transition-all ${
                currentPage === p
                  ? "bg-[#0F473A] text-white shadow-xs"
                  : "border border-[#E1E7E3] bg-white text-[#202326] hover:bg-[#FAF8F5]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {p}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E1E7E3] bg-white text-[#202326] transition-all hover:bg-[#FAF8F5]"
              aria-label="Next page"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

