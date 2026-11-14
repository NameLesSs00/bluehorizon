import { ProjectItem } from "@/models/project";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";
import { ProjectDisplayItem } from "./ProjectGridCard";

export function formatApiProject(
  item: ProjectItem,
  currentCurrency: string,
  priceOnRequestLabel: string
): ProjectDisplayItem {
  const hasImage = Boolean(item.imageUrls && item.imageUrls.length > 0);
  const coverImage = hasImage
    ? getFullProjectImageUrl(item.imageUrls[0])
    : "/default-fallback.png";

  const targetPrice = item.prices?.find(
    (p) => p.currency.toUpperCase() === currentCurrency.toUpperCase()
  );
  const egpPrice = item.prices?.find(
    (p) => p.currency.toUpperCase() === "EGP"
  );
  const fallbackPrice = item.prices?.[0];
  const activePrice = targetPrice || egpPrice || fallbackPrice;

  let priceFormatted = priceOnRequestLabel;
  if (activePrice?.minimumPrice) {
    const symbol =
      activePrice.currency.toUpperCase() === "EGP"
        ? "EGP "
        : activePrice.currency.toUpperCase() === "USD"
          ? "$ "
          : `${activePrice.currency} `;
    priceFormatted = `${symbol}${Number(activePrice.minimumPrice).toLocaleString()}`;
  } else if (activePrice?.maximumPrice) {
    const symbol =
      activePrice.currency.toUpperCase() === "EGP"
        ? "EGP "
        : activePrice.currency.toUpperCase() === "USD"
          ? "$ "
          : `${activePrice.currency} `;
    priceFormatted = `${symbol}${Number(activePrice.maximumPrice).toLocaleString()}`;
  }

  return {
    id: item.id,
    title: item.name,
    description: item.description || "",
    priceFormatted,
    imageSrc: coverImage,
    isFallback: !hasImage,
  };
}
