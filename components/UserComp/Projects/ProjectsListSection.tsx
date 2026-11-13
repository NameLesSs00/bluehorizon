"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { usePublicProjectsQuery } from "@/features/projects/useProjectsQueries";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import { useTranslation } from "@/features/i18n/useTranslation";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";
import { ProjectItem } from "@/models/project";
import {
  containerStaggerVariants,
  cardItemVariants,
} from "@/shared/utils/animations";
import ProjectsFilterSidebar, {
  ProjectFilterValues,
} from "./ProjectsFilterSidebar";
import ProjectGridCard, { ProjectDisplayItem } from "./ProjectGridCard";

const INITIAL_FILTERS: ProjectFilterValues = {
  searchTerm: "",
  locationId: "",
  projectTypeId: "",
  paymentType: "",
  deliveryFrom: "",
  deliveryTo: "",
  minPrice: "",
  maxPrice: "",
};

function formatApiProject(
  item: ProjectItem,
  currentCurrency: string,
  priceOnRequestLabel: string
): ProjectDisplayItem {
  const hasImage = Boolean(item.imageUrls && item.imageUrls.length > 0);
  const coverImage = hasImage
    ? getFullProjectImageUrl(item.imageUrls[0])
    : "/default-fallback.png";

  const targetPrice = item.prices?.find(
    (p) => p.currency.toUpperCase() === currentCurrency.toUpperCase()
  );
  const egpPrice = item.prices?.find(
    (p) => p.currency.toUpperCase() === "EGP"
  );
  const fallbackPrice = item.prices?.[0];
  const activePrice = targetPrice || egpPrice || fallbackPrice;

  let priceFormatted = priceOnRequestLabel;
  if (activePrice?.minimumPrice) {
    const symbol =
      activePrice.currency.toUpperCase() === "EGP"
        ? "EGP "
        : activePrice.currency.toUpperCase() === "USD"
          ? "$ "
          : `${activePrice.currency} `;
    priceFormatted = `${symbol}${Number(activePrice.minimumPrice).toLocaleString()}`;
  } else if (activePrice?.maximumPrice) {
    const symbol =
      activePrice.currency.toUpperCase() === "EGP"
        ? "EGP "
        : activePrice.currency.toUpperCase() === "USD"
          ? "$ "
          : `${activePrice.currency} `;
    priceFormatted = `${symbol}${Number(activePrice.maximumPrice).toLocaleString()}`;
  }

  return {
    id: item.id,
    title: item.name,
    description: item.description || "",
    priceFormatted,
    imageSrc: coverImage,
    isFallback: !hasImage,
  };
}

export default function ProjectsListSection() {
  const searchParams = useSearchParams();
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const shouldReduceMotion = useReducedMotion();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);

  const urlLocationId = searchParams.get("locationId") || "";
  const urlProjectTypeId =
    searchParams.get("projectTypeId") || searchParams.get("typeId") || "";
  const urlMinPrice = searchParams.get("minPrice") || "";
  const urlMaxPrice = searchParams.get("maxPrice") || "";
  const urlSearchTerm = searchParams.get("searchTerm") || "";

  const initialValues: ProjectFilterValues = useMemo(
    () => ({
      searchTerm: urlSearchTerm,
      locationId: urlLocationId,
      projectTypeId: urlProjectTypeId,
      paymentType: "",
      deliveryFrom: "",
      deliveryTo: "",
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
    }),
    [urlLocationId, urlProjectTypeId, urlMinPrice, urlMaxPrice, urlSearchTerm]
  );

  const [filters, setFilters] = useState<ProjectFilterValues>(initialValues);
  const [page, setPage] = useState<number>(1);

  const { data: projectsData, isLoading } = usePublicProjectsQuery({
    Language: locale,
    Currency: currentCurrency || "EGP",
    PageNumber: page,
    PageSize: 6,
    SearchTerm: filters.searchTerm.trim() || undefined,
    Search: filters.searchTerm.trim() || undefined,
    LocationId: filters.locationId ? Number(filters.locationId) : undefined,
    ProjectTypeId: filters.projectTypeId ? Number(filters.projectTypeId) : undefined,
    DeliveryDateFrom: filters.deliveryFrom || undefined,
    DeliveryDateTo: filters.deliveryTo || undefined,
    MinimumPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    MaximumPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
  });

  const apiProjects = projectsData?.items || [];
  const displayProjects = apiProjects.map((item) =>
    formatApiProject(
      item,
      currentCurrency || "EGP",
      t("projects.grid.priceOnRequest", "Price on request")
    )
  );

  const filteredProjects = displayProjects.filter((project) => {
    if (filters.searchTerm.trim()) {
      const term = filters.searchTerm.trim().toLowerCase();
      const matchesTitle = project.title.toLowerCase().includes(term);
      const matchesDesc = project.description.toLowerCase().includes(term);
      if (!matchesTitle && !matchesDesc) return false;
    }
    return true;
  });

  const totalPages = projectsData?.totalPages || 1;

  function handleApplyFilters(newFilters: ProjectFilterValues) {
    setFilters(newFilters);
    setPage(1);
  }

  function handleResetFilters() {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  }

  return (
    <section className="bg-[#F0F3FA] py-10 sm:py-14">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column: Filter Sidebar */}
          <ProjectsFilterSidebar
            initialFilters={filters}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />

          {/* Right Column: Projects Cards Grid & Pagination */}
          <div className="flex-1 w-full">
            {isLoading ? (
              <div className="flex h-72 w-full flex-col items-center justify-center rounded-[20px] border border-[#D9E2EE] bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2B5FA6] border-t-transparent" />
                <p
                  className="mt-3 text-[13px] text-[#6B7570]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("projects.grid.loading", "Loading projects...")}
                </p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-[20px] border border-[#D9E2EE] bg-white p-8 text-center">
                <p
                  className="text-[16px] font-bold text-[#202326]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {t("projects.grid.noProjectsTitle", "No projects found")}
                </p>
                <p
                  className="mt-1 text-[13.5px] text-[#6B7570]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t(
                    "projects.grid.noProjectsSubtitle",
                    "Try adjusting your search criteria or resetting filters."
                  )}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 rounded-full bg-[#2B5FA6] px-5 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#1B3A6B]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("projects.grid.resetFilters", "Reset Filters")}
                </button>
              </div>
            ) : (
              <motion.div
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                variants={containerStaggerVariants}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={cardItemVariants}>
                    <ProjectGridCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Dynamic Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page <= 1}
                  aria-label={t("projects.grid.prevPage", "Previous Page")}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#D9E2EE] bg-white text-[13px] text-[#6B7570] transition-colors hover:border-[#2B5FA6] hover:text-[#2B5FA6] disabled:opacity-40"
                >
                  {isRtl ? ">" : "<"}
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setPage(pageNum)}
                      className={`flex h-9 w-9 items-center justify-center rounded-[10px] text-[13px] font-semibold transition-all ${
                        page === pageNum
                          ? "bg-[#2B5FA6] text-white shadow-xs"
                          : "border border-transparent bg-white text-[#6B7570] hover:border-[#D9E2EE] hover:text-[#202326]"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {pageNum}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={page >= totalPages}
                  aria-label={t("projects.grid.nextPage", "Next Page")}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#D9E2EE] bg-white text-[13px] text-[#6B7570] transition-colors hover:border-[#2B5FA6] hover:text-[#2B5FA6] disabled:opacity-40"
                >
                  {isRtl ? "<" : ">"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
