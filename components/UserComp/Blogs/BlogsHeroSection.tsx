"use client";

import Image from "next/image";
import { FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

interface BlogsHeroSectionProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (e: FormEvent) => void;
  totalArticles?: number;
}

export default function BlogsHeroSection({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  totalArticles,
}: BlogsHeroSectionProps) {
  const { t, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const shouldReduceMotion = useReducedMotion();

  const hasArticlesCount =
    typeof totalArticles === "number" && totalArticles > 0;
  const articlesCountLabel = hasArticlesCount
    ? totalArticles === 1
      ? t("blogs.hero.articleCountSingle")
      : t("blogs.hero.articlesCount").replace("{count}", String(totalArticles))
    : null;

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeInUpVariants}
        className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#1B3A6B] shadow-xl"
      >
        {/* Background Image */}
        <div
          className={`absolute inset-0 z-0 ${
            isRtl ? "scale-x-[-1]" : ""
          }`}
        >
          <Image
            src="/Blogs/hero.png"
            alt={t("blogs.hero.heading")}
            fill
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-center"
          />
        </div>

        {/* Linear Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: isRtl
              ? "linear-gradient(270deg, #2B5FA6 44.23%, rgba(43, 95, 166, 0.85) 67.31%)"
              : "linear-gradient(90deg, #2B5FA6 44.23%, rgba(43, 95, 166, 0.85) 67.31%)",
          }}
        />

        {/* Hero Content Grid */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            {/* Tag Badge */}
            <span
              className="inline-block rounded-full bg-white/20 border border-white/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("blogs.hero.badge")}
            </span>

            {/* Main Headline */}
            <h1
              className="mt-4 text-3xl sm:text-4xl lg:text-[46px] font-bold leading-[1.15] tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("blogs.hero.heading")}
            </h1>

            {/* Description */}
            <p
              className="mt-4 text-sm sm:text-base font-normal leading-relaxed text-white/90 max-w-xl"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("blogs.hero.subtitle")}
            </p>

            {/* Search Input Bar */}
            <form onSubmit={onSearchSubmit} className="mt-8 max-w-xl">
              <div className="flex items-center rounded-full bg-white p-1.5 shadow-lg border border-white/20">
                <div className="flex items-center gap-3 flex-1 px-4">
                  <Image
                    src="/Blogs/svg (4).svg"
                    alt="Search icon"
                    width={18}
                    height={18}
                    className="shrink-0 opacity-60"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={t("blogs.hero.searchPlaceholder")}
                    className="w-full bg-transparent text-sm text-[#202326] placeholder-[#6B7570] focus:outline-none"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-[#1B3A6B] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-[#162E56] active:scale-95"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("blogs.hero.searchButton")}
                </button>
              </div>
            </form>
          </div>

          {/* Right Floating Stat Badge */}
          {articlesCountLabel && (
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="flex items-center gap-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 px-6 py-4 text-white shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                  <Image
                    src="/Blogs/svg (5).svg"
                    alt="Articles"
                    width={22}
                    height={22}
                  />
                </div>
                <div>
                  <span
                    className="block text-2xl font-bold leading-tight"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {totalArticles}
                  </span>
                  <span
                    className="block text-xs font-medium text-white/80"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t("blogs.hero.badge")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
