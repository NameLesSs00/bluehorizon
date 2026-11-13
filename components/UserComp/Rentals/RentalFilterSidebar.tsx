"use client";

import { useEffect, useRef, useState } from "react";
import { FiRotateCcw, FiSearch } from "react-icons/fi";
import { usePublicRentalLocationsQuery } from "@/features/rentalLocations/useRentalLocationsQueries";
import { PROPERTY_TYPE_LABELS, PropertyType } from "@/models/rental";
import { useTranslation } from "@/features/i18n/useTranslation";

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

const UNIT_TYPE_OPTIONS = [
  PropertyType.Apartment,
  PropertyType.Villa,
  PropertyType.Townhouse,
  PropertyType.Studio,
  PropertyType.Penthouse,
  PropertyType.OneBedroom,
  PropertyType.TwoBedroom,
  PropertyType.ThreeBedroom,
  PropertyType.Chalet,
  PropertyType.FourBedroom,
  PropertyType.StudioCompact,
];

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
            {t("rent.filters.title")}
          </h2>
        </div>

        {/* Filter Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Search */}
          <div>
            <label
              htmlFor="rental-filter-search"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.filters.searchLabel")}
            </label>
            <div className="relative mt-1.5">
              <input
                id="rental-filter-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("rent.filters.searchPlaceholder")}
                className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] py-2.5 pr-3.5 pl-9 rtl:pr-9 rtl:pl-3.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
                style={{ fontFamily: "var(--font-inter)" }}
              />
              <FiSearch className="pointer-events-none absolute top-1/2 left-3 rtl:left-auto rtl:right-3 h-4 w-4 -translate-y-1/2 text-[#6B7570]" />
            </div>
          </div>

          {/* Location Area */}
          <div>
            <label
              htmlFor="rental-filter-location"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.filters.locationLabel")}
            </label>
            <div className="relative mt-1.5">
              <select
                id="rental-filter-location"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <option value="">{t("rent.filters.allLocations")}</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={String(loc.id)}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center pr-3.5 rtl:pr-0 rtl:pl-3.5 text-[#6B7570]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Unit Type */}
          <div>
            <label
              htmlFor="rental-filter-unit-type"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.filters.typeLabel")}
            </label>
            <div className="relative mt-1.5">
              <select
                id="rental-filter-unit-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <option value="">{t("rent.filters.anyType")}</option>
                {UNIT_TYPE_OPTIONS.map((typeEnum) => (
                  <option key={typeEnum} value={String(typeEnum)}>
                    {PROPERTY_TYPE_LABELS[typeEnum]}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center pr-3.5 rtl:pr-0 rtl:pl-3.5 text-[#6B7570]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label
              htmlFor="rental-filter-bedrooms"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.filters.bedroomsLabel")}
            </label>
            <div className="relative mt-1.5">
              <select
                id="rental-filter-bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <option value="">{t("rent.filters.bedroomsAny")}</option>
                <option value="1">1 {t("rent.card.bedroomSingle")}</option>
                <option value="2">2 {t("rent.card.bedrooms").replace("{count}", "2")}</option>
                <option value="3">3 {t("rent.card.bedrooms").replace("{count}", "3")}</option>
                <option value="4">4 {t("rent.card.bedrooms").replace("{count}", "4")}</option>
                <option value="5">{t("rent.filters.bedrooms5Plus")}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center pr-3.5 rtl:pr-0 rtl:pl-3.5 text-[#6B7570]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Minimum Price */}
          <div>
            <label
              htmlFor="rental-filter-min-price"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.filters.minPrice")}
            </label>
            <input
              id="rental-filter-min-price"
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder={t("rent.filters.minPrice")}
              className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Maximum Price */}
          <div>
            <label
              htmlFor="rental-filter-max-price"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.filters.maxPrice")}
            </label>
            <input
              id="rental-filter-max-price"
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder={t("rent.filters.maxPrice")}
              className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Submit & Reset Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              type="submit"
              className="w-full rounded-[12px] bg-[#2B5FA6] py-3 text-center text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1B3A6B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.filters.apply")}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-2 rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] py-2.5 text-center text-xs sm:text-sm font-semibold text-[#1B3A6B] transition-colors hover:border-[#1B3A6B] hover:bg-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <FiRotateCcw className="h-3.5 w-3.5" />
                <span>{t("rent.grid.resetFilters")}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </aside>
  );
}
