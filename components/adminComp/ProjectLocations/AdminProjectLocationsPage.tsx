"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { useProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { ProjectLocationItem } from "@/models/projectLocation";
import ProjectLocationsTable from "./ProjectLocationsTable";
import ProjectLocationFormDrawer from "./ProjectLocationFormDrawer";
import ProjectLocationMediaDrawer from "./ProjectLocationMediaDrawer";

export default function AdminProjectLocationsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data: locationsData, isLoading } = useProjectLocationsQuery({
    Language: "en",
    PageNumber: pageNumber,
    PageSize: pageSize,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [locationToEdit, setLocationToEdit] = useState<ProjectLocationItem | null>(null);

  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [locationForMedia, setLocationForMedia] = useState<ProjectLocationItem | null>(null);

  const locations = locationsData?.items ?? [];
  const totalPages = locationsData?.totalPages ?? 1;
  const hasPreviousPage = locationsData?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = locationsData?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setLocationToEdit(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(loc: ProjectLocationItem) {
    setLocationToEdit(loc);
    setIsFormOpen(true);
  }

  function handleOpenMedia(loc: ProjectLocationItem) {
    setLocationForMedia(loc);
    setIsMediaOpen(true);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#145C4B]">
              DEVELOPMENT &amp; UNIT LOCATIONS
            </p>
            <h1 className="mt-1 text-[28px] font-semibold text-[#202326]">
              Project Locations
            </h1>
            <p className="mt-1 text-[13px] text-[#65706B]">
              Destinations for compounds, primary developments, and resale properties across the Red Sea.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F473A] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#145C4B]"
          >
            <FiPlus className="h-4 w-4" />
            <span>Add Project Location</span>
          </button>
        </div>

        {/* Locations Table */}
        <ProjectLocationsTable
          locations={locations}
          isLoading={isLoading}
          pageNumber={pageNumber}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={(p) => setPageNumber(p)}
          onEdit={handleOpenEdit}
          onManageMedia={handleOpenMedia}
        />

        {/* Drawers */}
        <ProjectLocationFormDrawer
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          locationToEdit={locationToEdit}
        />

        <ProjectLocationMediaDrawer
          isOpen={isMediaOpen}
          onClose={() => setIsMediaOpen(false)}
          location={locationForMedia}
        />
      </div>
    </AdminShell>
  );
}

