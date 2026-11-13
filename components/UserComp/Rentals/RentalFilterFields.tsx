"use client";

import { FiSearch } from "react-icons/fi";
import { PROPERTY_TYPE_LABELS, PropertyType } from "@/models/rental";
import { ProjectLocationItem } from "@/models/projectLocation";

export const RENTAL_UNIT_TYPES = [
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

interface RentalFilterFieldsProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  locationId: string;
  setLocationId: (val: string) => void;
  propertyType: string;
  setPropertyType: (val: string) => void;
  bedrooms: string;
  setBedrooms: (val: string) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  locations: ProjectLocationItem[];
  t: (key: string, fallback?: string) => string;
}

export default function RentalFilterFields({
  searchTerm,
  setSearchTerm,
  locationId,
  setLocationId,
  propertyType,
  setPropertyType,
  bedrooms,
  setBedrooms,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  locations,
  t,
}: RentalFilterFieldsProps) {
  return (
    <>
      {/* Search Input */}
      <div>
        <label
          htmlFor="rental-filter-search"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("rent.filters.searchLabel", "Search")}
        </label>
        <div className="relative mt-1.5">
          <input
            id="rental-filter-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("rent.filters.searchPlaceholder", "Search rentals...")}
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
          {t("rent.filters.locationLabel", "Location")}
        </label>
        <div className="relative mt-1.5">
          <select
            id="rental-filter-location"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="">{t("rent.filters.allLocations", "All Locations")}</option>
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
          {t("rent.filters.typeLabel", "Unit Type")}
        </label>
        <div className="relative mt-1.5">
          <select
            id="rental-filter-unit-type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="">{t("rent.filters.anyType", "Any Type")}</option>
            {RENTAL_UNIT_TYPES.map((typeEnum) => (
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
          {t("rent.filters.bedroomsLabel", "Bedrooms")}
        </label>
        <div className="relative mt-1.5">
          <select
            id="rental-filter-bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="">{t("rent.filters.bedroomsAny", "Any")}</option>
            <option value="1">1 {t("rent.card.bedroomSingle", "Room")}</option>
            <option value="2">2 {t("rent.card.bedrooms", "Rooms").replace("{count}", "2")}</option>
            <option value="3">3 {t("rent.card.bedrooms", "Rooms").replace("{count}", "3")}</option>
            <option value="4">4 {t("rent.card.bedrooms", "Rooms").replace("{count}", "4")}</option>
            <option value="5">{t("rent.filters.bedrooms5Plus", "5+ Rooms")}</option>
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
          {t("rent.filters.minPrice", "Min Price")}
        </label>
        <input
          id="rental-filter-min-price"
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder={t("rent.filters.minPrice", "Min Price")}
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
          {t("rent.filters.maxPrice", "Max Price")}
        </label>
        <input
          id="rental-filter-max-price"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder={t("rent.filters.maxPrice", "Max Price")}
          className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>
    </>
  );
}

