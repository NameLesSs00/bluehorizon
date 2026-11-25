"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePublicSiteSettingsQuery } from "@/features/keyValues/useKeyValuesQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import { DEFAULT_VIEWPORT, LUXURY_EASE } from "@/shared/utils/motionPresets";

export default function FaqSupportCta() {
  const { t, locale, direction } = useTranslation();
  const { data: settingsData } = usePublicSiteSettingsQuery();
  const settings = settingsData?.map || {};

  const phone = settings["phone"] || "";
  const whatsappUrl = settings["whatsapp"] || "";
  const cleanPhone = phone.replace(/\s+/g, "");

  return (
    <section dir={direction} className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.65, ease: LUXURY_EASE }}
          className="rounded-[24px] bg-[#1B3A6B] px-6 py-10 sm:px-12 sm:py-14 text-white shadow-lg"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E2C275]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("faqPage.cta.eyebrow", "STILL HAVE QUESTIONS?")}
              </p>
              <h2
                className="mt-2.5 text-[24px] sm:text-[32px] font-bold leading-tight text-white"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("faqPage.cta.heading", "Speak Directly with Our Advisors")}
              </h2>
              <p
                className="mt-3 text-[14px] sm:text-[15px] leading-[1.65] text-white/85"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t(
                  "faqPage.cta.description",
                  "Need personalized guidance on payment plans, legal deeds, or property management? Our team is available 6 days a week."
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 shrink-0">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-[#B8963E] px-7 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D4A843]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("faqPage.cta.contactButton", "Contact Support")}
              </Link>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-7 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("faqPage.cta.whatsapp", "WhatsApp Chat")}
                </a>
              )}

              {cleanPhone && (
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("faqPage.cta.call", "Call")} {phone}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
