"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  fadeInUpVariants,
  containerStaggerVariants,
  cardItemVariants,
} from "@/shared/utils/animations";

interface CardContent {
  icon: string;
  titleKey: string;
  descKey: string;
  point1Key: string;
  point2Key: string;
}

const CARDS: CardContent[] = [
  {
    icon: "/aboutus/ic (4).svg",
    titleKey: "about.visionMission.vision.title",
    descKey: "about.visionMission.vision.description",
    point1Key: "about.visionMission.vision.point1",
    point2Key: "about.visionMission.vision.point2",
  },
  {
    icon: "/aboutus/ic (5).svg",
    titleKey: "about.visionMission.mission.title",
    descKey: "about.visionMission.mission.description",
    point1Key: "about.visionMission.mission.point1",
    point2Key: "about.visionMission.mission.point2",
  },
];

export default function AboutVisionMissionSection() {
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
        className="text-center"
      >
        <p
          className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#2B5FA6]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("about.visionMission.eyebrow")}
        </p>

        <h2
          className="mt-2 text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {t("about.visionMission.heading")}
        </h2>

        <p
          className="mx-auto mt-3 max-w-2xl text-[14px] sm:text-[15px] font-normal leading-relaxed text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("about.visionMission.description")}
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerStaggerVariants}
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {CARDS.map((card) => (
          <motion.div
            key={card.titleKey}
            variants={cardItemVariants}
            className="flex flex-col justify-between rounded-[24px] border border-[#D9E2EE] bg-white p-8 sm:p-10 transition-all duration-200 hover:-translate-y-1 hover:border-[#2B5FA6]/40 hover:shadow-xs"
          >
            <div>
              {/* Icon */}
              <div className="relative h-11 w-11 shrink-0">
                <Image
                  src={card.icon}
                  alt={t(card.titleKey)}
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                />
              </div>

              {/* Title */}
              <h3
                className="mt-5 text-[22px] sm:text-[24px] font-bold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t(card.titleKey)}
              </h3>

              {/* Description */}
              <p
                className="mt-3 text-[14px] sm:text-[15px] font-normal leading-[1.65] text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t(card.descKey)}
              </p>
            </div>

            {/* Checklist */}
            <ul className="mt-8 space-y-3 pt-4">
              {[card.point1Key, card.point2Key].map((pointKey) => (
                <li key={pointKey} className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#2B5FA6]"
                  >
                    <path
                      d="M3.75 9.75L7.5 13.5L14.25 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-[13px] sm:text-[14px] font-semibold text-[#202326]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t(pointKey)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
