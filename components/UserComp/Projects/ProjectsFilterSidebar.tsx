"use client";

import { useEffect, useRef, useState } from "react";
import { FiRotateCcw } from "react-icons/fi";
import { usePublicProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { useProjectTypesQuery } from "@/features/projectTypes/useProjectTypesQueries";
import { useFacilitiesQuery } from "@/features/facilities/useFacilitiesQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import ProjectsFilterFields from "./ProjectsFilterFields";
import ProjectsExtraFilterFields from "./ProjectsExtraFilterFields";

export interface ProjectFilterValues {
  searchTerm: string;
  locationId: string;
  projectTypeId: string;
  projectTier: string;
  facilityIds: number[];
  isHotOffer: boolean;
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
  bare?: boolean;
}

export default function ProjectsFilterSidebar({
  initialFilters,
  onApplyFilters,
  onResetFilters,
  bare = false,
}: ProjectsFilterSidebarProps) {
  const { t, locale } = useTranslation();
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [locationId, setLocationId] = useState(initialFilters.locationId);
  const [projectTypeId, setProjectTypeId] = useState(initialFilters.projectTypeId);
  const [projectTier, setProjectTier] = useState(initialFilters.projectTier);
  const [facilityIds, setFacilityIds] = useState<number[]>(initialFilters.facilityIds);
  const [isHotOffer, setIsHotOffer] = useState(initialFilters.isHotOffer);
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

  const { data: facilitiesData } = useFacilitiesQuery(locale);

  const locations = locationsData?.items || [];
  const projectTypes = typesData?.items || [];
  const facilities = facilitiesData || [];

  useEffect(() => {
    setSearchTerm(initialFilters.searchTerm);
    setLocationId(initialFilters.locationId);
    setProjectTypeId(initialFilters.projectTypeId);
    setProjectTier(initialFilters.projectTier);
    setFacilityIds(initialFilters.facilityIds);
    setIsHotOffer(initialFilters.isHotOffer);
    setPaymentType(initialFilters.paymentType);
    setDeliveryFrom(initialFilters.deliveryFrom);
    setDeliveryTo(initialFilters.deliveryTo);
    setMinPrice(initialFilters.minPrice);
    setMaxPrice(initialFilters.maxPrice);
  }, [initialFilters]);

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
        projectTier,
        facilityIds,
        isHotOffer,
        paymentType,
        deliveryFrom,
        deliveryTo,
        minPrice,
        maxPrice,
      });
    }, 600);

    return () => clearTimeout(timer);
  }, [
    searchTerm,
    locationId,
    projectTypeId,
    projectTier,
    facilityIds,
    isHotOffer,
    paymentType,
    deliveryFrom,
    deliveryTo,
    minPrice,
    maxPrice,
    onApplyFilters,
  ]);

  function handleToggleFacility(id: number) {
    setFacilityIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters({
      searchTerm,
      locationId,
      projectTypeId,
      projectTier,
      facilityIds,
      isHotOffer,
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
    setProjectTier("");
    setFacilityIds([]);
    setIsHotOffer(false);
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
    Boolean(projectTier),
    facilityIds.length > 0,
    isHotOffer,
    Boolean(paymentType),
    Boolean(deliveryFrom),
    Boolean(deliveryTo),
    Boolean(minPrice),
    Boolean(maxPrice),
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;

  const formContent = (
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

      <ProjectsExtraFilterFields
        projectTier={projectTier}
        onProjectTierChange={setProjectTier}
        isHotOffer={isHotOffer}
        onIsHotOfferChange={setIsHotOffer}
        facilityIds={facilityIds}
        onToggleFacility={handleToggleFacility}
        onClearFacilities={() => setFacilityIds([])}
        facilities={facilities}
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
  );

  if (bare) {
    return formContent;
  }

  return (
    <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
      <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-sm">
        <div className="border-b border-[#D9E2EE] pb-4">
          <h2
            className="text-lg font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("projects.filters.title")}
          </h2>
        </div>

        {formContent}
      </div>
    </aside>
  );
}
