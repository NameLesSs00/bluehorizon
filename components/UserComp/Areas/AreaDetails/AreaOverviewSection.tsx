"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

interface AreaOverviewSectionProps {
  areaName?: string;
  description?: string | null;
  activeUnitsCount?: number;
  activeProjectsCount?: number;
}

export default function AreaOverviewSection({
  areaName,
  description,
  activeUnitsCount,
  activeProjectsCount,
}: AreaOverviewSectionProps) {
  const { t, direction } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const name = areaName || "this area";
  const displayHeading = areaName
    ? t("areas.details.overviewTitle").replace("{name}", areaName)
    : t("areas.details.defaultOverviewTitle");

  const defaultDescription = t("areas.details.defaultDescription").replace(
    "{name}",
    name
  );
  const textToShow =
    description && description.trim().length > 0
      ? description
      : defaultDescription;

  const totalCount =
    typeof activeUnitsCount === "number"
      ? activeUnitsCount
      : typeof activeProjectsCount === "number"
      ? activeProjectsCount
      : 0;

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
      <motion.div
        className={`flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between ${
          direction === "rtl" ? "rtl:lg:flex-row-reverse" : ""
        }`}
        variants={shouldReduceMotion ? undefined : fadeInUpVariants}
        initial={shouldReduceMotion ? undefined : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Left Column: Title, Narrative Text and Highlight Chips */}
        <div className="max-w-3xl">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("areas.details.discoverNeighborhood")}
          </p>

          <h1
            className="mt-2 text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {displayHeading}
          </h1>

          <p
            className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {textToShow}
          </p>
        </div>

        {/* Right Column: Key Stats Card */}
        <div className="self-start lg:self-auto shrink-0 w-full sm:w-auto">
          <div className="flex sm:flex-col items-center justify-between sm:justify-center rounded-[24px] bg-white px-8 py-5 sm:px-10 sm:py-7 text-center border border-[#D9E2EE] shadow-xs">
            <div>
              <span
                className="text-3xl sm:text-[40px] font-bold leading-none text-[#2B5FA6]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {totalCount > 0 ? `${totalCount}+` : t("areas.details.verifiedBadge")}
              </span>
              <span
                className="block mt-2 text-xs sm:text-[13px] font-semibold text-[#202326]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("areas.details.availableUnits")}
              </span>
            </div>
            <div className="sm:mt-4 sm:pt-4 sm:border-t sm:border-[#D9E2EE]/80">
              <span
                className="text-xs text-[#8A9590]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("areas.details.primaryAndResale")}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
