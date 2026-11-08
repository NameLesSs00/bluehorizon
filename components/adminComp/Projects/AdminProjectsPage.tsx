"use client";

import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { useProjectsQuery } from "@/features/projects/useProjectsQueries";
import { useProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { ProjectItem } from "@/models/project";
import ProjectsTable from "./ProjectsTable";
import ProjectFormDrawer from "./ProjectFormDrawer";
import ProjectImagesDrawer from "./ProjectImagesDrawer";

export default function AdminProjectsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [selectedLocationId, setSelectedLocationId] = useState<number | undefined>(undefined);
  const [isFeatureFilter, setIsFeatureFilter] = useState<boolean | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: locationsData } = useProjectLocationsQuery({
    Language: "en",
    PageSize: 100,
  });

  const { data: projectsData, isLoading } = useProjectsQuery({
    Language: "en",
    Currency: "USD",
    PageNumber: pageNumber,
    PageSize: pageSize,
    LocationId: selectedLocationId,
    IsFeature: isFeatureFilter,
    Search: searchTerm.trim() || undefined,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectItem | null>(null);

  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [projectForImages, setProjectForImages] = useState<ProjectItem | null>(null);

  const projects = projectsData?.items ?? [];
  const totalPages = projectsData?.totalPages ?? 1;
  const hasPreviousPage = projectsData?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = projectsData?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setProjectToEdit(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(proj: ProjectItem) {
    setProjectToEdit(proj);
    setIsFormOpen(true);
  }

  function handleOpenImages(proj: ProjectItem) {
    setProjectForImages(proj);
    setIsImagesOpen(true);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#145C4B]">
              DEVELOPMENT MANAGEMENT
            </p>
            <h1 className="mt-1 text-[28px] font-semibold text-[#202326]">
              Projects
            </h1>
            <p className="mt-1 text-[13px] text-[#65706B]">
              Manage residential complexes, pricing across all currencies, types, and facilities.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F473A] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#145C4B]"
          >
            <FiPlus className="h-4 w-4" />
            <span>Add New Project</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E6EAE7] bg-white p-4 shadow-xs">
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
              placeholder="Search projects..."
              className="w-full rounded-xl border border-[#DCE2DE] bg-white py-2 pr-3 pl-9 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
            />
          </div>

          {/* Location Filter */}
          <select
            value={selectedLocationId ?? ""}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value, 10) : undefined;
              setSelectedLocationId(val);
              setPageNumber(1);
            }}
            className="rounded-xl border border-[#DCE2DE] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
          >
            <option value="">All Locations</option>
            {locationsData?.items.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>

          {/* Featured Filter */}
          <button
            type="button"
            onClick={() => {
              setIsFeatureFilter((prev) => (prev === true ? undefined : true));
              setPageNumber(1);
            }}
            className={`rounded-xl border px-3.5 py-2 text-[12px] font-medium transition-colors ${
              isFeatureFilter === true
                ? "border-[#145C4B] bg-[#145C4B] text-white"
                : "border-[#DCE2DE] bg-white text-[#202326] hover:bg-[#F3F5F3]"
            }`}
          >
            Featured Only
          </button>
        </div>

        {/* Projects Table */}
        <ProjectsTable
          projects={projects}
          isLoading={isLoading}
          selectedCurrency="USD"
          pageNumber={pageNumber}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={(p) => setPageNumber(p)}
          onEdit={handleOpenEdit}
          onManageImages={handleOpenImages}
        />

        {/* Drawers */}
        <ProjectFormDrawer
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          projectToEdit={projectToEdit}
        />

        <ProjectImagesDrawer
          isOpen={isImagesOpen}
          onClose={() => setIsImagesOpen(false)}
          project={projectForImages}
        />
      </div>
    </AdminShell>
  );
}

