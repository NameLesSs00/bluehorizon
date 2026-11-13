"use client";

import { StandaloneUnitItem } from "@/models/standaloneUnit";
import { useTranslation } from "@/features/i18n/useTranslation";

interface StandaloneReviewsSectionProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneReviewsSection({
  unit,
}: StandaloneReviewsSectionProps) {
  const { t } = useTranslation();
  const reviews = unit.reviews || [];

  // If no real reviews exist from backend, hide the section entirely
  if (reviews.length === 0) {
    return null;
  }

  // Compute average from real reviews
  const averageRating = (
    reviews.reduce((acc, r) => acc + (r.rate || 5), 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("standaloneDetail.reviews.title", "Client & Visitor Reviews")}
          </h2>
          <p
            className="mt-1 text-xs sm:text-sm text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t(
              "standaloneDetail.reviews.subtitle",
              "Verified feedback from site visits and property inspections"
            )}
          </p>
        </div>

        <button
          type="button"
          className="self-start sm:self-auto rounded-[12px] border border-[#2B5FA6] px-5 py-2 text-xs sm:text-sm font-semibold text-[#2B5FA6] transition-colors hover:bg-[#E5ECF6]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("standaloneDetail.reviews.writeReview", "Write a Review")}
        </button>
      </div>

      {/* Rating Summary Card */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-6 rounded-[16px] border border-[#D9E2EE] bg-[#F0F3FA] p-6">
        {/* Big Number */}
        <div className="flex flex-col items-center sm:border-r sm:border-[#D9E2EE] sm:pr-8">
          <span
            className="text-4xl sm:text-5xl font-extrabold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {averageRating}
          </span>
          <div className="mt-2 flex items-center gap-1 text-[#2B5FA6]">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span
            className="mt-1 text-xs text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {reviews.length}{" "}
            {reviews.length === 1
              ? t("standaloneDetail.reviews.review", "review")
              : t("standaloneDetail.reviews.reviews", "reviews")}
          </span>
        </div>

        {/* Rating Bars */}
        <div className="flex-1 w-full space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const countForStar = reviews.filter(
              (r) => Math.round(r.rate) === stars
            ).length;
            const percentage = (countForStar / reviews.length) * 100;

            return (
              <div key={stars} className="flex items-center gap-3 text-xs text-[#6B7570]">
                <span className="w-3 text-right">{stars}</span>
                <div className="h-2 flex-1 rounded-full bg-[#D9E2EE] overflow-hidden">
                  <div
                    className="h-full bg-[#2B5FA6] rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review List */}
      <div className="mt-6 space-y-4">
        {reviews.map((rev) => {
          const initials = rev.fullName
            ? rev.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            : "BH";

          return (
            <div
              key={rev.id}
              className="rounded-[16px] border border-[#D9E2EE] bg-[#F0F3FA] p-4 sm:p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2B5FA6] text-xs font-bold text-white">
                  {initials}
                </div>
                <div>
                  <h4
                    className="text-xs sm:text-sm font-bold text-[#202326]"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {rev.fullName}
                  </h4>
                  <span
                    className="text-[11px] text-[#6B7570]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {rev.createdAt
                      ? `${t("standaloneDetail.reviews.inspectedOn", "Inspected on")} ${new Date(
                          rev.createdAt
                        ).toLocaleDateString()}`
                      : t(
                          "standaloneDetail.reviews.verifiedVisitor",
                          "Verified Visitor"
                        )}
                  </span>
                </div>
              </div>

              <p
                className="mt-3 text-xs sm:text-sm leading-relaxed text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {rev.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
