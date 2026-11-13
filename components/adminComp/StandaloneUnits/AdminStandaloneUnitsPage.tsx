"use client";

import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { useStandaloneUnitsQuery } from "@/features/standaloneUnits/useStandaloneUnitsQueries";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import { useExchangeRatesQuery } from "@/features/currency/useExchangeRatesQueries";
import { StandaloneUnitItem } from "@/models/standaloneUnit";
import StandaloneUnitsTable from "./StandaloneUnitsTable";
import StandaloneUnitFormDrawer from "./StandaloneUnitFormDrawer";
import StandaloneUnitImagesDrawer from "./StandaloneUnitImagesDrawer";

const PROPERTY_TYPES = [
  "All Types",
  "Villa",
  "Apartment",
  "Chalet",
  "Townhouse",
  "Duplex",
  "Penthouse",
  "Studio",
];

export default function AdminStandaloneUnitsPage() {
  // Sync exchange rates into currency store
  useExchangeRatesQuery();

  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const availableCurrencies = useCurrencyStore((state) => state.availableCurrencies);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("All Types");
  const [activeFilter, setActiveFilter] = useState<boolean | undefined>(undefined);

  const { data, isLoading } = useStandaloneUnitsQuery({
    Language: "en",
    Currency: currentCurrency,
    PageNumber: pageNumber,
    PageSize: pageSize,
    SearchTerm: searchTerm.trim() || undefined,
    PropertyType: selectedPropertyType !== "All Types" ? selectedPropertyType : undefined,
    IsActive: activeFilter,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [unitToEdit, setUnitToEdit] = useState<StandaloneUnitItem | null>(null);

  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [unitForImages, setUnitForImages] = useState<StandaloneUnitItem | null>(null);

  const units = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const hasPreviousPage = data?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = data?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setUnitToEdit(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(unit: StandaloneUnitItem) {
    setUnitToEdit(unit);
    setIsFormOpen(true);
  }

  function handleOpenImages(unit: StandaloneUnitItem) {
    setUnitForImages(unit);
    setIsImagesOpen(true);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]">
              PROPERTY MANAGEMENT
            </p>
            <h1 className="mt-1 text-[28px] font-semibold text-[#202326]">
              StandAlone Props
            </h1>
            <p className="mt-1 text-[13px] text-[#65706B]">
              Manage standalone villas, townhouses, and properties outside compound projects.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2B5FA6]"
          >
            <FiPlus className="h-4 w-4" />
            <span>Add Standalone Property</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E2E8F3] bg-white p-4 shadow-xs">
          {/* Search */}
          <div className="relative min-w-[240px] flex-1 sm:flex-initial">
            <FiSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9BA5A0]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPageNumber(1);
              }}
              placeholder="Search standalone properties..."
              className="w-full rounded-xl border border-[#D0D9EA] bg-white py-2 pr-3 pl-9 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#1B3A6B] focus:outline-none"
            />
          </div>

          {/* Property Type Filter */}
          <select
            value={selectedPropertyType}
            onChange={(e) => {
              setSelectedPropertyType(e.target.value);
              setPageNumber(1);
            }}
            className="rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <div className="inline-flex rounded-xl border border-[#D0D9EA] bg-white p-0.5">
            <button
              type="button"
              onClick={() => {
                setActiveFilter(undefined);
                setPageNumber(1);
              }}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
                activeFilter === undefined
                  ? "bg-[#2B5FA6] text-white"
                  : "text-[#65706B] hover:text-[#202326]"
              }`}
            >
              All Status
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveFilter(true);
                setPageNumber(1);
              }}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
                activeFilter === true
                  ? "bg-[#2B5FA6] text-white"
                  : "text-[#65706B] hover:text-[#202326]"
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveFilter(false);
                setPageNumber(1);
              }}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
                activeFilter === false
                  ? "bg-[#2B5FA6] text-white"
                  : "text-[#65706B] hover:text-[#202326]"
              }`}
            >
              Inactive
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[12px] font-medium text-[#65706B]">Currency:</span>
            <select
              value={currentCurrency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] font-semibold text-[#1B3A6B] focus:border-[#1B3A6B] focus:outline-none"
            >
              {availableCurrencies.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <StandaloneUnitsTable
          units={units}
          isLoading={isLoading}
          selectedCurrency={currentCurrency}
          pageNumber={pageNumber}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={(p) => setPageNumber(p)}
          onEdit={handleOpenEdit}
          onManageImages={handleOpenImages}
        />

        {/* Drawers */}
        <StandaloneUnitFormDrawer
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          unitToEdit={unitToEdit}
        />

        <StandaloneUnitImagesDrawer
          isOpen={isImagesOpen}
          onClose={() => setIsImagesOpen(false)}
          unit={unitForImages}
        />
      </div>
    </AdminShell>
  );
}

