"use client";

import { RentalLocationItem } from "@/models/rentalLocation";
import LocationCard from "./LocationCard";

interface LocationsGridSectionProps {
  locations: RentalLocationItem[];
  isLoading: boolean;
  onClearFilters?: () => void;
}

export default function LocationsGridSection({
  locations,
  isLoading,
  onClearFilters,
}: LocationsGridSectionProps) {
  const countText = `Showing ${locations.length} destination${
    locations.length === 1 ? "" : "s"
  }`;

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 mb-16 sm:mb-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#145C4B]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Featured Locations
          </h2>
          <p
            className="mt-1 text-xs sm:text-sm text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Handpicked destinations with the strongest growth and lifestyle value.
          </p>
        </div>

        {!isLoading && (
          <div
            className="text-xs sm:text-sm font-medium text-[#6B7570] shrink-0"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {countText}
          </div>
        )}
      </div>

      {/* Grid or Skeleton or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-[360px] sm:h-[400px] animate-pulse rounded-[24px] sm:rounded-[28px] border border-[#E1E7E3] bg-[#F3F5F3]"
            />
          ))}
        </div>
      ) : locations.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-[24px] border border-[#E1E7E3] bg-white p-12 sm:p-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1EC]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#145C4B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3
            className="text-xl font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            No Locations Found
          </h3>
          <p
            className="mt-2 text-sm text-[#6B7570] max-w-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            No destinations match your search or selected region filter.
          </p>
          {onClearFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-6 rounded-full bg-[#145C4B] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#0F473A]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-8">
          {locations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      )}
    </section>
  );
}

