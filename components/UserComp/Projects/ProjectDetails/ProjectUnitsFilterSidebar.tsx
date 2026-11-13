"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiRotateCcw,
} from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";
import ProjectUnitsFilterFields from "./ProjectUnitsFilterFields";

export interface UnitsFilterState {
  searchTerm: string;
  category: string;
  unitType: "All" | "Primary" | "Resale";
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
  deliveryDateFrom?: string;
  deliveryDateTo?: string;
}

interface ProjectUnitsFilterSidebarProps {
  initialFilters: UnitsFilterState;
  onApplyFilters: (filters: UnitsFilterState) => void;
  onResetFilters: () => void;
  primaryCount?: number;
  resaleCount?: number;
}

const CATEGORIES = [
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Chalet",
  "Duplex",
  "Studio",
];

export default function ProjectUnitsFilterSidebar({
  initialFilters,
  onApplyFilters,
  onResetFilters,
  primaryCount = 0,
  resaleCount = 0,
}: ProjectUnitsFilterSidebarProps) {
  const { t } = useTranslation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [category, setCategory] = useState(initialFilters.category);
  const [unitType, setUnitType] = useState(initialFilters.unitType);
  const [bedrooms, setBedrooms] = useState(initialFilters.bedrooms || "");
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);

  const isInitialMount = useRef(true);

  // Sync internal state when external initialFilters change
  useEffect(() => {
    setSearchTerm(initialFilters.searchTerm);
    setCategory(initialFilters.category);
    setUnitType(initialFilters.unitType);
    setBedrooms(initialFilters.bedrooms || "");
    setMinPrice(initialFilters.minPrice);
    setMaxPrice(initialFilters.maxPrice);
  }, [initialFilters]);

  // Auto-apply filters after 1 second of inactivity (typing debounce)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onApplyFilters({
        searchTerm,
        category,
        unitType,
        bedrooms,
        minPrice,
        maxPrice,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    searchTerm,
    category,
    unitType,
    bedrooms,
    minPrice,
    maxPrice,
    onApplyFilters,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters({
      searchTerm,
      category,
      unitType,
      bedrooms,
      minPrice,
      maxPrice,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setCategory("");
    setUnitType("All");
    setBedrooms("");
    setMinPrice("");
    setMaxPrice("");
    onResetFilters();
  };

  const activeFilterCount = [
    Boolean(searchTerm.trim()),
    Boolean(category && category !== "Any Type"),
    Boolean(unitType !== "All"),
    Boolean(bedrooms && bedrooms !== "Any"),
    Boolean(minPrice),
    Boolean(maxPrice),
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
      {/* Mobile Collapsible Toggle Button */}
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-[16px] border border-[#D9E2EE] bg-white px-4 py-3.5 shadow-xs transition-colors hover:border-[#2B5FA6]"
          aria-expanded={isMobileOpen}
        >
          <div className="flex items-center gap-2.5">
            <FiFilter className="h-4 w-4 text-[#2B5FA6]" />
            <span
              className="text-sm font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("projects.details.unitsFilters.title")}
            </span>
            {hasActiveFilters && (
              <span className="rounded-full bg-[#2B5FA6]/10 px-2 py-0.5 text-[11px] font-semibold text-[#2B5FA6]">
                {t("projects.details.unitsFilters.activeCount").replace(
                  "{count}",
                  String(activeFilterCount)
                )}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#2B5FA6]">
            <span>
              {isMobileOpen
                ? t("projects.details.unitsFilters.hideFilters")
                : t("projects.details.unitsFilters.showFilters")}
            </span>
            {isMobileOpen ? (
              <FiChevronUp className="h-4 w-4" />
            ) : (
              <FiChevronDown className="h-4 w-4" />
            )}
          </div>
        </button>
      </div>

      {/* Filter Sidebar Container */}
      <div
        className={`rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-sm ${
          isMobileOpen ? "block" : "hidden lg:block"
        }`}
      >
        {/* Header */}
        <div className="border-b border-[#D9E2EE] pb-4">
          <h2
            className="text-lg font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("projects.details.unitsFilters.title")}
          </h2>
        </div>

        {/* Filter Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <ProjectUnitsFilterFields
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            category={category}
            onCategoryChange={setCategory}
            categories={CATEGORIES}
            unitType={unitType}
            onUnitTypeChange={setUnitType}
            bedrooms={bedrooms}
            onBedroomsChange={setBedrooms}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            primaryCount={primaryCount}
            resaleCount={resaleCount}
          />

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              type="submit"
              className="w-full rounded-[12px] bg-[#2B5FA6] py-3 text-center text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1B3A6B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("projects.details.unitsFilters.apply")}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-2 rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] py-2.5 text-center text-xs sm:text-sm font-semibold text-[#1B3A6B] transition-colors hover:border-[#1B3A6B] hover:bg-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <FiRotateCcw className="h-3.5 w-3.5" />
                <span>{t("projects.details.unitsFilters.resetButton")}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </aside>
  );
}
