"use client";

import Link from "next/link";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";

interface RentalBreadcrumbProps {
  unitName?: string;
}

export default function RentalBreadcrumb({ unitName }: RentalBreadcrumbProps) {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-2 text-xs sm:text-[13px] text-[#65706B]"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Link href={`/${locale}`} className="transition-colors hover:text-[#2B5FA6]">
        {t("rent.details.breadcrumbHome")}
      </Link>
      {isRtl ? (
        <FiChevronLeft className="h-3.5 w-3.5 text-[#65706B]/60" />
      ) : (
        <FiChevronRight className="h-3.5 w-3.5 text-[#65706B]/60" />
      )}
      <Link href={`/${locale}/rent`} className="transition-colors hover:text-[#2B5FA6]">
        {t("rent.details.breadcrumbRent")}
      </Link>
      {unitName && (
        <>
          {isRtl ? (
            <FiChevronLeft className="h-3.5 w-3.5 text-[#65706B]/60" />
          ) : (
            <FiChevronRight className="h-3.5 w-3.5 text-[#65706B]/60" />
          )}
          <span className="font-semibold text-[#202326] truncate max-w-[200px] sm:max-w-md">
            {unitName}
          </span>
        </>
      )}
    </nav>
  );
}
