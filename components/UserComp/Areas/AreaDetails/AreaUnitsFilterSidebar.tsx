"use client";

import { FiRotateCcw } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { useServicesQuery } from "@/features/services/useServicesQueries";
import ServicePillsFilter from "@/components/UserComp/Common/ServicePillsFilter";
import AreaUnitsFilterFields from "./AreaUnitsFilterFields";

export interface AreaUnitsFilterState {
  tab: "all" | "primary" | "resale";
  searchTerm: string;
  propertyType: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
  serviceIds: number[];
}

interface AreaUnitsFilterSidebarProps {
  filterState: AreaUnitsFilterState;
  onFilterChange: <K extends keyof AreaUnitsFilterState>(
    field: K,
    value: AreaUnitsFilterState[K]
  ) => void;
  onResetFilters: () => void;
  primaryCount: number;
  resaleCount: number;
  bare?: boolean;
}

export default function AreaUnitsFilterSidebar({
  filterState,
  onFilterChange,
  onResetFilters,
  primaryCount,
  resaleCount,
  bare = false,
}: AreaUnitsFilterSidebarProps) {
  const { t, locale } = useTranslation();
  const { data: servicesData } = useServicesQuery(locale);
  const services = servicesData || [];

  const handleToggleService = (id: number) => {
    const next = filterState.serviceIds.includes(id)
      ? filterState.serviceIds.filter((x) => x !== id)
      : [...filterState.serviceIds, id];
    onFilterChange("serviceIds", next);
  };

  const hasActiveFilters =
    filterState.tab !== "all" ||
    filterState.searchTerm.trim() !== "" ||
    filterState.propertyType !== "All Types" ||
    filterState.bedrooms !== "Any" ||
    filterState.minPrice !== "" ||
    filterState.maxPrice !== "" ||
    filterState.serviceIds.length > 0;

  if (bare) {
    return (
      <div className="space-y-4">
        {hasActiveFilters && (
          <div className="flex justify-end pb-2">
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center gap-1.5 text-xs font-medium text-[#6B7570] transition-colors hover:text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <FiRotateCcw className="h-3.5 w-3.5" />
              {t("areas.details.filters.reset")}
            </button>
          </div>
        )}
        <AreaUnitsFilterFields
          filterState={filterState}
          onFilterChange={onFilterChange}
          onResetFilters={onResetFilters}
          primaryCount={primaryCount}
          resaleCount={resaleCount}
          hasActiveFilters={hasActiveFilters}
        />
        <div className="mt-4">
          <ServicePillsFilter
            label={t("common.filters.servicesLabel", "Services & Amenities")}
            options={services}
            selectedIds={filterState.serviceIds}
            onToggle={handleToggleService}
            onClear={() => onFilterChange("serviceIds", [])}
          />
        </div>
      </div>
    );
  }

  return (
    <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
      <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-xs sticky top-28">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D9E2EE]">
          <h3
            className="text-base font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("areas.details.filters.title")}
          </h3>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center gap-1.5 text-xs font-medium text-[#6B7570] transition-colors hover:text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <FiRotateCcw className="h-3.5 w-3.5" />
              {t("areas.details.filters.reset")}
            </button>
          )}
        </div>

        <AreaUnitsFilterFields
          filterState={filterState}
          onFilterChange={onFilterChange}
          onResetFilters={onResetFilters}
          primaryCount={primaryCount}
          resaleCount={resaleCount}
          hasActiveFilters={hasActiveFilters}
        />
        <div className="mt-4">
          <ServicePillsFilter
            label={t("common.filters.servicesLabel", "Services & Amenities")}
            options={services}
            selectedIds={filterState.serviceIds}
            onToggle={handleToggleService}
            onClear={() => onFilterChange("serviceIds", [])}
          />
        </div>
      </div>
    </aside>
  );
}
