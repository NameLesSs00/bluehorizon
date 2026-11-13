"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getStandaloneUnits } from "@/clientApi/standaloneUnitsApi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import StandaloneUnitCard from "../StandaloneUnitCard";

interface StandaloneSimilarUnitsProps {
  currentUnitId: number;
  propertyType?: string;
  city?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function StandaloneSimilarUnits({
  currentUnitId,
  propertyType,
  city,
}: StandaloneSimilarUnitsProps) {
  const { t, locale } = useTranslation();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { data, isLoading } = useQuery({
    queryKey: [
      "standalone-units",
      "similar",
      propertyType,
      city,
      locale,
      currentCurrency,
    ],
    queryFn: () =>
      getStandaloneUnits({
        Language: locale,
        Currency: currentCurrency,
        PageNumber: 1,
        PageSize: 5,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const similarUnits = (data?.items || [])
    .filter((u) => u.id !== currentUnitId)
    .slice(0, 3);

  if (!isLoading && similarUnits.length === 0) {
    return null;
  }

  const subtitle = city
    ? t(
        "standaloneDetail.similar.subtitleCity",
        `Explore similar luxury residences in ${city}`
      ).replace("{city}", city)
    : t(
        "standaloneDetail.similar.subtitleDefault",
        "Explore similar luxury residences ready for ownership"
      );

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mt-16 sm:mt-20"
    >
      <div className="border-t border-[#D9E2EE] pt-12">
        {/* Section Header */}
        <div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("standaloneDetail.similar.title", "Similar Recommended Units")}
          </h2>
          <p
            className="mt-1 text-xs sm:text-sm text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Grid: 3 columns */}
        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-[360px] animate-pulse rounded-[20px] border border-[#D9E2EE] bg-[#F0F3FA]"
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarUnits.map((item, idx) => {
              const isLastOdd =
                idx === similarUnits.length - 1 && similarUnits.length % 2 !== 0;
              return (
                <motion.div
                  key={item.id}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className={
                    isLastOdd
                      ? "sm:col-span-2 sm:flex sm:justify-center lg:col-span-1 lg:block lg:justify-normal"
                      : ""
                  }
                >
                  <div className={isLastOdd ? "sm:w-1/2 lg:w-full" : "w-full"}>
                    <StandaloneUnitCard unit={item} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.section>
  );
}
