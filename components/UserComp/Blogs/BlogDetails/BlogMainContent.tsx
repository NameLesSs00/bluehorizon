"use client";

import Image from "next/image";
import { BlogSectionItem } from "@/models/blog";
import { getFullImageUrl } from "@/clientApi/blogsApi";

interface BlogMainContentProps {
  title: string;
  category?: string | null;
  publicationDate?: string | null;
  sections: BlogSectionItem[];
}

export default function BlogMainContent({
  title,
  category,
  publicationDate,
  sections,
}: BlogMainContentProps) {
  return (
    <article className="w-full">
      {/* Category & Date Metadata Header */}
      <div className="flex flex-wrap items-center gap-3">
        {category && (
          <span
            className="rounded-full bg-[#E8F1EC] px-3.5 py-1 text-xs font-semibold text-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {category}
          </span>
        )}

        {publicationDate && (
          <div
            className="flex items-center gap-1.5 text-xs font-medium text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Image
              src="/Blogs/BlogDetails/svg.svg"
              alt="Calendar"
              width={14}
              height={14}
              className="shrink-0"
            />
            <span>{publicationDate}</span>
          </div>
        )}
      </div>

      {/* Main Title */}
      <h1
        className="mt-4 text-2xl sm:text-3xl lg:text-[38px] font-bold leading-[1.25] tracking-[-0.015em] text-[#202326]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {title}
      </h1>

      {/* Dynamic Sections from Backend */}
      <div className="mt-8 space-y-10">
        {sections.map((section, idx) => {
          const sectionNum = section.sectionNumber || idx + 1;
          const sectionTitle =
            section.tittle ||
            (section as unknown as { title?: string }).title ||
            "";
          const sectionImageUrl = section.imageUrl
            ? getFullImageUrl(section.imageUrl)
            : null;

          return (
            <section
              key={section.id || idx}
              id={`section-${sectionNum}`}
              className="scroll-mt-24"
            >
              {sectionTitle && (
                <h2
                  className="text-xl sm:text-2xl font-bold text-[#202326] leading-snug mb-4"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {sectionNum}. {sectionTitle}
                </h2>
              )}

              {section.content && (
                <div
                  className="text-[15px] sm:text-base leading-[1.8] text-[#202326]/85 whitespace-pre-line"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {section.content}
                </div>
              )}

              {sectionImageUrl && (
                <div className="relative mt-6 mb-2 h-[260px] sm:h-[340px] lg:h-[380px] w-full overflow-hidden rounded-[24px] border border-[#E1E7E3] bg-[#F3F5F3]">
                  <Image
                    src={sectionImageUrl}
                    alt={sectionTitle || "Section illustration"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover object-center"
                  />
                </div>
              )}
            </section>
          );
        })}
      </div>
    </article>
  );
}

