"use client";

import { FiSearch } from "react-icons/fi";

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

const BEDROOM_OPTIONS = [
  { label: "Any Bedrooms", value: "Any" },
  { label: "1 Bedroom", value: "1" },
  { label: "2 Bedrooms", value: "2" },
  { label: "3 Bedrooms", value: "3" },
  { label: "4+ Bedrooms", value: "4+" },
];

const VIEW_OPTIONS = [
  { label: "All Views", value: "all" },
  { label: "Sea View", value: "sea" },
  { label: "Pool View", value: "pool" },
  { label: "Garden View", value: "garden" },
];

const CAPACITY_OPTIONS = [
  { label: "Any Guests", value: "Any" },
  { label: "2+ Guests", value: "2" },
  { label: "4+ Guests", value: "4" },
  { label: "6+ Guests", value: "6" },
];

export default function RentalLocationFilterSidebar({
  filterState,
  onFilterChange,
  onResetFilters,
  totalCount,
}: RentalLocationFilterSidebarProps) {
  return (
    <aside className="w-full lg:w-[280px] shrink-0">
      <div className="rounded-[20px] border border-[#E1E7E3] bg-white p-5 sm:p-6 shadow-xs sticky top-28">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E1E7E3]">
          <h3
            className="text-base font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Filter Rentals
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
          {/* Search Input */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Search Rentals
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8A9590]" />
              <input
                type="text"
                value={filterState.searchTerm}
                onChange={(e) => onFilterChange("searchTerm", e.target.value)}
                placeholder="Name, floor, code..."
                className="w-full rounded-xl bg-[#F3F5F3] pl-9 pr-3.5 py-2.5 text-xs text-[#202326] placeholder-[#8A9590] outline-hidden border border-transparent focus:border-[#145C4B] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
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

          {/* View Dropdown */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Scenic View
            </label>
            <select
              value={filterState.view}
              onChange={(e) => onFilterChange("view", e.target.value)}
              className="w-full rounded-xl bg-[#F3F5F3] px-3.5 py-2.5 text-xs text-[#202326] outline-hidden border border-transparent focus:border-[#145C4B] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {VIEW_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Capacity Dropdown */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Guests / Capacity
            </label>
            <select
              value={filterState.capacity}
              onChange={(e) => onFilterChange("capacity", e.target.value)}
              className="w-full rounded-xl bg-[#F3F5F3] px-3.5 py-2.5 text-xs text-[#202326] outline-hidden border border-transparent focus:border-[#145C4B] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {CAPACITY_OPTIONS.map((opt) => (
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
              Price / Night ($)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={filterState.minPrice}
                onChange={(e) => onFilterChange("minPrice", e.target.value)}
                placeholder="Min"
                className="w-full rounded-xl bg-[#F3F5F3] px-3 py-2 text-xs text-[#202326] placeholder-[#8A9590] outline-hidden border border-transparent focus:border-[#145C4B] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              />
              <input
                type="number"
                value={filterState.maxPrice}
                onChange={(e) => onFilterChange("maxPrice", e.target.value)}
                placeholder="Max"
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

