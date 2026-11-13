"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  fadeInUpVariants,
  containerStaggerVariants,
  cardItemVariants,
} from "@/shared/utils/animations";

interface ProcessStep {
  step: string;
  icon: string;
  titleKey: string;
  descKey: string;
}

const STEPS: ProcessStep[] = [
  {
    step: "01",
    icon: "/aboutus/ic (6).svg",
    titleKey: "about.process.step1.title",
    descKey: "about.process.step1.description",
  },
  {
    step: "02",
    icon: "/aboutus/ic (7).svg",
    titleKey: "about.process.step2.title",
    descKey: "about.process.step2.description",
  },
  {
    step: "03",
    icon: "/aboutus/ic (8).svg",
    titleKey: "about.process.step3.title",
    descKey: "about.process.step3.description",
  },
  {
    step: "04",
    icon: "/aboutus/ic (9).svg",
    titleKey: "about.process.step4.title",
    descKey: "about.process.step4.description",
  },
];

export default function AboutProcessSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Light Gray / Green Container Card */}
      <div className="rounded-[28px] sm:rounded-[32px] bg-[#F0F3FA] border border-[#D9E2EE]/70 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
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
            {t("about.process.eyebrow")}
          </p>

          <h2
            className="mt-2 text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("about.process.heading")}
          </h2>

          <p
            className="mx-auto mt-3 max-w-xl text-[14px] sm:text-[15px] font-normal leading-relaxed text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("about.process.description")}
          </p>
        </motion.div>

        {/* 4 Process Cards */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerStaggerVariants}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.step}
              variants={cardItemVariants}
              className="flex flex-col justify-between rounded-[20px] border border-[#D9E2EE] bg-white p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#2B5FA6]/40 hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[28px] sm:text-[32px] font-bold leading-none text-[#202326]"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {step.step}
                  </span>

                  <div className="relative h-11 w-11 shrink-0">
                    <Image
                      src={step.icon}
                      alt={t(step.titleKey)}
                      width={44}
                      height={44}
                      className="h-11 w-11 object-contain"
                    />
                  </div>
                </div>

                <h3
                  className="mt-5 text-[17px] sm:text-[18px] font-bold text-[#202326]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {t(step.titleKey)}
                </h3>

                <p
                  className="mt-2.5 text-[13px] font-normal leading-[1.65] text-[#6B7570]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t(step.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
