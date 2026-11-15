import type { Metadata } from "next";
import StandaloneDetailsPage from "@/components/UserComp/Standalone/StandaloneDetails/StandaloneDetailsPage";
import { resolveStandaloneUnitByNameOrId } from "@/clientApi/resolversApi";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";
import { buildRealEstateJsonLd } from "@/shared/utils/jsonLd";
import { toUrlSlug } from "@/shared/utils/slug";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const unit = await resolveStandaloneUnitByNameOrId(id, locale, "USD");

  const title = unit?.name ? `${unit.name} | Standalone Property` : "Standalone Property Details";
  const description =
    unit?.description ||
    "View full specifications, photo gallery, amenities, and pricing for this residential property.";
  const primaryImage =
    unit?.images?.find((img) => img.isPrimary)?.imageUrl || unit?.images?.[0]?.imageUrl;
  const slug = toUrlSlug(unit?.name, unit?.id || id);

  return buildPageMetadata({
    title,
    description,
    locale,
    path: `/standalone/${slug}`,
    image: primaryImage,
  });
}

export default async function Page({ params }: PageProps) {
  const { id, locale } = await params;
  const unit = await resolveStandaloneUnitByNameOrId(id, locale, "USD");
  const unitId = unit?.id || parseInt(id, 10) || 0;
  const slug = toUrlSlug(unit?.name, unitId || id);

  const priceUsd =
    unit?.prices?.find((p) => p.currency === "USD")?.price ||
    unit?.prices?.[0]?.price;

  const schemaJsonLd = unit
    ? buildRealEstateJsonLd({
        name: unit.name,
        description: unit.description,
        image: unit.images?.[0]?.imageUrl,
        url: `/${locale}/standalone/${slug}`,
        city: unit.city || "Hurghada",
        price: priceUsd,
        currency: "USD",
        numberOfRooms: unit.noBedRoom,
      })
    : null;

  return (
    <>
      {schemaJsonLd && (
        <script
          id="json-ld-standalone"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      )}
      <StandaloneDetailsPage id={unitId} nameOrSlug={id} />
    </>
  );
}
