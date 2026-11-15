"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function LocationsHeroSection() {
  const { t, locale, direction } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const gradientStyle =
    direction === "rtl"
      ? "linear-gradient(180deg, rgba(27, 58, 107, 0) 21.63%, #1B3A6B 94.71%)"
      : "linear-gradient(180deg, rgba(27, 58, 107, 0) 21.63%, #1B3A6B 94.71%)";

  return (
    <section className="relative w-full overflow-hidden bg-[#1B3A6B]">
      {/* Background Photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Locations/hero.png"
          alt={t("locations.hero.heading")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: gradientStyle }}
      />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-[1536px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <motion.div
          className="max-w-3xl"
          variants={shouldReduceMotion ? undefined : fadeInUpVariants}
          initial="hidden"
          animate="visible"
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
              {t("locations.hero.breadcrumbHome")}
            </Link>
            <span className="text-white/50">/</span>
            <span className="font-semibold text-white">
              {t("locations.hero.breadcrumbLocations")}
            </span>
          </nav>

          {/* Tag Badge */}
          <span
            className="inline-block rounded-full bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2B5FA6] shadow-sm"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("locations.hero.badge")}
          </span>

          {/* Title */}
          <h1
            className="mt-4 text-3xl sm:text-4xl lg:text-[46px] font-bold text-white leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("locations.hero.heading")}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/90"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("locations.hero.subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
