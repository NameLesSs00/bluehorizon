"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function AboutCtaSection() {
  const { t, locale } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUpVariants}
        className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#1B3A6B] px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16"
      >
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Column */}
          <div className="max-w-2xl">
            <span
              className="inline-block rounded-full bg-[#162E56] border border-white/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E5ECF6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("about.cta.pill")}
            </span>

            <h2
              className="mt-4 text-[28px] sm:text-[36px] lg:text-[40px] font-bold leading-[1.18] tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("about.cta.heading")}
            </h2>

            <p
              className="mt-3.5 text-[14px] sm:text-[15px] font-normal leading-[1.65] text-[#E5ECF6]/85"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("about.cta.description")}
            </p>
          </div>

          {/* Right Column Action Buttons */}
          <div className="flex shrink-0 flex-col gap-3.5 sm:flex-row lg:flex-col w-full sm:w-auto">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[14px] font-semibold text-[#2B5FA6] transition-all duration-200 hover:bg-[#F0F3FA] hover:shadow-xs active:scale-[0.98] text-center w-full sm:w-60"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("about.cta.scheduleCall")}
            </Link>

            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center justify-center rounded-full bg-[#2B5FA6] border border-white/25 px-8 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#162E56] hover:shadow-xs active:scale-[0.98] text-center w-full sm:w-60"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("about.cta.exploreProjects")}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
