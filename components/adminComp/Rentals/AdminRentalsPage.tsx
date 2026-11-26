"use client";

import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import AdminServiceFilterDropdown from "@/components/adminComp/Common/AdminServiceFilterDropdown";
import { useRentalsQuery } from "@/features/rentals/useRentalsQueries";
import { usePropertyCategoryItemsQuery } from "@/features/propertyCategoryItems/usePropertyCategoryItemsQueries";
import { RentalItem } from "@/models/rental";
import RentalsTable from "./RentalsTable";
import RentalFormDrawer from "./RentalFormDrawer";
import RentalImagesDrawer from "./RentalImagesDrawer";

export default function AdminRentalsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCategoryItemIds, setSelectedCategoryItemIds] = useState<number[]>([]);
  const pageSize = 10;

  const { data: categoryItemsData } = usePropertyCategoryItemsQuery({
    Language: "en",
    PageSize: 100,
  });

  const { data: rentalsData, isLoading } = useRentalsQuery({
    Language: "en",
    Currency: "USD",
    CategoryItemId: selectedCategoryItemIds[0],
    PageNumber: selectedCategoryItemIds.length > 1 ? 1 : pageNumber,
    PageSize: selectedCategoryItemIds.length > 1 ? 100 : pageSize,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rentalToEdit, setRentalToEdit] = useState<RentalItem | null>(null);

  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [rentalForMedia, setRentalForMedia] = useState<RentalItem | null>(null);

  const rentals = useMemo(() => {
    const items = rentalsData?.items ?? [];
    if (selectedCategoryItemIds.length <= 1) return items;
    const filtered = items.filter((r) =>
      selectedCategoryItemIds.every((id) =>
        r.categoryItems?.some((c) => c.id === id)
      )
    );
    const start = (pageNumber - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [rentalsData?.items, selectedCategoryItemIds, pageNumber]);
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
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]">
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
            {rentalsData?.totalCount !== undefined && (
              <span className="inline-flex items-center rounded-full bg-[#F9F7F4] border border-[#E2E8F3] px-3 py-1.5 text-[12px] font-medium text-[#202326]">
                {rentalsData.totalCount} Rental
                {rentalsData.totalCount !== 1 ? "s" : ""}
              </span>
            )}

            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#2B5FA6]"
            >
              <FiPlus className="h-4 w-4" />
              <span>New Rental Property</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <AdminServiceFilterDropdown
            label="Amenities"
            options={categoryItemsData?.items ?? []}
            selectedIds={selectedCategoryItemIds}
            onToggle={(id) => {
              setSelectedCategoryItemIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              );
              setPageNumber(1);
            }}
            onClear={() => {
              setSelectedCategoryItemIds([]);
              setPageNumber(1);
            }}
          />
        </div>

        {/* Table View */}
        <RentalsTable
          rentals={rentals}
          isLoading={isLoading}
          activeCurrency="USD"
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

