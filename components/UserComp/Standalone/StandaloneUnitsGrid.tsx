"use client";

import { StandaloneUnitItem } from "@/models/standaloneUnit";
import StandaloneUnitCard from "./StandaloneUnitCard";

interface StandaloneUnitsGridProps {
  units: StandaloneUnitItem[];
  isLoading: boolean;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}

export default function StandaloneUnitsGrid({
  units,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters,
}: StandaloneUnitsGridProps) {
  // Generate pagination buttons
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return (
      <div className="mt-10 flex items-center justify-center gap-2">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`flex h-10 w-10 items-center justify-center rounded-[12px] text-xs sm:text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-[#2B5FA6] text-white shadow-sm"
                  : "border border-[#D9E2EE] bg-white text-[#202326] hover:bg-[#F0F3FA]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {p}
            </button>
          );
        })}

        {currentPage < totalPages && (
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#D9E2EE] bg-white text-[#202326] transition-colors hover:bg-[#F0F3FA]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1">
      {/* Section Header */}
      <div>
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Available Units
        </h2>
        <p
          className="mt-1 text-xs sm:text-sm text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Explore top-tier residential units ready for immediate sale.
        </p>
      </div>

      {/* Grid or States */}
      {isLoading ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-[380px] animate-pulse rounded-[20px] border border-[#D9E2EE] bg-[#F0F3FA]"
            />
          ))}
        </div>
      ) : units.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-[20px] border border-[#D9E2EE] bg-white p-12 sm:p-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5ECF6]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2B5FA6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
          <h3
            className="text-lg sm:text-xl font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            No Standalone Units Found
          </h3>
          <p
            className="mt-2 text-xs sm:text-sm text-[#6B7570] max-w-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            We could not find any units matching your filter criteria. Try
            adjusting your search or resetting the filters.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 rounded-[12px] bg-[#2B5FA6] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#1B3A6B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {units.map((unit) => (
              <StandaloneUnitCard key={unit.id} unit={unit} />
            ))}
          </div>

          {renderPagination()}
        </>
      )}
    </div>
  );
}

