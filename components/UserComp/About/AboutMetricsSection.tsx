"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  containerStaggerVariants,
  cardItemVariants,
} from "@/shared/utils/animations";

interface MetricItem {
  icon: string;
  value: string;
  labelKey: string;
}

const METRICS: MetricItem[] = [
  {
    icon: "/aboutus/ic.svg",
    value: "15+",
    labelKey: "about.metrics.yearsExperience",
  },
  {
    icon: "/aboutus/ic (1).svg",
    value: "$250M+",
    labelKey: "about.metrics.propertyVolume",
  },
  {
    icon: "/aboutus/ic (2).svg",
    value: "1,200+",
    labelKey: "about.metrics.happyHomeowners",
  },
  {
    icon: "/aboutus/ic (3).svg",
    value: "99%",
    labelKey: "about.metrics.clientSatisfaction",
  },
];

export default function AboutMetricsSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerStaggerVariants}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6"
      >
        {METRICS.map((metric) => (
          <motion.div
            key={metric.labelKey}
            variants={cardItemVariants}
            className="flex flex-col items-center justify-center rounded-[22px] border border-[#D9E2EE] bg-white px-6 py-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#2B5FA6]/40 hover:shadow-sm"
          >
            <div className="relative h-11 w-11 shrink-0">
              <Image
                src={metric.icon}
                alt={t(metric.labelKey)}
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </div>

            <div
              className="mt-4 text-[32px] sm:text-[36px] font-bold leading-none tracking-tight text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {metric.value}
            </div>

            <p
              className="mt-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t(metric.labelKey)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
