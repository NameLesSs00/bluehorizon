"use client";

import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { usePrimaryUnitsQuery } from "@/features/primaryUnits/usePrimaryUnitsQueries";
import { PrimaryUnitItem } from "@/models/primaryUnit";
import PrimaryUnitsTable from "./PrimaryUnitsTable";
import PrimaryUnitFormDrawer from "./PrimaryUnitFormDrawer";
import PrimaryUnitImagesDrawer from "./PrimaryUnitImagesDrawer";

const CURRENCIES = ["USD", "EUR", "GBP", "EGP"] as const;

export default function AdminPrimaryUnitsPage() {
  const [activeCurrency, setActiveCurrency] = useState<string>("USD");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data: unitsData, isLoading } = usePrimaryUnitsQuery({
    Language: "en",
    Currency: activeCurrency,
    SearchTerm: searchTerm.trim() || undefined,
    PageNumber: pageNumber,
    PageSize: pageSize,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [unitToEdit, setUnitToEdit] = useState<PrimaryUnitItem | null>(null);

  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [unitForMedia, setUnitForMedia] = useState<PrimaryUnitItem | null>(null);

  const units = unitsData?.items ?? [];
  const totalPages = unitsData?.totalPages ?? 1;
  const hasPreviousPage = unitsData?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = unitsData?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setUnitToEdit(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(unit: PrimaryUnitItem) {
    setUnitToEdit(unit);
    setIsFormOpen(true);
  }

  function handleOpenMedia(unit: PrimaryUnitItem) {
    setUnitForMedia(unit);
    setIsMediaOpen(true);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#145C4B]">
              DEVELOPER OFF-PLAN &amp; DIRECT SALES
            </p>
            <h1 className="mt-1 text-[28px] font-semibold text-[#202326]">
              Primary Units
            </h1>
            <p className="mt-1 text-[13px] text-[#65706B]">
              Manage direct developer units, penthouses, duplexes, and apartments linked to projects with multi-currency pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Currency Switcher */}
            <div className="inline-flex rounded-xl border border-[#DCE2DE] bg-white p-1">
              {CURRENCIES.map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => {
                    setActiveCurrency(cur);
                    setPageNumber(1);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase transition-all ${
                    activeCurrency === cur
                      ? "bg-[#145C4B] text-white shadow-xs"
                      : "text-[#65706B] hover:text-[#202326]"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {unitsData?.totalCount !== undefined && (
              <span className="inline-flex items-center rounded-full border border-[#E6EAE7] bg-[#FAF8F5] px-3 py-1.5 text-[12px] font-medium text-[#202326]">
                {unitsData.totalCount} Unit
                {unitsData.totalCount !== 1 ? "s" : ""}
              </span>
            )}

            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0F473A] px-4 py-2.5 text-[13px] font-semibold text-white shadow-xs transition-colors hover:bg-[#145C4B]"
            >
              <FiPlus className="h-4 w-4" />
              <span>New Primary Unit</span>
            </button>
          </div>
        </div>

        {/* Filter bar: Search input */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <FiSearch className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#9BA5A0]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPageNumber(1);
              }}
              placeholder="Search by title, code or project..."
              className="w-full rounded-xl border border-[#DCE2DE] bg-white py-2.5 pr-4 pl-10 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>
        </div>

        {/* Table View */}
        <PrimaryUnitsTable
          units={units}
          isLoading={isLoading}
          activeCurrency={activeCurrency}
          pageNumber={pageNumber}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={setPageNumber}
          onEdit={handleOpenEdit}
          onManageMedia={handleOpenMedia}
        />

        {/* Create / Edit Drawer */}
        <PrimaryUnitFormDrawer
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setUnitToEdit(null);
          }}
          unitToEdit={unitToEdit}
        />

        {/* Photo Gallery Drawer */}
        <PrimaryUnitImagesDrawer
          isOpen={isMediaOpen}
          onClose={() => {
            setIsMediaOpen(false);
            setUnitForMedia(null);
          }}
          unit={unitForMedia}
        />
      </div>
    </AdminShell>
  );
}

