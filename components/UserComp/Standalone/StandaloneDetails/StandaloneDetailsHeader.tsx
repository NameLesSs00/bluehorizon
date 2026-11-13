import { StandaloneUnitItem } from "@/models/standaloneUnit";

interface StandaloneDetailsHeaderProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneDetailsHeader({
  unit,
}: StandaloneDetailsHeaderProps) {
  const formattedPrice =
    typeof unit.price === "number" && unit.price > 0
      ? `EGP ${unit.price.toLocaleString()}`
      : "Price on request";

  const locationParts: string[] = [];
  if (unit.country) locationParts.push(`Country: ${unit.country}`);
  if (unit.city) locationParts.push(`City: ${unit.city}`);
  if (unit.district || unit.street) {
    locationParts.push(
      `Street: ${[unit.street, unit.district].filter(Boolean).join(", ")}`
    );
  }

  return (
    <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
      {/* Title & Location Info */}
      <div>
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B5FA6]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {unit.name}
        </h1>

        {locationParts.length > 0 && (
          <p
            className="mt-2 text-xs sm:text-sm text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {locationParts.join(" \u00A0\u00A0\u00A0 ")}
          </p>
        )}
      </div>

      {/* Asking Price on Right */}
      <div className="md:text-right shrink-0">
        <span
          className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Asking Resale Price
        </span>
        <div
          className="mt-0.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B5FA6]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {formattedPrice}
        </div>
      </div>
    </div>
  );
}

