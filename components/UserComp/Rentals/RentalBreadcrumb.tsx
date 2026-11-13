"use client";

import Link from "next/link";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";

export default function RentalBreadcrumb() {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-[1536px] px-4 pt-6 pb-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <ol className="flex items-center gap-2 text-xs font-medium text-[#65706B]">
        <li>
          <Link
            href={`/${locale}`}
            className="transition-colors hover:text-[#1B3A6B]"
          >
            {t("rent.breadcrumb.home")}
          </Link>
        </li>
        <li>
          {isRtl ? (
            <FiChevronLeft className="h-3.5 w-3.5 text-[#9CA3AF]" />
          ) : (
            <FiChevronRight className="h-3.5 w-3.5 text-[#9CA3AF]" />
          )}
        </li>
        <li className="font-semibold text-[#1B3A6B]">
          {t("rent.breadcrumb.unitsForRent")}
        </li>
      </ol>
    </nav>
  );
}
