"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { useFacilitiesQuery } from "@/features/facilities/useFacilitiesQueries";
import { FacilityItem } from "@/models/facility";
import ProjectFacilitiesTable from "./ProjectFacilitiesTable";
import ProjectFacilityFormDrawer from "./ProjectFacilityFormDrawer";

export default function AdminProjectFacilitiesPage() {
  const { data: facilities = [], isLoading } = useFacilitiesQuery("en");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(
    null
  );

  function handleOpenCreate() {
    setSelectedFacility(null);
    setIsDrawerOpen(true);
  }

  function handleOpenEdit(item: FacilityItem) {
    setSelectedFacility(item);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
    setSelectedFacility(null);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              DEVELOPMENTS AMENITIES
            </p>
            <h1
              className="mt-1 text-[28px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Project Facilities
            </h1>
            <p
              className="mt-1 text-[13px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Manage multilingual project facilities, resort amenities, and services (Swimming Pools, Private Beaches, Spas, Security) across Hurghada developments.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiPlus className="h-4 w-4" />
            <span>Add Project Facility</span>
          </button>
        </div>

        {/* Full-width Table */}
        <ProjectFacilitiesTable
          facilities={facilities}
          isLoading={isLoading}
          onEdit={handleOpenEdit}
        />

        {/* Right-Side Slide Drawer */}
        <ProjectFacilityFormDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          facilityToEdit={selectedFacility}
        />
      </div>
    </AdminShell>
  );
}

