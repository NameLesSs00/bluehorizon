interface UnitDetailsHeaderProps {
  title: string;
  location?: string;
  priceFormatted: string;
  badge: "Primary" | "Resale";
  propertyType?: string;
}

export default function UnitDetailsHeader({
  title,
  location,
  priceFormatted,
  badge,
  propertyType,
}: UnitDetailsHeaderProps) {
  const isResale = badge === "Resale";

  return (
    <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pb-5">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        {/* Left: Title + Location & Badges */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isResale
                  ? "bg-[#202326] text-white"
                  : "bg-[#E5ECF6] text-[#2B5FA6]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {isResale ? "Resale Unit" : "Primary Unit"}
            </span>

            {propertyType && (
              <span
                className="rounded-full bg-[#F0F3FA] px-3 py-1 text-xs font-medium text-[#6B7570] border border-[#D9E2EE]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {propertyType}
              </span>
            )}
          </div>

          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202326] tracking-tight"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {title}
          </h1>

          {location && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#6B7570]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="shrink-0"
              >
                <path
                  d="M8 1.5C5.23858 1.5 3 3.73858 3 6.5C3 10.25 8 14.5 8 14.5C8 14.5 13 10.25 13 6.5C13 3.73858 10.7614 1.5 8 1.5ZM8 8.25C7.0335 8.25 6.25 7.4665 6.25 6.5C6.25 5.5335 7.0335 4.75 8 4.75C8.9665 4.75 9.75 5.5335 9.75 6.5C9.75 7.4665 8.9665 8.25 8 8.25Z"
                  stroke="#2B5FA6"
                  strokeWidth="1.4"
                />
              </svg>
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* Right: Price */}
        <div className="md:text-right">
          <span
            className="block text-xs font-semibold uppercase tracking-wider text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Asking Price
          </span>
          <span
            className="block text-2xl sm:text-3xl font-extrabold text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {priceFormatted}
          </span>
        </div>
      </div>
    </div>
  );
}

