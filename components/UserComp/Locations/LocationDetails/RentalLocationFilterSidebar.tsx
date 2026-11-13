"use client";

import { useState } from "react";
import {
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiRotateCcw,
} from "react-icons/fi";
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
  totalCount: number;
}

export default function RentalLocationFilterSidebar({
  filterState,
  onFilterChange,
  onResetFilters,
}: RentalLocationFilterSidebarProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const hasActiveFilters =
    filterState.searchTerm.trim() !== "" ||
    filterState.bedrooms !== "Any" ||
    filterState.view !== "all" ||
    filterState.capacity !== "Any" ||
    filterState.minPrice !== "" ||
    filterState.maxPrice !== "";

  const activeCount = [
    filterState.searchTerm.trim() !== "",
    filterState.bedrooms !== "Any",
    filterState.view !== "all",
    filterState.capacity !== "Any",
    filterState.minPrice !== "",
    filterState.maxPrice !== "",
  ].filter(Boolean).length;

  return (
    <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
      {/* Mobile Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-[16px] border border-[#D9E2EE] bg-white px-5 py-3.5 lg:hidden"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-[#202326]">
          <FiFilter className="h-4 w-4 text-[#2B5FA6]" />
          {t("locations.details.filters.title")}
          {hasActiveFilters && (
            <span className="rounded-full bg-[#2B5FA6] px-2 py-0.5 text-[10px] font-bold text-white">
              {t("locations.details.filters.activeCount").replace(
                "{count}",
                String(activeCount)
              )}
            </span>
          )}
        </span>
        {isOpen ? (
          <FiChevronUp className="h-4 w-4 text-[#6B7570]" />
        ) : (
          <FiChevronDown className="h-4 w-4 text-[#6B7570]" />
        )}
      </button>

      {/* Collapsible Content */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-xs sticky top-28 mt-3 lg:mt-0">
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
      </div>
    </aside>
  );
}
