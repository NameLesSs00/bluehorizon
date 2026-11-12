"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMinus, FiPlus } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { usePublicQuestionsQuery } from "@/features/questions/useQuestionsQueries";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export default function FaqsSection() {
  const { data: apiQuestions, isLoading } = usePublicQuestionsQuery("en");
  const [openId, setOpenId] = useState<number | null>(null);

  const faqs: FaqItem[] = (apiQuestions || []).map((q) => ({
    id: q.id,
    question: q.title,
    answer: q.description,
  }));

  function toggleFaq(id: number) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  // If no real FAQ items are available from the backend, hide the section entirely
  if (!isLoading && faqs.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#E8F1EC] py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Subtitles & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3
                className="text-[25px] font-bold leading-none tracking-normal text-[#145C4B]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                FAQs
              </h3>

              <p
                className="mt-4 text-[11px] font-normal uppercase leading-none tracking-[0.12em] text-[#145C4B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                WE’RE HERE TO HELP
              </p>

              <h2
                className="mt-4 text-[32px] sm:text-[38px] font-normal leading-[1.2] tracking-[-0.03em] text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                A little clarity.
                <br />
                A lot of confidence.
              </h2>

              <p
                className="mt-6 text-[15px] font-normal leading-[1.7] tracking-normal text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Have questions? We have answers. Find out how Dream Life makes
                buying, selling and renting feel simple.
              </p>
            </div>

            <div className="mt-8 sm:mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#145C4B] px-8 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#0F473A]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Talk to our team
              </Link>
            </div>
          </div>

          {/* Right Column: FAQ Accordion Card */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[24px] bg-white shadow-sm divide-y divide-[#E6EAE7]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#145C4B] border-t-transparent" />
                  <p
                    className="mt-3 text-[13px] text-[#65706B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Loading frequently asked questions...
                  </p>
                </div>
              ) : faqs.length === 0 ? (
                <div className="p-10 text-center text-[14px] text-[#65706B]">
                  No questions available at the moment.
                </div>
              ) : (
                faqs.map((faq) => {
                  const isOpen = openId === faq.id;

                  return (
                    <div key={faq.id} className="transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-6 sm:px-8 text-left transition-colors hover:bg-[#FAF8F5]/60"
                        aria-expanded={isOpen}
                      >
                        <span
                          className="flex-1 text-center text-[15px] font-normal leading-[25px] tracking-normal text-[#202326]"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {faq.question}
                        </span>

                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#202326]/70 text-[#202326] transition-transform">
                          {isOpen ? (
                            <FiMinus className="h-3.5 w-3.5" />
                          ) : (
                            <FiPlus className="h-3.5 w-3.5" />
                          )}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div
                              className="px-6 pb-6 pt-1 sm:px-8 text-center text-[14px] leading-[1.65] text-[#65706B]"
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
          </div>
        </div>
      </div>
    </section>
  );
}

