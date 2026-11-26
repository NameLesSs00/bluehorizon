import { getFullPrimaryUnitMediaUrl } from "@/clientApi/primaryUnitsApi";
import { getFullResaleMediaUrl } from "@/clientApi/resalesApi";
import { PROPERTY_TYPE_LABELS } from "@/models/resale";
import { PrimaryUnitItem } from "@/models/primaryUnit";
import { ResaleItem } from "@/models/resale";
import { toUrlSlug } from "@/shared/utils/slug";
import { UnitItem } from "./ProjectUnitCard";
import { UnitsFilterState } from "./ProjectUnitsFilterSidebar";

interface MapperTranslations {
  roomSingle: string;
  roomsCount: string;
  bathSingle: string;
  bathsCount: string;
  priceOnRequest: string;
}

export function mapPrimaryUnits(
  items: PrimaryUnitItem[],
  currentCurrency: string,
  locationOrProjectName: string | undefined,
  t: MapperTranslations
): UnitItem[] {
  return items.map((u) => {
    const primaryImg = u.images?.find((img) => img.isPrimary) || u.images?.[0];
    const imageSrc = primaryImg?.imageUrl
      ? getFullPrimaryUnitMediaUrl(primaryImg.imageUrl)
      : "/default-fallback.png";

    const targetPrice =
      u.prices?.find(
        (p) =>
          p.currency.toUpperCase() === (currentCurrency || "USD").toUpperCase()
      ) || u.prices?.[0];
    const priceVal = targetPrice?.price;
    const priceFormatted =
      typeof priceVal === "number" && priceVal > 0
        ? `${
            targetPrice.currency.toUpperCase() === "EGP"
              ? "EGP "
              : targetPrice.currency.toUpperCase() === "USD"
              ? "$ "
              : `${targetPrice.currency} `
          }${priceVal.toLocaleString()}`
        : t.priceOnRequest;

    const catName =
      typeof u.propertyType === "number"
        ? PROPERTY_TYPE_LABELS[
            u.propertyType as keyof typeof PROPERTY_TYPE_LABELS
          ] || ""
        : String(u.propertyType || "");

    const roomsFormatted = u.noBedRoom
      ? u.noBedRoom === 1
        ? t.roomSingle
        : t.roomsCount.replace("{count}", String(u.noBedRoom))
      : "";

    const bathsFormatted = u.noBathRoom
      ? u.noBathRoom === 1
        ? t.bathSingle
        : t.bathsCount.replace("{count}", String(u.noBathRoom))
      : "";

    return {
      id: u.id,
      title: u.name,
      description: u.description || "",
      badge: "Primary" as const,
      type: "primary" as const,
      href: `/units/${toUrlSlug(u.name, u.id)}?type=primary`,
      area: u.area ? `${u.area} m²` : "",
      rooms: roomsFormatted,
      baths: bathsFormatted,
      price: priceFormatted,
      rawPrice: priceVal,
      rawBedrooms: u.noBedRoom,
      category: catName,
      imageSrc,
      location: locationOrProjectName,
      serviceIds: (u.services || []).map((s) => s.id),
    };
  });
}

export function mapResaleUnits(
  items: ResaleItem[],
  currentCurrency: string,
  locationOrProjectName: string | undefined,
  t: MapperTranslations
): UnitItem[] {
  return items.map((r) => {
    const firstImg = r.imageUrls?.[0];
    const imageSrc = firstImg
      ? getFullResaleMediaUrl(firstImg)
      : "/default-fallback.png";

    const targetPrice =
      r.prices?.find(
        (p) =>
          p.currency.toUpperCase() === (currentCurrency || "USD").toUpperCase()
      ) || r.prices?.[0];
    const priceVal = targetPrice?.price;
    const priceFormatted =
      typeof priceVal === "number" && priceVal > 0
        ? `${
            targetPrice.currency.toUpperCase() === "EGP"
              ? "EGP "
              : targetPrice.currency.toUpperCase() === "USD"
              ? "$ "
              : `${targetPrice.currency} `
          }${priceVal.toLocaleString()}`
        : t.priceOnRequest;

    const catName =
      typeof r.propertyType === "number"
        ? PROPERTY_TYPE_LABELS[
            r.propertyType as keyof typeof PROPERTY_TYPE_LABELS
          ] || ""
        : String(r.propertyType || "");

    const roomsFormatted = r.noBedRoom
      ? r.noBedRoom === 1
        ? t.roomSingle
        : t.roomsCount.replace("{count}", String(r.noBedRoom))
      : "";

    const bathsFormatted = r.noBathRoom
      ? r.noBathRoom === 1
        ? t.bathSingle
        : t.bathsCount.replace("{count}", String(r.noBathRoom))
      : "";

    return {
      id: r.id,
      title: r.name,
      description: r.description || "",
      badge: "Resale" as const,
      type: "resale" as const,
      href: `/units/${toUrlSlug(r.name, r.id)}?type=resale`,
      area: r.area ? `${r.area} m²` : "",
      rooms: roomsFormatted,
      baths: bathsFormatted,
      price: priceFormatted,
      rawPrice: priceVal,
      rawBedrooms: r.noBedRoom,
      category: catName,
      imageSrc,
      location: locationOrProjectName,
      serviceIds: (r.services || []).map((s) => s.id),
    };
  });
}

export function filterProjectUnits(
  units: UnitItem[],
  filterState: UnitsFilterState
): UnitItem[] {
  return units.filter((unit) => {
    // Unit Type Tab
    if (filterState.unitType !== "All") {
      if (filterState.unitType === "Primary" && unit.type !== "primary") {
        return false;
      }
      if (filterState.unitType === "Resale" && unit.type !== "resale") {
        return false;
      }
    }

    // Search matching
    if (filterState.searchTerm.trim()) {
      const term = filterState.searchTerm.trim().toLowerCase();
      const matchesTitle = unit.title.toLowerCase().includes(term);
      const matchesDesc = Boolean(
        unit.description && unit.description.toLowerCase().includes(term)
      );
      const matchesCategory = Boolean(
        unit.category && unit.category.toLowerCase().includes(term)
      );
      const matchesBadge = unit.badge.toLowerCase().includes(term);

      if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesBadge) {
        return false;
      }
    }

    // Category / Property Type
    if (filterState.category && filterState.category !== "Any Type") {
      const catFilter = filterState.category.toLowerCase();
      const unitCat = (unit.category || "").toLowerCase();
      if (!unitCat.includes(catFilter)) return false;
    }

    // Bedrooms
    if (filterState.bedrooms && filterState.bedrooms !== "Any") {
      const b = filterState.bedrooms;
      const count = unit.rawBedrooms ?? 0;
      if (b === "0" && count !== 0) return false;
      if (b === "1" && count !== 1) return false;
      if (b === "2" && count !== 2) return false;
      if (b === "3" && count !== 3) return false;
      if (b === "4+" && count < 4) return false;
    }

    // Minimum Price
    if (filterState.minPrice && unit.rawPrice !== undefined) {
      const min = parseFloat(filterState.minPrice);
      if (!isNaN(min) && unit.rawPrice < min) return false;
    }

    // Maximum Price
    if (filterState.maxPrice && unit.rawPrice !== undefined) {
      const max = parseFloat(filterState.maxPrice);
      if (!isNaN(max) && unit.rawPrice > max) return false;
    }

    // Services
    if (filterState.serviceIds && filterState.serviceIds.length > 0) {
      const unitServiceIds = unit.serviceIds || [];
      if (!filterState.serviceIds.every((id) => unitServiceIds.includes(id))) {
        return false;
      }
    }

    return true;
  });
}

