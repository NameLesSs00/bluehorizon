"use client";

import { FiSearch, FiRotateCcw } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { AreaUnitsFilterState } from "./AreaUnitsFilterSidebar";

interface AreaUnitsFilterFieldsProps {
  filterState: AreaUnitsFilterState;
  onFilterChange: <K extends keyof AreaUnitsFilterState>(
    field: K,
    value: AreaUnitsFilterState[K]
  ) => void;
  onResetFilters: () => void;
  primaryCount: number;
  resaleCount: number;
  hasActiveFilters: boolean;
}

const PROPERTY_TYPES = [
  "All Types",
  "Apartment",
  "Villa",
  "Townhouse",
  "Studio",
  "Penthouse",
  "Chalet",
];

const SVG_CHEVRON = (
  <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center pr-3.5 rtl:pr-0 rtl:pl-3.5 text-[#6B7570]">
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>
);

export default function AreaUnitsFilterFields({
  filterState,
  onFilterChange,
  onResetFilters,
  primaryCount,
  resaleCount,
  hasActiveFilters,
}: AreaUnitsFilterFieldsProps) {
  const { t } = useTranslation();
  const totalCount = primaryCount + resaleCount;

  const bedroomOptions = [
    { label: t("areas.details.filters.bedroomsAny"), value: "Any" },
    { label: t("areas.details.filters.bedroomsStudio"), value: "0" },
    { label: t("areas.details.filters.bedroomSingle"), value: "1" },
    {
      label: t("areas.details.filters.bedroomsCount").replace("{count}", "2"),
      value: "2",
    },
    {
      label: t("areas.details.filters.bedroomsCount").replace("{count}", "3"),
      value: "3",
    },
    { label: t("areas.details.filters.bedrooms5Plus"), value: "4+" },
  ];

  return (
    <div className="mt-4 space-y-4">
      {/* Unit Category Segment */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-2"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("areas.details.filters.unitTypeLabel")}
        </label>
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-[#F0F3FA] p-1 border border-[#D9E2EE]">
          <button
            type="button"
            onClick={() => onFilterChange("tab", "all")}
            className={`rounded-lg py-1.5 text-[11px] font-semibold transition-all ${
              filterState.tab === "all"
                ? "bg-[#2B5FA6] text-white shadow-2xs"
                : "text-[#6B7570] hover:text-[#202326]"
            }`}
          >
            {t("areas.details.filters.typeAll")} ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("tab", "primary")}
            className={`rounded-lg py-1.5 text-[11px] font-semibold transition-all ${
              filterState.tab === "primary"
                ? "bg-[#2B5FA6] text-white shadow-2xs"
                : "text-[#6B7570] hover:text-[#202326]"
            }`}
          >
            {t("areas.details.filters.typePrimary")} ({primaryCount})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("tab", "resale")}
            className={`rounded-lg py-1.5 text-[11px] font-semibold transition-all ${
              filterState.tab === "resale"
                ? "bg-[#2B5FA6] text-white shadow-2xs"
                : "text-[#6B7570] hover:text-[#202326]"
            }`}
          >
            {t("areas.details.filters.typeResale")} ({resaleCount})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("areas.details.filters.searchLabel")}
        </label>
        <div className="relative">
          <FiSearch className="pointer-events-none absolute top-1/2 left-3 rtl:left-auto rtl:right-3 h-3.5 w-3.5 -translate-y-1/2 text-[#8A9590]" />
          <input
            type="text"
            value={filterState.searchTerm}
            onChange={(e) => onFilterChange("searchTerm", e.target.value)}
            placeholder={t("areas.details.filters.searchPlaceholder")}
            className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] py-2.5 pl-9 pr-3.5 rtl:pr-9 rtl:pl-3.5 text-xs text-[#202326] placeholder-[#8A9590] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
      </div>

      {/* Property Type Dropdown */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("areas.details.filters.propertyTypeLabel")}
        </label>
        <div className="relative">
          <select
            value={filterState.propertyType}
            onChange={(e) => onFilterChange("propertyType", e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type === "All Types"
                  ? t("areas.details.filters.anyPropertyType")
                  : type}
              </option>
            ))}
          </select>
          {SVG_CHEVRON}
        </div>
      </div>

      {/* Bedrooms Dropdown */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("areas.details.filters.bedroomsLabel")}
        </label>
        <div className="relative">
          <select
            value={filterState.bedrooms}
            onChange={(e) => onFilterChange("bedrooms", e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {bedroomOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {SVG_CHEVRON}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("areas.details.filters.minPrice")}
        </label>
        <input
          type="number"
          value={filterState.minPrice}
          onChange={(e) => onFilterChange("minPrice", e.target.value)}
          placeholder={t("areas.details.filters.minPricePlaceholder")}
          className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#8A9590] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("areas.details.filters.maxPrice")}
        </label>
        <input
          type="number"
          value={filterState.maxPrice}
          onChange={(e) => onFilterChange("maxPrice", e.target.value)}
          placeholder={t("areas.details.filters.maxPricePlaceholder")}
          className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#8A9590] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Reset Button (shown when active filters exist) */}
      {hasActiveFilters && (
        <div className="pt-1">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex w-full items-center justify-center gap-2 rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] py-2.5 text-xs font-semibold text-[#1B3A6B] transition-colors hover:border-[#1B3A6B] hover:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiRotateCcw className="h-3.5 w-3.5" />
            {t("areas.details.filters.resetButton")}
          </button>
        </div>
      )}
    </div>
  );
}

