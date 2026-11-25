"use client";

import { useMemo, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { usePublicQuestionsQuery } from "@/features/questions/useQuestionsQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import { LUXURY_EASE } from "@/shared/utils/motionPresets";

interface FaqAccordionSectionProps {
  searchQuery: string;
  onResetSearch: () => void;
}

export default function FaqAccordionSection({
  searchQuery,
  onResetSearch,
}: FaqAccordionSectionProps) {
  const { t, locale, direction } = useTranslation();
  const { data: apiQuestions, isLoading } = usePublicQuestionsQuery(locale);
  const [openId, setOpenId] = useState<number | null>(null);

  const allFaqs = useMemo(
    () =>
      (apiQuestions || []).map((q) => ({
        id: q.id,
        question: q.title,
        answer: q.description,
      })),
    [apiQuestions]
  );

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allFaqs;
    return allFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [allFaqs, searchQuery]);

  function toggleFaq(id: number) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  const countLabel =
    filteredFaqs.length === 1
      ? t("faqPage.showingSingle", "Showing 1 question")
      : t("faqPage.showingCount", "Showing {count} questions").replace(
          "{count}",
          String(filteredFaqs.length)
        );

  return (
    <section
      dir={direction}
      className="bg-[#F0F3FA] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8">
        {!isLoading && allFaqs.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <p
              className="text-[13px] font-medium text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {countLabel}
            </p>
            {searchQuery.trim() && (
              <button
                type="button"
                onClick={onResetSearch}
                className="text-[13px] font-semibold text-[#2B5FA6] transition-opacity hover:opacity-80"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("faqPage.resetSearch", "Reset Search")}
              </button>
            )}
          </div>
        )}

        <div className="overflow-hidden rounded-[24px] border border-[#E2E8F3] bg-white shadow-xs divide-y divide-[#E2E8F3]">
          {isLoading ? (
            <div className="space-y-4 p-6 sm:p-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="h-14 w-full animate-pulse rounded-xl bg-[#E5ECF6]"
                />
              ))}
            </div>
          ) : allFaqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <h2
                className="text-[18px] font-semibold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("faqPage.emptyTitle", "No FAQs published yet")}
              </h2>
              <p
                className="mt-2 max-w-md text-[14px] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t(
                  "faqPage.emptySubtitle",
                  "Still have questions? Our property advisors are always here to help."
                )}
              </p>
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <h2
                className="text-[18px] font-semibold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("faqPage.noResultsTitle", "No matching questions found")}
              </h2>
              <p
                className="mt-2 max-w-md text-[14px] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t(
                  "faqPage.noResultsSubtitle",
                  "We could not find any FAQ matching your search. Try a different keyword or reach out to our team directly."
                )}
              </p>
              <button
                type="button"
                onClick={onResetSearch}
                className="mt-6 rounded-full bg-[#B8963E] px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#D4A843]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("faqPage.resetSearch", "Reset Search")}
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-6 text-start transition-colors hover:bg-[#F8FAFD]"
                  >
                    <span
                      className="flex-1 text-[15px] sm:text-[16px] font-medium leading-[1.5] text-[#202326]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {faq.question}
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: LUXURY_EASE }}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#202326]/60 text-[#202326]"
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
                          className="px-5 pb-6 pt-1 sm:px-8 sm:pb-7 text-start text-[14px] sm:text-[15px] leading-[1.7] text-[#65706B] whitespace-pre-line"
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
    </section>
  );
}
