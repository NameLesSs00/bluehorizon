"use client";

import { usePublicProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { useProjectTypesQuery } from "@/features/projectTypes/useProjectTypesQueries";

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
  filters: ProjectFilterValues;
  onChange: (updated: Partial<ProjectFilterValues>) => void;
  onReset: () => void;
  onApply: () => void;
}

export default function ProjectsFilterSidebar({
  filters,
  onChange,
  onReset,
  onApply,
}: ProjectsFilterSidebarProps) {
  const { data: locationsData } = usePublicProjectLocationsQuery({
    Language: "en",
    PageNumber: 1,
    PageSize: 50,
  });

  const { data: typesData } = useProjectTypesQuery({
    Language: "en",
    PageNumber: 1,
    PageSize: 50,
  });

  const locations = locationsData?.items || [];
  const projectTypes = typesData?.items || [];

  return (
    <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-6 shadow-xs">
      {/* Filters Header */}
      <div className="flex items-center justify-between border-b border-[#D9E2EE]/60 pb-4">
        <h2
          className="text-[18px] font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Filters
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="text-[12px] font-semibold text-[#2B5FA6] transition-colors hover:text-[#1B3A6B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Reset All
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {/* Search Project */}
        <div>
          <label
            htmlFor="filter-search"
            className="mb-1.5 block text-[12px] font-medium text-[#202326]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Search Project
          </label>
          <input
            id="filter-search"
            type="text"
            placeholder="Search by name..."
            value={filters.searchTerm}
            onChange={(e) => onChange({ searchTerm: e.target.value })}
            className="w-full rounded-[12px] border border-transparent bg-[#F0F3FA] px-3.5 py-2.5 text-[13.5px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>

        {/* Area Dropdown */}
        <div>
          <label
            htmlFor="filter-area"
            className="mb-1.5 block text-[12px] font-medium text-[#202326]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Area
          </label>
          <div className="relative">
            <select
              id="filter-area"
              value={filters.locationId}
              onChange={(e) => onChange({ locationId: e.target.value })}
              className="w-full appearance-none rounded-[12px] border border-transparent bg-[#F0F3FA] px-3.5 py-2.5 pr-8 text-[13.5px] text-[#202326] transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <option value="">Any Area</option>
              {locations.map((loc) => (
                <option key={loc.id} value={String(loc.id)}>
                  {loc.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#6B7570]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 4.5L6 8L9.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Project Type Dropdown */}
        <div>
          <label
            htmlFor="filter-type"
            className="mb-1.5 block text-[12px] font-medium text-[#202326]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Project Type
          </label>
          <div className="relative">
            <select
              id="filter-type"
              value={filters.projectTypeId}
              onChange={(e) => onChange({ projectTypeId: e.target.value })}
              className="w-full appearance-none rounded-[12px] border border-transparent bg-[#F0F3FA] px-3.5 py-2.5 pr-8 text-[13.5px] text-[#202326] transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <option value="">Any Type</option>
              {projectTypes.map((t) => (
                <option key={t.id} value={String(t.id)}>
                  {t.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#6B7570]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 4.5L6 8L9.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Payment Type Dropdown */}
        <div>
          <label
            htmlFor="filter-payment"
            className="mb-1.5 block text-[12px] font-medium text-[#202326]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Payment Type
          </label>
          <div className="relative">
            <select
              id="filter-payment"
              value={filters.paymentType}
              onChange={(e) => onChange({ paymentType: e.target.value })}
              className="w-full appearance-none rounded-[12px] border border-transparent bg-[#F0F3FA] px-3.5 py-2.5 pr-8 text-[13.5px] text-[#202326] transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <option value="">Any Type</option>
              <option value="Cash">Cash</option>
              <option value="Installments">Installments</option>
              <option value="Cash & Installments">Cash & Installments</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#6B7570]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 4.5L6 8L9.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Delivery Date From */}
        <div>
          <label
            htmlFor="filter-delivery-from"
            className="mb-1.5 block text-[12px] font-medium text-[#202326]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Delivery Date From
          </label>
          <input
            id="filter-delivery-from"
            type="date"
            value={filters.deliveryFrom}
            onChange={(e) => onChange({ deliveryFrom: e.target.value })}
            className="w-full rounded-[12px] border border-transparent bg-[#F0F3FA] px-3.5 py-2.5 text-[13.5px] text-[#202326] transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>

        {/* Delivery Date To */}
        <div>
          <label
            htmlFor="filter-delivery-to"
            className="mb-1.5 block text-[12px] font-medium text-[#202326]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Delivery Date To
          </label>
          <input
            id="filter-delivery-to"
            type="date"
            value={filters.deliveryTo}
            onChange={(e) => onChange({ deliveryTo: e.target.value })}
            className="w-full rounded-[12px] border border-transparent bg-[#F0F3FA] px-3.5 py-2.5 text-[13.5px] text-[#202326] transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>

        {/* Minimum Price */}
        <div>
          <label
            htmlFor="filter-min-price"
            className="mb-1.5 block text-[12px] font-medium text-[#202326]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Minimum Price
          </label>
          <input
            id="filter-min-price"
            type="number"
            placeholder="EGP Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            className="w-full rounded-[12px] border border-transparent bg-[#F0F3FA] px-3.5 py-2.5 text-[13.5px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>

        {/* Maximum Price */}
        <div>
          <label
            htmlFor="filter-max-price"
            className="mb-1.5 block text-[12px] font-medium text-[#202326]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Maximum Price
          </label>
          <input
            id="filter-max-price"
            type="number"
            placeholder="EGP Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            className="w-full rounded-[12px] border border-transparent bg-[#F0F3FA] px-3.5 py-2.5 text-[13.5px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>

        {/* Apply Filters Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onApply}
            className="w-full rounded-[12px] bg-[#2B5FA6] py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#1B3A6B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

