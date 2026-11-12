"use client";

import { useState } from "react";
import ProjectUnitsFilterSidebar, {
  UnitsFilterState,
} from "./ProjectUnitsFilterSidebar";
import ProjectUnitCard, { UnitItem } from "./ProjectUnitCard";
import { usePublicPrimaryUnitsQuery } from "@/features/primaryUnits/usePrimaryUnitsQueries";
import { getFullPrimaryUnitMediaUrl } from "@/clientApi/primaryUnitsApi";

interface ProjectAvailableUnitsSectionProps {
  projectId?: number;
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

export default function ProjectAvailableUnitsSection({
  projectId,
  locationOrProjectName,
  units: propUnits,
}: ProjectAvailableUnitsSectionProps) {
  const [filterState, setFilterState] =
    useState<UnitsFilterState>(INITIAL_FILTERS);

  // Fetch real units from primary units API if projectId is provided
  const { data: primaryData, isLoading } = usePublicPrimaryUnitsQuery(
    projectId && projectId > 0
      ? {
          ProjectId: projectId,
          PageNumber: 1,
          PageSize: 50,
        }
      : undefined
  );

  // Map real API units if available
  const apiUnits: UnitItem[] = (primaryData?.items || []).map((u) => {
    const primaryImg = u.images?.find((img) => img.isPrimary) || u.images?.[0];
    const imageSrc = primaryImg?.imageUrl
      ? getFullPrimaryUnitMediaUrl(primaryImg.imageUrl)
      : "/default-fallback.png";

    const priceUsd = u.prices?.find((p) => p.currency === "USD")?.price || u.prices?.[0]?.price;
    const priceFormatted =
      typeof priceUsd === "number" && priceUsd > 0
        ? `$ ${priceUsd.toLocaleString()}`
        : "Price on request";

    return {
      id: u.id,
      title: u.name,
      description: u.description || "",
      badge: "Primary",
      area: u.area ? `${u.area} m²` : "",
      rooms: u.noBedRoom ? `${u.noBedRoom} Rooms` : "",
      baths: u.noBathRoom ? `${u.noBathRoom} Baths` : "",
      price: priceFormatted,
      imageSrc,
      location: locationOrProjectName,
    };
  });

  const availableUnits = propUnits || apiUnits;

  // If no units exist after loading, hide the section entirely
  if (!isLoading && availableUnits.length === 0) {
    return null;
  }

  const headingText = locationOrProjectName
    ? `Available Units in ${locationOrProjectName}`
    : "Available Units";

  const handleFilterChange = <K extends keyof UnitsFilterState>(
    field: K,
    value: UnitsFilterState[K]
  ) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilterState(INITIAL_FILTERS);
  };

  // Filter units based on user selection
  const filteredUnits = availableUnits.filter((unit) => {
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
          onApplyFilters={() => {}}
          onResetFilters={handleResetFilters}
        />

        {/* Right: Units Grid */}
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
        </div>
      </div>
    </section>
  );
}
