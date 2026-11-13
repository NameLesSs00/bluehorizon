"use client";

import Link from "next/link";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";

interface BlogBreadcrumbProps {
  title?: string;
  category?: string | null;
}

export default function BlogBreadcrumb({
  title,
  category,
}: BlogBreadcrumbProps) {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const currentLabel = category || title || t("blogs.details.breadcrumbDetails");

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-6 mb-4 flex items-center gap-2 text-[13px] text-[#6B7570]"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Link href={`/${locale}`} className="transition-colors hover:text-[#2B5FA6]">
        {t("blogs.details.breadcrumbHome")}
      </Link>
      {isRtl ? (
        <FiChevronLeft className="h-3.5 w-3.5 text-[#6B7570]/60 shrink-0" />
      ) : (
        <FiChevronRight className="h-3.5 w-3.5 text-[#6B7570]/60 shrink-0" />
      )}
      <Link href={`/${locale}/blogs`} className="transition-colors hover:text-[#2B5FA6]">
        {t("blogs.details.breadcrumbBlogs")}
      </Link>
      {isRtl ? (
        <FiChevronLeft className="h-3.5 w-3.5 text-[#6B7570]/60 shrink-0" />
      ) : (
        <FiChevronRight className="h-3.5 w-3.5 text-[#6B7570]/60 shrink-0" />
      )}
      <span className="font-semibold text-[#202326] truncate max-w-[300px] sm:max-w-md">
        {currentLabel}
      </span>
    </nav>
  );
}
