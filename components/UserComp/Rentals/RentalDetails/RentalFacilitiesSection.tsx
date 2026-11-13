import {
  TbPool,
  TbSmartHome,
  TbCar,
  TbBeach,
  TbShieldCheck,
  TbAirConditioning,
  TbBarbell,
  TbBuilding,
  TbWifi,
  TbTools,
  TbSun,
} from "react-icons/tb";
import { RentalItem } from "@/models/rental";

interface RentalFacilitiesSectionProps {
  unit: RentalItem;
}

function getFacilityIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("pool")) return TbPool;
  if (lower.includes("smart") || lower.includes("automation")) return TbSmartHome;
  if (lower.includes("park") || lower.includes("garage")) return TbCar;
  if (lower.includes("beach") || lower.includes("sea")) return TbBeach;
  if (lower.includes("security") || lower.includes("gated")) return TbShieldCheck;
  if (lower.includes("ac") || lower.includes("air")) return TbAirConditioning;
  if (lower.includes("gym") || lower.includes("fitness") || lower.includes("spa")) return TbBarbell;
  if (lower.includes("elevator") || lower.includes("lift")) return TbBuilding;
  if (lower.includes("wifi") || lower.includes("internet")) return TbWifi;
  if (lower.includes("sun") || lower.includes("terrace")) return TbSun;
  return TbTools;
}

export default function RentalFacilitiesSection({
  unit,
}: RentalFacilitiesSectionProps) {
  const rawCategories = unit.categoryItems || [];
  const rawServices = unit.listingDetails?.services || [];

  // Combine real backend category items and services without duplicates
  const categoryNames = rawCategories.map((c) => c.name);
  const serviceNames = rawServices.filter(
    (s) => !categoryNames.some((c) => c.toLowerCase() === s.toLowerCase())
  );
  const additionalPerks: string[] = [];
  if (
    unit.listingDetails?.privateEntrance &&
    !categoryNames.some((c) => c.toLowerCase().includes("entrance"))
  ) {
    additionalPerks.push("Private Entrance");
  }
  if (
    unit.listingDetails?.familyFriendly &&
    !categoryNames.some((c) => c.toLowerCase().includes("family"))
  ) {
    additionalPerks.push("Family Friendly");
  }

  const allNames = [...categoryNames, ...serviceNames, ...additionalPerks];

  // If backend has no facilities, do not invent fake ones
  if (allNames.length === 0) {
    return null;
  }

  const items = allNames.map((name) => ({
    name,
    icon: getFacilityIcon(name),
  }));

  return (
    <div className="rounded-[20px] border border-[#E1E7E3] bg-white p-6 sm:p-7 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-[#145C4B]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Facilities &amp; Amenities
          </h2>
          <p
            className="mt-1 text-xs sm:text-sm text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Inclusions and amenities associated with this property
          </p>
        </div>

        <span
          className="inline-flex shrink-0 items-center rounded-full bg-[#E8F1EC] px-3.5 py-1 text-xs font-semibold text-[#145C4B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {items.length} Included
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((facility) => {
          const IconComponent = facility.icon;
          return (
            <div
              key={facility.name}
              className="flex flex-col items-center justify-center rounded-[16px] border border-[#E1E7E3]/80 bg-[#FAF8F5] p-4 text-center transition-all hover:border-[#145C4B]/40 hover:shadow-2xs"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#145C4B] shadow-2xs">
                <IconComponent className="h-5 w-5" />
              </div>
              <span
                className="mt-2.5 text-xs sm:text-[13px] font-semibold text-[#202326] line-clamp-1"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {facility.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
