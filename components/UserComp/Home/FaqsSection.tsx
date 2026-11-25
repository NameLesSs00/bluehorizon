"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { FiMinus, FiPlus } from "react-icons/fi";
import { PiQuestionLight, PiChatsCircleLight } from "react-icons/pi";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { usePublicQuestionsQuery } from "@/features/questions/useQuestionsQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  createSlideInVariants,
  LUXURY_EASE,
} from "@/shared/utils/motionPresets";
import HomeSectionBgIcon from "./HomeSectionBgIcon";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export default function FaqsSection() {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const { data: apiQuestions, isLoading } = usePublicQuestionsQuery(locale);
  const [openId, setOpenId] = useState<number | null>(null);

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.16 });

  const leftVariants = createSlideInVariants("start", isRtl, 0.08);
  const rightVariants = createSlideInVariants("end", isRtl, 0.16);

  const faqs: FaqItem[] = (apiQuestions || []).slice(0, 5).map((q) => ({
    id: q.id,
    question: q.title,
    answer: q.description,
  }));

  function toggleFaq(id: number) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#E5ECF6] py-10 sm:py-14 lg:py-16"
    >
      <HomeSectionBgIcon
        leftIcon={PiQuestionLight}
        rightIcon={PiChatsCircleLight}
        colorClassName="text-[#1B3A6B]/[0.075]"
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Subtitles & CTA */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h3
                className="text-[25px] font-bold leading-none tracking-normal text-[#2B5FA6]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("home.faqs.title", "FAQs")}
              </h3>

              <p
                className="mt-4 text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#B8963E]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("home.faqs.eyebrow", "WE ARE HERE TO HELP")}
              </p>

              <h2
                className="mt-4 text-[26px] sm:text-[34px] lg:text-[38px] font-normal leading-[1.2] tracking-[-0.03em] text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("home.faqs.headingLine1", "A little clarity.")}
                <br />
                {t("home.faqs.headingLine2", "A lot of confidence.")}
              </h2>

              <p
                className="mt-6 text-[15px] font-normal leading-[1.7] tracking-normal text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t(
                  "home.faqs.description",
                  "Got questions about buying, renting, or investing? Find answers to the questions we hear most often."
                )}
              </p>
            </div>

            <div className="mt-8 sm:mt-10">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-[#B8963E] px-8 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#D4A843] shadow-xs"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("home.faqs.contactSupport", "Contact Support")}
              </Link>
            </div>
          </motion.div>

          {/* Right Column: FAQ Accordion Card */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-[24px] bg-white shadow-sm divide-y divide-[#E2E8F3]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2B5FA6] border-t-transparent" />
                </div>
              ) : faqs.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-10 sm:p-14 text-center">
                  <p
                    className="text-[15px] font-medium text-[#202326]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t(
                      "home.faqs.supportPrompt",
                      "Still have questions? Our team is always here to guide you."
                    )}
                  </p>
                </div>
              ) : (
                faqs.map((faq) => {
                  const isOpen = openId === faq.id;

                  return (
                    <div key={faq.id} className="transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4.5 sm:px-8 sm:py-6 text-start transition-colors hover:bg-[#F9F7F4]/60"
                        aria-expanded={isOpen}
                      >
                        <span
                          className="flex-1 text-[14px] sm:text-[15px] font-normal leading-[25px] tracking-normal text-[#202326]"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {faq.question}
                        </span>

                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: LUXURY_EASE }}
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#202326]/70 text-[#202326]"
                        >
                          {isOpen ? (
                            <FiMinus className="h-3.5 w-3.5" />
                          ) : (
                            <FiPlus className="h-3.5 w-3.5" />
                          )}
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: LUXURY_EASE }}
                            className="overflow-hidden"
                          >
                            <div
                              className="px-5 pb-5 pt-1 sm:px-8 sm:pb-6 text-start text-[13.5px] sm:text-[14px] leading-[1.65] text-[#65706B]"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
