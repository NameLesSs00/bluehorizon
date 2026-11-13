"use client";

import { useTranslation } from "@/features/i18n/useTranslation";
import { RentalItem } from "@/models/rental";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

interface RentalFacilitiesSectionProps {
  unit: RentalItem;
}

export default function RentalFacilitiesSection({
  unit,
}: RentalFacilitiesSectionProps) {
  const { t } = useTranslation();
  const rawCategories = unit.categoryItems || [];
  const rawServices = unit.listingDetails?.services || [];

  // Sort categories by backend displayOrder
  const sortedCategories = [...rawCategories].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  );

  const categoryNames = new Set(
    sortedCategories.map((c) => c.name.toLowerCase().trim())
  );

  // Additional services from listingDetails without guessing icons (safe fallback icon)
  const additionalItems: { key: string; name: string; icon?: string | null }[] = [];

  rawServices.forEach((service, idx) => {
    const trimmed = service?.trim();
    if (trimmed && !categoryNames.has(trimmed.toLowerCase())) {
      additionalItems.push({
        key: `service-${idx}-${trimmed}`,
        name: trimmed,
        icon: null,
      });
    }
  });

  if (
    unit.listingDetails?.privateEntrance &&
    !categoryNames.has("private entrance") &&
    !categoryNames.has("مدخل خاص")
  ) {
    additionalItems.push({
      key: "perk-private-entrance",
      name: "Private Entrance",
      icon: null,
    });
  }

  const allFacilities = [
    ...sortedCategories.map((c) => ({
      key: `cat-${c.id}`,
      name: c.name,
      icon: c.icon || null,
    })),
    ...additionalItems,
  ];

  if (allFacilities.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-6 sm:p-7 shadow-xs">
      <h2
        className="text-xl sm:text-2xl font-bold text-[#2B5FA6]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {t("rent.details.facilitiesTitle")}
      </h2>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {allFacilities.map((facility) => (
          <div
            key={facility.key}
            className="flex items-center gap-2.5 rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] p-3 text-xs sm:text-sm font-semibold text-[#202326] transition-colors hover:border-[#2B5FA6]/50 hover:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#2B5FA6] shadow-2xs shrink-0">
              <DynamicIcon
                name={facility.icon}
                className="h-4 w-4 text-[#2B5FA6]"
                fallbackClassName="h-4 w-4 text-[#65706B]"
              />
            </div>
            <span className="truncate">{facility.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
