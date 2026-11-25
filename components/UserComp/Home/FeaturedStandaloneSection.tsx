"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PiHouseLineLight, PiKeyLight } from "react-icons/pi";
import { usePublicStandaloneUnitsQuery } from "@/features/standaloneUnits/useStandaloneUnitsQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import {
  cardGridItemVariants,
  headerContainerVariants,
  headerItemVariants,
} from "@/shared/utils/motionPresets";
import StandaloneUnitCard from "@/components/UserComp/Standalone/StandaloneUnitCard";
import HomeEmptyState from "./HomeEmptyState";
import HomeSectionBgIcon from "./HomeSectionBgIcon";

export default function FeaturedStandaloneSection() {
  const { t, locale, direction } = useTranslation();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.14 });

  const { data, isLoading } = usePublicStandaloneUnitsQuery({
    Language: locale,
    Currency: currentCurrency,
    PageNumber: 1,
    PageSize: 4,
  });

  const rawUnits = data?.items || [];
  const displayUnits = rawUnits.slice(0, 4);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-8 sm:py-10 lg:py-12"
    >
      <HomeSectionBgIcon leftIcon={PiHouseLineLight} rightIcon={PiKeyLight} />

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
              {t("home.featuredStandalone.eyebrow", "A PLACE OF YOUR OWN")}
            </motion.p>
            <motion.h2
              variants={headerItemVariants}
              className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("home.featuredStandalone.heading", "Featured Second Hand Units")}
            </motion.h2>
            <motion.p
              variants={headerItemVariants}
              className="mt-3 text-[15px] font-normal leading-[1.6] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t(
                "home.featuredStandalone.subtitle",
                "Second hand homes outside gated communities, in established neighborhoods you will love."
              )}
            </motion.p>
          </div>

          <motion.div variants={headerItemVariants} className="self-start md:self-end shrink-0">
            <Link
              href={`/${locale}/second-hand`}
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#2B5FA6] transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>
                {t(
                  "home.featuredStandalone.viewAll",
                  "View all second hand units"
                )}
              </span>
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

        {/* 4-Column Card Grid or Empty State */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[420px] w-full animate-pulse rounded-[20px] bg-[#E5ECF6]"
              />
            ))}
          </div>
        ) : displayUnits.length === 0 ? (
          <HomeEmptyState
            illustrationSrc="/HomePage/chalet.svg"
            message={t(
              "home.featuredStandalone.noUnitsFound",
              "No second hand units available at this time."
            )}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayUnits.map((unit, idx) => (
              <motion.div
                key={unit.id}
                custom={idx}
                variants={cardGridItemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <StandaloneUnitCard unit={unit} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
