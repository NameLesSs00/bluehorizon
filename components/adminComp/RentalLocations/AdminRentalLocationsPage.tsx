"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { useRentalLocationsQuery } from "@/features/rentalLocations/useRentalLocationsQueries";
import { RentalLocationItem } from "@/models/rentalLocation";
import RentalLocationsTable from "./RentalLocationsTable";
import RentalLocationFormDrawer from "./RentalLocationFormDrawer";
import RentalLocationMediaDrawer from "./RentalLocationMediaDrawer";

export default function AdminRentalLocationsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data: locationsData, isLoading } = useRentalLocationsQuery({
    Language: "en",
    PageNumber: pageNumber,
    PageSize: pageSize,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [locationToEdit, setLocationToEdit] =
    useState<RentalLocationItem | null>(null);

  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [locationForMedia, setLocationForMedia] =
    useState<RentalLocationItem | null>(null);

  const locations = locationsData?.items ?? [];
  const totalPages = locationsData?.totalPages ?? 1;
  const hasPreviousPage = locationsData?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = locationsData?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setLocationToEdit(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(loc: RentalLocationItem) {
    setLocationToEdit(loc);
    setIsFormOpen(true);
  }

  function handleOpenMedia(loc: RentalLocationItem) {
    setLocationForMedia(loc);
    setIsMediaOpen(true);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]">
              RENTAL DESTINATIONS &amp; AREAS
            </p>
            <h1 className="mt-1 text-[28px] font-semibold text-[#202326]">
              Rental Locations
            </h1>
            <p className="mt-1 text-[13px] text-[#65706B]">
              Manage rental zones, destinations, neighborhood descriptions,
              photos, and videos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {locationsData?.totalCount !== undefined && (
              <span className="inline-flex items-center rounded-full bg-[#F9F7F4] border border-[#E2E8F3] px-3 py-1.5 text-[12px] font-medium text-[#202326]">
                {locationsData.totalCount} Location
                {locationsData.totalCount !== 1 ? "s" : ""}
              </span>
            )}

            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#2B5FA6]"
            >
              <FiPlus className="h-4 w-4" />
              <span>New Rental Location</span>
            </button>
          </div>
        </div>

        {/* Table & Pagination */}
        <RentalLocationsTable
          locations={locations}
          isLoading={isLoading}
          pageNumber={pageNumber}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={setPageNumber}
          onEdit={handleOpenEdit}
          onManageMedia={handleOpenMedia}
        />

        {/* Form Drawer (Create / Edit) */}
        <RentalLocationFormDrawer
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setLocationToEdit(null);
          }}
          locationToEdit={locationToEdit}
        />

        {/* Media Drawer (Photos & Video) */}
        <RentalLocationMediaDrawer
          isOpen={isMediaOpen}
          onClose={() => {
            setIsMediaOpen(false);
            setLocationForMedia(null);
          }}
          location={locationForMedia}
        />
      </div>
    </AdminShell>
  );
}

