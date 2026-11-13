import { StandaloneUnitItem } from "@/models/standaloneUnit";

interface StandaloneFacilitiesSectionProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneFacilitiesSection({
  unit,
}: StandaloneFacilitiesSectionProps) {
  const services = unit.services || [];
  const count = services.length;

  // If no real facilities/services exist from backend, hide the section entirely
  if (count === 0) {
    return null;
  }

  return (
    <div className="rounded-[20px] border border-[#E1E7E3] bg-white p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Facilities &amp; Amenities
          </h2>
          <p
            className="mt-1 text-xs sm:text-sm text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Private unit inclusions and compound lifestyle privileges
          </p>
        </div>

        <span
          className="rounded-full bg-[#E8F1EC] px-3.5 py-1 text-xs font-semibold text-[#145C4B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {count} Included
        </span>
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center justify-center rounded-[16px] border border-[#E1E7E3] bg-[#F3F5F3] p-4 text-center transition-colors hover:bg-white hover:border-[#145C4B]/40"
          >
            {/* Facility Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#145C4B] shadow-xs">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <span
              className="mt-2.5 text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {service.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
