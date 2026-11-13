"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectFacilityRef } from "@/models/project";
import { useTranslation } from "@/features/i18n/useTranslation";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";
import { resolveIcon } from "@/shared/utils/iconRegistry";
import { fadeInUpVariants } from "@/shared/utils/animations";

interface ProjectFacilitiesSectionProps {
  facilities?: ProjectFacilityRef[];
}

function resolveFacilityIcon(name: string): string {
  const lower = (name || "").toLowerCase();
  if (lower.includes("lagoon") || lower.includes("lake") || lower.includes("water")) {
    return "/Projectdetails/fac-ic.svg";
  }
  if (lower.includes("pool") || lower.includes("swim")) {
    return "/Projectdetails/fac-ic (1).svg";
  }
  if (lower.includes("beach") || lower.includes("sea")) {
    return "/Projectdetails/fac-ic (7).svg";
  }
  if (lower.includes("club") || lower.includes("house") || lower.includes("building")) {
    return "/Projectdetails/fac-ic (2).svg";
  }
  if (lower.includes("restaurant") || lower.includes("dining") || lower.includes("food")) {
    return "/Projectdetails/fac-ic (6).svg";
  }
  if (lower.includes("cafe") || lower.includes("coffee")) {
    return "/Projectdetails/fac-ic (3).svg";
  }
  if (lower.includes("gym") || lower.includes("fitness") || lower.includes("sport")) {
    return "/Projectdetails/fac-ic (5).svg";
  }
  if (lower.includes("spa") || lower.includes("wellness")) {
    return "/Projectdetails/fac-ic (4).svg";
  }
  return "/Projectdetails/fac-ic.svg";
}

export default function ProjectFacilitiesSection({
  facilities,
}: ProjectFacilitiesSectionProps) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const hasFacilities = Boolean(facilities && facilities.length > 0);
  const displayItems = (facilities || []).map((f) => ({
    id: f.id,
    name: f.name,
    icon: f.icon,
    fallbackIconSrc: resolveFacilityIcon(f.name),
  }));

  const countBadge =
    displayItems.length === 1
      ? t("projects.details.facilitiesCountSingle")
      : t("projects.details.facilitiesCount").replace(
          "{count}",
          String(displayItems.length)
        );

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16">
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
        className="rounded-[24px] bg-[#F0F3FA] p-6 sm:p-8 lg:p-10 border border-[#D9E2EE]/60"
      >
        {/* Header Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              className="text-xl sm:text-2xl font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("projects.details.facilitiesTitle")}
            </h2>
            <p
              className="mt-1 text-xs sm:text-sm text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("projects.details.facilitiesSubtitle")}
            </p>
          </div>

          {hasFacilities && (
            <div className="self-start sm:self-auto shrink-0">
              <span
                className="inline-flex items-center rounded-full border border-[#D0D9EA] bg-white px-4 py-1.5 text-xs font-semibold text-[#2B5FA6] shadow-xs"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {countBadge}
              </span>
            </div>
          )}
        </div>

        {/* Facility Cards Grid or Empty State */}
        {!hasFacilities ? (
          <div className="mt-8 flex h-28 w-full items-center justify-center rounded-[16px] border border-[#D9E2EE] bg-white p-6 text-center text-sm text-[#6B7570]">
            {t("projects.details.noFacilities")}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {displayItems.map((facility) => {
              const hasRegisteredIcon = Boolean(
                facility.icon && resolveIcon(facility.icon)
              );

              return (
                <div
                  key={facility.id}
                  className="flex flex-col items-center justify-center rounded-[16px] border border-[#D9E2EE] bg-white p-4 text-center transition-all duration-300 hover:border-[#2B5FA6]/50 hover:shadow-xs min-h-[110px]"
                >
                  <div className="flex h-11 w-11 items-center justify-center shrink-0">
                    {hasRegisteredIcon ? (
                      <DynamicIcon
                        name={facility.icon}
                        className="h-6 w-6 text-[#2B5FA6]"
                      />
                    ) : (
                      <Image
                        src={facility.fallbackIconSrc}
                        alt={facility.name}
                        width={44}
                        height={44}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>

                  <span
                    className="mt-2.5 text-xs sm:text-[13px] font-medium leading-snug text-[#202326]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {facility.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
}
