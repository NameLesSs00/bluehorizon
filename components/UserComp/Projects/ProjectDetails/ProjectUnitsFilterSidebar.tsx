"use client";

import { useEffect, useRef, useState } from "react";
import { FiRotateCcw } from "react-icons/fi";
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
  bare?: boolean;
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
  bare = false,
}: ProjectUnitsFilterSidebarProps) {
  const { t } = useTranslation();

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

  const formContent = (
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
  );

  if (bare) {
    return formContent;
  }

  return (
    <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
      <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-sm">
        {/* Header */}
        <div className="border-b border-[#D9E2EE] pb-4">
          <h2
            className="text-lg font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("projects.details.unitsFilters.title")}
          </h2>
        </div>

        {formContent}
      </div>
    </aside>
  );
}
