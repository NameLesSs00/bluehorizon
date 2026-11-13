"use client";

export interface AreaProjectsFilterState {
  searchTerm: string;
  projectType: string;
  paymentType: string;
  deliveryDateFrom: string;
  deliveryDateTo: string;
  minPrice: string;
  maxPrice: string;
}

interface AreaProjectsFilterSidebarProps {
  filterState: AreaProjectsFilterState;
  onFilterChange: <K extends keyof AreaProjectsFilterState>(
    field: K,
    value: AreaProjectsFilterState[K]
  ) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
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

export default function AreaProjectsFilterSidebar({
  filterState,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}: AreaProjectsFilterSidebarProps) {
  return (
    <aside className="w-full lg:w-[280px] shrink-0">
      <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D9E2EE]">
          <h3
            className="text-base font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Filters
          </h3>
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-medium text-[#6B7570] transition-colors hover:text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Reset All
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Search Project */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Search Project
            </label>
            <input
              type="text"
              value={filterState.searchTerm}
              onChange={(e) => onFilterChange("searchTerm", e.target.value)}
              placeholder="Search by name..."
              className="w-full rounded-xl bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#8A9590] outline-none border border-transparent focus:border-[#2B5FA6] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Project Type */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Project Type
            </label>
            <select
              value={filterState.projectType}
              onChange={(e) => onFilterChange("projectType", e.target.value)}
              className="w-full rounded-xl bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] outline-none border border-transparent focus:border-[#2B5FA6] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Type */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Payment Type
            </label>
            <select
              value={filterState.paymentType}
              onChange={(e) => onFilterChange("paymentType", e.target.value)}
              className="w-full rounded-xl bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] outline-none border border-transparent focus:border-[#2B5FA6] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {PAYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Delivery Date From */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Delivery Date From
            </label>
            <input
              type="date"
              value={filterState.deliveryDateFrom}
              onChange={(e) =>
                onFilterChange("deliveryDateFrom", e.target.value)
              }
              className="w-full rounded-xl bg-[#F0F3FA] px-3.5 py-2 text-xs text-[#202326] outline-none border border-transparent focus:border-[#2B5FA6] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Delivery Date To */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Delivery Date To
            </label>
            <input
              type="date"
              value={filterState.deliveryDateTo}
              onChange={(e) => onFilterChange("deliveryDateTo", e.target.value)}
              className="w-full rounded-xl bg-[#F0F3FA] px-3.5 py-2 text-xs text-[#202326] outline-none border border-transparent focus:border-[#2B5FA6] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Minimum Price */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Minimum Price
            </label>
            <input
              type="number"
              value={filterState.minPrice}
              onChange={(e) => onFilterChange("minPrice", e.target.value)}
              placeholder="EGP Min"
              className="w-full rounded-xl bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#8A9590] outline-none border border-transparent focus:border-[#2B5FA6] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Maximum Price */}
          <div>
            <label
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Maximum Price
            </label>
            <input
              type="number"
              value={filterState.maxPrice}
              onChange={(e) => onFilterChange("maxPrice", e.target.value)}
              placeholder="EGP Max"
              className="w-full rounded-xl bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#8A9590] outline-none border border-transparent focus:border-[#2B5FA6] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onApplyFilters}
              className="w-full rounded-xl bg-[#2B5FA6] py-3 text-xs font-semibold text-white transition-colors hover:bg-[#1B3A6B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

