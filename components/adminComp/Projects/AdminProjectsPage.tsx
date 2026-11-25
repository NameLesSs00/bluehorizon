"use client";

import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { useProjectsQuery } from "@/features/projects/useProjectsQueries";
import { useProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { useFacilitiesQuery } from "@/features/facilities/useFacilitiesQueries";
import { ProjectItem, ProjectTierType } from "@/models/project";
import AdminProjectsFilters from "./AdminProjectsFilters";
import ProjectsTable from "./ProjectsTable";
import ProjectFormDrawer from "./ProjectFormDrawer";
import ProjectImagesDrawer from "./ProjectImagesDrawer";
import ProjectPaymentPlansDrawer from "./ProjectPaymentPlansDrawer";

export default function AdminProjectsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [selectedLocationId, setSelectedLocationId] = useState<number | undefined>(undefined);
  const [selectedFacilityIds, setSelectedFacilityIds] = useState<number[]>([]);
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectTierType | undefined>(undefined);
  const [isFeatureFilter, setIsFeatureFilter] = useState<boolean | undefined>(undefined);
  const [isHotOfferFilter, setIsHotOfferFilter] = useState<boolean | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: locationsData } = useProjectLocationsQuery({
    Language: "en",
    PageSize: 100,
  });
  const { data: facilitiesData } = useFacilitiesQuery("en");

  const { data: projectsData, isLoading } = useProjectsQuery({
    Language: "en",
    Currency: "USD",
    PageNumber: pageNumber,
    PageSize: pageSize,
    LocationId: selectedLocationId,
    FacilityId: selectedFacilityIds[0],
    ProjectType: selectedProjectType,
    IsFeature: isFeatureFilter,
    IsHotOffer: isHotOfferFilter,
    Search: searchTerm.trim() || undefined,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectItem | null>(null);

  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [projectForImages, setProjectForImages] = useState<ProjectItem | null>(null);

  const [isPaymentPlansOpen, setIsPaymentPlansOpen] = useState(false);
  const [projectForPaymentPlans, setProjectForPaymentPlans] = useState<ProjectItem | null>(null);

  const projects = useMemo(() => {
    const items = projectsData?.items ?? [];
    if (selectedFacilityIds.length <= 1) return items;
    return items.filter((proj) =>
      selectedFacilityIds.every((id) => proj.facilities?.some((f) => f.id === id))
    );
  }, [projectsData?.items, selectedFacilityIds]);

  const totalPages = projectsData?.totalPages ?? 1;
  const hasPreviousPage = projectsData?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = projectsData?.hasNextPage ?? pageNumber < totalPages;

  const hasActiveFilters = Boolean(
    selectedLocationId ||
      selectedFacilityIds.length > 0 ||
      selectedProjectType ||
      isFeatureFilter !== undefined ||
      isHotOfferFilter !== undefined ||
      searchTerm.trim()
  );

  function handleToggleFacility(id: number) {
    setSelectedFacilityIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setPageNumber(1);
  }

  function handleClearFilters() {
    setSelectedLocationId(undefined);
    setSelectedFacilityIds([]);
    setSelectedProjectType(undefined);
    setIsFeatureFilter(undefined);
    setIsHotOfferFilter(undefined);
    setSearchTerm("");
    setPageNumber(1);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]">
              DEVELOPMENT MANAGEMENT
            </p>
            <h1 className="mt-1 text-[28px] font-semibold text-[#202326]">
              Projects
            </h1>
            <p className="mt-1 text-[13px] text-[#65706B]">
              Manage residential complexes, pricing, project tiers, hot offers, and facilities.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setProjectToEdit(null);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2B5FA6]"
          >
            <FiPlus className="h-4 w-4" />
            <span>Add New Project</span>
          </button>
        </div>

        {/* Filter Controls */}
        <AdminProjectsFilters
          searchTerm={searchTerm}
          onSearchChange={(val) => {
            setSearchTerm(val);
            setPageNumber(1);
          }}
          selectedLocationId={selectedLocationId}
          onLocationChange={(val) => {
            setSelectedLocationId(val);
            setPageNumber(1);
          }}
          selectedFacilityIds={selectedFacilityIds}
          onToggleFacility={handleToggleFacility}
          onClearFacilities={() => {
            setSelectedFacilityIds([]);
            setPageNumber(1);
          }}
          selectedProjectType={selectedProjectType}
          onProjectTypeChange={(val) => {
            setSelectedProjectType(val);
            setPageNumber(1);
          }}
          isFeatureFilter={isFeatureFilter}
          onToggleFeature={() => {
            setIsFeatureFilter((prev) => (prev === true ? undefined : true));
            setPageNumber(1);
          }}
          isHotOfferFilter={isHotOfferFilter}
          onToggleHotOffer={() => {
            setIsHotOfferFilter((prev) => (prev === true ? undefined : true));
            setPageNumber(1);
          }}
          hasActiveFilters={hasActiveFilters}
          onClearAll={handleClearFilters}
          locations={locationsData?.items ?? []}
          facilities={facilitiesData ?? []}
        />

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
          onEdit={(proj) => {
            setProjectToEdit(proj);
            setIsFormOpen(true);
          }}
          onManageImages={(proj) => {
            setProjectForImages(proj);
            setIsImagesOpen(true);
          }}
          onManagePaymentPlans={(proj) => {
            setProjectForPaymentPlans(proj);
            setIsPaymentPlansOpen(true);
          }}
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

        <ProjectPaymentPlansDrawer
          isOpen={isPaymentPlansOpen}
          onClose={() => setIsPaymentPlansOpen(false)}
          project={projectForPaymentPlans}
        />
      </div>
    </AdminShell>
  );
}
