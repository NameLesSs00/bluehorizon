"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { usePublicSiteSettingsQuery } from "@/features/keyValues/useKeyValuesQueries";
import { useTranslation } from "@/features/i18n/useTranslation";

export default function StandaloneCtaSection() {
  const { t } = useTranslation();
  const { data: settingsData } = usePublicSiteSettingsQuery();
  const settings = settingsData?.map || {};

  const phone = settings["phone"] || "";
  const whatsappUrl = settings["whatsapp"] || "";
  const cleanPhone = phone.replace(/\s+/g, "");

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 mb-12 sm:mb-16"
    >
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] bg-[#1B3A6B] p-8 sm:p-12 lg:p-14 text-white shadow-xl">
        {/* Background texture */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/Locations/ctaBackGound.png"
            alt="Background pattern"
            fill
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span
              className="text-xs font-bold uppercase tracking-widest text-[#E5ECF6]/80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("standaloneList.cta.eyebrow", "Need Immediate Assistance?")}
            </span>

            <h2
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("standaloneList.cta.heading", "Talk to Our Sales Team")}
            </h2>

            <p
              className="mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-white/80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t(
                "standaloneList.cta.description",
                "Our property advisors are ready to help you explore available standalone units, provide detailed information, and arrange private viewings to find the right property for you."
              )}
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0"
          >
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-[12px] bg-white px-6 py-3.5 text-center text-xs sm:text-sm font-semibold text-[#2B5FA6] shadow-sm transition-colors hover:bg-white/90"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("standaloneList.cta.whatsapp", "WhatsApp Chat")}
              </a>
            )}

            {cleanPhone && (
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center rounded-[12px] border border-white px-6 py-3.5 text-center text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-white/10"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("standaloneList.cta.call", "Call")} {phone}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
