"use client";

import { useEffect, useRef, useState } from "react";
import { FiRotateCcw } from "react-icons/fi";
import { usePublicRentalLocationsQuery } from "@/features/rentalLocations/useRentalLocationsQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import RentalFilterFields from "./RentalFilterFields";

export interface RentalFilterState {
  searchTerm: string;
  locationId: string;
  propertyType: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
}

interface RentalFilterSidebarProps {
  initialFilters: RentalFilterState;
  onApplyFilters: (filters: RentalFilterState) => void;
  onResetFilters: () => void;
}

export default function RentalFilterSidebar({
  initialFilters,
  onApplyFilters,
  onResetFilters,
}: RentalFilterSidebarProps) {
  const { t, locale } = useTranslation();
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [locationId, setLocationId] = useState(initialFilters.locationId);
  const [propertyType, setPropertyType] = useState(initialFilters.propertyType);
  const [bedrooms, setBedrooms] = useState(initialFilters.bedrooms);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);

  const isInitialMount = useRef(true);

  const { data: locationsData } = usePublicRentalLocationsQuery({
    Language: locale,
    PageSize: 50,
  });
  const locations = locationsData?.items || [];

  // Sync internal state when external initialFilters change
  useEffect(() => {
    setSearchTerm(initialFilters.searchTerm);
    setLocationId(initialFilters.locationId);
    setPropertyType(initialFilters.propertyType);
    setBedrooms(initialFilters.bedrooms);
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
        propertyType,
        bedrooms,
        minPrice,
        maxPrice,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm, locationId, propertyType, bedrooms, minPrice, maxPrice, onApplyFilters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters({
      searchTerm,
      locationId,
      propertyType,
      bedrooms,
      minPrice,
      maxPrice,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setLocationId("");
    setPropertyType("");
    setBedrooms("");
    setMinPrice("");
    setMaxPrice("");
    onResetFilters();
  };

  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
      locationId ||
      propertyType ||
      bedrooms ||
      minPrice ||
      maxPrice
  );

  return (
    <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
      <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-sm">
        {/* Header */}
        <div className="border-b border-[#D9E2EE] pb-4">
          <h2
            className="text-lg font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("rent.filters.title", "Filters")}
          </h2>
        </div>

        {/* Filter Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <RentalFilterFields
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            locationId={locationId}
            setLocationId={setLocationId}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            locations={locations}
            t={t}
          />

          {/* Submit & Reset Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              type="submit"
              className="w-full rounded-[12px] bg-[#2B5FA6] py-3 text-center text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1B3A6B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.filters.apply", "Apply Filters")}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-2 rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] py-2.5 text-center text-xs sm:text-sm font-semibold text-[#1B3A6B] transition-colors hover:border-[#1B3A6B] hover:bg-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <FiRotateCcw className="h-3.5 w-3.5" />
                <span>{t("rent.grid.resetFilters", "Reset Filters")}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </aside>
  );
}
