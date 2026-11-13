"use client";

export const LOCATION_REGIONS = [
  "All Regions",
  "Red Sea",
  "Greater Cairo",
  "North Coast",
] as const;

export type LocationRegion = (typeof LOCATION_REGIONS)[number];

interface LocationsFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedRegion: LocationRegion;
  onSelectRegion: (region: LocationRegion) => void;
}

export default function LocationsFilterBar({
  searchQuery,
  onSearchChange,
  selectedRegion,
  onSelectRegion,
}: LocationsFilterBarProps) {
  return (
    <section className="mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Search Input */}
        <div className="relative w-full max-w-md">
          <div className="flex items-center gap-2.5 rounded-full bg-[#F3F5F3] px-4 py-3 border border-[#E1E7E3]/60 focus-within:border-[#145C4B] focus-within:bg-white transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7570"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search locations (e.g. Sahl Hasheesh, New Cairo...)"
              className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#202326] placeholder-[#6B7570] font-normal"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="text-xs text-[#6B7570] hover:text-[#202326]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right: Region Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {LOCATION_REGIONS.map((region) => {
            const isActive = selectedRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => onSelectRegion(region)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#0F473A] text-white shadow-sm"
                    : "border border-[#E1E7E3] bg-[#FCFCFC] text-[#202326] hover:bg-[#E8F1EC] hover:text-[#145C4B]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

