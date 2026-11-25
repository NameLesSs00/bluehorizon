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
    <section className="relative w-full overflow-hidden bg-[#1B3A6B]">
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
          sizes="100vw"
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
      <div className="relative z-20 mx-auto max-w-[1360px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={fadeInUpVariants}
          className="max-w-2xl"
        >
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-[13px] text-white/80"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-white"
            >
              {t("about.hero.breadcrumbHome")}
            </Link>
            <span className="text-white/50">/</span>
            <span className="font-semibold text-white">
              {t("about.hero.breadcrumbAbout")}
            </span>
          </nav>

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
              className="inline-flex items-center justify-center rounded-full bg-[#B8963E] px-7 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#D4A843] hover:shadow-xs active:scale-[0.98]"
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
        </motion.div>
      </div>
    </section>
  );
}
