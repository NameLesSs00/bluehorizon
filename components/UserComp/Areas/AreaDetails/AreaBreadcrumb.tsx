"use client";

import Link from "next/link";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";

interface AreaBreadcrumbProps {
  areaName?: string;
}

export default function AreaBreadcrumb({ areaName }: AreaBreadcrumbProps) {
  const { t, locale, direction } = useTranslation();
  const displayName = areaName || t("areas.details.defaultTitle");
  const ChevronIcon = direction === "rtl" ? FiChevronLeft : FiChevronRight;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pt-4 pb-4"
    >
      <ol
        className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-[#6B7570]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <li>
          <Link
            href={`/${locale}`}
            className="transition-colors hover:text-[#2B5FA6]"
          >
            {t("areas.details.breadcrumbHome")}
          </Link>
        </li>
        <li aria-hidden="true" className="select-none text-[#A1AAA5]">
          <ChevronIcon className="h-3.5 w-3.5" />
        </li>
        <li>
          <Link
            href={`/${locale}/areas`}
            className="transition-colors hover:text-[#2B5FA6]"
          >
            {t("areas.details.breadcrumbAreas")}
          </Link>
        </li>
        <li aria-hidden="true" className="select-none text-[#A1AAA5]">
          <ChevronIcon className="h-3.5 w-3.5" />
        </li>
        <li
          aria-current="page"
          className="font-medium text-[#202326] truncate max-w-[240px] sm:max-w-none"
        >
          {displayName}
        </li>
      </ol>
    </nav>
  );
}
