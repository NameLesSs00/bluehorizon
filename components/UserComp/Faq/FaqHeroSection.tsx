"use client";

import Link from "next/link";
import { FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  headerContainerVariants,
  headerItemVariants,
} from "@/shared/utils/motionPresets";

interface FaqHeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function FaqHeroSection({
  searchQuery,
  onSearchChange,
}: FaqHeroSectionProps) {
  const { t, locale, direction } = useTranslation();

  return (
    <section
      dir={direction}
      className="relative overflow-hidden bg-[#1B3A6B] pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(197, 211, 232, 0.35), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headerContainerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          {/* Breadcrumb */}
          <motion.nav
            variants={headerItemVariants}
            aria-label="Breadcrumb"
            className="mb-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#C5D3E8]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-white"
            >
              {t("faqPage.breadcrumbHome", "Home")}
            </Link>
            <span className="text-white/40">/</span>
            <span className="font-semibold text-white">
              {t("faqPage.breadcrumbFaq", "FAQ")}
            </span>
          </motion.nav>

          {/* Badge */}
          <motion.p
            variants={headerItemVariants}
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E2C275]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("faqPage.badge", "HELP CENTER")}
          </motion.p>

          {/* Heading */}
          <motion.h1
            variants={headerItemVariants}
            className="mt-3 text-[28px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.14] tracking-[-0.03em] text-white"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("faqPage.heading", "Frequently Asked Questions")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={headerItemVariants}
            className="mt-4 text-[14px] sm:text-[16px] leading-[1.65] text-white/85"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t(
              "faqPage.subtitle",
              "Find clear answers to the most common questions about buying, renting, legal verification, and investing in Hurghada and the Red Sea."
            )}
          </motion.p>

          {/* Live Search Input */}
          <motion.div
            variants={headerItemVariants}
            className="mx-auto mt-8 max-w-xl"
          >
            <div className="relative flex items-center">
              <FiSearch className="pointer-events-none absolute start-4 h-4.5 w-4.5 text-[#65706B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t(
                  "faqPage.searchPlaceholder",
                  "Search questions or keywords..."
                )}
                className="w-full rounded-full border border-white/20 bg-white py-3.5 ps-11 pe-12 text-[14px] text-[#202326] placeholder:text-[#65706B] shadow-lg focus:border-[#C5D3E8] focus:outline-none"
                style={{ fontFamily: "var(--font-inter)" }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  aria-label={t("faqPage.clearSearch", "Clear")}
                  className="absolute end-3.5 flex h-7 w-7 items-center justify-center rounded-full text-[#65706B] transition-colors hover:bg-[#F0F3FA] hover:text-[#202326]"
                >
                  <FiX className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
