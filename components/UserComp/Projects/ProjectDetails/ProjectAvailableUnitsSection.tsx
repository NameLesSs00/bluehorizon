"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import { FiSliders } from "react-icons/fi";
import ProjectUnitsFilterSidebar, {
  UnitsFilterState,
} from "./ProjectUnitsFilterSidebar";
import ProjectUnitsFilterDrawer from "./ProjectUnitsFilterDrawer";
import ProjectUnitCard, { UnitItem } from "./ProjectUnitCard";
import { usePublicPrimaryUnitsQuery } from "@/features/primaryUnits/usePrimaryUnitsQueries";
import { getResales } from "@/clientApi/resalesApi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import {
  fadeInUpVariants,
  containerStaggerVariants,
  cardItemVariants,
} from "@/shared/utils/animations";
import { mapPrimaryUnits, mapResaleUnits, filterProjectUnits } from "./projectUnitsMapper";

interface ProjectAvailableUnitsSectionProps {
  projectId?: number;
  locationOrProjectName?: string;
  units?: UnitItem[];
}

const INITIAL_FILTERS: UnitsFilterState = {
  searchTerm: "",
  category: "",
  unitType: "All",
  bedrooms: "",
  minPrice: "",
  maxPrice: "",
  serviceIds: [],
};

export default function ProjectAvailableUnitsSection({
  projectId,
  locationOrProjectName,
  units: propUnits,
}: ProjectAvailableUnitsSectionProps) {
  const { t, locale } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const [filterState, setFilterState] =
    useState<UnitsFilterState>(INITIAL_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const firstServiceId = filterState.serviceIds[0];

  const { data: primaryData } = usePublicPrimaryUnitsQuery(
    projectId && projectId > 0
      ? {
          ProjectId: projectId,
          PrimaryUnitServiceId: firstServiceId,
          Language: locale,
          Currency: currentCurrency || "USD",
          PageNumber: 1,
          PageSize: 50,
        }
      : undefined
  );

  const { data: resaleData } = useQuery({
    queryKey: ["resales", "project", projectId, locale, currentCurrency, firstServiceId ?? "all"],
    queryFn: () =>
      getResales({
        ProjectId: projectId,
        ResaleUnitServiceId: firstServiceId,
        Language: locale,
        Currency: currentCurrency || "USD",
        PageNumber: 1,
        PageSize: 50,
      }),
    enabled: typeof projectId === "number" && projectId > 0,
    staleTime: 1000 * 60 * 5,
  });

  const mapperTranslations = useMemo(
    () => ({
      roomSingle: t("projects.details.unitCard.roomSingle"),
      roomsCount: t("projects.details.unitCard.roomsCount"),
      bathSingle: t("projects.details.unitCard.bathSingle"),
      bathsCount: t("projects.details.unitCard.bathsCount"),
      priceOnRequest: t("projects.grid.priceOnRequest"),
    }),
    [t]
  );

  const primaryUnits = useMemo(
    () =>
      mapPrimaryUnits(
        primaryData?.items || [],
        currentCurrency || "USD",
        locationOrProjectName,
        mapperTranslations
      ),
    [primaryData?.items, currentCurrency, locationOrProjectName, mapperTranslations]
  );

  const resaleUnits = useMemo(
    () =>
      mapResaleUnits(
        resaleData?.items || [],
        currentCurrency || "USD",
        locationOrProjectName,
        mapperTranslations
      ),
    [resaleData?.items, currentCurrency, locationOrProjectName, mapperTranslations]
  );

  const availableUnits = propUnits || [...primaryUnits, ...resaleUnits];

  const headingText = locationOrProjectName
    ? t("projects.details.availableUnitsTitle").replace(
        "{name}",
        locationOrProjectName
      )
    : t("projects.details.availableUnitsDefaultTitle");

  const handleApplyFilters = (newFilters: UnitsFilterState) => {
    setFilterState(newFilters);
  };

  const handleResetFilters = () => {
    setFilterState(INITIAL_FILTERS);
  };

  const filteredUnits = useMemo(
    () => filterProjectUnits(availableUnits, filterState),
    [availableUnits, filterState]
  );

  const hasActiveFilters = Boolean(
    filterState.searchTerm.trim() ||
      (filterState.category && filterState.category !== "Any Type") ||
      filterState.unitType !== "All" ||
      (filterState.bedrooms && filterState.bedrooms !== "Any") ||
      filterState.minPrice ||
      filterState.maxPrice ||
      filterState.serviceIds.length > 0
  );

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16 mb-20">
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUpVariants}
      >
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
            {t("projects.details.availableUnitsSubtitle")}
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
            <span>{t("projects.details.unitsFilters.title", "Filters")}</span>
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2B5FA6] text-[10px] font-bold text-white">
                !
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="hidden lg:block shrink-0">
            <ProjectUnitsFilterSidebar
              initialFilters={filterState}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
              primaryCount={primaryUnits.length}
              resaleCount={resaleUnits.length}
            />
          </div>

          <div className="w-full flex-1">
            {filteredUnits.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-[#D0D9EA] bg-white p-12 text-center">
                <h3
                  className="text-lg font-bold text-[#202326]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {t("projects.details.noUnitsTitle")}
                </h3>
                <p
                  className="mt-2 text-xs text-[#6B7570] max-w-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("projects.details.noUnitsSubtitle")}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-5 rounded-xl bg-[#2B5FA6] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1B3A6B]"
                >
                  {t("projects.details.unitsFilters.resetButton")}
                </button>
              </div>
            ) : (
              <motion.div
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                variants={containerStaggerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredUnits.map((unit) => (
                  <motion.div
                    key={`${unit.badge}-${unit.id}`}
                    variants={cardItemVariants}
                  >
                    <ProjectUnitCard unit={unit} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Filter Drawer */}
      <ProjectUnitsFilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        initialFilters={filterState}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        primaryCount={primaryUnits.length}
        resaleCount={resaleUnits.length}
      />
    </section>
  );
}
