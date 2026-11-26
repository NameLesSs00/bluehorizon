"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiSliders } from "react-icons/fi";
import AreaProjectsFilterSidebar, {
  AreaProjectsFilterState,
} from "./AreaProjectsFilterSidebar";
import AreaProjectsFilterDrawer from "./AreaProjectsFilterDrawer";
import AreaUnitsPagination from "./AreaUnitsPagination";
import ProjectGridCard, {
  ProjectDisplayItem,
} from "@/components/UserComp/Projects/ProjectGridCard";
import { formatApiProject } from "@/components/UserComp/Projects/projectFormatters";
import { usePublicProjectsQuery } from "@/features/projects/useProjectsQueries";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  containerStaggerVariants,
  cardItemVariants,
} from "@/shared/utils/animations";

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
  const { t, locale, direction } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);

  const [filterState, setFilterState] =
    useState<AreaProjectsFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const headingText = areaName
    ? t("areas.details.availableProjectsTitle", "Available Projects in {name}").replace(
        "{name}",
        areaName
      )
    : t("areas.details.defaultAvailableProjectsTitle", "Available Projects");

  const { data: projectsData, isLoading } = usePublicProjectsQuery({
    LocationId: areaId > 0 ? areaId : undefined,
    Language: locale,
    Currency: currentCurrency || "EGP",
    PageNumber: currentPage,
    PageSize: 9,
    SearchTerm: filterState.searchTerm.trim() || undefined,
    Search: filterState.searchTerm.trim() || undefined,
    MinimumPrice: filterState.minPrice ? Number(filterState.minPrice) : undefined,
    MaximumPrice: filterState.maxPrice ? Number(filterState.maxPrice) : undefined,
    DeliveryDateFrom: filterState.deliveryDateFrom || undefined,
    DeliveryDateTo: filterState.deliveryDateTo || undefined,
  });

  const apiProjects: ProjectDisplayItem[] = (projectsData?.items || []).map(
    (item) => formatApiProject(item, currentCurrency || "EGP", t, locale)
  );

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

  const hasActiveFilters = Boolean(
    filterState.searchTerm.trim() !== "" ||
      filterState.projectType !== "Any Type" ||
      filterState.paymentType !== "Any Type" ||
      filterState.deliveryDateFrom !== "" ||
      filterState.deliveryDateTo !== "" ||
      filterState.minPrice !== "" ||
      filterState.maxPrice !== ""
  );

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
          {t("areas.details.availableUnitsSubtitle", "Explore top-tier residential developments tailored to your lifestyle.")}
        </p>
      </div>

      {/* Mobile: Filter toggle button (hidden on lg+) */}
      <div className="mb-5 flex items-center justify-end lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-[12px] border border-[#D9E2EE] bg-white px-4 py-2.5 text-xs font-semibold text-[#1B3A6B] shadow-sm transition-colors hover:border-[#2B5FA6] hover:text-[#2B5FA6]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <FiSliders className="h-4 w-4" />
          <span>{t("projects.filters.title", "Filters")}</span>
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2B5FA6] text-[10px] font-bold text-white">
              !
            </span>
          )}
        </button>
      </div>

      {/* Main Two-Column Content */}
      <div
        className={`flex flex-col lg:flex-row items-start gap-8 ${
          direction === "rtl" ? "rtl:lg:flex-row-reverse" : ""
        }`}
      >
        {/* Left: Filter Sidebar (desktop only) */}
        <div className="hidden lg:block shrink-0">
          <AreaProjectsFilterSidebar
            filterState={filterState}
            onFilterChange={handleFilterChange}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
        </div>

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
          ) : apiProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p
                className="text-base font-medium text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("areas.details.noProjectsTitle", "No available projects found")}
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={shouldReduceMotion ? undefined : containerStaggerVariants}
              initial={shouldReduceMotion ? undefined : "hidden"}
              animate={shouldReduceMotion ? undefined : "visible"}
            >
              {apiProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={shouldReduceMotion ? undefined : cardItemVariants}
                >
                  <ProjectGridCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination Controls */}
          <AreaUnitsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AreaProjectsFilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filterState={filterState}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </section>
  );
}
