"use client";

import Image from "next/image";
import { BlogSectionItem } from "@/models/blog";

interface BlogTableOfContentsProps {
  sections: BlogSectionItem[];
  hasRecentArticles?: boolean;
}

export default function BlogTableOfContents({
  sections,
  hasRecentArticles = true,
}: BlogTableOfContentsProps) {
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
    <div className="rounded-[20px] border border-[#E1E7E3] bg-white p-5 sm:p-6 shadow-sm">
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
          Table of Contents
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
                type="button"
                onClick={() => handleScrollTo(`section-${sectionNum}`)}
                className={`text-left leading-snug transition-colors line-clamp-2 ${
                  isFirst
                    ? "font-semibold text-[#145C4B]"
                    : "font-medium text-[#6B7570] hover:text-[#145C4B]"
                }`}
              >
                <span className="font-bold mr-1.5">{sectionNum}.</span>
                <span>{sectionTitle}</span>
              </button>
            </li>
          );
        })}

        {hasRecentArticles && (
          <li>
            <button
              type="button"
              onClick={() => handleScrollTo("recent-articles")}
              className="text-left font-medium text-[#6B7570] hover:text-[#145C4B] transition-colors leading-snug"
            >
              <span className="font-bold mr-1.5">{sections.length + 1}.</span>
              <span>Related Articles</span>
            </button>
          </li>
        )}
      </ol>
    </div>
  );
}

