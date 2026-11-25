"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PiMapPinLineLight, PiMapTrifoldLight } from "react-icons/pi";
import { usePublicProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  cardGridItemVariants,
  headerContainerVariants,
  headerItemVariants,
} from "@/shared/utils/motionPresets";
import PopularAreaCard from "./PopularAreaCard";
import HomeEmptyState from "./HomeEmptyState";
import HomeSectionBgIcon from "./HomeSectionBgIcon";

export default function PopularAreasSection() {
  const { t, locale, direction } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.14 });

  const { data: locationsData, isLoading } = usePublicProjectLocationsQuery({
    Language: locale,
    PageNumber: 1,
    PageSize: 4,
  });

  const areas = locationsData?.items?.slice(0, 4) || [];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white pt-8 sm:pt-10 lg:pt-28 pb-8 sm:pb-10 lg:pb-12"
    >
      <HomeSectionBgIcon leftIcon={PiMapPinLineLight} rightIcon={PiMapTrifoldLight} />

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <motion.header
          variants={headerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              variants={headerItemVariants}
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#B8963E]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("home.popularAreas.eyebrow", "FIND YOUR NEIGHBORHOOD")}
            </motion.p>
            <motion.h2
              variants={headerItemVariants}
              className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("home.popularAreas.heading", "Explore Popular Areas")}
            </motion.h2>
            <motion.p
              variants={headerItemVariants}
              className="mt-3 text-[15px] font-normal leading-[1.6] tracking-normal text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t(
                "home.popularAreas.subtitle",
                "Discover top Places and find your ideal Area."
              )}
            </motion.p>
          </div>

          <motion.div variants={headerItemVariants} className="self-start md:self-end shrink-0">
            <Link
              href={`/${locale}/areas`}
              className="group inline-flex items-center gap-2 text-[14px] font-semibold leading-none text-[#2B5FA6] transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>{t("home.popularAreas.discoverAll", "Discover all areas")}</span>
              <Image
                src="/HomePage/FeaturedProjects/link.svg"
                alt=""
                width={9}
                height={9}
                className={`h-[9px] w-[9px] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  direction === "rtl"
                    ? "scale-x-[-1] group-hover:-translate-x-0.5"
                    : "group-hover:translate-x-0.5"
                }`}
              />
            </Link>
          </motion.div>
        </motion.header>

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
          <HomeEmptyState
            illustrationSrc="/HomePage/chalet.svg"
            message={t(
              "home.popularAreas.noAreasFound",
              "No popular areas available at the moment."
            )}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area, idx) => (
              <motion.div
                key={area.id}
                custom={idx}
                variants={cardGridItemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <PopularAreaCard area={area} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
