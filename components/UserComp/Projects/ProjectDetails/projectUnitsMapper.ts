import { getFullPrimaryUnitMediaUrl } from "@/clientApi/primaryUnitsApi";
import { getFullResaleMediaUrl } from "@/clientApi/resalesApi";
import { PROPERTY_TYPE_LABELS } from "@/models/resale";
import { PrimaryUnitItem } from "@/models/primaryUnit";
import { ResaleItem } from "@/models/resale";
import { UnitItem } from "./ProjectUnitCard";

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
      href: `/units/${u.id}?type=primary`,
      area: u.area ? `${u.area} m²` : "",
      rooms: roomsFormatted,
      baths: bathsFormatted,
      price: priceFormatted,
      rawPrice: priceVal,
      rawBedrooms: u.noBedRoom,
      category: catName,
      imageSrc,
      location: locationOrProjectName,
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
      href: `/units/${r.id}?type=resale`,
      area: r.area ? `${r.area} m²` : "",
      rooms: roomsFormatted,
      baths: bathsFormatted,
      price: priceFormatted,
      rawPrice: priceVal,
      rawBedrooms: r.noBedRoom,
      category: catName,
      imageSrc,
      location: locationOrProjectName,
    };
  });
}

