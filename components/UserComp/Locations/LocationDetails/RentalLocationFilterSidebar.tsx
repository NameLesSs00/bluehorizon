"use client";

import { FiRotateCcw } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";
import RentalLocationFilterFields from "./RentalLocationFilterFields";

export interface RentalLocationFilterState {
  searchTerm: string;
  bedrooms: string;
  view: string;
  capacity: string;
  minPrice: string;
  maxPrice: string;
}

interface RentalLocationFilterSidebarProps {
  filterState: RentalLocationFilterState;
  onFilterChange: <K extends keyof RentalLocationFilterState>(
    field: K,
    value: RentalLocationFilterState[K]
  ) => void;
  onResetFilters: () => void;
  totalCount?: number;
  bare?: boolean;
}

export default function RentalLocationFilterSidebar({
  filterState,
  onFilterChange,
  onResetFilters,
  bare = false,
}: RentalLocationFilterSidebarProps) {
  const { t } = useTranslation();

  const hasActiveFilters =
    filterState.searchTerm.trim() !== "" ||
    filterState.bedrooms !== "Any" ||
    filterState.view !== "all" ||
    filterState.capacity !== "Any" ||
    filterState.minPrice !== "" ||
    filterState.maxPrice !== "";

  if (bare) {
    return (
      <div className="space-y-4">
        {hasActiveFilters && (
          <div className="flex justify-end pb-2">
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center gap-1.5 text-xs font-medium text-[#6B7570] transition-colors hover:text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <FiRotateCcw className="h-3.5 w-3.5" />
              {t("locations.details.filters.reset")}
            </button>
          </div>
        )}
        <RentalLocationFilterFields
          filterState={filterState}
          onFilterChange={onFilterChange}
          onResetFilters={onResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>
    );
  }

  return (
    <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
      <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-xs sticky top-28">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D9E2EE]">
          <h3
            className="text-base font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("locations.details.filters.title")}
          </h3>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center gap-1.5 text-xs font-medium text-[#6B7570] transition-colors hover:text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <FiRotateCcw className="h-3.5 w-3.5" />
              {t("locations.details.filters.reset")}
            </button>
          )}
        </div>

        <RentalLocationFilterFields
          filterState={filterState}
          onFilterChange={onFilterChange}
          onResetFilters={onResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>
    </aside>
  );
}
