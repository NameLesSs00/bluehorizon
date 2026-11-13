"use client";

import { FiSearch } from "react-icons/fi";
import { ProjectLocationItem } from "@/models/projectLocation";
import { ProjectTypeItem } from "@/models/projectType";
import { useTranslation } from "@/features/i18n/useTranslation";

interface ProjectsFilterFieldsProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  locationId: string;
  onLocationChange: (val: string) => void;
  locations: ProjectLocationItem[];
  projectTypeId: string;
  onProjectTypeChange: (val: string) => void;
  projectTypes: ProjectTypeItem[];
  paymentType: string;
  onPaymentTypeChange: (val: string) => void;
  deliveryFrom: string;
  onDeliveryFromChange: (val: string) => void;
  deliveryTo: string;
  onDeliveryToChange: (val: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
}

const inputClasses =
  "w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white";

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

export default function ProjectsFilterFields({
  searchTerm,
  onSearchChange,
  locationId,
  onLocationChange,
  locations,
  projectTypeId,
  onProjectTypeChange,
  projectTypes,
  paymentType,
  onPaymentTypeChange,
  deliveryFrom,
  onDeliveryFromChange,
  deliveryTo,
  onDeliveryToChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
}: ProjectsFilterFieldsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Search Project */}
      <div>
        <label
          htmlFor="project-filter-search"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.searchLabel")}
        </label>
        <div className="relative mt-1.5">
          <input
            id="project-filter-search"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("projects.filters.searchPlaceholder")}
            className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] py-2.5 pr-3.5 pl-9 rtl:pr-9 rtl:pl-3.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <FiSearch className="pointer-events-none absolute top-1/2 left-3 rtl:left-auto rtl:right-3 h-4 w-4 -translate-y-1/2 text-[#6B7570]" />
        </div>
      </div>

      {/* Area / Location Dropdown */}
      <div>
        <label
          htmlFor="project-filter-area"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.areaLabel")}
        </label>
        <div className="relative mt-1.5">
          <select
            id="project-filter-area"
            value={locationId}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="">{t("projects.filters.anyArea")}</option>
            {locations.map((loc) => (
              <option key={loc.id} value={String(loc.id)}>
                {loc.name}
              </option>
            ))}
          </select>
          {selectArrow}
        </div>
      </div>

      {/* Project Type Dropdown */}
      <div>
        <label
          htmlFor="project-filter-type"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.typeLabel")}
        </label>
        <div className="relative mt-1.5">
          <select
            id="project-filter-type"
            value={projectTypeId}
            onChange={(e) => onProjectTypeChange(e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="">{t("projects.filters.anyType")}</option>
            {projectTypes.map((pt) => (
              <option key={pt.id} value={String(pt.id)}>
                {pt.name}
              </option>
            ))}
          </select>
          {selectArrow}
        </div>
      </div>

      {/* Payment Type Dropdown */}
      <div>
        <label
          htmlFor="project-filter-payment"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.paymentLabel")}
        </label>
        <div className="relative mt-1.5">
          <select
            id="project-filter-payment"
            value={paymentType}
            onChange={(e) => onPaymentTypeChange(e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="">{t("projects.filters.anyType")}</option>
            <option value="Cash">{t("projects.filters.paymentCash")}</option>
            <option value="Installments">
              {t("projects.filters.paymentInstallments")}
            </option>
            <option value="Cash & Installments">
              {t("projects.filters.paymentBoth")}
            </option>
          </select>
          {selectArrow}
        </div>
      </div>

      {/* Delivery Date From */}
      <div>
        <label
          htmlFor="project-filter-delivery-from"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.deliveryFrom")}
        </label>
        <input
          id="project-filter-delivery-from"
          type="date"
          value={deliveryFrom}
          onChange={(e) => onDeliveryFromChange(e.target.value)}
          className={`mt-1.5 ${inputClasses}`}
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Delivery Date To */}
      <div>
        <label
          htmlFor="project-filter-delivery-to"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.deliveryTo")}
        </label>
        <input
          id="project-filter-delivery-to"
          type="date"
          value={deliveryTo}
          onChange={(e) => onDeliveryToChange(e.target.value)}
          className={`mt-1.5 ${inputClasses}`}
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Minimum Price */}
      <div>
        <label
          htmlFor="project-filter-min-price"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.minPrice")}
        </label>
        <input
          id="project-filter-min-price"
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
          placeholder={t("projects.filters.minPricePlaceholder")}
          className={`mt-1.5 ${inputClasses}`}
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Maximum Price */}
      <div>
        <label
          htmlFor="project-filter-max-price"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.maxPrice")}
        </label>
        <input
          id="project-filter-max-price"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          placeholder={t("projects.filters.maxPricePlaceholder")}
          className={`mt-1.5 ${inputClasses}`}
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>
    </div>
  );
}
