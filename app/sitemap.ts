import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/utils/seoMetadata";
import { toUrlSlug } from "@/shared/utils/slug";
import { getProjects } from "@/clientApi/projectsApi";
import { getProjectLocations } from "@/clientApi/projectLocationsApi";
import { getRentalLocations } from "@/clientApi/rentalLocationsApi";
import { getRentals } from "@/clientApi/rentalsApi";
import { getStandaloneUnits } from "@/clientApi/standaloneUnitsApi";
import { getBlogs } from "@/clientApi/blogsApi";

const LOCALES = ["en", "de", "ar", "ru"] as const;

const STATIC_PATHS = [
  "",
  "/projects",
  "/areas",
  "/locations",
  "/rent",
  "/second-hand",
  "/blogs",
  "/about",
  "/faq",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Static listing pages
  for (const path of STATIC_PATHS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1.0 : 0.8,
      });
    }
  }

  // Dynamic entities (safely fetched)
  try {
    const [projectsRes, areasRes, rentalLocationsRes, rentalsRes, standaloneRes, blogsRes] =
      await Promise.allSettled([
        getProjects({ PageNumber: 1, PageSize: 100 }),
        getProjectLocations({ PageNumber: 1, PageSize: 100 }),
        getRentalLocations({ PageNumber: 1, PageSize: 100 }),
        getRentals({ PageNumber: 1, PageSize: 100 }),
        getStandaloneUnits({ PageNumber: 1, PageSize: 100 }),
        getBlogs({ PageNumber: 1, PageSize: 100 }),
      ]);

    if (projectsRes.status === "fulfilled" && projectsRes.value.items) {
      for (const p of projectsRes.value.items) {
        const slug = toUrlSlug(p.name, p.id);
        for (const loc of LOCALES) {
          entries.push({
            url: `${SITE_URL}/${loc}/projects/${slug}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      }
    }

    if (areasRes.status === "fulfilled" && areasRes.value.items) {
      for (const a of areasRes.value.items) {
        const slug = toUrlSlug(a.name, a.id);
        for (const loc of LOCALES) {
          entries.push({
            url: `${SITE_URL}/${loc}/areas/${slug}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      }
    }

    if (rentalLocationsRes.status === "fulfilled" && rentalLocationsRes.value.items) {
      for (const l of rentalLocationsRes.value.items) {
        const slug = toUrlSlug(l.name, l.id);
        for (const loc of LOCALES) {
          entries.push({
            url: `${SITE_URL}/${loc}/locations/${slug}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      }
    }

    if (rentalsRes.status === "fulfilled" && rentalsRes.value.items) {
      for (const r of rentalsRes.value.items) {
        const slug = toUrlSlug(r.name, r.id);
        for (const loc of LOCALES) {
          entries.push({
            url: `${SITE_URL}/${loc}/rent/${slug}`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.9,
          });
        }
      }
    }

    if (standaloneRes.status === "fulfilled" && standaloneRes.value.items) {
      for (const s of standaloneRes.value.items) {
        const slug = toUrlSlug(s.name, s.id);
        for (const loc of LOCALES) {
          entries.push({
            url: `${SITE_URL}/${loc}/second-hand/${slug}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      }
    }

    if (blogsRes.status === "fulfilled" && blogsRes.value.items) {
      for (const b of blogsRes.value.items) {
        const slug = toUrlSlug(b.title, b.id);
        for (const loc of LOCALES) {
          entries.push({
            url: `${SITE_URL}/${loc}/blogs/${slug}`,
            lastModified: b.publishDate ? new Date(b.publishDate) : now,
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
    }
  } catch {
    // Return static entries if dynamic resolution fails
  }

  return entries;
}
