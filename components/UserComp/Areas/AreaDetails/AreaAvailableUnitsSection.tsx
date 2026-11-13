"use client";

import { useMemo, useState, useEffect } from "react";
import ProjectUnitCard, {
  UnitItem,
} from "@/components/UserComp/Projects/ProjectDetails/ProjectUnitCard";
import AreaUnitsFilterSidebar, {
  AreaUnitsFilterState,
} from "./AreaUnitsFilterSidebar";
import { usePublicProjectsQuery } from "@/features/projects/useProjectsQueries";
import { usePublicPrimaryUnitsQuery } from "@/features/primaryUnits/usePrimaryUnitsQueries";
import { usePublicResalesQuery } from "@/features/resales/useResalesQueries";
import { formatPrimaryUnit, formatResaleUnit } from "./areaUnitsFormatters";

interface AreaAvailableUnitsSectionProps {
  areaId: number;
  areaName?: string;
  onCountLoaded?: (count: number) => void;
}

const INITIAL_FILTERS: AreaUnitsFilterState = {
  tab: "all",
  searchTerm: "",
  propertyType: "All Types",
  bedrooms: "Any",
  minPrice: "",
  maxPrice: "",
};

const ITEMS_PER_PAGE = 6;

export default function AreaAvailableUnitsSection({
  areaId,
  areaName,
  onCountLoaded,
}: AreaAvailableUnitsSectionProps) {
  const [filterState, setFilterState] =
    useState<AreaUnitsFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Fetch projects in this area
  const { data: projectsData, isLoading: isLoadingProjects } = usePublicProjectsQuery({
    LocationId: areaId > 0 ? areaId : undefined,
    Language: "en",
    PageSize: 100,
  });

  const areaProjectIds = useMemo(() => {
    return new Set((projectsData?.items || []).map((p) => p.id));
  }, [projectsData]);

  // 2. Query primary and resale units
  const { data: primaryData, isLoading: isLoadingPrimary } = usePublicPrimaryUnitsQuery({
    Language: "en",
    Currency: "USD",
    PageSize: 100,
  });

  const { data: resalesData, isLoading: isLoadingResales } = usePublicResalesQuery({
    Language: "en",
    Currency: "USD",
    PageSize: 100,
  });

  const isLoading = isLoadingProjects || isLoadingPrimary || isLoadingResales;

  // 3. Format primary units
  const primaryUnits: UnitItem[] = useMemo(() => {
    const raw = primaryData?.items || [];
    return raw
      .filter((u) => (u.projectId ? areaProjectIds.has(u.projectId) : true))
      .map((u) => formatPrimaryUnit(u, areaName));
  }, [primaryData, areaProjectIds, areaName]);

  // 4. Format resale units
  const resaleUnits: UnitItem[] = useMemo(() => {
    const raw = resalesData?.items || [];
    return raw
      .filter((u) => {
        const pId = u.project?.id || (u as unknown as { projectId?: number }).projectId;
        return pId ? areaProjectIds.has(pId) : true;
      })
      .map((u) => formatResaleUnit(u, areaName));
  }, [resalesData, areaProjectIds, areaName]);

  // 5. Filter units
  const allFilteredUnits = useMemo(() => {
    let pool: UnitItem[] = [];
    if (filterState.tab === "all") pool = [...primaryUnits, ...resaleUnits];
    else if (filterState.tab === "primary") pool = primaryUnits;
    else pool = resaleUnits;

    return pool.filter((unit) => {
      if (filterState.searchTerm.trim()) {
        const query = filterState.searchTerm.toLowerCase();
        const matches =
          unit.title.toLowerCase().includes(query) ||
          unit.description?.toLowerCase().includes(query) ||
          unit.location?.toLowerCase().includes(query);
        if (!matches) return false;
      }

      if (filterState.bedrooms !== "Any") {
        const targetBeds = parseInt(filterState.bedrooms, 10);
        if (filterState.bedrooms === "4+") {
          const count = parseInt(unit.rooms, 10) || 0;
          if (count < 4) return false;
        } else if (!unit.rooms.startsWith(`${targetBeds} `)) {
          return false;
        }
      }

      const rawNumericPrice = parseInt(unit.price.replace(/[^0-9]/g, ""), 10) || 0;
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
  }, [primaryUnits, resaleUnits, filterState]);

  // Report count to parent
  useEffect(() => {
    if (onCountLoaded) {
      onCountLoaded(primaryUnits.length + resaleUnits.length);
    }
  }, [primaryUnits.length, resaleUnits.length, onCountLoaded]);

  const handleFilterChange = <K extends keyof AreaUnitsFilterState>(
    field: K,
    value: AreaUnitsFilterState[K]
  ) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilterState(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(allFilteredUnits.length / ITEMS_PER_PAGE) || 1;
  const paginatedUnits = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return allFilteredUnits.slice(start, start + ITEMS_PER_PAGE);
  }, [allFilteredUnits, currentPage]);

  const headingText = areaName
    ? `Available Units in ${areaName}`
    : "Available Units";

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
          Explore verified primary developer units and secondary market resale opportunities.
        </p>
      </div>

      {/* Two-Column Layout: Sidebar on Left, Grid on Right */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left Filter Sidebar */}
        <AreaUnitsFilterSidebar
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          primaryCount={primaryUnits.length}
          resaleCount={resaleUnits.length}
        />

        {/* Right Units Grid */}
        <div className="w-full flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-[360px] animate-pulse rounded-[20px] bg-[#F0F3FA] border border-[#D9E2EE]"
                />
              ))}
            </div>
          ) : paginatedUnits.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-[#D9E2EE] bg-white py-16 px-6 text-center">
              <p
                className="text-base font-semibold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                No units match your selected filters.
              </p>
              <p
                className="mt-1 text-xs text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Try clearing filters or switching between Primary and Resale.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 rounded-full bg-[#2B5FA6] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1B3A6B]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedUnits.map((unit) => (
                  <ProjectUnitCard
                    key={`${unit.badge}-${unit.id}`}
                    unit={unit}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9E2EE] bg-white text-xs font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:opacity-40 disabled:cursor-not-allowed"
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
                              ? "bg-[#2B5FA6] text-white"
                              : "border border-[#D9E2EE] bg-white text-[#202326] hover:bg-[#F0F3FA]"
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
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9E2EE] bg-white text-xs font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:opacity-40 disabled:cursor-not-allowed"
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
