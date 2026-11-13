interface AreaOverviewSectionProps {
  areaName?: string;
  description?: string | null;
  activeUnitsCount?: number;
  activeProjectsCount?: number;
}



export default function AreaOverviewSection({
  areaName,
  description,
  activeUnitsCount,
  activeProjectsCount,
}: AreaOverviewSectionProps) {
  const name = areaName || "this area";
  const displayHeading = areaName ? `${areaName} Area Overview` : "Area Overview";
  const defaultDescription = `Welcome to ${name}, one of the Red Sea's most prestigious and sought-after destinations. Known for its picturesque coastal panoramas, serene beaches, and vibrant master-planned communities, it offers an idyllic fusion of modern luxury and relaxed resort living. Whether you are looking for high-yielding buy-to-let investments or a serene waterfront home, discover our curated collection of verified developer primary suites and secondary market resale opportunities.`;
  const textToShow =
    description && description.trim().length > 0
      ? description
      : defaultDescription;

  const totalCount =
    typeof activeUnitsCount === "number"
      ? activeUnitsCount
      : typeof activeProjectsCount === "number"
      ? activeProjectsCount
      : 0;

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Left Column: Title, Narrative Text & Highlight Chips */}
        <div className="max-w-3xl">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            DISCOVER THE NEIGHBORHOOD
          </p>

          <h1
            className="mt-2 text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {displayHeading}
          </h1>

          <p
            className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {textToShow}
          </p>

          
        </div>

        {/* Right Column: Key Stats Card */}
        <div className="self-start lg:self-auto shrink-0 w-full sm:w-auto">
          <div className="flex sm:flex-col items-center justify-between sm:justify-center rounded-[24px] bg-white px-8 py-5 sm:px-10 sm:py-7 text-center border border-[#E1E7E3] shadow-xs">
            <div>
              <span
                className="text-3xl sm:text-[40px] font-bold leading-none text-[#145C4B]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {totalCount > 0 ? `${totalCount}+` : "Verified"}
              </span>
              <span
                className="block mt-2 text-xs sm:text-[13px] font-semibold text-[#202326]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Available units
              </span>
            </div>
            <div className="sm:mt-4 sm:pt-4 sm:border-t sm:border-[#E1E7E3]/80">
              <span
                className="text-xs text-[#8A9590]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Primary & Resale
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
