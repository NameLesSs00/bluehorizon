import { RentalItem } from "@/models/rental";

interface RentalAboutSectionProps {
  unit: RentalItem;
}

export default function RentalAboutSection({ unit }: RentalAboutSectionProps) {
  const descriptionParagraphs = (unit.description || "")
    .split("\n\n")
    .filter(Boolean);

  const highlights: { label: string; value: string }[] = [];

  // Availability
  highlights.push({
    label: "Status",
    value: unit.isAvailable ? "Available for Rent" : "Currently Unavailable",
  });

  // Code
  if (unit.code && unit.code.trim().length > 0) {
    highlights.push({
      label: "Unit Code",
      value: unit.code,
    });
  }

  // Location
  if (unit.rentalLocation?.name) {
    highlights.push({
      label: "Location Area",
      value: unit.rentalLocation.name,
    });
  }

  // Floor
  if (unit.floor && unit.floor.trim().length > 0) {
    highlights.push({
      label: "Floor Level",
      value: unit.floor,
    });
  }

  return (
    <div className="rounded-[20px] border border-[#E1E7E3] bg-white p-6 sm:p-7 shadow-xs">
      <h2
        className="text-xl sm:text-2xl font-bold text-[#145C4B]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        About This Rental
      </h2>

      {/* Description */}
      <div className="mt-4 space-y-4 text-sm sm:text-[15px] leading-relaxed text-[#65706B]">
        {descriptionParagraphs.length > 0 ? (
          descriptionParagraphs.map((para, idx) => (
            <p key={idx} style={{ fontFamily: "var(--font-inter)" }}>
              {para}
            </p>
          ))
        ) : (
          <p style={{ fontFamily: "var(--font-inter)" }}>
            No description provided for this rental unit.
          </p>
        )}
      </div>

      {/* Highlight Cards strictly from backend */}
      {highlights.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-[14px] border border-[#E1E7E3]/80 bg-[#FAF8F5] p-3.5 text-center"
            >
              <span
                className="block text-[11px] font-medium text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {h.label}
              </span>
              <span
                className="mt-1 block text-xs sm:text-[13px] font-bold text-[#202326] truncate"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {h.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
