import { ProjectItem } from "@/models/project";

/**
 * Returns true if the project is marked as a hot offer and the current time
 * falls within its configured start/end hot-offer window.
 */
export function isActiveHotOfferToday(
  project?: Pick<
    ProjectItem,
    "isHotOffer" | "startDateHotOffer" | "endDateHotOffer"
  > | null,
  now: Date = new Date()
): boolean {
  if (!project?.isHotOffer) return false;

  const nowMs = now.getTime();

  if (project.startDateHotOffer) {
    const startMs = new Date(project.startDateHotOffer).getTime();
    if (!Number.isNaN(startMs) && nowMs < startMs) return false;
  }

  if (project.endDateHotOffer) {
    const endMs = new Date(project.endDateHotOffer).getTime();
    if (!Number.isNaN(endMs) && nowMs > endMs) return false;
  }

  return true;
}

/**
 * Formats the hot-offer expiration date according to the active locale.
 */
export function formatHotOfferEndDate(
  endDate?: string | null,
  locale: string = "en"
): string | null {
  if (!endDate) return null;
  const parsed = new Date(endDate);
  if (Number.isNaN(parsed.getTime())) return null;

  const localeTag =
    locale === "ar"
      ? "ar-EG"
      : locale === "de"
      ? "de-DE"
      : locale === "ru"
      ? "ru-RU"
      : "en-US";

  return parsed.toLocaleDateString(localeTag, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
