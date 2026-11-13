"use client";

import Image from "next/image";
import { useTranslation } from "@/features/i18n/useTranslation";
import { BlogSectionItem } from "@/models/blog";

interface BlogTableOfContentsProps {
  sections: BlogSectionItem[];
  hasRecentArticles?: boolean;
}

export default function BlogTableOfContents({
  sections,
  hasRecentArticles = true,
}: BlogTableOfContentsProps) {
  const { t } = useTranslation();

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Image
          src="/Blogs/BlogDetails/icon-list.svg"
          alt="Table of contents"
          width={16}
          height={16}
        />
        <h3
          className="text-sm font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {t("blogs.details.tableOfContents")}
        </h3>
      </div>

      <ol className="space-y-3 text-xs sm:text-[13px]" style={{ fontFamily: "var(--font-inter)" }}>
        {sections.map((section, idx) => {
          const sectionNum = section.sectionNumber || idx + 1;
          const sectionTitle =
            section.tittle || (section as unknown as { title?: string }).title || `Section ${sectionNum}`;
          const isFirst = idx === 0;

          return (
            <li key={section.id || idx}>
              <button
                onClick={() => handleScrollTo(`section-${sectionNum}`)}
                className={`text-start transition-colors duration-150 line-clamp-2 ${
                  isFirst
                    ? "font-semibold text-[#2B5FA6] hover:text-[#1B3A6B]"
                    : "text-[#6B7570] hover:text-[#202326]"
                }`}
              >
                <span className="font-medium mr-1.5 rtl:mr-0 rtl:ml-1.5 text-[#2B5FA6]">
                  {sectionNum}.
                </span>
                {sectionTitle}
              </button>
            </li>
          );
        })}

        {hasRecentArticles && (
          <li className="pt-2 border-t border-[#D9E2EE]">
            <button
              onClick={() => handleScrollTo("recent-articles")}
              className="text-start text-[#6B7570] hover:text-[#202326] transition-colors duration-150 line-clamp-1"
            >
              {t("blogs.details.recentArticlesTitle")}
            </button>
          </li>
        )}
      </ol>
    </div>
  );
}
