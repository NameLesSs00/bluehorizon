"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/features/i18n/useTranslation";

export interface BlogCardData {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  imageUrl?: string | null;
}

interface BlogCardProps {
  blog: BlogCardData;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const { t, locale } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const displayImage =
    !imageError && blog.imageUrl && blog.imageUrl.trim().length > 0
      ? blog.imageUrl
      : "/default-fallback.png";

  const blogHref = `/${locale}/blogs/${encodeURIComponent(blog.title || String(blog.id))}`;

  return (
    <Link
      className="group flex flex-col overflow-hidden rounded-[24px] border border-[#D9E2EE] bg-white transition-all duration-300 hover:shadow-xl hover:border-[#2B5FA6]/40"
      href={blogHref}
    >
      {/* Top Image Container */}
      <div className="relative h-[220px] sm:h-[240px] w-full overflow-hidden bg-[#F0F3FA]">
        <Image
          src={displayImage}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImageError(true)}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Date Badge Overlay */}
        {blog.date && (
          <div className="absolute top-4 start-4 z-10 flex items-center gap-1.5 rounded-[20px] bg-[#E5ECF6] px-3.5 py-1.5 text-xs font-semibold text-[#2B5FA6]">
            <Image
              src="/Blogs/svg (3).svg"
              alt=""
              width={14}
              height={14}
              className="shrink-0"
            />
            <span>{blog.date}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          {/* Category Pill */}
          {blog.category && (
            <span
              className="inline-block rounded-full bg-[#F0F3FA] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {blog.category}
            </span>
          )}

          {/* Title */}
          <h3
            className="mt-3 text-lg sm:text-xl font-bold leading-snug text-[#202326] line-clamp-2 transition-colors duration-200 group-hover:text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {blog.title}
          </h3>

          {/* Description */}
          <p
            className="mt-2.5 text-xs sm:text-[13px] font-normal leading-relaxed text-[#6B7570] line-clamp-3"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {blog.description}
          </p>
        </div>

        {/* Read Article Link */}
        <div className="mt-6 flex items-center justify-between border-t border-[#D9E2EE] pt-4">
          <span
            className="text-xs sm:text-[13px] font-semibold text-[#2B5FA6] transition-colors duration-200 group-hover:text-[#1B3A6B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("blogs.grid.readArticle", "Read Article")}
          </span>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F3FA] text-[#2B5FA6] transition-all duration-200 group-hover:bg-[#2B5FA6] group-hover:text-white">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rtl:rotate-180"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
