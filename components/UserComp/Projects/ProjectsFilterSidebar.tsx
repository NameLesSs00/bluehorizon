"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiRotateCcw,
} from "react-icons/fi";
import { usePublicProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { useProjectTypesQuery } from "@/features/projectTypes/useProjectTypesQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import ProjectsFilterFields from "./ProjectsFilterFields";

export interface ProjectFilterValues {
  searchTerm: string;
  locationId: string;
  projectTypeId: string;
  paymentType: string;
  deliveryFrom: string;
  deliveryTo: string;
  minPrice: string;
  maxPrice: string;
}

interface ProjectsFilterSidebarProps {
  initialFilters: ProjectFilterValues;
  onApplyFilters: (filters: ProjectFilterValues) => void;
  onResetFilters: () => void;
}

export default function ProjectsFilterSidebar({
  initialFilters,
  onApplyFilters,
  onResetFilters,
}: ProjectsFilterSidebarProps) {
  const { t, locale } = useTranslation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [locationId, setLocationId] = useState(initialFilters.locationId);
  const [projectTypeId, setProjectTypeId] = useState(initialFilters.projectTypeId);
  const [paymentType, setPaymentType] = useState(initialFilters.paymentType);
  const [deliveryFrom, setDeliveryFrom] = useState(initialFilters.deliveryFrom);
  const [deliveryTo, setDeliveryTo] = useState(initialFilters.deliveryTo);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);

  const isInitialMount = useRef(true);

  const { data: locationsData } = usePublicProjectLocationsQuery({
    Language: locale,
    PageNumber: 1,
    PageSize: 50,
  });

  const { data: typesData } = useProjectTypesQuery({
    Language: locale,
    PageNumber: 1,
    PageSize: 50,
  });

  const locations = locationsData?.items || [];
  const projectTypes = typesData?.items || [];

  // Sync internal state when external initialFilters change
  useEffect(() => {
    setSearchTerm(initialFilters.searchTerm);
    setLocationId(initialFilters.locationId);
    setProjectTypeId(initialFilters.projectTypeId);
    setPaymentType(initialFilters.paymentType);
    setDeliveryFrom(initialFilters.deliveryFrom);
    setDeliveryTo(initialFilters.deliveryTo);
    setMinPrice(initialFilters.minPrice);
    setMaxPrice(initialFilters.maxPrice);
  }, [initialFilters]);

  // Auto-apply filters after 1 second of inactivity (typing debounce)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onApplyFilters({
        searchTerm,
        locationId,
        projectTypeId,
        paymentType,
        deliveryFrom,
        deliveryTo,
        minPrice,
        maxPrice,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    searchTerm,
    locationId,
    projectTypeId,
    paymentType,
    deliveryFrom,
    deliveryTo,
    minPrice,
    maxPrice,
    onApplyFilters,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters({
      searchTerm,
      locationId,
      projectTypeId,
      paymentType,
      deliveryFrom,
      deliveryTo,
      minPrice,
      maxPrice,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setLocationId("");
    setProjectTypeId("");
    setPaymentType("");
    setDeliveryFrom("");
    setDeliveryTo("");
    setMinPrice("");
    setMaxPrice("");
    onResetFilters();
  };

  const activeFilterCount = [
    Boolean(searchTerm.trim()),
    Boolean(locationId),
    Boolean(projectTypeId),
    Boolean(paymentType),
    Boolean(deliveryFrom),
    Boolean(deliveryTo),
    Boolean(minPrice),
    Boolean(maxPrice),
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
      {/* Mobile Collapsible Toggle Button */}
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-[16px] border border-[#D9E2EE] bg-white px-4 py-3.5 shadow-xs transition-colors hover:border-[#2B5FA6]"
          aria-expanded={isMobileOpen}
        >
          <div className="flex items-center gap-2.5">
            <FiFilter className="h-4 w-4 text-[#2B5FA6]" />
            <span
              className="text-sm font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("projects.filters.title")}
            </span>
            {hasActiveFilters && (
              <span className="rounded-full bg-[#2B5FA6]/10 px-2 py-0.5 text-[11px] font-semibold text-[#2B5FA6]">
                {t("projects.filters.activeCount").replace(
                  "{count}",
                  String(activeFilterCount)
                )}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#2B5FA6]">
            <span>
              {isMobileOpen
                ? t("projects.filters.hideFilters")
                : t("projects.filters.showFilters")}
            </span>
            {isMobileOpen ? (
              <FiChevronUp className="h-4 w-4" />
            ) : (
              <FiChevronDown className="h-4 w-4" />
            )}
          </div>
        </button>
      </div>

      {/* Filter Sidebar Container */}
      <div
        className={`rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-sm ${
          isMobileOpen ? "block" : "hidden lg:block"
        }`}
      >
        {/* Header */}
        <div className="border-b border-[#D9E2EE] pb-4">
          <h2
            className="text-lg font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("projects.filters.title")}
          </h2>
        </div>

        {/* Filter Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <ProjectsFilterFields
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            locationId={locationId}
            onLocationChange={setLocationId}
            locations={locations}
            projectTypeId={projectTypeId}
            onProjectTypeChange={setProjectTypeId}
            projectTypes={projectTypes}
            paymentType={paymentType}
            onPaymentTypeChange={setPaymentType}
            deliveryFrom={deliveryFrom}
            onDeliveryFromChange={setDeliveryFrom}
            deliveryTo={deliveryTo}
            onDeliveryToChange={setDeliveryTo}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
          />

          {/* Submit & Reset Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              type="submit"
              className="w-full rounded-[12px] bg-[#2B5FA6] py-3 text-center text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1B3A6B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("projects.filters.apply")}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-2 rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] py-2.5 text-center text-xs sm:text-sm font-semibold text-[#1B3A6B] transition-colors hover:border-[#1B3A6B] hover:bg-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <FiRotateCcw className="h-3.5 w-3.5" />
                <span>{t("projects.grid.resetFilters")}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </aside>
  );
}
