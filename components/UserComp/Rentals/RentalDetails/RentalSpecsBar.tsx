import { RentalItem, PROPERTY_TYPE_LABELS } from "@/models/rental";

interface RentalSpecsBarProps {
  unit: RentalItem;
}

export default function RentalSpecsBar({ unit }: RentalSpecsBarProps) {
  const primaryPrice =
    unit.prices?.find((p) => p.currency.toUpperCase() === "EGP") ||
    unit.prices?.[0];

  const specs: { label: string; value: string }[] = [];

  if (primaryPrice) {
    specs.push({
      label: "PRICE",
      value: `${primaryPrice.currency.toUpperCase()} ${Number(primaryPrice.price).toLocaleString()}`,
    });
  }

  if (typeof unit.size === "number" && unit.size > 0) {
    specs.push({
      label: "TOTAL AREA",
      value: `${unit.size} m²`,
    });
  }

  if (
    unit.propertyType !== undefined &&
    unit.propertyType !== null &&
    PROPERTY_TYPE_LABELS[unit.propertyType]
  ) {
    specs.push({
      label: "UNIT TYPE",
      value: PROPERTY_TYPE_LABELS[unit.propertyType],
    });
  }

  if (typeof unit.bedroomNo === "number") {
    specs.push({
      label: "BEDROOMS",
      value: `${unit.bedroomNo} ${unit.bedroomNo === 1 ? "Room" : "Rooms"}`,
    });
  }

  if (typeof unit.bathroomNo === "number") {
    specs.push({
      label: "BATHROOMS",
      value: `${unit.bathroomNo} ${unit.bathroomNo === 1 ? "Bath" : "Baths"}`,
    });
  }

  if (typeof unit.capacity === "number" && unit.capacity > 0) {
    specs.push({
      label: "MAX CAPACITY",
      value: `Up to ${unit.capacity} Guests`,
    });
  }

  if (unit.floor && unit.floor.trim().length > 0) {
    specs.push({
      label: "FLOOR",
      value: unit.floor,
    });
  }

  if (specs.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 rounded-[16px] border border-[#E1E7E3] bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex flex-wrap items-center gap-y-4 gap-x-6 sm:gap-x-8">
        {specs.map((item, idx) => (
          <div
            key={item.label}
            className={`flex flex-col ${
              idx !== 0 ? "sm:border-l sm:border-[#E1E7E3] sm:pl-6" : ""
            }`}
          >
            <span
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.label}
            </span>
            <span
              className="mt-0.5 text-sm sm:text-base font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
