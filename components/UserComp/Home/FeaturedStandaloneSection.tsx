"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { usePublicStandaloneUnitsQuery } from "@/features/standaloneUnits/useStandaloneUnitsQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import StandaloneUnitCard from "@/components/UserComp/Standalone/StandaloneUnitCard";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function FeaturedStandaloneSection() {
  const { t, locale, direction } = useTranslation();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { data, isLoading } = usePublicStandaloneUnitsQuery({
    Language: locale,
    Currency: currentCurrency,
    PageNumber: 1,
    PageSize: 4,
  });

  const rawUnits = data?.items || [];
  const displayUnits = rawUnits.slice(0, 4);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white py-8 sm:py-10 lg:py-12"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("home.featuredStandalone.eyebrow", "A PLACE OF YOUR OWN")}
            </p>
            <h2
              className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("home.featuredStandalone.heading", "Featured Standalone Units")}
            </h2>
            <p
              className="mt-3 text-[15px] font-normal leading-[1.6] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t(
                "home.featuredStandalone.subtitle",
                "Independent homes outside gated communities, in established neighborhoods you will love."
              )}
            </p>
          </div>

          <Link
            href={`/${locale}/standalone`}
            className="inline-flex items-center gap-2 self-start text-[14px] font-semibold text-[#2B5FA6] transition-opacity hover:opacity-80 md:self-end"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>
              {t(
                "home.featuredStandalone.viewAll",
                "View all standalone units"
              )}
            </span>
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
          <div className="flex h-44 w-full flex-col items-center justify-center rounded-2xl border border-[#E2E8F3] bg-[#F9F7F4] p-8 text-center">
            <p
              className="text-[15px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t(
                "home.featuredStandalone.noUnitsFound",
                "No standalone units available at this time."
              )}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayUnits.map((unit, idx) => (
              <motion.div
                key={unit.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <StandaloneUnitCard unit={unit} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
