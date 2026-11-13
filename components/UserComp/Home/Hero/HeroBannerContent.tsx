"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";

export default function HeroBannerContent() {
  const { t, locale, direction } = useTranslation();

  return (
    <div className="max-w-2xl text-white">
      {/* Eyebrow Tag */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex items-center gap-3"
      >
        <span
          className="text-[13px] font-semibold uppercase tracking-wider text-white"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("home.hero.eyebrow", "FIND YOUR PLACE")}
        </span>
        <span className="h-[1px] w-12 bg-white/70" />
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="mt-3 sm:mt-4 text-[28px] sm:text-5xl lg:text-[54px] font-bold leading-[1.1] sm:leading-[1.05] tracking-[-0.02em] text-white"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {t("home.hero.headingLine1", "Find Your Place.")}
        <br />
        {t("home.hero.headingLine2", "Invest in Your Future.")}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mt-3.5 sm:mt-5 max-w-xl text-[14px] sm:text-[16px] font-normal leading-[22px] sm:leading-[25px] text-white/90"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {t(
          "home.hero.subtitle",
          "Discover exceptional properties, premium developments, and opportunities designed around your lifestyle."
        )}
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
      >
        <Link
          href={`/${locale}/standalone`}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#2B5FA6] border border-white/20 px-7 py-3.5 sm:px-8 sm:py-4 text-[14px] sm:text-[15px] font-semibold text-white shadow-md transition-all hover:bg-[#1B3A6B] hover:shadow-lg text-center"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span>{t("home.hero.exploreProperties", "Explore Properties")}</span>
          <FiArrowRight
            className={`h-4 w-4 transition-transform ${
              direction === "rtl" ? "rotate-180" : ""
            }`}
          />
        </Link>

        <Link
          href={`/${locale}/projects`}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/80 bg-white/10 px-7 py-3.5 sm:px-8 sm:py-4 text-[14px] font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/20 text-center"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("home.hero.discoverProjects", "Discover Our Projects")}
        </Link>
      </motion.div>
    </div>
  );
}
