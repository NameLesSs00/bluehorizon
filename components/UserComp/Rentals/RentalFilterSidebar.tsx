"use client";

import { useState } from "react";
import { FiSearch, FiChevronDown, FiRotateCcw } from "react-icons/fi";
import { usePublicRentalLocationsQuery } from "@/features/rentalLocations/useRentalLocationsQueries";
import { PROPERTY_TYPE_LABELS, PropertyType } from "@/models/rental";

export interface RentalFilterState {
  searchTerm: string;
  locationId: string;
  propertyType: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
}

interface RentalFilterSidebarProps {
  initialFilters: RentalFilterState;
  onApplyFilters: (filters: RentalFilterState) => void;
  onResetFilters: () => void;
}

const BEDROOM_OPTIONS = [
  { value: "", label: "Any" },
  { value: "1", label: "1 Room" },
  { value: "2", label: "2 Rooms" },
  { value: "3", label: "3 Rooms" },
  { value: "4", label: "4 Rooms" },
  { value: "5", label: "5+ Rooms" },
];

const UNIT_TYPE_OPTIONS = [
  { value: "", label: "Any Type" },
  { value: String(PropertyType.Apartment), label: "Apartment" },
  { value: String(PropertyType.Villa), label: "Villa" },
  { value: String(PropertyType.Townhouse), label: "Townhouse" },
  { value: String(PropertyType.Studio), label: "Studio" },
  { value: String(PropertyType.Penthouse), label: "Penthouse" },
  { value: String(PropertyType.Chalet), label: "Chalet" },
  { value: String(PropertyType.OneBedroom), label: "1 Bedroom" },
  { value: String(PropertyType.TwoBedroom), label: "2 Bedrooms" },
  { value: String(PropertyType.ThreeBedroom), label: "3 Bedrooms" },
  { value: String(PropertyType.FourBedroom), label: "4 Bedrooms" },
];

export default function RentalFilterSidebar({
  initialFilters,
  onApplyFilters,
  onResetFilters,
}: RentalFilterSidebarProps) {
  const [filters, setFilters] = useState<RentalFilterState>(initialFilters);

  const { data: locationsData } = usePublicRentalLocationsQuery({
    Language: "en",
    PageSize: 50,
  });

  const locations = locationsData?.items || [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onApplyFilters(filters);
  }

  function handleReset() {
    const emptyFilters: RentalFilterState = {
      searchTerm: "",
      locationId: "",
      propertyType: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
    };
    setFilters(emptyFilters);
    onResetFilters();
  }

  return (
    <aside className="w-full lg:w-[320px] shrink-0">
      <div className="rounded-[24px] border border-[#D9E2EE] bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D9E2EE] pb-4">
          <h2
            className="text-lg font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Filters
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B3A6B] transition-opacity hover:opacity-75"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiRotateCcw className="h-3 w-3" />
            <span>Reset All</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Search by Name */}
          <div>
            <label
              htmlFor="rental-search"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Search
            </label>
            <div className="relative mt-1.5">
              <input
                id="rental-search"
                type="text"
                placeholder="Search by name..."
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters({ ...filters, searchTerm: e.target.value })
                }
                className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F9F7F4] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#9CA3AF] transition-colors focus:border-[#1B3A6B] focus:bg-white focus:outline-hidden"
                style={{ fontFamily: "var(--font-inter)" }}
              />
              <FiSearch className="pointer-events-none absolute right-3.5 top-3 h-3.5 w-3.5 text-[#9CA3AF]" />
            </div>
          </div>

          {/* Location Dropdown */}
          <div>
            <label
              htmlFor="rental-location"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Location
            </label>
            <div className="relative mt-1.5">
              <select
                id="rental-location"
                value={filters.locationId}
                onChange={(e) =>
                  setFilters({ ...filters, locationId: e.target.value })
                }
                className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F9F7F4] px-3.5 py-2.5 pr-8 text-xs text-[#202326] transition-colors focus:border-[#1B3A6B] focus:bg-white focus:outline-hidden"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={String(loc.id)}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 text-[#65706B]" />
            </div>
          </div>

          {/* Unit Type Dropdown */}
          <div>
            <label
              htmlFor="rental-type"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Unit Type
            </label>
            <div className="relative mt-1.5">
              <select
                id="rental-type"
                value={filters.propertyType}
                onChange={(e) =>
                  setFilters({ ...filters, propertyType: e.target.value })
                }
                className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F9F7F4] px-3.5 py-2.5 pr-8 text-xs text-[#202326] transition-colors focus:border-[#1B3A6B] focus:bg-white focus:outline-hidden"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {UNIT_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 text-[#65706B]" />
            </div>
          </div>

          {/* Bedrooms Dropdown */}
          <div>
            <label
              htmlFor="rental-bedrooms"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Bedrooms
            </label>
            <div className="relative mt-1.5">
              <select
                id="rental-bedrooms"
                value={filters.bedrooms}
                onChange={(e) =>
                  setFilters({ ...filters, bedrooms: e.target.value })
                }
                className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F9F7F4] px-3.5 py-2.5 pr-8 text-xs text-[#202326] transition-colors focus:border-[#1B3A6B] focus:bg-white focus:outline-hidden"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {BEDROOM_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 text-[#65706B]" />
            </div>
          </div>

          {/* Minimum Price */}
          <div>
            <label
              htmlFor="rental-min-price"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Minimum Price
            </label>
            <input
              id="rental-min-price"
              type="number"
              placeholder="EGP Min"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
              className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F9F7F4] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#9CA3AF] transition-colors focus:border-[#1B3A6B] focus:bg-white focus:outline-hidden"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Maximum Price */}
          <div>
            <label
              htmlFor="rental-max-price"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Maximum Price
            </label>
            <input
              id="rental-max-price"
              type="number"
              placeholder="EGP Max"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F9F7F4] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#9CA3AF] transition-colors focus:border-[#1B3A6B] focus:bg-white focus:outline-hidden"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Apply Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-[12px] bg-[#1B3A6B] py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
}

