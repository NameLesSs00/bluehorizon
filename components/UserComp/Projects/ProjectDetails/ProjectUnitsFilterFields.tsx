"use client";

import { FiSearch } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";

interface ProjectUnitsFilterFieldsProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  categories: string[];
  unitType: "All" | "Primary" | "Resale";
  onUnitTypeChange: (val: "All" | "Primary" | "Resale") => void;
  bedrooms: string;
  onBedroomsChange: (val: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
  primaryCount: number;
  resaleCount: number;
}

const selectArrow = (
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
);

export default function ProjectUnitsFilterFields({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  unitType,
  onUnitTypeChange,
  bedrooms,
  onBedroomsChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  primaryCount,
  resaleCount,
}: ProjectUnitsFilterFieldsProps) {
  const { t } = useTranslation();
  const totalCount = primaryCount + resaleCount;

  return (
    <div className="space-y-4">
      {/* Search Units */}
      <div>
        <label
          htmlFor="units-filter-search"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.details.unitsFilters.searchLabel")}
        </label>
        <div className="relative mt-1.5">
          <input
            id="units-filter-search"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("projects.details.unitsFilters.searchPlaceholder")}
            className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] py-2.5 pr-3.5 pl-9 rtl:pr-9 rtl:pl-3.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <FiSearch className="pointer-events-none absolute top-1/2 left-3 rtl:left-auto rtl:right-3 h-4 w-4 -translate-y-1/2 text-[#6B7570]" />
        </div>
      </div>

      {/* Unit Status / Type */}
      <div>
        <label
          htmlFor="units-filter-unit-type"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.details.unitsFilters.unitTypeLabel")}
        </label>
        <div className="relative mt-1.5">
          <select
            id="units-filter-unit-type"
            value={unitType}
            onChange={(e) =>
              onUnitTypeChange(e.target.value as "All" | "Primary" | "Resale")
            }
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="All">
              {t("projects.details.unitsFilters.typeAll")}
              {totalCount > 0 ? ` (${totalCount})` : ""}
            </option>
            <option value="Primary">
              {t("projects.details.unitsFilters.typePrimary")}
              {primaryCount > 0 ? ` (${primaryCount})` : ""}
            </option>
            <option value="Resale">
              {t("projects.details.unitsFilters.typeResale")}
              {resaleCount > 0 ? ` (${resaleCount})` : ""}
            </option>
          </select>
          {selectArrow}
        </div>
      </div>

      {/* Property Type / Categories */}
      <div>
        <label
          htmlFor="units-filter-category"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.details.unitsFilters.categoryLabel")}
        </label>
        <div className="relative mt-1.5">
          <select
            id="units-filter-category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="">
              {t("projects.details.unitsFilters.anyCategory")}
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {selectArrow}
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label
          htmlFor="units-filter-bedrooms"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.details.unitsFilters.bedroomsLabel")}
        </label>
        <div className="relative mt-1.5">
          <select
            id="units-filter-bedrooms"
            value={bedrooms}
            onChange={(e) => onBedroomsChange(e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="">
              {t("projects.details.unitsFilters.bedroomsAny")}
            </option>
            <option value="0">
              {t("projects.details.unitsFilters.bedroomsStudio")}
            </option>
            <option value="1">
              {t("projects.details.unitsFilters.bedroomSingle")}
            </option>
            <option value="2">
              {t("projects.details.unitsFilters.bedroomsCount").replace(
                "{count}",
                "2"
              )}
            </option>
            <option value="3">
              {t("projects.details.unitsFilters.bedroomsCount").replace(
                "{count}",
                "3"
              )}
            </option>
            <option value="4+">
              {t("projects.details.unitsFilters.bedrooms5Plus")}
            </option>
          </select>
          {selectArrow}
        </div>
      </div>

      {/* Minimum Price */}
      <div>
        <label
          htmlFor="units-filter-min-price"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.details.unitsFilters.minPrice")}
        </label>
        <input
          id="units-filter-min-price"
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
          placeholder={t("projects.details.unitsFilters.minPricePlaceholder")}
          className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Maximum Price */}
      <div>
        <label
          htmlFor="units-filter-max-price"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.details.unitsFilters.maxPrice")}
        </label>
        <input
          id="units-filter-max-price"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          placeholder={t("projects.details.unitsFilters.maxPricePlaceholder")}
          className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>
    </div>
  );
}
