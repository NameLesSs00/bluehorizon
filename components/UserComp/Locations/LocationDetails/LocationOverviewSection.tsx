"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

interface LocationOverviewSectionProps {
  locationName?: string;
  description?: string | null;
  activeRentalsCount?: number;
}

export default function LocationOverviewSection({
  locationName,
  description,
  activeRentalsCount,
}: LocationOverviewSectionProps) {
  const { t, direction } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const name = locationName || t("locations.details.defaultTitle");
  const displayHeading = locationName
    ? t("locations.details.overviewTitle").replace("{name}", locationName)
    : t("locations.details.defaultOverviewTitle");

  const defaultDescription = t("locations.details.defaultDescription").replace(
    "{name}",
    name
  );

  const textToShow =
    description && description.trim().length > 0
      ? description
      : defaultDescription;

  const count = typeof activeRentalsCount === "number" ? activeRentalsCount : 0;

  const highlightTags = [
    t("locations.details.highlights.tag1"),
    t("locations.details.highlights.tag2"),
    t("locations.details.highlights.tag3"),
    t("locations.details.highlights.tag4"),
  ];

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
      <motion.div
        className={`flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between ${
          direction === "rtl" ? "rtl:lg:flex-row-reverse" : ""
        }`}
        variants={shouldReduceMotion ? undefined : fadeInUpVariants}
        initial={shouldReduceMotion ? undefined : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Column: Title, Description & Highlight Tags */}
        <div className="max-w-3xl">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("locations.details.discoverLocation")}
          </p>

          <h2
            className="mt-2 text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {displayHeading}
          </h2>

          <p
            className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {textToShow}
          </p>

          {/* Highlight Pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {highlightTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-[#2B5FA6] border border-[#D9E2EE] shadow-2xs"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Key Stats Card */}
        <div className="self-start lg:self-auto shrink-0 w-full sm:w-auto">
          <div className="flex sm:flex-col items-center justify-between sm:justify-center rounded-[24px] bg-white px-8 py-5 sm:px-10 sm:py-7 text-center border border-[#D9E2EE] shadow-xs">
            <div>
              <span
                className="text-3xl sm:text-[40px] font-bold leading-none text-[#2B5FA6]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {count > 0 ? `${count}+` : t("locations.details.verifiedBadge")}
              </span>
              <span
                className="block mt-2 text-xs sm:text-[13px] font-semibold text-[#202326]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("locations.details.availableRentals")}
              </span>
            </div>
            <div className="sm:mt-4 sm:pt-4 sm:border-t sm:border-[#D9E2EE]/80">
              <span
                className="text-xs text-[#8A9590]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("locations.details.servicedAndPrivate")}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
