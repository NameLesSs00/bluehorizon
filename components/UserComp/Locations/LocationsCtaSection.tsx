"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { usePublicSiteSettingsQuery } from "@/features/keyValues/useKeyValuesQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function LocationsCtaSection() {
  const { data: settingsData } = usePublicSiteSettingsQuery();
  const settings = settingsData?.map || {};
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const phone = settings["phone"] || "";
  const whatsappUrl = settings["whatsapp"] || "";
  const cleanPhone = phone.replace(/\s+/g, "");

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] bg-[#1B3A6B] shadow-xl">
        {/* Topographic Background Graphic */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/Locations/ctaBackGound.png"
            alt="Background pattern"
            fill
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-center"
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col md:flex-row md:items-center rtl:md:flex-row-reverse justify-between gap-8 p-8 sm:p-12 lg:p-14"
          variants={shouldReduceMotion ? undefined : fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="max-w-2xl">
            <span
              className="text-[11px] font-bold uppercase tracking-wider text-[#E5ECF6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("locations.cta.eyebrow")}
            </span>

            <h2
              className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-bold text-white leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("locations.cta.heading")}
            </h2>

            <p
              className="mt-3 text-sm sm:text-base leading-relaxed text-white/85 max-w-xl"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("locations.cta.description")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-semibold text-[#202326] shadow-sm transition-colors hover:bg-[#F0F3FA]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("locations.cta.whatsappChat")}
              </a>
            )}

            {cleanPhone && (
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center rounded-full border border-white px-7 py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-white/10"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("locations.cta.callUs")} {phone}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
