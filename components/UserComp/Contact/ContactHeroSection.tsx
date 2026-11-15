"use client";

import Link from "next/link";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function ContactHeroSection() {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#1B3A6B]">
      {/* Background Miniature House Image */}
      <div
        className={`absolute inset-0 z-0 overflow-hidden ${
          isRtl ? "scale-x-[-1]" : ""
        }`}
        style={{
          backgroundImage: "url('/ContactUs/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Specified Linear Gradient Overlay for Text Readability */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(27, 58, 107, 0) 30.77%, #1B3A6B 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-[1360px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={fadeInUpVariants}
          className="max-w-xl"
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
              {t("contact.hero.breadcrumbHome")}
            </Link>
            {isRtl ? (
              <FiChevronLeft className="h-3.5 w-3.5 text-white/50 shrink-0" />
            ) : (
              <FiChevronRight className="h-3.5 w-3.5 text-white/50 shrink-0" />
            )}
            <span className="font-semibold text-white">
              {t("contact.hero.breadcrumbContact")}
            </span>
          </nav>

          {/* Pill Tag */}
          <span
            className="inline-block rounded-full border border-white/20 bg-[#1B3A6B]/85 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E5ECF6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("contact.hero.pill")}
          </span>

          {/* Main Headline */}
          <h1
            className="mt-4 text-[32px] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[48px]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("contact.hero.heading")}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-4 max-w-lg text-[14px] font-normal leading-[1.65] text-white/90 sm:text-[15px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("contact.hero.description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
