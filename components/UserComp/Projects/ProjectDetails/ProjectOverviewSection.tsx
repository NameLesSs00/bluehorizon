interface ProjectOverviewSectionProps {
  title?: string;
  locationName?: string | null;
  description?: string | null;
  availableUnitsCount?: number;
}

export default function ProjectOverviewSection({
  title,
  locationName,
  description,
  availableUnitsCount,
}: ProjectOverviewSectionProps) {
  const displayHeading = locationName
    ? `${locationName} Project Overview`
    : title
    ? `${title} Project Overview`
    : "Project Overview";

  const hasDescription = Boolean(description && description.trim().length > 0);
  const hasCount =
    typeof availableUnitsCount === "number" && availableUnitsCount > 0;

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <h1
            className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {displayHeading}
          </h1>

          {hasDescription && (
            <p
              className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {description}
            </p>
          )}
        </div>

        {hasCount && (
          <div className="self-start md:self-auto shrink-0">
            <div className="flex flex-col items-center justify-center rounded-[20px] bg-[#F3F5F3] px-8 py-5 sm:px-10 sm:py-6 text-center border border-[#E1E7E3]/60">
              <span
                className="text-3xl sm:text-[38px] font-bold leading-none text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {availableUnitsCount}
              </span>
              <span
                className="mt-1.5 text-xs sm:text-[13px] font-medium text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                available units
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
