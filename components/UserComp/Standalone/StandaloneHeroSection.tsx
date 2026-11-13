"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";

export default function StandaloneHeroSection() {
  const { t, locale } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="mx-auto w-full max-w-[1536px] px-4 pt-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6B7570]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Link href={`/${locale}`} className="transition-colors hover:text-[#2B5FA6]">
          {t("standaloneList.breadcrumb.home", "Home")}
        </Link>
        <span className="text-[#6B7570]/60">/</span>
        <span className="font-semibold text-[#2B5FA6]">
          {t("standaloneList.breadcrumb.standalone", "Standalone units")}
        </span>
      </motion.nav>

      {/* Hero Banner Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.98, y: 16 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center shadow-lg"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Standalone.png"
            alt="Standalone properties background"
            fill
            priority
            sizes="(max-width: 1536px) 100vw, 1536px"
            className="object-cover object-center"
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(27, 58, 107, 0) 21.63%, #1B3A6B 94.71%)",
          }}
        />

        {/* Banner Content */}
        <div className="relative z-20 max-w-3xl p-6 sm:p-12 lg:p-16">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            className="inline-block rounded-full bg-white px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#2B5FA6] shadow-sm uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("standaloneList.hero.badge", "Verified Premium Units")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("standaloneList.hero.title", "Standalone Properties for Sale")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-4 text-sm font-normal leading-relaxed text-white/90 sm:text-base"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t(
              "standaloneList.hero.description",
              "Discover a diverse selection of independent apartments, villas, and residential units outside gated communities, offering flexibility, privacy, and prime locations across Egypt's most sought-after neighborhoods."
            )}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
