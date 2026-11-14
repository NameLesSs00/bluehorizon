import { UnitItem } from "@/components/UserComp/Projects/ProjectDetails/ProjectUnitCard";
import { PrimaryUnitItem } from "@/models/primaryUnit";
import { ResaleItem } from "@/models/resale";
import { getFullPrimaryUnitMediaUrl } from "@/clientApi/primaryUnitsApi";
import { getFullResaleMediaUrl } from "@/clientApi/resalesApi";
import { AreaUnitsFilterState } from "./AreaUnitsFilterSidebar";

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

export function filterAreaUnits(
  primaryUnits: UnitItem[],
  resaleUnits: UnitItem[],
  filterState: AreaUnitsFilterState
): UnitItem[] {
  let pool: UnitItem[] = [];
  if (filterState.tab === "all") pool = [...primaryUnits, ...resaleUnits];
  else if (filterState.tab === "primary") pool = primaryUnits;
  else pool = resaleUnits;

  return pool.filter((unit) => {
    if (filterState.searchTerm.trim()) {
      const query = filterState.searchTerm.toLowerCase();
      const matches =
        unit.title.toLowerCase().includes(query) ||
        unit.description?.toLowerCase().includes(query) ||
        unit.location?.toLowerCase().includes(query);
      if (!matches) return false;
    }

    if (filterState.bedrooms !== "Any") {
      if (filterState.bedrooms === "4+") {
        const count = parseInt(unit.rooms, 10) || 0;
        if (count < 4) return false;
      } else {
        const targetBeds = filterState.bedrooms;
        if (!unit.rooms.startsWith(`${targetBeds} `)) {
          return false;
        }
      }
    }

    const rawNumericPrice =
      parseInt(unit.price.replace(/[^0-9]/g, ""), 10) || 0;
    if (filterState.minPrice) {
      const min = parseInt(filterState.minPrice, 10);
      if (!isNaN(min) && rawNumericPrice > 0 && rawNumericPrice < min)
        return false;
    }
    if (filterState.maxPrice) {
      const max = parseInt(filterState.maxPrice, 10);
      if (!isNaN(max) && rawNumericPrice > 0 && rawNumericPrice > max)
        return false;
    }

    return true;
  });
}


