"use client";

import { useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import AdminServiceFilterDropdown from "@/components/adminComp/Common/AdminServiceFilterDropdown";
import { useResalesQuery } from "@/features/resales/useResalesQueries";
import { useServicesQuery } from "@/features/services/useServicesQueries";
import { ResaleItem } from "@/models/resale";
import ResalesTable from "./ResalesTable";
import ResaleFormDrawer from "./ResaleFormDrawer";
import ResaleImagesDrawer from "./ResaleImagesDrawer";

const CURRENCIES = ["USD", "EUR", "GBP", "EGP"] as const;

export default function AdminResalesPage() {
  const [activeCurrency, setActiveCurrency] = useState<string>("USD");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data: servicesData } = useServicesQuery("en");

  const { data: resalesData, isLoading } = useResalesQuery({
    Language: "en",
    Currency: activeCurrency,
    SearchTerm: searchTerm.trim() || undefined,
    ResaleUnitServiceId: selectedServiceIds[0],
    PageNumber: selectedServiceIds.length > 1 ? 1 : pageNumber,
    PageSize: selectedServiceIds.length > 1 ? 100 : pageSize,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [resaleToEdit, setResaleToEdit] = useState<ResaleItem | null>(null);

  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [resaleForMedia, setResaleForMedia] = useState<ResaleItem | null>(null);

  const resales = useMemo(() => {
    const items = resalesData?.items ?? [];
    if (selectedServiceIds.length <= 1) return items;
    const filtered = items.filter((r) =>
      selectedServiceIds.every((id) => r.services?.some((s) => s.id === id))
    );
    const start = (pageNumber - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [resalesData?.items, selectedServiceIds, pageNumber]);
  const totalPages = resalesData?.totalPages ?? 1;
  const hasPreviousPage = resalesData?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = resalesData?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setResaleToEdit(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(resale: ResaleItem) {
    setResaleToEdit(resale);
    setIsFormOpen(true);
  }

  function handleOpenMedia(resale: ResaleItem) {
    setResaleForMedia(resale);
    setIsMediaOpen(true);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]">
              PROPERTY SALES &amp; INVESTMENTS
            </p>
            <h1 className="mt-1 text-[28px] font-semibold text-[#202326]">
              Resale Properties
            </h1>
            <p className="mt-1 text-[13px] text-[#65706B]">
              Manage resale listings, penthouses, villas, and apartments across compounds with multi-currency pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Currency Switcher */}
            <div className="inline-flex rounded-xl border border-[#D0D9EA] bg-white p-1">
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
                      ? "bg-[#2B5FA6] text-white shadow-xs"
                      : "text-[#65706B] hover:text-[#202326]"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {resalesData?.totalCount !== undefined && (
              <span className="inline-flex items-center rounded-full border border-[#E2E8F3] bg-[#F9F7F4] px-3 py-1.5 text-[12px] font-medium text-[#202326]">
                {resalesData.totalCount} Resale
                {resalesData.totalCount !== 1 ? "s" : ""}
              </span>
            )}

            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-4 py-2.5 text-[13px] font-semibold text-white shadow-xs transition-colors hover:bg-[#2B5FA6]"
            >
              <FiPlus className="h-4 w-4" />
              <span>New Resale Property</span>
            </button>
          </div>
        </div>

        {/* Filter bar: Search & Services */}
        <div className="flex flex-wrap items-center gap-3">
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
              className="w-full rounded-xl border border-[#D0D9EA] bg-white py-2.5 pr-4 pl-10 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <AdminServiceFilterDropdown
            label="Services"
            options={servicesData ?? []}
            selectedIds={selectedServiceIds}
            onToggle={(id) => {
              setSelectedServiceIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              );
              setPageNumber(1);
            }}
            onClear={() => {
              setSelectedServiceIds([]);
              setPageNumber(1);
            }}
          />
        </div>

        {/* Table View */}
        <ResalesTable
          resales={resales}
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
        <ResaleFormDrawer
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setResaleToEdit(null);
          }}
          resaleToEdit={resaleToEdit}
        />

        {/* Photo Gallery Drawer */}
        <ResaleImagesDrawer
          isOpen={isMediaOpen}
          onClose={() => {
            setIsMediaOpen(false);
            setResaleForMedia(null);
          }}
          resale={resaleForMedia}
        />
      </div>
    </AdminShell>
  );
}

