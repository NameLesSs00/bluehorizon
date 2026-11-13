"use client";

import { FiSearch } from "react-icons/fi";

export interface AreaUnitsFilterState {
  tab: "all" | "primary" | "resale";
  searchTerm: string;
  propertyType: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
}

interface AreaUnitsFilterSidebarProps {
  filterState: AreaUnitsFilterState;
  onFilterChange: <K extends keyof AreaUnitsFilterState>(
    field: K,
    value: AreaUnitsFilterState[K]
  ) => void;
  onResetFilters: () => void;
  primaryCount: number;
  resaleCount: number;
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

const BEDROOM_OPTIONS = [
  { label: "Any Bedrooms", value: "Any" },
  { label: "Studio (0 Bed)", value: "0" },
  { label: "1 Bedroom", value: "1" },
  { label: "2 Bedrooms", value: "2" },
  { label: "3 Bedrooms", value: "3" },
  { label: "4+ Bedrooms", value: "4+" },
];

export default function AreaUnitsFilterSidebar({
  filterState,
  onFilterChange,
  onResetFilters,
  primaryCount,
  resaleCount,
}: AreaUnitsFilterSidebarProps) {
  const totalCount = primaryCount + resaleCount;

  return (
    <aside className="w-full lg:w-[280px] shrink-0">
      <div className="rounded-[20px] border border-[#E1E7E3] bg-white p-5 sm:p-6 shadow-xs sticky top-28">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E1E7E3]">
          <h3
            className="text-base font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Filter Units
          </h3>
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-medium text-[#6B7570] transition-colors hover:text-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Reset All
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Unit Category Segment */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Unit Type
            </label>
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-[#F3F5F3] p-1 border border-[#E1E7E3]">
              <button
                type="button"
                onClick={() => onFilterChange("tab", "all")}
                className={`rounded-lg py-1.5 text-[11px] font-semibold transition-all ${
                  filterState.tab === "all"
                    ? "bg-[#145C4B] text-white shadow-2xs"
                    : "text-[#6B7570] hover:text-[#202326]"
                }`}
              >
                All ({totalCount})
              </button>
              <button
                type="button"
                onClick={() => onFilterChange("tab", "primary")}
                className={`rounded-lg py-1.5 text-[11px] font-semibold transition-all ${
                  filterState.tab === "primary"
                    ? "bg-[#145C4B] text-white shadow-2xs"
                    : "text-[#6B7570] hover:text-[#202326]"
                }`}
              >
                Primary ({primaryCount})
              </button>
              <button
                type="button"
                onClick={() => onFilterChange("tab", "resale")}
                className={`rounded-lg py-1.5 text-[11px] font-semibold transition-all ${
                  filterState.tab === "resale"
                    ? "bg-[#145C4B] text-white shadow-2xs"
                    : "text-[#6B7570] hover:text-[#202326]"
                }`}
              >
                Resale ({resaleCount})
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Search Units
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8A9590]" />
              <input
                type="text"
                value={filterState.searchTerm}
                onChange={(e) => onFilterChange("searchTerm", e.target.value)}
                placeholder="Unit title, dev name..."
                className="w-full rounded-xl bg-[#F3F5F3] pl-9 pr-3.5 py-2.5 text-xs text-[#202326] placeholder-[#8A9590] outline-hidden border border-transparent focus:border-[#145C4B] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
          </div>

          {/* Property Type Dropdown */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Property Type
            </label>
            <select
              value={filterState.propertyType}
              onChange={(e) => onFilterChange("propertyType", e.target.value)}
              className="w-full rounded-xl bg-[#F3F5F3] px-3.5 py-2.5 text-xs text-[#202326] outline-hidden border border-transparent focus:border-[#145C4B] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms Dropdown */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Bedrooms
            </label>
            <select
              value={filterState.bedrooms}
              onChange={(e) => onFilterChange("bedrooms", e.target.value)}
              className="w-full rounded-xl bg-[#F3F5F3] px-3.5 py-2.5 text-xs text-[#202326] outline-hidden border border-transparent focus:border-[#145C4B] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {BEDROOM_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Price Range ($)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={filterState.minPrice}
                onChange={(e) => onFilterChange("minPrice", e.target.value)}
                placeholder="Min Price"
                className="w-full rounded-xl bg-[#F3F5F3] px-3 py-2 text-xs text-[#202326] placeholder-[#8A9590] outline-hidden border border-transparent focus:border-[#145C4B] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              />
              <input
                type="number"
                value={filterState.maxPrice}
                onChange={(e) => onFilterChange("maxPrice", e.target.value)}
                placeholder="Max Price"
                className="w-full rounded-xl bg-[#F3F5F3] px-3 py-2 text-xs text-[#202326] placeholder-[#8A9590] outline-hidden border border-transparent focus:border-[#145C4B] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

