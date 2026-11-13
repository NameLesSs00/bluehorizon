import Image from "next/image";
import { ProjectFacilityRef } from "@/models/project";

interface ProjectFacilitiesSectionProps {
  facilities?: ProjectFacilityRef[];
}

function resolveFacilityIcon(name: string): string {
  const lower = (name || "").toLowerCase();
  if (lower.includes("lagoon") || lower.includes("lake") || lower.includes("water")) {
    return "/Projectdetails/fac-ic.svg";
  }
  if (lower.includes("pool") || lower.includes("swim")) {
    return "/Projectdetails/fac-ic (1).svg";
  }
  if (lower.includes("beach") || lower.includes("sea")) {
    return "/Projectdetails/fac-ic (7).svg";
  }
  if (lower.includes("club") || lower.includes("house") || lower.includes("building")) {
    return "/Projectdetails/fac-ic (2).svg";
  }
  if (lower.includes("restaurant") || lower.includes("dining") || lower.includes("food")) {
    return "/Projectdetails/fac-ic (6).svg";
  }
  if (lower.includes("cafe") || lower.includes("coffee")) {
    return "/Projectdetails/fac-ic (3).svg";
  }
  if (lower.includes("gym") || lower.includes("fitness") || lower.includes("sport")) {
    return "/Projectdetails/fac-ic (5).svg";
  }
  if (lower.includes("spa") || lower.includes("wellness")) {
    return "/Projectdetails/fac-ic (4).svg";
  }
  return "/Projectdetails/fac-ic.svg";
}

export default function ProjectFacilitiesSection({
  facilities,
}: ProjectFacilitiesSectionProps) {
  const hasFacilities = Boolean(facilities && facilities.length > 0);
  const displayItems = (facilities || []).map((f) => ({
    id: f.id,
    name: f.name,
    iconSrc: resolveFacilityIcon(f.name),
  }));

  const countBadge = `${displayItems.length} Amenities Available`;

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16">
      <div className="rounded-[24px] bg-[#F3F5F3] p-6 sm:p-8 lg:p-10 border border-[#E1E7E3]/60">
        {/* Header Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              className="text-xl sm:text-2xl font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Facilities &amp; Services
            </h2>
            <p
              className="mt-1 text-xs sm:text-sm text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              World-class amenities designed for luxury living and maximum convenience.
            </p>
          </div>

          {hasFacilities && (
            <div className="self-start sm:self-auto shrink-0">
              <span
                className="inline-flex items-center rounded-full border border-[#DCE2DE] bg-white px-4 py-1.5 text-xs font-semibold text-[#145C4B] shadow-xs"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {countBadge}
              </span>
            </div>
          )}
        </div>

        {/* Facility Cards Grid or Empty State */}
        {!hasFacilities ? (
          <div className="mt-8 flex h-28 w-full items-center justify-center rounded-[16px] border border-[#E1E7E3] bg-white p-6 text-center text-sm text-[#6B7570]">
            No specific facilities listed for this development yet.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {displayItems.map((facility) => (
              <div
                key={facility.id}
                className="flex flex-col items-center justify-center rounded-[16px] border border-[#E1E7E3] bg-white p-4 text-center transition-all duration-300 hover:border-[#145C4B]/50 hover:shadow-xs min-h-[110px]"
              >
                <div className="relative h-11 w-11 shrink-0">
                  <Image
                    src={facility.iconSrc}
                    alt={facility.name}
                    width={44}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                </div>

                <span
                  className="mt-2.5 text-xs sm:text-[13px] font-medium leading-snug text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {facility.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
