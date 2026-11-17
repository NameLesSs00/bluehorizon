"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { usePublicProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import PopularAreaCard from "./PopularAreaCard";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function PopularAreasSection() {
  const { t, locale, direction } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { data: locationsData, isLoading } = usePublicProjectLocationsQuery({
    Language: locale,
    PageNumber: 1,
    PageSize: 4,
  });

  const areas = locationsData?.items?.slice(0, 4) || [];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white pt-8 sm:pt-10 lg:pt-28 pb-8 sm:pb-10 lg:pb-12"
    >
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Decorative doodle: Neighborhood Map Pin in open header space */}
        <div className="pointer-events-none select-none absolute top-1 end-4 sm:end-12 z-0 opacity-70 sm:opacity-80 -rotate-6">
          <Image
            src="/doodles/map-pin-home.svg"
            alt=""
            width={96}
            height={96}
            className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
            aria-hidden="true"
          />
        </div>

        {/* Decorative doodle: Coastal Promenade in lower open margin */}
        <div className="pointer-events-none select-none absolute -bottom-5 start-4 sm:start-16 z-0 opacity-70 sm:opacity-80 rotate-6">
          <Image
            src="/doodles/palm-promenade.svg"
            alt=""
            width={104}
            height={104}
            className="h-16 w-16 sm:h-22 sm:w-22 object-contain"
            aria-hidden="true"
          />
        </div>

        {/* Section Content: Headings, Cards & Interactive Elements at z-10 */}
        <div className="relative z-10">
          <header className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#2B5FA6]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("home.popularAreas.eyebrow", "FIND YOUR NEIGHBORHOOD")}
              </p>
              <h2
                className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("home.popularAreas.heading", "Explore Popular Areas")}
              </h2>
              <p
                className="mt-3 text-[15px] font-normal leading-[1.6] tracking-normal text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t(
                  "home.popularAreas.subtitle",
                  "Discover top Places and find your ideal Area."
                )}
              </p>
            </div>

            <Link
              href={`/${locale}/areas`}
              className="inline-flex items-center gap-2 self-start text-[14px] font-semibold leading-none text-[#2B5FA6] transition-opacity hover:opacity-80 md:self-end"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>{t("home.popularAreas.discoverAll", "Discover all areas")}</span>
              <Image
                src="/HomePage/FeaturedProjects/link.svg"
                alt=""
                width={9}
                height={9}
                className={`h-[9px] w-[9px] shrink-0 ${
                  direction === "rtl" ? "scale-x-[-1]" : ""
                }`}
              />
            </Link>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-[280px] w-full animate-pulse rounded-[24px] bg-[#E5ECF6]"
                />
              ))}
            </div>
          ) : areas.length === 0 ? (
            <div className="flex h-44 w-full flex-col items-center justify-center rounded-2xl border border-[#E2E8F3] bg-[#F9F7F4] p-8 text-center">
              <p
                className="text-[15px] font-semibold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t(
                  "home.popularAreas.noAreasFound",
                  "No popular areas available at the moment."
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((area, idx) => (
                <motion.div
                  key={area.id}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <PopularAreaCard area={area} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
