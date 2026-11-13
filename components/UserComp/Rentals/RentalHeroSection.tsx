"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function RentalHeroSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeInUpVariants}
        className="relative flex min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] w-full flex-col justify-end overflow-hidden rounded-[24px] sm:rounded-[32px] p-6 sm:p-12 lg:p-16 shadow-lg"
      >
        {/* Background Image */}
        <Image
          src="/rental/heroRental.jpg"
          alt={t("rent.hero.heading")}
          fill
          priority
          sizes="(max-width: 1536px) 100vw, 1536px"
          className="object-cover object-center"
        />

        {/* Specified Navy Gradient Filter */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(27, 58, 107, 0) 21.63%, #1B3A6B 94.71%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 max-w-3xl text-white">
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
        </div>
      </motion.div>
    </section>
  );
}
