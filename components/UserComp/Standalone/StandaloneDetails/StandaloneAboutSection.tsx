"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StandaloneUnitItem } from "@/models/standaloneUnit";
import { useTranslation } from "@/features/i18n/useTranslation";

interface StandaloneAboutSectionProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneAboutSection({
  unit,
}: StandaloneAboutSectionProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const hasDescription = Boolean(
    unit.description && unit.description.trim().length > 0
  );

  const cityGov = [unit.city, unit.district].filter(Boolean).join(", ");
  const streetDistrict = [unit.street, unit.district]
    .filter(Boolean)
    .join(", ");
  const hasLocation = Boolean(unit.country || cityGov || streetDistrict);
  const hasView = Boolean(unit.view && unit.view.trim().length > 0);

  if (!hasDescription && !hasLocation && !hasView) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-[20px] border border-[#D9E2EE] bg-white p-6 sm:p-8 shadow-sm"
    >
      <h2
        className="text-xl sm:text-2xl font-bold text-[#202326]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {t("standaloneDetail.about.title", "About This Standalone Property")}
      </h2>

      {/* Primary View Callout Badge / Card */}
      {hasView && (
        <div className="mt-4 flex items-center gap-3 rounded-[14px] border border-[#D0D9EA] bg-[#F0F3FA] p-4 text-[#202326]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1B3A6B] shadow-xs">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div>
            <span
              className="block text-[10.5px] font-bold uppercase tracking-wider text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("standaloneDetail.about.orientationView", "Orientation & Outlook View")}
            </span>
            <p
              className="text-xs sm:text-sm font-semibold text-[#1B3A6B]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {unit.view}
            </p>
          </div>
        </div>
      )}

      {/* Description text */}
      {hasDescription && (
        <div
          className="mt-5 space-y-3 text-xs sm:text-sm leading-relaxed text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {unit.description.split("\n\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      )}

      {/* Geographic Location & Legal Registry Details Card */}
      {hasLocation && (
        <div className="mt-8 rounded-[16px] border border-[#D9E2EE] bg-[#F0F3FA] p-5 sm:p-6">
          <h3
            className="text-xs sm:text-sm font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("standaloneDetail.about.locationTitle", "Geographic Location & Legal Registry Details")}
          </h3>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Country */}
            {unit.country && (
              <div className="rounded-[12px] bg-white p-3.5 border border-[#D9E2EE]">
                <span
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7570]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("standaloneDetail.about.country", "Country")}
                </span>
                <span
                  className="mt-1 block text-xs sm:text-sm font-semibold text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {unit.country}
                </span>
              </div>
            )}

            {/* City / Governorate */}
            {cityGov && (
              <div className="rounded-[12px] bg-white p-3.5 border border-[#D9E2EE]">
                <span
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7570]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("standaloneDetail.about.cityGov", "City / Governorate")}
                </span>
                <span
                  className="mt-1 block text-xs sm:text-sm font-semibold text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {cityGov}
                </span>
              </div>
            )}

            {/* Street / District */}
            {streetDistrict && (
              <div className="rounded-[12px] bg-white p-3.5 border border-[#D9E2EE]">
                <span
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7570]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("standaloneDetail.about.streetDistrict", "Street / District")}
                </span>
                <span
                  className="mt-1 block text-xs sm:text-sm font-semibold text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {streetDistrict}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
