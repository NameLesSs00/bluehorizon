"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  fadeInUpVariants,
  containerStaggerVariants,
  cardItemVariants,
} from "@/shared/utils/animations";

interface ServiceOffer {
  icon: string;
  titleKey: string;
  descKey: string;
}

const OFFERS: ServiceOffer[] = [
  {
    icon: "/aboutus/ic (10).svg",
    titleKey: "about.offer.offPlan.title",
    descKey: "about.offer.offPlan.description",
  },
  {
    icon: "/aboutus/ic (11).svg",
    titleKey: "about.offer.resaleVillas.title",
    descKey: "about.offer.resaleVillas.description",
  },
  {
    icon: "/aboutus/ic (12).svg",
    titleKey: "about.offer.rentalMgmt.title",
    descKey: "about.offer.rentalMgmt.description",
  },
  {
    icon: "/aboutus/ic (13).svg",
    titleKey: "about.offer.legalAdvisory.title",
    descKey: "about.offer.legalAdvisory.description",
  },
  {
    icon: "/aboutus/ic (14).svg",
    titleKey: "about.offer.valuation.title",
    descKey: "about.offer.valuation.description",
  },
  {
    icon: "/aboutus/ic (15).svg",
    titleKey: "about.offer.concierge.title",
    descKey: "about.offer.concierge.description",
  },
];

export default function AboutOfferSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUpVariants}
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("about.offer.eyebrow")}
          </p>

          <h2
            className="mt-2 text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("about.offer.heading")}
          </h2>
        </div>

        <p
          className="max-w-md text-[14px] sm:text-[15px] font-normal leading-relaxed text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("about.offer.description")}
        </p>
      </motion.div>

      {/* 6 Offer Cards */}
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerStaggerVariants}
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {OFFERS.map((offer) => (
          <motion.div
            key={offer.titleKey}
            variants={cardItemVariants}
            className="flex flex-col justify-between rounded-[24px] border border-[#D9E2EE] bg-white p-7 sm:p-8 transition-all duration-200 hover:-translate-y-1 hover:border-[#2B5FA6]/40 hover:shadow-xs"
          >
            <div>
              <div className="relative h-11 w-11 shrink-0">
                <Image
                  src={offer.icon}
                  alt={t(offer.titleKey)}
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                />
              </div>

              <h3
                className="mt-5 text-[18px] sm:text-[19px] font-bold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t(offer.titleKey)}
              </h3>

              <p
                className="mt-2.5 text-[13px] sm:text-[14px] font-normal leading-[1.65] text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t(offer.descKey)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
