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
  const { t, locale, direction } = useTranslation();
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
            <span style={{ fontFamily: "var(--font-inter)" }}>{blog.date}</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          {/* Category Pill */}
          {blog.category && (
            <div className="mb-3.5 w-fit rounded-[16px] bg-[#E5ECF6] px-3.5 py-1 text-xs font-semibold text-[#2B5FA6]">
              <span style={{ fontFamily: "var(--font-inter)" }}>
                {blog.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h3
            className="line-clamp-2 text-lg sm:text-[19px] font-bold text-[#202326] leading-snug group-hover:text-[#2B5FA6] transition-colors"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {blog.title}
          </h3>

          {/* Excerpt */}
          {blog.description && (
            <p
              className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {blog.description}
            </p>
          )}
        </div>

        {/* Read More Action */}
        <div className="mt-6 pt-2">
          <span
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B5FA6] transition-colors group-hover:text-[#1B3A6B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Image
              src="/Blogs/svg (6).svg"
              alt=""
              width={18}
              height={18}
              className={`shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
                direction === "rtl" ? "scale-x-[-1]" : ""
              }`}
            />
            <span>{t("home.blogs.readMore", "Read More")}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
