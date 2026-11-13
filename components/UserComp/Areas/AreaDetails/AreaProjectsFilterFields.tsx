"use client";

import { FiSearch } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { AreaProjectsFilterState } from "./AreaProjectsFilterSidebar";

interface AreaProjectsFilterFieldsProps {
  filterState: AreaProjectsFilterState;
  onFilterChange: <K extends keyof AreaProjectsFilterState>(
    field: K,
    value: AreaProjectsFilterState[K]
  ) => void;
  onApplyFilters: () => void;
}

const PROJECT_TYPES = [
  "Any Type",
  "Residential",
  "Commercial",
  "Resort",
  "Mixed-Use",
];

const PAYMENT_TYPES = [
  "Any Type",
  "Installment",
  "Cash",
];

const SVG_CHEVRON = (
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

export default function AreaProjectsFilterFields({
  filterState,
  onFilterChange,
  onApplyFilters,
}: AreaProjectsFilterFieldsProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-4 space-y-4">
      {/* Search Project */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.searchLabel")}
        </label>
        <div className="relative">
          <FiSearch className="pointer-events-none absolute top-1/2 left-3 rtl:left-auto rtl:right-3 h-3.5 w-3.5 -translate-y-1/2 text-[#8A9590]" />
          <input
            type="text"
            value={filterState.searchTerm}
            onChange={(e) => onFilterChange("searchTerm", e.target.value)}
            placeholder={t("projects.filters.searchPlaceholder")}
            className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] py-2.5 pl-9 pr-3.5 rtl:pr-9 rtl:pl-3.5 text-xs text-[#202326] placeholder-[#8A9590] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
      </div>

      {/* Project Type */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.typeLabel")}
        </label>
        <div className="relative">
          <select
            value={filterState.projectType}
            onChange={(e) => onFilterChange("projectType", e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type === "Any Type" ? t("projects.filters.anyType") : type}
              </option>
            ))}
          </select>
          {SVG_CHEVRON}
        </div>
      </div>

      {/* Payment Type */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.paymentLabel")}
        </label>
        <div className="relative">
          <select
            value={filterState.paymentType}
            onChange={(e) => onFilterChange("paymentType", e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {PAYMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type === "Any Type"
                  ? t("projects.filters.anyType")
                  : type === "Installment"
                  ? t("projects.filters.paymentInstallments")
                  : t("projects.filters.paymentCash")}
              </option>
            ))}
          </select>
          {SVG_CHEVRON}
        </div>
      </div>

      {/* Delivery Date From */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.deliveryFrom")}
        </label>
        <input
          type="date"
          value={filterState.deliveryDateFrom}
          onChange={(e) =>
            onFilterChange("deliveryDateFrom", e.target.value)
          }
          className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2 text-xs text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Delivery Date To */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.deliveryTo")}
        </label>
        <input
          type="date"
          value={filterState.deliveryDateTo}
          onChange={(e) =>
            onFilterChange("deliveryDateTo", e.target.value)
          }
          className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2 text-xs text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Minimum Price */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.minPrice")}
        </label>
        <input
          type="number"
          value={filterState.minPrice}
          onChange={(e) => onFilterChange("minPrice", e.target.value)}
          placeholder={t("projects.filters.minPricePlaceholder")}
          className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#8A9590] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Maximum Price */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#202326] mb-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.maxPrice")}
        </label>
        <input
          type="number"
          value={filterState.maxPrice}
          onChange={(e) => onFilterChange("maxPrice", e.target.value)}
          placeholder={t("projects.filters.maxPricePlaceholder")}
          className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#8A9590] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onApplyFilters}
          className="w-full rounded-[12px] bg-[#2B5FA6] py-3 text-xs font-semibold text-white transition-colors hover:bg-[#1B3A6B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.apply")}
        </button>
      </div>
    </div>
  );
}

