"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StandaloneUnitItem } from "@/models/standaloneUnit";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";
import { useTranslation } from "@/features/i18n/useTranslation";

interface StandaloneFacilitiesSectionProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneFacilitiesSection({
  unit,
}: StandaloneFacilitiesSectionProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const services = unit.services || [];
  const count = services.length;

  // If no real facilities/services exist from backend, hide the section entirely
  if (count === 0) {
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("standaloneDetail.facilities.title", "Facilities & Amenities")}
          </h2>
          <p
            className="mt-1 text-xs sm:text-sm text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t(
              "standaloneDetail.facilities.subtitle",
              "Private unit inclusions and compound lifestyle privileges"
            )}
          </p>
        </div>

        <span
          className="rounded-full bg-[#E5ECF6] px-3.5 py-1 text-xs font-semibold text-[#2B5FA6]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {count} {t("standaloneDetail.facilities.included", "Included")}
        </span>
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.35,
              delay: idx * 0.05,
              ease: "easeOut",
            }}
            className="flex flex-col items-center justify-center rounded-[16px] border border-[#D9E2EE] bg-[#F0F3FA] p-4 text-center transition-colors hover:bg-white hover:border-[#2B5FA6]/40"
          >
            {/* Dynamic Facility Icon from Service */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1B3A6B] shadow-xs">
              <DynamicIcon name={service.icon} className="h-5 w-5" />
            </div>

            <span
              className="mt-2.5 text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {service.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
