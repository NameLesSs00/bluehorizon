import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bluehorizon-eg.com";

export const DEFAULT_SITE_TITLE = "Blue Horizon Real Estate";
export const DEFAULT_SITE_DESCRIPTION =
  "Discover premium luxury properties, resorts, beachfront apartments, and short-term rentals in Hurghada and the Red Sea with Blue Horizon Real Estate.";

export interface BuildMetadataOptions {
  title: string;
  description?: string | null;
  locale?: string;
  path?: string;
  image?: string | null;
  type?: "website" | "article";
  noIndex?: boolean;
}

const SUPPORTED_LOCALES = ["en", "de", "ar"] as const;

/**
 * Builds standard, SEO-compliant Next.js Metadata with OpenGraph, Twitter, canonical, and hreflang tags.
 */
export function buildPageMetadata(options: BuildMetadataOptions): Metadata {
  const {
    title,
    description,
    locale = "en",
    path = "",
    image,
    type = "website",
    noIndex = false,
  } = options;

  const cleanDescription = (description || DEFAULT_SITE_DESCRIPTION)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}/${locale}${cleanPath === "/" ? "" : cleanPath}`;

  const languages: Record<string, string> = {};
  for (const loc of SUPPORTED_LOCALES) {
    languages[loc] = `${SITE_URL}/${loc}${cleanPath === "/" ? "" : cleanPath}`;
  }
  languages["x-default"] = `${SITE_URL}/en${cleanPath === "/" ? "" : cleanPath}`;

  const ogImages = image
    ? [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    : [
        {
          url: `${SITE_URL}/logo.svg`,
          width: 1200,
          height: 630,
          alt: DEFAULT_SITE_TITLE,
        },
      ];

  const metadata: Metadata = {
    title,
    description: cleanDescription,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: `${title} | ${DEFAULT_SITE_TITLE}`,
      description: cleanDescription,
      url: canonicalUrl,
      siteName: DEFAULT_SITE_TITLE,
      locale: locale === "ar" ? "ar_EG" : locale === "de" ? "de_DE" : "en_US",
      type,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${DEFAULT_SITE_TITLE}`,
      description: cleanDescription,
      images: ogImages.map((img) => img.url),
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
