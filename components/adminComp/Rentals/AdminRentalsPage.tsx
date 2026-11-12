"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { useRentalsQuery } from "@/features/rentals/useRentalsQueries";
import { RentalItem } from "@/models/rental";
import RentalsTable from "./RentalsTable";
import RentalFormDrawer from "./RentalFormDrawer";
import RentalImagesDrawer from "./RentalImagesDrawer";

const CURRENCIES = ["USD", "EUR", "GBP", "EGP"] as const;

export default function AdminRentalsPage() {
  const [activeCurrency, setActiveCurrency] = useState<string>("USD");
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data: rentalsData, isLoading } = useRentalsQuery({
    Language: "en",
    Currency: activeCurrency,
    PageNumber: pageNumber,
    PageSize: pageSize,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rentalToEdit, setRentalToEdit] = useState<RentalItem | null>(null);

  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [rentalForMedia, setRentalForMedia] = useState<RentalItem | null>(null);

  const rentals = rentalsData?.items ?? [];
  const totalPages = rentalsData?.totalPages ?? 1;
  const hasPreviousPage = rentalsData?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = rentalsData?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setRentalToEdit(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(rental: RentalItem) {
    setRentalToEdit(rental);
    setIsFormOpen(true);
  }

  function handleOpenMedia(rental: RentalItem) {
    setRentalForMedia(rental);
    setIsMediaOpen(true);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#145C4B]">
              VACATION &amp; SHORT-TERM LISTINGS
            </p>
            <h1 className="mt-1 text-[28px] font-semibold text-[#202326]">
              Rental Properties
            </h1>
            <p className="mt-1 text-[13px] text-[#65706B]">
              Manage vacation rentals, villas, apartments, guest capacities, and
              nightly rates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Currency Switcher Filter */}
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
                      ? "bg-[#145C4B] text-white shadow-sm"
                      : "text-[#65706B] hover:text-[#202326]"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {rentalsData?.totalCount !== undefined && (
              <span className="inline-flex items-center rounded-full bg-[#FAF8F5] border border-[#E6EAE7] px-3 py-1.5 text-[12px] font-medium text-[#202326]">
                {rentalsData.totalCount} Rental
                {rentalsData.totalCount !== 1 ? "s" : ""}
              </span>
            )}

            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0F473A] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#145C4B]"
            >
              <FiPlus className="h-4 w-4" />
              <span>New Rental Property</span>
            </button>
          </div>
        </div>

        {/* Table View */}
        <RentalsTable
          rentals={rentals}
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
        <RentalFormDrawer
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setRentalToEdit(null);
          }}
          rentalToEdit={rentalToEdit}
        />

        {/* In-Place Image Gallery Drawer */}
        <RentalImagesDrawer
          isOpen={isMediaOpen}
          onClose={() => {
            setIsMediaOpen(false);
            setRentalForMedia(null);
          }}
          rental={rentalForMedia}
        />
      </div>
    </AdminShell>
  );
}

