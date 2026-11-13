"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function AboutHeroSection() {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-2 text-[13px] text-[#6B7570]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Link
          href={`/${locale}`}
          className="transition-colors hover:text-[#2B5FA6]"
        >
          {t("about.hero.breadcrumbHome")}
        </Link>
        <span className="text-[#6B7570]/60">/</span>
        <span className="font-semibold text-[#202326]">
          {t("about.hero.breadcrumbAbout")}
        </span>
      </nav>

      {/* Hero Banner Card */}
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeInUpVariants}
        className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] min-h-[440px] sm:min-h-[480px] lg:min-h-[500px] flex items-end"
      >
        {/* Background Photo */}
        <div
          className={`absolute inset-0 z-0 overflow-hidden ${
            isRtl ? "scale-x-[-1]" : ""
          }`}
        >
          <Image
            src="/aboutus/hero.png"
            alt={t("about.hero.heading")}
            fill
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-center"
          />
        </div>

        {/* Specified Linear Gradient Overlays */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(27, 58, 107, 0) 11.06%, rgba(27, 58, 107, 0.9) 89.42%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 w-full p-6 sm:p-10 lg:p-14">
          <div className="max-w-2xl">
            {/* Pill Tag */}
            <span
              className="inline-block rounded-full bg-[#1B3A6B]/85 border border-white/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E5ECF6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("about.hero.pill")}
            </span>

            {/* Main Headline */}
            <h1
              className="mt-4 text-[32px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.12] tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("about.hero.heading")}
            </h1>

            {/* Subtitle / Description */}
            <p
              className="mt-4 max-w-xl text-[14px] sm:text-[16px] font-normal leading-[1.65] text-white/90"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("about.hero.description")}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-[14px] font-semibold text-[#2B5FA6] transition-all duration-200 hover:bg-[#F0F3FA] hover:shadow-xs active:scale-[0.98]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("about.hero.exploreProjects")}
              </Link>

              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-[#1B3A6B]/60 border border-white/30 px-7 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#1B3A6B] active:scale-[0.98]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("about.hero.talkAdvisor")}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
