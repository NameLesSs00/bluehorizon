import { RentalItem } from "@/models/rental";

interface RentalDetailsHeaderProps {
  unit: RentalItem;
}

export default function RentalDetailsHeader({ unit }: RentalDetailsHeaderProps) {
  const metadataItems: { label: string; value: string }[] = [];

  if (unit.rentalLocation?.name) {
    metadataItems.push({ label: "Location", value: unit.rentalLocation.name });
  }
  if (unit.code) {
    metadataItems.push({ label: "Code", value: unit.code });
  }
  if (unit.notes && unit.notes.trim().length > 0) {
    metadataItems.push({ label: "Address", value: unit.notes });
  }

  return (
    <div className="mt-4">
      <h1
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#145C4B]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {unit.name}
      </h1>

      {metadataItems.length > 0 && (
        <div
          className="mt-2.5 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs sm:text-sm text-[#65706B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {metadataItems.map((item) => (
            <span key={item.label}>
              <strong className="font-semibold text-[#202326]">
                {item.label}:
              </strong>{" "}
              {item.value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
