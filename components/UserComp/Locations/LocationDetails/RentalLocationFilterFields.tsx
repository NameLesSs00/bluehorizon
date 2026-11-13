"use client";

import { FiSearch, FiRotateCcw } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { RentalLocationFilterState } from "./RentalLocationFilterSidebar";

interface RentalLocationFilterFieldsProps {
  filterState: RentalLocationFilterState;
  onFilterChange: <K extends keyof RentalLocationFilterState>(
    field: K,
    value: RentalLocationFilterState[K]
  ) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

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

export default function RentalLocationFilterFields({
  filterState,
  onFilterChange,
  onResetFilters,
  hasActiveFilters,
}: RentalLocationFilterFieldsProps) {
  const { t } = useTranslation();

  const bedroomOptions = [
    { label: t("locations.details.filters.bedroomsAny"), value: "Any" },
    { label: t("locations.details.filters.bedroomSingle"), value: "1" },
    {
      label: t("locations.details.filters.bedroomsCount").replace(
        "{count}",
        "2"
      ),
      value: "2",
    },
    {
      label: t("locations.details.filters.bedroomsCount").replace(
        "{count}",
        "3"
      ),
      value: "3",
    },
    { label: t("locations.details.filters.bedrooms5Plus"), value: "4+" },
  ];

  const viewOptions = [
    { label: t("locations.details.filters.allViews"), value: "all" },
    { label: t("locations.details.filters.seaView"), value: "sea" },
    { label: t("locations.details.filters.poolView"), value: "pool" },
    { label: t("locations.details.filters.gardenView"), value: "garden" },
  ];

  const capacityOptions = [
    { label: t("locations.details.filters.anyCapacity"), value: "Any" },
    {
      label: t("locations.details.filters.guestsCount").replace("{count}", "2"),
      value: "2",
    },
    {
      label: t("locations.details.filters.guestsCount").replace("{count}", "4"),
      value: "4",
    },
    {
      label: t("locations.details.filters.guestsCount").replace("{count}", "6"),
      value: "6",
    },
  ];

  return (
    <div className="mt-4 space-y-4">
      {/* Search Input */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("locations.details.filters.searchLabel")}
        </label>
        <div className="relative">
          <FiSearch className="pointer-events-none absolute top-1/2 left-3 rtl:left-auto rtl:right-3 h-3.5 w-3.5 -translate-y-1/2 text-[#8A9590]" />
          <input
            type="text"
            value={filterState.searchTerm}
            onChange={(e) => onFilterChange("searchTerm", e.target.value)}
            placeholder={t("locations.details.filters.searchPlaceholder")}
            className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] py-2.5 pl-9 pr-3.5 rtl:pr-9 rtl:pl-3.5 text-xs text-[#202326] placeholder-[#8A9590] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
      </div>

      {/* Bedrooms Dropdown */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("locations.details.filters.bedroomsLabel")}
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

      {/* View Dropdown */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("locations.details.filters.viewLabel")}
        </label>
        <div className="relative">
          <select
            value={filterState.view}
            onChange={(e) => onFilterChange("view", e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {viewOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {SVG_CHEVRON}
        </div>
      </div>

      {/* Capacity Dropdown */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("locations.details.filters.capacityLabel")}
        </label>
        <div className="relative">
          <select
            value={filterState.capacity}
            onChange={(e) => onFilterChange("capacity", e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {capacityOptions.map((opt) => (
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
          {t("locations.details.filters.minPrice")}
        </label>
        <input
          type="number"
          value={filterState.minPrice}
          onChange={(e) => onFilterChange("minPrice", e.target.value)}
          placeholder={t("locations.details.filters.minPricePlaceholder")}
          className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#8A9590] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("locations.details.filters.maxPrice")}
        </label>
        <input
          type="number"
          value={filterState.maxPrice}
          onChange={(e) => onFilterChange("maxPrice", e.target.value)}
          placeholder={t("locations.details.filters.maxPricePlaceholder")}
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
            {t("locations.details.filters.resetButton")}
          </button>
        </div>
      )}
    </div>
  );
}

