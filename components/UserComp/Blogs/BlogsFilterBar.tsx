"use client";

import Image from "next/image";

export const BLOG_CATEGORIES = [
  "All",
  "Market Insights",
  "Buying Guide",
  "Investment",
  "Lifestyle",
  "Red Sea News",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

interface BlogsFilterBarProps {
  selectedCategory: BlogCategory;
  onSelectCategory: (category: BlogCategory) => void;
}

export default function BlogsFilterBar({
  selectedCategory,
  onSelectCategory,
}: BlogsFilterBarProps) {
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
            Filter Articles:
          </span>
        </div>

        {/* Right: Category Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {BLOG_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`rounded-[18px] px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#2B5FA6] text-white shadow-sm"
                    : "border border-[#D9E2EE] bg-[#F0F3FA] text-[#202326] hover:bg-[#E5ECF6] hover:text-[#2B5FA6]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

