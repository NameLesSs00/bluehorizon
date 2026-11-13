"use client";

import { useMemo, useState, useEffect } from "react";
import RentalUnitCard from "@/components/UserComp/Rentals/RentalUnitCard";
import RentalLocationFilterSidebar, {
  RentalLocationFilterState,
} from "./RentalLocationFilterSidebar";
import { usePublicRentalsQuery } from "@/features/rentals/useRentalsQueries";

interface LocationAvailableRentalsSectionProps {
  locationId: number;
  locationName?: string;
  onCountLoaded?: (count: number) => void;
}

const INITIAL_FILTERS: RentalLocationFilterState = {
  searchTerm: "",
  bedrooms: "Any",
  view: "all",
  capacity: "Any",
  minPrice: "",
  maxPrice: "",
};

const ITEMS_PER_PAGE = 6;

export default function LocationAvailableRentalsSection({
  locationId,
  locationName,
  onCountLoaded,
}: LocationAvailableRentalsSectionProps) {
  const [filterState, setFilterState] =
    useState<RentalLocationFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all rentals from public query hook
  const { data: rentalsData, isLoading } = usePublicRentalsQuery({
    Language: "en",
    PageSize: 100,
  });

  const rawRentals = rentalsData?.items || [];

  // Filter rentals strictly matching this rental location
  const locationRentals = useMemo(() => {
    return rawRentals.filter((r) => {
      if (!locationId || locationId <= 0) return true;
      return r.rentalLocation?.id === locationId;
    });
  }, [rawRentals, locationId]);

  // Apply user-selected filters
  const filteredRentals = useMemo(() => {
    return locationRentals.filter((rental) => {
      if (filterState.searchTerm.trim()) {
        const query = filterState.searchTerm.toLowerCase();
        const matches =
          rental.name.toLowerCase().includes(query) ||
          rental.description?.toLowerCase().includes(query) ||
          rental.floor?.toLowerCase().includes(query);
        if (!matches) return false;
      }

      if (filterState.bedrooms !== "Any") {
        const target = parseInt(filterState.bedrooms, 10);
        if (filterState.bedrooms === "4+") {
          if ((rental.bedroomNo || 0) < 4) return false;
        } else if (rental.bedroomNo !== target) {
          return false;
        }
      }

      if (filterState.view === "sea" && !rental.hasSeaView) return false;
      if (filterState.view === "pool" && !rental.hasPoolView) return false;
      if (filterState.view === "garden" && !rental.hasGardenView) return false;

      if (filterState.capacity !== "Any") {
        const cap = parseInt(filterState.capacity, 10);
        if ((rental.capacity || 0) < cap) return false;
      }

      const rawNumericPrice = rental.prices?.[0]?.price || 0;
      if (filterState.minPrice) {
        const min = parseInt(filterState.minPrice, 10);
        if (!isNaN(min) && rawNumericPrice > 0 && rawNumericPrice < min) return false;
      }
      if (filterState.maxPrice) {
        const max = parseInt(filterState.maxPrice, 10);
        if (!isNaN(max) && rawNumericPrice > 0 && rawNumericPrice > max) return false;
      }

      return true;
    });
  }, [locationRentals, filterState]);

  // Report count to parent
  useEffect(() => {
    if (onCountLoaded) {
      onCountLoaded(locationRentals.length);
    }
  }, [locationRentals.length, onCountLoaded]);

  const handleFilterChange = <K extends keyof RentalLocationFilterState>(
    field: K,
    value: RentalLocationFilterState[K]
  ) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilterState(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredRentals.length / ITEMS_PER_PAGE) || 1;
  const paginatedRentals = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRentals.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRentals, currentPage]);

  const headingText = locationName
    ? `Available Rentals in ${locationName}`
    : "Available Rentals";

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 mb-20">
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
          Discover verified vacation and residential rentals with flexible terms and premier amenities.
        </p>
      </div>

      {/* Two-Column Layout: Sidebar on Left, Rentals on Right */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left Filter Sidebar */}
        <RentalLocationFilterSidebar
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalCount={locationRentals.length}
        />

        {/* Right Rentals Grid */}
        <div className="w-full flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-[360px] animate-pulse rounded-[20px] bg-[#F3F5F3] border border-[#E1E7E3]"
                />
              ))}
            </div>
          ) : paginatedRentals.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-[#E1E7E3] bg-white py-16 px-6 text-center">
              <p
                className="text-base font-semibold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                No rental units match your selected filters.
              </p>
              <p
                className="mt-1 text-xs text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Try clearing filters or adjusting your search term.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 rounded-full bg-[#145C4B] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0F473A]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedRentals.map((rental) => (
                  <RentalUnitCard key={rental.id} unit={rental} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E1E7E3] bg-white text-xs font-medium text-[#202326] transition-colors hover:bg-[#F3F5F3] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    &lt;
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      const isActive = page === currentPage;
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                            isActive
                              ? "bg-[#145C4B] text-white"
                              : "border border-[#E1E7E3] bg-white text-[#202326] hover:bg-[#F3F5F3]"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                  )}

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E1E7E3] bg-white text-xs font-medium text-[#202326] transition-colors hover:bg-[#F3F5F3] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
