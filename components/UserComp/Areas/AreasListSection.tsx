"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { usePublicProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  containerStaggerVariants,
  cardItemVariants,
} from "@/shared/utils/animations";
import AreaListCard from "./AreaListCard";

export default function AreasListSection() {
  const { t, locale } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const { data, isLoading } = usePublicProjectLocationsQuery({
    Language: locale,
    PageNumber: 1,
    PageSize: 50,
  });

  const areas = data?.items || [];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex h-72 w-full flex-col items-center justify-center rounded-[22px] border border-[#DCE4DF] bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2B5FA6] border-t-transparent" />
            <p
              className="mt-3 text-[13px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("areas.list.loading")}
            </p>
          </div>
        ) : areas.length === 0 ? (
          <div className="flex h-48 w-full items-center justify-center rounded-[22px] border border-[#DCE4DF] bg-white text-[14px] text-[#65706B]">
            {t("areas.list.noAreas")}
          </div>
        ) : (
          <motion.div
            className="space-y-6 sm:space-y-8"
            variants={shouldReduceMotion ? undefined : containerStaggerVariants}
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
          >
            {areas.map((area) => (
              <motion.div
                key={area.id}
                variants={shouldReduceMotion ? undefined : cardItemVariants}
              >
                <AreaListCard area={area} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
