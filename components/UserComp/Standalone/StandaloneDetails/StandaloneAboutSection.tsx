import { StandaloneUnitItem } from "@/models/standaloneUnit";

interface StandaloneAboutSectionProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneAboutSection({
  unit,
}: StandaloneAboutSectionProps) {
  const hasDescription = Boolean(unit.description && unit.description.trim().length > 0);

  const cityGov = [unit.city, unit.district].filter(Boolean).join(", ");
  const streetDistrict = [unit.street, unit.district].filter(Boolean).join(", ");
  const hasLocation = Boolean(unit.country || cityGov || streetDistrict);

  // If neither description nor location info is available, hide section entirely
  if (!hasDescription && !hasLocation) {
    return null;
  }

  return (
    <div className="rounded-[20px] border border-[#E1E7E3] bg-white p-6 sm:p-8 shadow-sm">
      <h2
        className="text-xl sm:text-2xl font-bold text-[#202326]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        About This Standalone Property
      </h2>

      {/* Description text */}
      {hasDescription && (
        <div
          className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {unit.description.split("\n\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      )}

      {/* Geographic Location & Legal Registry Details Card */}
      {hasLocation && (
        <div className="mt-8 rounded-[16px] border border-[#E1E7E3] bg-[#F3F5F3] p-5 sm:p-6">
          <h3
            className="text-xs sm:text-sm font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Geographic Location &amp; Legal Registry Details
          </h3>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Country */}
            {unit.country && (
              <div className="rounded-[12px] bg-white p-3.5 border border-[#E1E7E3]">
                <span
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7570]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Country
                </span>
                <span
                  className="mt-1 block text-xs sm:text-sm font-semibold text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {unit.country}
                </span>
              </div>
            )}

            {/* City / Governorate */}
            {cityGov && (
              <div className="rounded-[12px] bg-white p-3.5 border border-[#E1E7E3]">
                <span
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7570]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  City / Governorate
                </span>
                <span
                  className="mt-1 block text-xs sm:text-sm font-semibold text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {cityGov}
                </span>
              </div>
            )}

            {/* Street / District */}
            {streetDistrict && (
              <div className="rounded-[12px] bg-white p-3.5 border border-[#E1E7E3]">
                <span
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7570]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Street / District
                </span>
                <span
                  className="mt-1 block text-xs sm:text-sm font-semibold text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {streetDistrict}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
