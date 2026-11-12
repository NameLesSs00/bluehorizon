"use client";

import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { useProjectTypesQuery } from "@/features/projectTypes/useProjectTypesQueries";
import { ProjectTypeItem } from "@/models/projectType";
import ProjectTypesTable from "./ProjectTypesTable";
import ProjectTypeFormDrawer from "./ProjectTypeFormDrawer";

export default function AdminProjectTypesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  const { data, isLoading } = useProjectTypesQuery({
    Language: "en",
    SearchTerm: searchTerm.trim() ? searchTerm.trim() : undefined,
    PageNumber: pageNumber,
    PageSize: pageSize,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] =
    useState<ProjectTypeItem | null>(null);

  const projectTypes = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const hasPreviousPage = data?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = data?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setSelectedProjectType(null);
    setIsDrawerOpen(true);
  }

  function handleOpenEdit(item: ProjectTypeItem) {
    setSelectedProjectType(item);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
    setSelectedProjectType(null);
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
              PORTFOLIO CONFIGURATION
            </p>
            <h1
              className="mt-1 text-[28px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Project Types
            </h1>
            <p
              className="mt-1 text-[13px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Configure real estate project categories (Villas, Chalets, Apartments, Penthouses) with multilingual titles and icons.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F473A] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiPlus className="h-4 w-4" />
            <span>Add Project Type</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E6EAE7] bg-white p-4 shadow-xs">
          <div className="relative w-full max-w-md">
            <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px] text-[#65706B]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPageNumber(1);
              }}
              placeholder="Search project types by name..."
              className="w-full rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] py-2 pl-10 pr-4 text-[13px] text-[#202326] placeholder-[#65706B] transition focus:border-[#0F473A] focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Full-width Table */}
        <ProjectTypesTable
          projectTypes={projectTypes}
          isLoading={isLoading}
          pageNumber={pageNumber}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={setPageNumber}
          onEdit={handleOpenEdit}
        />

        {/* Right-Side Slide Drawer */}
        <ProjectTypeFormDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          projectTypeToEdit={selectedProjectType}
        />
      </div>
    </AdminShell>
  );
}

