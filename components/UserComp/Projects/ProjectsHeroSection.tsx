"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function ProjectsHeroSection() {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#1B3A6B]">
      {/* Background City Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/projects.png"
          alt={t("projects.hero.heading")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Specified Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: isRtl
            ? "linear-gradient(270deg, #1B3A6B 31.77%, rgba(27, 58, 107, 0.85) 46.15%, rgba(27, 58, 107, 0.2) 80.77%)"
            : "linear-gradient(90deg, #1B3A6B 31.77%, rgba(27, 58, 107, 0.85) 46.15%, rgba(27, 58, 107, 0.2) 80.77%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-[1536px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={fadeInUpVariants}
        >
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[13px] font-normal text-white/85"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-white"
            >
              {t("projects.hero.breadcrumbHome")}
            </Link>
            <span className="text-white/60">/</span>
            <span className="font-semibold text-white">
              {t("projects.hero.breadcrumbProjects")}
            </span>
          </nav>

          {/* Heading & Subtitle */}
          <div className="mt-6 sm:mt-10">
            <h1
              className="text-[40px] font-bold leading-none tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("projects.hero.heading")}
            </h1>

            <p
              className="mt-4 max-w-xl text-[15px] font-normal leading-[1.65] text-white/95 sm:text-[16px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("projects.hero.subtitle")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
