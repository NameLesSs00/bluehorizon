import { SITE_URL, DEFAULT_SITE_TITLE } from "./seoMetadata";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: DEFAULT_SITE_TITLE,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/logo.svg`,
    description:
      "Blue Horizon Real Estate specializes in luxury beachfront compounds, investment apartments, and holiday rentals in Hurghada and the Red Sea, Egypt.",
    telephone: "+20 100 000 0000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hurghada",
      addressRegion: "Red Sea",
      addressCountry: "EG",
    },
    areaServed: ["Hurghada", "El Gouna", "Sahl Hasheesh", "Makadi Bay", "Soma Bay"],
    priceRange: "$$",
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export interface RealEstateSchemaProps {
  name: string;
  description?: string;
  image?: string;
  price?: number;
  currency?: string;
  url: string;
  city?: string;
  numberOfRooms?: number;
}

export function buildRealEstateJsonLd(props: RealEstateSchemaProps) {
  const {
    name,
    description,
    image,
    price,
    currency = "USD",
    url,
    city = "Hurghada",
    numberOfRooms,
  } = props;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name,
    description: description || name,
    image: image ? [image.startsWith("http") ? image : `${SITE_URL}${image}`] : undefined,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    offers: price
      ? {
          "@type": "Offer",
          price: price,
          priceCurrency: currency,
          availability: "https://schema.org/InStock",
        }
      : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: "Red Sea",
      addressCountry: "EG",
    },
    ...(numberOfRooms ? { numberOfRooms } : {}),
  };
}

export interface ArticleSchemaProps {
  title: string;
  description?: string;
  image?: string;
  url: string;
  datePublished?: string;
  authorName?: string;
}

export function buildArticleJsonLd(props: ArticleSchemaProps) {
  const {
    title,
    description,
    image,
    url,
    datePublished,
    authorName = DEFAULT_SITE_TITLE,
  } = props;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description || title,
    image: image ? [image.startsWith("http") ? image : `${SITE_URL}${image}`] : undefined,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    datePublished: datePublished || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: DEFAULT_SITE_TITLE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
  };
}
