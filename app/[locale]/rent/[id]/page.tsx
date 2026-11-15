import type { Metadata } from "next";
import RentalDetailsPage from "@/components/UserComp/Rentals/RentalDetails/RentalDetailsPage";
import { resolveRentalByNameOrId } from "@/clientApi/resolversApi";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";
import { buildRealEstateJsonLd } from "@/shared/utils/jsonLd";
import { toUrlSlug } from "@/shared/utils/slug";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const unit = await resolveRentalByNameOrId(id, locale, "USD");

  const title = unit?.name ? `${unit.name} | Vacation Rental` : "Rental Property Details";
  const description =
    unit?.description ||
    "Book luxury vacation rentals, beachfront chalets, and serviced apartments in Hurghada.";
  const primaryImage =
    unit?.images?.find((img) => img.isPrimary)?.imageUrl || unit?.images?.[0]?.imageUrl;
  const slug = toUrlSlug(unit?.name, unit?.id || id);

  return buildPageMetadata({
    title,
    description,
    locale,
    path: `/rent/${slug}`,
    image: primaryImage,
  });
}

export default async function Page({ params }: PageProps) {
  const { id, locale } = await params;
  const unit = await resolveRentalByNameOrId(id, locale, "USD");
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
        url: `/${locale}/rent/${slug}`,
        city:
          typeof unit.rentalLocation === "string"
            ? unit.rentalLocation
            : unit.rentalLocation?.name || "Hurghada",
        price: priceUsd,
        currency: "USD",
        numberOfRooms: unit.bedroomNo,
      })
    : null;

  return (
    <>
      {schemaJsonLd && (
        <script
          id="json-ld-rental"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      )}
      <RentalDetailsPage id={unitId} nameOrSlug={id} />
    </>
  );
}
