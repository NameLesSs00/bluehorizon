"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function AreasHeroSection() {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const shouldReduceMotion = useReducedMotion();

  const overlayGradient = isRtl
    ? "linear-gradient(270deg, #1B3A6B 31.77%, rgba(27, 58, 107, 0.85) 46.15%, rgba(27, 58, 107, 0.2) 80.77%)"
    : "linear-gradient(90deg, #1B3A6B 31.77%, rgba(27, 58, 107, 0.85) 46.15%, rgba(27, 58, 107, 0.2) 80.77%)";

  return (
    <section className="relative overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Areas/heroAreaImage.jpg"
          alt={t("areas.hero.heading")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Specified Linear Gradient Overlay (Bidirectional) */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: overlayGradient }}
      />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-[1536px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={fadeInUpVariants}
        >
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[13px] font-normal text-white/85"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-white"
            >
              {t("areas.hero.breadcrumbHome")}
            </Link>
            <span className="text-white/60">/</span>
            <span className="font-semibold text-white">
              {t("areas.hero.breadcrumbAreas")}
            </span>
          </nav>

          {/* Heading & Subtitle */}
          <div className="mt-8 sm:mt-12">
            <h1
              className="text-[44px] font-bold leading-none tracking-[-0.02em] text-white sm:text-[56px] lg:text-[64px]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("areas.hero.heading")}
            </h1>

            <p
              className="mt-6 max-w-xl text-[15px] font-normal leading-[1.65] text-white/95 sm:text-[16px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("areas.hero.subtitle")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
