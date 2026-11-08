"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { useInfoAreaPlacesQuery } from "@/features/infoAreaPlaces/useInfoAreaPlacesQueries";
import { InfoAreaPlaceItem } from "@/models/infoAreaPlace";
import RentalAreaPlacesTable from "./RentalAreaPlacesTable";
import RentalAreaPlaceFormDrawer from "./RentalAreaPlaceFormDrawer";

export default function AdminRentalAreaPlacesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useInfoAreaPlacesQuery({
    Language: "en",
    PageNumber: pageNumber,
    PageSize: pageSize,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] =
    useState<InfoAreaPlaceItem | null>(null);

  const places = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const hasPreviousPage = data?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = data?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setSelectedPlace(null);
    setIsDrawerOpen(true);
  }

  function handleOpenEdit(item: InfoAreaPlaceItem) {
    setSelectedPlace(item);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
    setSelectedPlace(null);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              RENTAL UNITS GEOGRAPHY
            </p>
            <h1
              className="mt-1 text-[28px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Rental Area Places
            </h1>
            <p
              className="mt-1 text-[13px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Manage key landmarks, points of interest, and proximity areas (Airports, Marinas, Beaches, Shopping Centers) linked to vacation rental units.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 self-start rounded-xl bg-[#145C4B] px-4 py-2.5 text-[13px] font-semibold text-white shadow-xs transition-colors hover:bg-[#0F473A] sm:self-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiPlus className="h-4 w-4" />
            <span>Add Area Place</span>
          </button>
        </div>

        {/* Full-width Table */}
        <RentalAreaPlacesTable
          places={places}
          isLoading={isLoading}
          pageNumber={pageNumber}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={setPageNumber}
          onEdit={handleOpenEdit}
        />

        {/* Right-Side Slide Drawer */}
        <RentalAreaPlaceFormDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          placeToEdit={selectedPlace}
        />
      </div>
    </AdminShell>
  );
}

