"use client";

import { useQuery } from "@tanstack/react-query";
import ProjectUnitCard, {
  UnitItem,
} from "@/components/UserComp/Projects/ProjectDetails/ProjectUnitCard";
import { getPrimaryUnits, getFullPrimaryUnitMediaUrl } from "@/clientApi/primaryUnitsApi";
import { getResales, getFullResaleMediaUrl } from "@/clientApi/resalesApi";
import { PROPERTY_TYPE_LABELS } from "@/models/resale";

interface UnitSimilarUnitsProps {
  currentUnitId: number;
  type: "primary" | "resale";
  projectId?: number;
}

export default function UnitSimilarUnits({
  currentUnitId,
  type,
  projectId,
}: UnitSimilarUnitsProps) {
  // Query similar primary units if type is primary
  const { data: primaryData } = useQuery({
    queryKey: ["similarPrimaryUnits", projectId, currentUnitId],
    queryFn: () =>
      getPrimaryUnits({
        ProjectId: projectId && projectId > 0 ? projectId : undefined,
        PageNumber: 1,
        PageSize: 6,
      }),
    enabled: type === "primary",
    staleTime: 1000 * 60 * 5,
  });

  // Query similar resale units if type is resale
  const { data: resaleData } = useQuery({
    queryKey: ["similarResaleUnits", projectId, currentUnitId],
    queryFn: () =>
      getResales({
        ProjectId: projectId && projectId > 0 ? projectId : undefined,
        PageNumber: 1,
        PageSize: 6,
      }),
    enabled: type === "resale",
    staleTime: 1000 * 60 * 5,
  });

  let units: UnitItem[] = [];

  if (type === "primary" && primaryData?.items) {
    units = primaryData.items
      .filter((u) => u.id !== currentUnitId)
      .slice(0, 3)
      .map((u) => {
        const primaryImg =
          u.images?.find((img) => img.isPrimary) || u.images?.[0];
        const imageSrc = primaryImg?.imageUrl
          ? getFullPrimaryUnitMediaUrl(primaryImg.imageUrl)
          : "/default-fallback.png";

        const priceUsd =
          u.prices?.find((p) => p.currency === "USD")?.price ||
          u.prices?.[0]?.price;
        const priceFormatted =
          typeof priceUsd === "number" && priceUsd > 0
            ? `$ ${priceUsd.toLocaleString()}`
            : "Price on request";

        const catName =
          typeof u.propertyType === "number"
            ? PROPERTY_TYPE_LABELS[u.propertyType as keyof typeof PROPERTY_TYPE_LABELS] || ""
            : String(u.propertyType || "");

        return {
          id: u.id,
          title: u.name,
          description: u.description || "",
          badge: "Primary" as const,
          type: "primary" as const,
          href: `/units/${u.id}?type=primary`,
          area: u.area ? `${u.area} m²` : "",
          rooms: u.noBedRoom ? `${u.noBedRoom} Rooms` : "",
          baths: u.noBathRoom ? `${u.noBathRoom} Baths` : "",
          price: priceFormatted,
          category: catName,
          imageSrc,
        };
      });
  } else if (type === "resale" && resaleData?.items) {
    units = resaleData.items
      .filter((r) => r.id !== currentUnitId)
      .slice(0, 3)
      .map((r) => {
        const firstImg = r.imageUrls?.[0];
        const imageSrc = firstImg
          ? getFullResaleMediaUrl(firstImg)
          : "/default-fallback.png";

        const priceUsd =
          r.prices?.find((p) => p.currency === "USD")?.price ||
          r.prices?.[0]?.price;
        const priceFormatted =
          typeof priceUsd === "number" && priceUsd > 0
            ? `$ ${priceUsd.toLocaleString()}`
            : "Price on request";

        const catName =
          typeof r.propertyType === "number"
            ? PROPERTY_TYPE_LABELS[r.propertyType as keyof typeof PROPERTY_TYPE_LABELS] || ""
            : String(r.propertyType || "");

        return {
          id: r.id,
          title: r.name,
          description: r.description || "",
          badge: "Resale" as const,
          type: "resale" as const,
          href: `/units/${r.id}?type=resale`,
          area: r.area ? `${r.area} m²` : "",
          rooms: r.noBedRoom ? `${r.noBedRoom} Rooms` : "",
          baths: r.noBathRoom ? `${r.noBathRoom} Baths` : "",
          price: priceFormatted,
          category: catName,
          imageSrc,
        };
      });
  }

  // If no similar units exist, hide the section entirely
  if (units.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-10 border-t border-[#D9E2EE]">
      <div className="mb-6">
        <h2
          className="text-xl sm:text-2xl font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Similar Recommended Units
        </h2>
        <p
          className="mt-1 text-xs text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Explore more properties matching this style.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {units.map((unit) => (
          <ProjectUnitCard key={`${unit.badge}-${unit.id}`} unit={unit} />
        ))}
      </div>
    </section>
  );
}

