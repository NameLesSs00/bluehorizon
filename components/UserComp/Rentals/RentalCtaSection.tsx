"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { usePublicSiteSettingsQuery } from "@/features/keyValues/useKeyValuesQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function RentalCtaSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const { data: settingsData } = usePublicSiteSettingsQuery();
  const settings = settingsData?.map || {};

  const phone = settings["phone"] || "";
  const whatsappUrl = settings["whatsapp"] || "";
  const cleanPhone = phone.replace(/\s+/g, "");

  return (
    <section className="mx-auto mt-16 sm:mt-20 w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUpVariants}
        className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] bg-[#1B3A6B] shadow-xl"
      >
        {/* Topographic Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/Locations/ctaBackGound.png"
            alt="Topographic Pattern"
            fill
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 sm:p-12 lg:p-14">
          <div className="max-w-2xl">
            <span
              className="text-[11px] font-bold uppercase tracking-wider text-[#E5ECF6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.cta.eyebrow")}
            </span>

            <h2
              className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-bold text-white leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("rent.cta.heading")}
            </h2>

            <p
              className="mt-3 text-sm sm:text-base leading-relaxed text-white/85 max-w-xl"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.cta.description")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
            {cleanPhone && (
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center rounded-[12px] bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#1B3A6B] shadow-md transition-all duration-200 hover:bg-[#F0F3FA] active:scale-[0.98]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("rent.cta.callUs").replace("{phone}", phone)}
              </a>
            )}

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-[12px] border border-white/30 bg-white/10 backdrop-blur-xs px-6 py-3.5 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 active:scale-[0.98]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("rent.cta.whatsapp")}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
