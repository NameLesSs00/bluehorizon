"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePublicSiteSettingsQuery } from "@/features/keyValues/useKeyValuesQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function ContactCtaSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const { data: settingsData, isLoading } = usePublicSiteSettingsQuery();
  const settings = settingsData?.map || {};

  const phone = settings["phone"] || "";
  const whatsappUrl = settings["whatsapp"] || "";
  const cleanPhone = phone.replace(/\s+/g, "");

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUpVariants}
        className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#1B3A6B] px-8 py-10 sm:px-12 sm:py-14 lg:px-14 lg:py-16 text-white"
      >
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Column */}
          <div className="max-w-xl">
            <span
              className="inline-block rounded-full bg-[#162E56] border border-white/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E5ECF6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("contact.cta.pill")}
            </span>

            <h2
              className="mt-4 text-[28px] sm:text-[34px] lg:text-[38px] font-bold leading-[1.18] tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("contact.cta.heading")}
            </h2>

            <p
              className="mt-3 text-[14px] sm:text-[15px] font-normal leading-[1.65] text-[#E5ECF6]/85"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("contact.cta.description")}
            </p>
          </div>

          {/* Right Column Action Buttons */}
          <div className="flex shrink-0 flex-col gap-3.5 sm:flex-row w-full sm:w-auto">
            {isLoading ? (
              <div className="flex gap-3">
                <div className="h-12 w-36 animate-pulse rounded-[12px] bg-white/20" />
                <div className="h-12 w-44 animate-pulse rounded-[12px] bg-white/20" />
              </div>
            ) : (
              <>
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-[12px] bg-white px-8 py-3.5 text-[14px] font-semibold text-[#2B5FA6] transition-all duration-200 hover:bg-[#F0F3FA] hover:shadow-xs active:scale-[0.98] text-center"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t("contact.cta.whatsapp")}
                  </a>
                )}

                {cleanPhone && (
                  <a
                    href={`tel:${cleanPhone}`}
                    className="inline-flex items-center justify-center rounded-[12px] bg-[#2B5FA6] border border-white/25 px-8 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#162E56] hover:shadow-xs active:scale-[0.98] text-center"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t("contact.cta.call")} {phone}
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
