"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProjectUnitsFilterSidebar, {
  UnitsFilterState,
} from "./ProjectUnitsFilterSidebar";
import ProjectUnitCard, { UnitItem } from "./ProjectUnitCard";
import { usePublicPrimaryUnitsQuery } from "@/features/primaryUnits/usePrimaryUnitsQueries";
import { getFullPrimaryUnitMediaUrl } from "@/clientApi/primaryUnitsApi";
import { getResales, getFullResaleMediaUrl } from "@/clientApi/resalesApi";
import { PROPERTY_TYPE_LABELS } from "@/models/resale";

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

  // Fetch primary units from existing PrimaryUnits API
  const { data: primaryData, isLoading: isPrimaryLoading } =
    usePublicPrimaryUnitsQuery(
      projectId && projectId > 0
        ? {
            ProjectId: projectId,
            PageNumber: 1,
            PageSize: 50,
          }
        : undefined
    );

  // Fetch resale units from existing Resale API
  const { data: resaleData, isLoading: isResaleLoading } = useQuery({
    queryKey: ["resales", "project", projectId],
    queryFn: () =>
      getResales({
        ProjectId: projectId,
        PageNumber: 1,
        PageSize: 50,
      }),
    enabled: typeof projectId === "number" && projectId > 0,
    staleTime: 1000 * 60 * 5,
  });

  // Map Primary units strictly from PrimaryUnits API
  const primaryUnits: UnitItem[] = (primaryData?.items || []).map((u) => {
    const primaryImg = u.images?.find((img) => img.isPrimary) || u.images?.[0];
    const imageSrc = primaryImg?.imageUrl
      ? getFullPrimaryUnitMediaUrl(primaryImg.imageUrl)
      : "/default-fallback.png";

    const priceUsd =
      u.prices?.find((p) => p.currency === "USD")?.price || u.prices?.[0]?.price;
    const priceFormatted =
      typeof priceUsd === "number" && priceUsd > 0
        ? `$ ${priceUsd.toLocaleString()}`
        : "Price on request";

    const catName =
      typeof u.propertyType === "number"
        ? PROPERTY_TYPE_LABELS[u.propertyType as keyof typeof PROPERTY_TYPE_LABELS] || ""
        : String(u.propertyType || "");

    return {
      id: u.id,
      title: u.name,
      description: u.description || "",
      badge: "Primary" as const,
      type: "primary" as const,
      href: `/units/${u.id}?type=primary`,
      area: u.area ? `${u.area} m²` : "",
      rooms: u.noBedRoom ? `${u.noBedRoom} Rooms` : "",
      baths: u.noBathRoom ? `${u.noBathRoom} Baths` : "",
      price: priceFormatted,
      rawPrice: priceUsd,
      category: catName,
      imageSrc,
      location: locationOrProjectName,
    };
  });

  // Map Resale units strictly from Resale API
  const resaleUnits: UnitItem[] = (resaleData?.items || []).map((r) => {
    const firstImg = r.imageUrls?.[0];
    const imageSrc = firstImg
      ? getFullResaleMediaUrl(firstImg)
      : "/default-fallback.png";

    const priceUsd =
      r.prices?.find((p) => p.currency === "USD")?.price || r.prices?.[0]?.price;
    const priceFormatted =
      typeof priceUsd === "number" && priceUsd > 0
        ? `$ ${priceUsd.toLocaleString()}`
        : "Price on request";

    const catName =
      typeof r.propertyType === "number"
        ? PROPERTY_TYPE_LABELS[r.propertyType as keyof typeof PROPERTY_TYPE_LABELS] || ""
        : String(r.propertyType || "");

    return {
      id: r.id,
      title: r.name,
      description: r.description || "",
      badge: "Resale" as const,
      type: "resale" as const,
      href: `/units/${r.id}?type=resale`,
      area: r.area ? `${r.area} m²` : "",
      rooms: r.noBedRoom ? `${r.noBedRoom} Rooms` : "",
      baths: r.noBathRoom ? `${r.noBathRoom} Baths` : "",
      price: priceFormatted,
      rawPrice: priceUsd,
      category: catName,
      imageSrc,
      location: locationOrProjectName,
    };
  });

  const availableUnits = propUnits || [...primaryUnits, ...resaleUnits];
  const isLoading = isPrimaryLoading || isResaleLoading;

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
    if (filterState.unitType !== "All" && unit.badge !== filterState.unitType) {
      return false;
    }
    if (
      filterState.searchTerm.trim().length > 0 &&
      !unit.title.toLowerCase().includes(filterState.searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (
      filterState.category !== "Any Type" &&
      unit.category &&
      !unit.category.toLowerCase().includes(filterState.category.toLowerCase())
    ) {
      return false;
    }
    if (filterState.minPrice && unit.rawPrice !== undefined) {
      const min = parseFloat(filterState.minPrice);
      if (!isNaN(min) && unit.rawPrice < min) return false;
    }
    if (filterState.maxPrice && unit.rawPrice !== undefined) {
      const max = parseFloat(filterState.maxPrice);
      if (!isNaN(max) && unit.rawPrice > max) return false;
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
                <ProjectUnitCard key={`${unit.badge}-${unit.id}`} unit={unit} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
