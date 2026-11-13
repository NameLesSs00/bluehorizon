import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io5";
import * as GiIcons from "react-icons/gi";
import type { IconType } from "react-icons";
import { NormalizedUnitService } from "./unitTypes";

// Map of all supported icon packs keyed by prefix
const ICON_PACKS: Record<string, Record<string, IconType>> = {
  Md: MdIcons as Record<string, IconType>,
  Fa: FaIcons as Record<string, IconType>,
  Bs: BsIcons as Record<string, IconType>,
  Io: IoIcons as Record<string, IconType>,
  Gi: GiIcons as Record<string, IconType>,
};

function resolveIcon(iconName: string): IconType | null {
  if (!iconName) return null;
  // Determine which pack by name prefix (e.g. "Md", "Fa", "Bs")
  for (const [prefix, pack] of Object.entries(ICON_PACKS)) {
    if (iconName.startsWith(prefix)) {
      const resolved = pack[iconName];
      if (typeof resolved === "function") return resolved;
    }
  }
  return null;
}

interface UnitFacilitiesSectionProps {
  services?: NormalizedUnitService[];
}

export default function UnitFacilitiesSection({
  services,
}: UnitFacilitiesSectionProps) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[20px] border border-[#E1E7E3] bg-white p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E1E7E3]">
        <h2
          className="text-xl sm:text-2xl font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Facilities & Amenities
        </h2>
        <span
          className="rounded-full bg-[#E8F1EC] px-3 py-1 text-xs font-semibold text-[#145C4B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {services.length} {services.length === 1 ? "Amenity" : "Amenities"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {services.map((service) => (
          <div
            key={service.id || service.name}
            className="flex items-center gap-3 rounded-xl bg-[#F3F5F3] p-3 border border-[#E1E7E3]/60 transition-colors hover:border-[#145C4B]/30"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#145C4B] shadow-xs">
              {service.icon ? (() => {
                const ResolvedIcon = resolveIcon(service.icon);
                return ResolvedIcon ? (
                  <ResolvedIcon size={20} color="#145C4B" aria-hidden="true" />
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="#145C4B"
                    strokeWidth="1.6"
                  >
                    <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                );
              })() : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="#145C4B"
                  strokeWidth="1.6"
                >
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>

            <span
              className="text-xs sm:text-[13px] font-semibold text-[#202326] truncate"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {service.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

