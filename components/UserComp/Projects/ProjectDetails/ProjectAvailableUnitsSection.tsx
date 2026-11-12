"use client";

import { useState } from "react";
import ProjectUnitsFilterSidebar, {
  UnitsFilterState,
} from "./ProjectUnitsFilterSidebar";
import ProjectUnitCard, { UnitItem } from "./ProjectUnitCard";

interface ProjectAvailableUnitsSectionProps {
  locationOrProjectName?: string;
  units?: UnitItem[];
}

const INITIAL_FILTERS: UnitsFilterState = {
  searchTerm: "",
  category: "Any Type",
  unitType: "All",
  deliveryDateFrom: "",
  deliveryDateTo: "",
  minPrice: "",
  maxPrice: "",
};

const UI_REFERENCE_UNITS: UnitItem[] = [
  {
    id: "unit-1",
    title: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony",
    badge: "Primary",
    area: "125 m²",
    rooms: "2 Rooms",
    baths: "2 Baths",
    price: "EGP 4,500,000",
    imageSrc: "/default-fallback.png",
  },
  {
    id: "unit-2",
    title: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony",
    badge: "Resale",
    area: "125 m²",
    rooms: "2 Rooms",
    baths: "2 Baths",
    price: "EGP 4,500,000",
    imageSrc: "/default-fallback.png",
    location: "Maadi · Degla",
  },
  {
    id: "unit-3",
    title: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony",
    badge: "Resale",
    area: "125 m²",
    rooms: "2 Rooms",
    baths: "2 Baths",
    price: "EGP 4,500,000",
    imageSrc: "/default-fallback.png",
  },
  {
    id: "unit-4",
    title: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony",
    badge: "Primary",
    area: "125 m²",
    rooms: "2 Rooms",
    baths: "2 Baths",
    price: "EGP 4,500,000",
    imageSrc: "/default-fallback.png",
  },
  {
    id: "unit-5",
    title: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony",
    badge: "Resale",
    area: "125 m²",
    rooms: "2 Rooms",
    baths: "2 Baths",
    price: "EGP 4,500,000",
    imageSrc: "/default-fallback.png",
  },
  {
    id: "unit-6",
    title: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony",
    badge: "Resale",
    area: "125 m²",
    rooms: "2 Rooms",
    baths: "2 Baths",
    price: "EGP 4,500,000",
    imageSrc: "/default-fallback.png",
  },
];

export default function ProjectAvailableUnitsSection({
  locationOrProjectName,
  units = UI_REFERENCE_UNITS,
}: ProjectAvailableUnitsSectionProps) {
  const [filterState, setFilterState] =
    useState<UnitsFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const headingText = locationOrProjectName
    ? `Available Units in ${locationOrProjectName}`
    : "Available Units";

  const handleFilterChange = <K extends keyof UnitsFilterState>(
    field: K,
    value: UnitsFilterState[K]
  ) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilterState(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  // Filter UI items based on user selection
  const filteredUnits = units.filter((unit) => {
    if (
      filterState.unitType !== "All" &&
      unit.badge !== filterState.unitType
    ) {
      return false;
    }
    if (
      filterState.searchTerm.trim().length > 0 &&
      !unit.title.toLowerCase().includes(filterState.searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 mb-20">
      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {headingText}
        </h2>
        <p
          className="mt-1 text-sm text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Explore top-tier residential developments tailored to your lifestyle.
        </p>
      </div>

      {/* Main Two-Column Content */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left: Filters Sidebar */}
        <ProjectUnitsFilterSidebar
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />

        {/* Right: Units Grid + Pagination */}
        <div className="w-full flex-1">
          {filteredUnits.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-[#DCE2DE] bg-white p-12 text-center">
              <h3
                className="text-lg font-bold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                No available units found
              </h3>
              <p
                className="mt-2 text-xs text-[#6B7570] max-w-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                There are currently no units matching your selected criteria. Try resetting filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-5 rounded-xl bg-[#145C4B] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0F473A]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredUnits.map((unit) => (
                <ProjectUnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          )}

          {/* Pagination UI */}
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Previous Page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E1E7E3] bg-white text-xs font-medium text-[#202326] transition-colors hover:bg-[#F3F5F3] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              &lt;
            </button>

            {[1, 2, 3].map((pageNum) => {
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#145C4B] text-white"
                      : "border border-[#E1E7E3] bg-white text-[#202326] hover:bg-[#F3F5F3]"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              disabled={currentPage >= 3}
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              aria-label="Next Page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E1E7E3] bg-white text-xs font-medium text-[#202326] transition-colors hover:bg-[#F3F5F3] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
