import type { Metadata } from "next";
import LocationDetailsPage from "@/components/UserComp/Locations/LocationDetails/LocationDetailsPage";
import { resolveRentalLocationByNameOrId } from "@/clientApi/resolversApi";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";
import { buildBreadcrumbJsonLd } from "@/shared/utils/jsonLd";
import { toUrlSlug } from "@/shared/utils/slug";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const location = await resolveRentalLocationByNameOrId(id, locale);

  const title = location?.name ? `${location.name} Holiday Rentals` : "Rental Location Overview";
  const description =
    location?.description ||
    "Explore luxury holiday rentals, coastal chalets, and vacation apartments in prime resort destinations.";
  const primaryImage =
    location?.images?.find((img) => img.isPrimary)?.imageUrl || location?.images?.[0]?.imageUrl;
  const slug = toUrlSlug(location?.name, location?.id || id);

  return buildPageMetadata({
    title,
    description,
    locale,
    path: `/locations/${slug}`,
    image: primaryImage,
  });
}

export default async function Page({ params }: PageProps) {
  const { id, locale } = await params;
  const location = await resolveRentalLocationByNameOrId(id, locale);
  const locationId = location?.id || parseInt(id, 10) || 0;
  const slug = toUrlSlug(location?.name, locationId || id);

  const breadcrumbs = [
    { name: "Home", url: `/${locale}` },
    { name: "Rental Locations", url: `/${locale}/locations` },
    { name: location?.name || "Location Details", url: `/${locale}/locations/${slug}` },
  ];

  return (
    <>
      <script
        id="json-ld-location-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <LocationDetailsPage id={locationId} nameOrSlug={id} />
    </>
  );
}
