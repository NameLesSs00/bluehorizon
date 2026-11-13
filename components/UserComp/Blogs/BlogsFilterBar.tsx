"use client";

import Image from "next/image";
import { useTranslation } from "@/features/i18n/useTranslation";

export const BLOG_CATEGORIES = [
  "All",
  "Market Insights",
  "Buying Guide",
  "Investment",
  "Lifestyle",
  "Red Sea News",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const CATEGORY_TRANSLATION_KEYS: Record<BlogCategory, string> = {
  All: "blogs.filter.all",
  "Market Insights": "blogs.filter.marketInsights",
  "Buying Guide": "blogs.filter.buyingGuide",
  Investment: "blogs.filter.investment",
  Lifestyle: "blogs.filter.lifestyle",
  "Red Sea News": "blogs.filter.redSeaNews",
};

interface BlogsFilterBarProps {
  selectedCategory: BlogCategory;
  onSelectCategory: (category: BlogCategory) => void;
}

export default function BlogsFilterBar({
  selectedCategory,
  onSelectCategory,
}: BlogsFilterBarProps) {
  const { t } = useTranslation();

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[20px] bg-white border border-[#D9E2EE] p-3 sm:px-6 sm:py-3.5 shadow-sm">
        {/* Left: Filter Label & Icon */}
        <div className="flex items-center gap-2 shrink-0">
          <Image
            src="/Blogs/svg (5).svg"
            alt="Filter"
            width={18}
            height={18}
            className="shrink-0"
          />
          <span
            className="text-sm font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("blogs.filter.label")}
          </span>
        </div>

        {/* Right: Category Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {BLOG_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const labelKey = CATEGORY_TRANSLATION_KEYS[category];
            const label = labelKey ? t(labelKey) : category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`rounded-full px-4 py-1.5 text-xs sm:text-[13px] font-semibold transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "bg-[#1B3A6B] text-white shadow-xs"
                    : "bg-[#F0F3FA] text-[#6B7570] hover:bg-[#E5ECF6] hover:text-[#202326]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
