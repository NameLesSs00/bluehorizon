"use client";

import { useState } from "react";

export interface FilterState {
  searchTerm: string;
  propertyType: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
}

interface StandaloneFilterSidebarProps {
  initialFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
}

export default function StandaloneFilterSidebar({
  initialFilters,
  onApplyFilters,
  onResetFilters,
}: StandaloneFilterSidebarProps) {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [propertyType, setPropertyType] = useState(initialFilters.propertyType);
  const [bedrooms, setBedrooms] = useState(initialFilters.bedrooms);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters({
      searchTerm,
      propertyType,
      bedrooms,
      minPrice,
      maxPrice,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setPropertyType("");
    setBedrooms("");
    setMinPrice("");
    setMaxPrice("");
    onResetFilters();
  };

  return (
    <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
      <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-sm">
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
            className="text-xs font-semibold text-[#2B5FA6] transition-colors hover:text-[#1B3A6B] hover:underline"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Reset All
          </button>
        </div>

        {/* Filter Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Search */}
          <div>
            <label
              htmlFor="filter-search"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Search
            </label>
            <input
              id="filter-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Unit Type */}
          <div>
            <label
              htmlFor="filter-unit-type"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Unit Type
            </label>
            <div className="relative mt-1.5">
              <select
                id="filter-unit-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <option value="">Any Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Studio">Studio</option>
                <option value="Penthouse">Penthouse</option>
                <option value="OneBedroom">1 Bedroom</option>
                <option value="TwoBedroom">2 Bedrooms</option>
                <option value="ThreeBedroom">3 Bedrooms</option>
                <option value="Chalet">Chalet</option>
                <option value="FourBedroom">4 Bedrooms</option>
                <option value="Duplex">Duplex</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#6B7570]">
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
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label
              htmlFor="filter-bedrooms"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Bedrooms
            </label>
            <div className="relative mt-1.5">
              <select
                id="filter-bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <option value="">Any</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#6B7570]">
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
            </div>
          </div>

          {/* Minimum Price */}
          <div>
            <label
              htmlFor="filter-min-price"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Minimum Price
            </label>
            <input
              id="filter-min-price"
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="EGP Min"
              className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Maximum Price */}
          <div>
            <label
              htmlFor="filter-max-price"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Maximum Price
            </label>
            <input
              id="filter-max-price"
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="EGP Max"
              className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-[12px] bg-[#2B5FA6] py-3 text-center text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1B3A6B]"
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

