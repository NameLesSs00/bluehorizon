import { matchesSlugOrName, parseNumericId } from "@/shared/utils/slug";
import { getProjects, getProjectById } from "./projectsApi";
import { getProjectLocations, getProjectLocationById } from "./projectLocationsApi";
import { getRentalLocations, getRentalLocationById } from "./rentalLocationsApi";
import { getRentals, getRentalById } from "./rentalsApi";
import { getStandaloneUnits, getStandaloneUnitById } from "./standaloneUnitsApi";
import { getPrimaryUnits, getPrimaryUnitById } from "./primaryUnitsApi";
import { getResales, getResaleById } from "./resalesApi";
import { getBlogs, getBlogById } from "./blogsApi";
import type { ProjectItem } from "@/models/project";
import type { ProjectLocationItem } from "@/models/projectLocation";
import type { RentalLocationItem } from "@/models/rentalLocation";
import type { RentalItem } from "@/models/rental";
import type { StandaloneUnitItem } from "@/models/standaloneUnit";
import type { PrimaryUnitItem } from "@/models/primaryUnit";
import type { ResaleItem } from "@/models/resale";
import type { BlogItem } from "@/models/blog";

const FALLBACK_LANGS = ["en", "de", "ar"] as const;

export async function resolveProjectByNameOrId(
  nameOrId: string | number,
  language: string = "en",
  currency: string = "USD"
): Promise<ProjectItem | null> {
  const numericId = typeof nameOrId === "number" ? nameOrId : parseNumericId(nameOrId);
  if (numericId) {
    const res = await getProjectById(numericId, language, currency);
    return res.data || null;
  }

  const str = String(nameOrId);
  const primaryRes = await getProjects({ Language: language, Currency: currency, PageNumber: 1, PageSize: 100 });
  const matched = primaryRes.items?.find((p) => matchesSlugOrName(p.name, str));
  if (matched?.id) {
    const full = await getProjectById(matched.id, language, currency);
    return full.data || matched;
  }

  for (const altLang of FALLBACK_LANGS) {
    if (altLang === language) continue;
    try {
      const altRes = await getProjects({ Language: altLang, Currency: currency, PageNumber: 1, PageSize: 100 });
      const altMatched = altRes.items?.find((p) => matchesSlugOrName(p.name, str));
      if (altMatched?.id) {
        const full = await getProjectById(altMatched.id, language, currency);
        return full.data || altMatched;
      }
    } catch {
      // Continue to next fallback language
    }
  }
  return null;
}

export async function resolveProjectLocationByNameOrId(
  nameOrId: string | number,
  language: string = "en"
): Promise<ProjectLocationItem | null> {
  const numericId = typeof nameOrId === "number" ? nameOrId : parseNumericId(nameOrId);
  if (numericId) {
    const res = await getProjectLocationById(numericId, language);
    return res.data || null;
  }

  const str = String(nameOrId);
  const primaryRes = await getProjectLocations({ Language: language, PageNumber: 1, PageSize: 100 });
  const matched = primaryRes.items?.find((loc) => matchesSlugOrName(loc.name, str));
  if (matched?.id) {
    const full = await getProjectLocationById(matched.id, language);
    return full.data || matched;
  }

  for (const altLang of FALLBACK_LANGS) {
    if (altLang === language) continue;
    try {
      const altRes = await getProjectLocations({ Language: altLang, PageNumber: 1, PageSize: 100 });
      const altMatched = altRes.items?.find((loc) => matchesSlugOrName(loc.name, str));
      if (altMatched?.id) {
        const full = await getProjectLocationById(altMatched.id, language);
        return full.data || altMatched;
      }
    } catch {
      // Continue
    }
  }
  return null;
}

export async function resolveRentalLocationByNameOrId(
  nameOrId: string | number,
  language: string = "en"
): Promise<RentalLocationItem | null> {
  const numericId = typeof nameOrId === "number" ? nameOrId : parseNumericId(nameOrId);
  if (numericId) {
    const res = await getRentalLocationById(numericId, language);
    return res.data || null;
  }

  const str = String(nameOrId);
  const primaryRes = await getRentalLocations({ Language: language, PageNumber: 1, PageSize: 100 });
  const matched = primaryRes.items?.find((loc) => matchesSlugOrName(loc.name, str));
  if (matched?.id) {
    const full = await getRentalLocationById(matched.id, language);
    return full.data || matched;
  }

  for (const altLang of FALLBACK_LANGS) {
    if (altLang === language) continue;
    try {
      const altRes = await getRentalLocations({ Language: altLang, PageNumber: 1, PageSize: 100 });
      const altMatched = altRes.items?.find((loc) => matchesSlugOrName(loc.name, str));
      if (altMatched?.id) {
        const full = await getRentalLocationById(altMatched.id, language);
        return full.data || altMatched;
      }
    } catch {
      // Continue
    }
  }
  return null;
}

export async function resolveRentalByNameOrId(
  nameOrId: string | number,
  language: string = "en",
  currency: string = "USD"
): Promise<RentalItem | null> {
  const numericId = typeof nameOrId === "number" ? nameOrId : parseNumericId(nameOrId);
  if (numericId) {
    const res = await getRentalById(numericId, language, currency);
    return res.data || null;
  }

  const str = String(nameOrId);
  const primaryRes = await getRentals({ Language: language, Currency: currency, PageNumber: 1, PageSize: 100 });
  const matched = primaryRes.items?.find((r) => matchesSlugOrName(r.name, str));
  if (matched?.id) {
    const full = await getRentalById(matched.id, language, currency);
    return full.data || matched;
  }

  for (const altLang of FALLBACK_LANGS) {
    if (altLang === language) continue;
    try {
      const altRes = await getRentals({ Language: altLang, Currency: currency, PageNumber: 1, PageSize: 100 });
      const altMatched = altRes.items?.find((r) => matchesSlugOrName(r.name, str));
      if (altMatched?.id) {
        const full = await getRentalById(altMatched.id, language, currency);
        return full.data || altMatched;
      }
    } catch {
      // Continue
    }
  }
  return null;
}

export async function resolveStandaloneUnitByNameOrId(
  nameOrId: string | number,
  language: string = "en",
  currency: string = "USD"
): Promise<StandaloneUnitItem | null> {
  const numericId = typeof nameOrId === "number" ? nameOrId : parseNumericId(nameOrId);
  if (numericId) {
    const res = await getStandaloneUnitById(numericId, language, currency);
    return res.data || null;
  }

  const str = String(nameOrId);
  const primaryRes = await getStandaloneUnits({ Language: language, Currency: currency, PageNumber: 1, PageSize: 100 });
  const matched = primaryRes.items?.find((u) => matchesSlugOrName(u.name, str));
  if (matched?.id) {
    const full = await getStandaloneUnitById(matched.id, language, currency);
    return full.data || matched;
  }

  for (const altLang of FALLBACK_LANGS) {
    if (altLang === language) continue;
    try {
      const altRes = await getStandaloneUnits({ Language: altLang, Currency: currency, PageNumber: 1, PageSize: 100 });
      const altMatched = altRes.items?.find((u) => matchesSlugOrName(u.name, str));
      if (altMatched?.id) {
        const full = await getStandaloneUnitById(altMatched.id, language, currency);
        return full.data || altMatched;
      }
    } catch {
      // Continue
    }
  }
  return null;
}

export async function resolveUnitByNameOrId(
  nameOrId: string | number,
  type: "primary" | "resale" = "primary",
  language: string = "en",
  currency: string = "USD"
): Promise<PrimaryUnitItem | ResaleItem | null> {
  const numericId = typeof nameOrId === "number" ? nameOrId : parseNumericId(nameOrId);
  if (numericId) {
    if (type === "resale") {
      const res = await getResaleById(numericId, language, currency);
      return res.data || null;
    }
    const res = await getPrimaryUnitById(numericId, language, currency);
    return res.data || null;
  }

  const str = String(nameOrId);
  if (type === "resale") {
    const res = await getResales({ Language: language, Currency: currency, PageNumber: 1, PageSize: 100 });
    const matched = res.items?.find((u: ResaleItem) => matchesSlugOrName(u.name, str));
    if (matched?.id) {
      const full = await getResaleById(matched.id, language, currency);
      return full.data || matched;
    }
  } else {
    const res = await getPrimaryUnits({ Language: language, Currency: currency, PageNumber: 1, PageSize: 100 });
    const matched = res.items?.find((u: PrimaryUnitItem) => matchesSlugOrName(u.name, str));
    if (matched?.id) {
      const full = await getPrimaryUnitById(matched.id, language, currency);
      return full.data || matched;
    }
  }
  return null;
}

export async function resolveBlogByNameOrId(
  nameOrId: string | number,
  language: string = "en"
): Promise<BlogItem | null> {
  const numericId = typeof nameOrId === "number" ? nameOrId : parseNumericId(nameOrId);
  if (numericId) {
    const res = await getBlogById(numericId);
    return res.data || null;
  }

  const str = String(nameOrId);
  const primaryRes = await getBlogs({ Language: language, PageNumber: 1, PageSize: 100 });
  const matched = primaryRes.items?.find((b) => matchesSlugOrName(b.title, str));
  if (matched?.id) {
    const full = await getBlogById(matched.id);
    return full.data || matched;
  }

  for (const altLang of FALLBACK_LANGS) {
    if (altLang === language) continue;
    try {
      const altRes = await getBlogs({ Language: altLang, PageNumber: 1, PageSize: 100 });
      const altMatched = altRes.items?.find((b) => matchesSlugOrName(b.title, str));
      if (altMatched?.id) {
        const full = await getBlogById(altMatched.id);
        return full.data || altMatched;
      }
    } catch {
      // Continue
    }
  }
  return null;
}
