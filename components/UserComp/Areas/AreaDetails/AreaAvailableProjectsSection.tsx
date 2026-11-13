"use client";

import { useState, useEffect } from "react";
import AreaProjectsFilterSidebar, {
  AreaProjectsFilterState,
} from "./AreaProjectsFilterSidebar";
import ProjectGridCard, {
  ProjectDisplayItem,
} from "@/components/UserComp/Projects/ProjectGridCard";
import { usePublicProjectsQuery } from "@/features/projects/useProjectsQueries";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";

interface AreaAvailableProjectsSectionProps {
  areaId: number;
  areaName?: string;
  onCountLoaded?: (count: number) => void;
}

const INITIAL_FILTERS: AreaProjectsFilterState = {
  searchTerm: "",
  projectType: "Any Type",
  paymentType: "Any Type",
  deliveryDateFrom: "",
  deliveryDateTo: "",
  minPrice: "",
  maxPrice: "",
};

export default function AreaAvailableProjectsSection({
  areaId,
  areaName,
  onCountLoaded,
}: AreaAvailableProjectsSectionProps) {
  const [filterState, setFilterState] =
    useState<AreaProjectsFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const headingText = areaName
    ? `Available Projects in ${areaName}`
    : "Available Projects";

  // Query pre-existing public projects hook for this location
  const { data: projectsData, isLoading } = usePublicProjectsQuery({
    LocationId: areaId > 0 ? areaId : undefined,
    Language: "en",
    Currency: "EGP",
    PageNumber: currentPage,
    PageSize: 6,
  });

  const apiProjects: ProjectDisplayItem[] = (projectsData?.items || []).map(
    (item) => {
      const egpPrice = item.prices?.find((p) => p.currency === "EGP");
      const minPrice = egpPrice?.minimumPrice || item.prices?.[0]?.minimumPrice;
      const currency = egpPrice ? "EGP" : item.prices?.[0]?.currency || "EGP";
      const priceText =
        typeof minPrice === "number" && minPrice > 0
          ? `${currency} ${minPrice.toLocaleString()}`
          : "Price on request";

      const rawImg = item.imageUrls?.[0];
      const resolvedImg = getFullProjectImageUrl(rawImg);

      return {
        id: item.id,
        title: item.name,
        description: item.description || "",
        priceFormatted: priceText,
        imageSrc: resolvedImg || "/default-fallback.png",
        isFallback: !resolvedImg,
      };
    }
  );

  const displayProjects = apiProjects;
  const totalPages = projectsData?.totalPages || 1;

  useEffect(() => {
    if (typeof projectsData?.totalCount === "number" && onCountLoaded) {
      onCountLoaded(projectsData.totalCount);
    }
  }, [projectsData?.totalCount, onCountLoaded]);

  const handleFilterChange = <K extends keyof AreaProjectsFilterState>(
    field: K,
    value: AreaProjectsFilterState[K]
  ) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilterState(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 mb-20">
      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {headingText}
        </h2>
        <p
          className="mt-1 text-sm text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Explore top-tier residential developments tailored to your lifestyle.
        </p>
      </div>

      {/* Main Two-Column Content */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left: Filter Sidebar */}
        <AreaProjectsFilterSidebar
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />

        {/* Right: Projects Grid + Pagination */}
        <div className="w-full flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-[360px] animate-pulse rounded-[20px] bg-[#F0F3FA] border border-[#D9E2EE]"
                />
              ))}
            </div>
          ) : displayProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p
                className="text-base font-medium text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                No projects found in this area.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayProjects.map((project) => (
                <ProjectGridCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Previous Page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9E2EE] bg-white text-xs font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => {
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-[#2B5FA6] text-white"
                          : "border border-[#D9E2EE] bg-white text-[#202326] hover:bg-[#F0F3FA]"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                aria-label="Next Page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9E2EE] bg-white text-xs font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
