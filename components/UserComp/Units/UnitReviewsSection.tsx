import { NormalizedUnitReview } from "./unitTypes";

interface UnitReviewsSectionProps {
  reviews?: NormalizedUnitReview[];
}

export default function UnitReviewsSection({
  reviews,
}: UnitReviewsSectionProps) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const avgRating = (
    reviews.reduce((acc, curr) => acc + (curr.rate || 0), 0) / reviews.length
  ).toFixed(1);

  return (
    <section className="rounded-[20px] border border-[#E1E7E3] bg-white p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E1E7E3]">
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Client & Visitor Reviews
          </h2>
          <p
            className="mt-1 text-xs text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Real feedback from verified visitors and residents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-[#E8F1EC] px-3.5 py-1.5 text-[#145C4B]">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="#145C4B">
              <path d="M10 1.5l2.6 5.3 5.9.8-4.3 4.2 1 5.9L10 14.9l-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L10 1.5z" />
            </svg>
            <span
              className="text-sm font-bold"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {avgRating}
            </span>
          </div>
          <span
            className="text-xs font-medium text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id || rev.fullName}
            className="rounded-xl bg-[#F3F5F3] p-4 sm:p-5 border border-[#E1E7E3]/60"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#145C4B] text-xs font-bold text-white uppercase">
                  {rev.fullName ? rev.fullName.charAt(0) : "U"}
                </div>
                <div>
                  <span
                    className="block text-sm font-bold text-[#202326]"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {rev.fullName}
                  </span>
                  {rev.createdAt && (
                    <span
                      className="block text-[11px] text-[#8A9590]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill={star <= rev.rate ? "#EAB308" : "#D1D5DB"}
                    aria-hidden="true"
                  >
                    <path d="M10 1.5l2.6 5.3 5.9.8-4.3 4.2 1 5.9L10 14.9l-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L10 1.5z" />
                  </svg>
                ))}
              </div>
            </div>

            <p
              className="text-xs sm:text-[13px] text-[#6B7570] leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

