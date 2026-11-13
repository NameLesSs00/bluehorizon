"use client";

import Link from "next/link";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { usePublicRentalsQuery } from "@/features/rentals/useRentalsQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import RentalUnitCard from "../RentalUnitCard";

interface RentalRelatedUnitsProps {
  currentUnitId: number;
}

export default function RentalRelatedUnits({
  currentUnitId,
}: RentalRelatedUnitsProps) {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";

  const { data, isLoading } = usePublicRentalsQuery({
    Language: locale,
    PageNumber: 1,
    PageSize: 8,
  });

  const rawItems = data?.items || [];
  const relatedUnits = rawItems
    .filter((u) => u.id !== currentUnitId)
    .slice(0, 5);

  if (!isLoading && relatedUnits.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 sm:mt-20 pt-10 border-t border-[#D9E2EE]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("rent.details.relatedTitle")}
          </h2>
          <p
            className="mt-1 text-sm text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("rent.details.relatedSubtitle")}
          </p>
        </div>

        <Link
          href={`/${locale}/rent`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2B5FA6] transition-colors hover:text-[#1B3A6B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span>{t("rent.details.viewAll")}</span>
          {isRtl ? (
            <FiChevronLeft className="h-4 w-4" />
          ) : (
            <FiChevronRight className="h-4 w-4" />
          )}
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedUnits.map((u) => (
          <RentalUnitCard key={u.id} unit={u} />
        ))}
      </div>
    </section>
  );
}
