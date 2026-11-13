"use client";

import { useTranslation } from "@/features/i18n/useTranslation";
import { RentalItem } from "@/models/rental";

interface RentalAboutSectionProps {
  unit: RentalItem;
}

export default function RentalAboutSection({ unit }: RentalAboutSectionProps) {
  const { t } = useTranslation();
  const descriptionParagraphs = (unit.description || "")
    .split("\n\n")
    .filter(Boolean);

  const highlights: { label: string; value: string }[] = [];

  // Availability
  highlights.push({
    label: t("rent.details.status"),
    value: unit.isAvailable
      ? t("rent.details.available")
      : t("rent.details.unavailable"),
  });

  // Code
  if (unit.code && unit.code.trim().length > 0) {
    highlights.push({
      label: t("rent.details.code"),
      value: unit.code,
    });
  }

  // Location
  if (unit.rentalLocation?.name) {
    highlights.push({
      label: t("rent.details.location"),
      value: unit.rentalLocation.name,
    });
  }

  // Floor
  if (unit.floor && unit.floor.trim().length > 0) {
    highlights.push({
      label: t("rent.details.floor"),
      value: unit.floor,
    });
  }

  return (
    <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-6 sm:p-7 shadow-xs">
      <h2
        className="text-xl sm:text-2xl font-bold text-[#2B5FA6]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {t("rent.details.aboutTitle")}
      </h2>

      {/* Highlights Grid */}
      {highlights.length > 0 && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-[#D9E2EE] pb-5">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-[12px] bg-[#F0F3FA] p-3 text-start"
            >
              <span
                className="block text-[11px] font-semibold text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.label}
              </span>
              <span
                className="mt-0.5 block text-xs sm:text-sm font-bold text-[#202326] truncate"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Description Body */}
      <div
        className="mt-5 space-y-3.5 text-xs sm:text-sm leading-relaxed text-[#65706B]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {descriptionParagraphs.length > 0 ? (
          descriptionParagraphs.map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <p>{unit.description || ""}</p>
        )}
      </div>
    </div>
  );
}
