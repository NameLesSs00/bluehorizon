"use client";

import { useTranslation } from "@/features/i18n/useTranslation";
import { RentalItem, PROPERTY_TYPE_LABELS } from "@/models/rental";

interface RentalSpecsBarProps {
  unit: RentalItem;
}

export default function RentalSpecsBar({ unit }: RentalSpecsBarProps) {
  const { t } = useTranslation();

  const primaryPrice =
    unit.prices?.find((p) => p.currency.toUpperCase() === "EGP") ||
    unit.prices?.[0];

  const specs: { label: string; value: string }[] = [];

  if (primaryPrice) {
    specs.push({
      label: t("rent.details.specs.price"),
      value: `${primaryPrice.currency.toUpperCase()} ${Number(primaryPrice.price).toLocaleString()}`,
    });
  }

  if (typeof unit.size === "number" && unit.size > 0) {
    specs.push({
      label: t("rent.details.specs.area"),
      value: `${unit.size} m²`,
    });
  }

  if (
    unit.propertyType !== undefined &&
    unit.propertyType !== null &&
    PROPERTY_TYPE_LABELS[unit.propertyType]
  ) {
    specs.push({
      label: t("rent.details.specs.unitType"),
      value: PROPERTY_TYPE_LABELS[unit.propertyType],
    });
  }

  if (typeof unit.bedroomNo === "number") {
    specs.push({
      label: t("rent.details.specs.bedrooms"),
      value:
        unit.bedroomNo === 1
          ? t("rent.card.bedroomSingle")
          : t("rent.card.bedrooms").replace("{count}", String(unit.bedroomNo)),
    });
  }

  if (typeof unit.bathroomNo === "number") {
    specs.push({
      label: t("rent.details.specs.bathrooms"),
      value:
        unit.bathroomNo === 1
          ? t("rent.card.bathroomSingle")
          : t("rent.card.bathrooms").replace("{count}", String(unit.bathroomNo)),
    });
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 rounded-[20px] border border-[#D9E2EE] bg-white p-4 sm:p-5 shadow-xs">
      {specs.map((item) => (
        <div
          key={item.label}
          className="rounded-[14px] bg-[#F0F3FA] p-3 text-center sm:text-start"
        >
          <span
            className="block text-[11px] font-bold uppercase tracking-wider text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {item.label}
          </span>
          <span
            className="mt-1 block text-sm sm:text-base font-bold text-[#202326] truncate"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
