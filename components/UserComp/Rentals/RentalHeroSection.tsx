"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function RentalHeroSection() {
  const { t, locale } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#1B3A6B]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/rental/heroRental.jpg"
          alt={t("rent.hero.heading")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Specified Navy Gradient Filter */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(27, 58, 107, 0) 21.63%, #1B3A6B 94.71%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-[1536px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={fadeInUpVariants}
          className="max-w-3xl text-white"
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
              {t("rent.hero.breadcrumbHome", "Home")}
            </Link>
            <span className="text-white/50">/</span>
            <span className="font-semibold text-white">
              {t("rent.hero.breadcrumbRent", "Rentals")}
            </span>
          </nav>

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
            <span style={{ fontFamily: "var(--font-inter)" }}>
              {t("rent.hero.badge")}
            </span>
          </div>

          {/* Heading */}
          <h1
            className="mt-4 text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-4xl lg:text-[50px]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("rent.hero.heading")}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-4 text-sm sm:text-base font-normal leading-relaxed text-white/90 max-w-2xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("rent.hero.subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
