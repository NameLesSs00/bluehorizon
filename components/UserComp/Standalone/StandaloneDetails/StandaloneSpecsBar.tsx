import { StandaloneUnitItem } from "@/models/standaloneUnit";

interface StandaloneSpecsBarProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneSpecsBar({ unit }: StandaloneSpecsBarProps) {
  const specs: { label: string; value: string }[] = [];

  const currencySymbol =
    unit.currencyCode === "USD"
      ? "$ "
      : unit.currencyCode === "EUR"
      ? "€ "
      : unit.currencyCode === "GBP"
      ? "£ "
      : unit.currencyCode
      ? `${unit.currencyCode} `
      : "EGP ";

  if (typeof unit.price === "number" && unit.price > 0) {
    specs.push({
      label: "TOTAL PRICE",
      value: `${currencySymbol}${unit.price.toLocaleString()}`,
    });
  }

  if (typeof unit.area === "number" && unit.area > 0) {
    specs.push({
      label: "TOTAL AREA",
      value: `${unit.area} m²`,
    });
  }

  if (unit.propertyType) {
    specs.push({
      label: "UNIT TYPE",
      value: unit.propertyType,
    });
  }

  if (unit.view) {
    specs.push({
      label: "PRIMARY VIEW",
      value: unit.view,
    });
  }

  if (typeof unit.noBedRoom === "number" && unit.noBedRoom > 0) {
    specs.push({
      label: "BEDROOMS",
      value: `${unit.noBedRoom} ${unit.noBedRoom === 1 ? "Room" : "Rooms"}`,
    });
  }

  if (typeof unit.noBathRoom === "number" && unit.noBathRoom > 0) {
    specs.push({
      label: "BATHROOMS",
      value: `${unit.noBathRoom} ${unit.noBathRoom === 1 ? "Bath" : "Baths"}`,
    });
  }

  if (typeof unit.noKitchen === "number" && unit.noKitchen > 0) {
    specs.push({
      label: "KITCHENS",
      value: `${unit.noKitchen} Kitchen`,
    });
  }

  if (unit.floorName) {
    specs.push({
      label: "FLOOR",
      value: unit.floorName,
    });
  } else if (typeof unit.floorNumber === "number") {
    specs.push({
      label: "FLOOR",
      value: unit.floorNumber === 0 ? "Ground" : `${unit.floorNumber}th`,
    });
  }

  if (specs.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-sm">
      <div
        className="grid min-w-[560px] divide-x divide-[#D9E2EE] text-center"
        style={{
          gridTemplateColumns: `repeat(${specs.length}, minmax(0, 1fr))`,
        }}
      >
        {specs.map((item, idx) => (
          <div key={idx} className="px-3">
            <span
              className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.label}
            </span>
            <span
              className="mt-1 block text-sm sm:text-base font-bold text-[#202326] truncate"
              title={item.value}
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
