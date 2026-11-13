import { UnitItem } from "@/components/UserComp/Projects/ProjectDetails/ProjectUnitCard";
import { PrimaryUnitItem } from "@/models/primaryUnit";
import { ResaleItem } from "@/models/resale";
import { getFullPrimaryUnitMediaUrl } from "@/clientApi/primaryUnitsApi";
import { getFullResaleMediaUrl } from "@/clientApi/resalesApi";

export function formatPrimaryUnit(
  u: PrimaryUnitItem,
  fallbackLocation?: string
): UnitItem {
  const primPrice = u.prices?.[0];
  const priceText =
    primPrice && primPrice.price > 0
      ? `${primPrice.currency} ${primPrice.price.toLocaleString()}`
      : "Price on request";
  const primaryImg = u.images?.find((img) => img.isPrimary) || u.images?.[0];

  return {
    id: u.id,
    title: u.name,
    description: u.description,
    badge: "Primary",
    area: `${u.area || 0} m²`,
    rooms: `${u.noBedRoom || 0} Beds`,
    baths: `${u.noBathRoom || 0} Baths`,
    price: priceText,
    imageSrc: primaryImg?.imageUrl
      ? getFullPrimaryUnitMediaUrl(primaryImg.imageUrl)
      : "/default-fallback.png",
    location: u.projectName || fallbackLocation || "Hurghada",
  };
}

export function formatResaleUnit(
  u: ResaleItem,
  fallbackLocation?: string
): UnitItem {
  const primPrice = u.prices?.[0];
  const priceText =
    primPrice && primPrice.price > 0
      ? `${primPrice.currency} ${primPrice.price.toLocaleString()}`
      : "Price on request";
  const rawImg = u.imageUrls?.[0];

  return {
    id: u.id,
    title: u.name,
    description: u.description,
    badge: "Resale",
    area: `${u.area || 0} m²`,
    rooms: `${u.noBedRoom || 0} Beds`,
    baths: `${u.noBathRoom || 0} Baths`,
    price: priceText,
    imageSrc: rawImg ? getFullResaleMediaUrl(rawImg) : "/default-fallback.png",
    location: u.projectName || u.project?.name || fallbackLocation || "Hurghada",
  };
}

