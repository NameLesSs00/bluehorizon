import { ProjectItem } from "@/models/project";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";
import {
  formatHotOfferEndDate,
  isActiveHotOfferToday,
} from "@/shared/utils/hotOffer";
import { ProjectDisplayItem } from "./ProjectGridCard";

type TranslateFn = (key: string, fallback?: string) => string;

export function formatApiProject(
  item: ProjectItem,
  currentCurrency: string,
  t: TranslateFn,
  locale: string = "en"
): ProjectDisplayItem {
  const hasImage = Boolean(item.imageUrls && item.imageUrls.length > 0);
  const coverImage = hasImage
    ? getFullProjectImageUrl(item.imageUrls[0])
    : "/default-fallback.png";

  const matchedPrice = item.prices?.find(
    (p) => p.currency.toUpperCase() === currentCurrency.toUpperCase()
  );
  const activePrice = matchedPrice || item.prices?.[0];

  let priceFormatted = t("home.featuredProjects.priceOnRequest", "Price on request");
  if (activePrice && (activePrice.minimumPrice || activePrice.maximumPrice)) {
    const code = (activePrice.currency || currentCurrency).toUpperCase();
    const symbol =
      code === "USD" ? "$" : code === "EUR" ? "€" : code === "GBP" ? "£" : `${code} `;
    if (activePrice.minimumPrice) {
      priceFormatted = `${t("home.featuredProjects.startingFrom", "Starting from")} ${symbol}${Number(
        activePrice.minimumPrice
      ).toLocaleString()}`;
    } else if (activePrice.maximumPrice) {
      priceFormatted = `${t("home.featuredProjects.upTo", "Up to")} ${symbol}${Number(
        activePrice.maximumPrice
      ).toLocaleString()}`;
    }
  }

  const badge = item.isFeature
    ? t("home.featuredProjects.featuredBadge", "FEATURED PROJECT")
    : null;

  const propertyTypes =
    item.projectTypes && item.projectTypes.length > 0
      ? item.projectTypes.map((tp) => tp.name).join(" & ")
      : "";

  const specsSummary =
    item.furnitureType === "Fully" || item.furnitureType === 2
      ? t("home.featuredProjects.fullyFurnished", "Fully Furnished")
      : item.furnitureType === "Semi" || item.furnitureType === 1
      ? t("home.featuredProjects.semiFurnished", "Semi-Furnished")
      : item.facilities && item.facilities.length > 0
      ? `${item.facilities.length} ${t("home.featuredProjects.facilities", "Facilities")}`
      : "";

  let footerLabel = t("home.featuredProjects.exploreProject", "Explore Project");
  if (item.deliveryDate) {
    const year = new Date(item.deliveryDate).getFullYear();
    if (!isNaN(year)) {
      footerLabel = t("home.featuredProjects.delivery", "Delivery {year}").replace(
        "{year}",
        String(year)
      );
    }
  }

  const isHotOffer = isActiveHotOfferToday(item);
  const formattedEnd = isHotOffer
    ? formatHotOfferEndDate(item.endDateHotOffer, locale)
    : null;
  const hotOfferEndLabel = formattedEnd
    ? t("home.hotOffers.validUntil", "Valid until {date}").replace("{date}", formattedEnd)
    : null;

  return {
    id: item.id,
    badge,
    title: item.name,
    description: item.description || "",
    location: item.locationName || "Hurghada, Red Sea",
    priceFormatted,
    propertyTypes,
    specsSummary,
    footerLabel,
    imageSrc: coverImage,
    isFallback: !hasImage,
    isHotOffer,
    hotOfferEndLabel,
  };
}
