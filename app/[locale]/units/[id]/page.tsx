import type { Metadata } from "next";
import UnitDetailsPage from "@/components/UserComp/Units/UnitDetailsPage";
import { resolveUnitByNameOrId } from "@/clientApi/resolversApi";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";
import { buildRealEstateJsonLd } from "@/shared/utils/jsonLd";
import { toUrlSlug } from "@/shared/utils/slug";
import type { PrimaryUnitItem } from "@/models/primaryUnit";
import type { ResaleItem } from "@/models/resale";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ type?: string }>;
}

function getUnitPrimaryImage(unit: PrimaryUnitItem | ResaleItem | null): string | undefined {
  if (!unit) return undefined;
  if ("images" in unit && Array.isArray(unit.images) && unit.images.length > 0) {
    const primary = unit.images.find((img) => img.isPrimary);
    return primary ? primary.imageUrl : unit.images[0]?.imageUrl;
  }
  if ("imageUrls" in unit && Array.isArray(unit.imageUrls) && unit.imageUrls.length > 0) {
    return unit.imageUrls[0];
  }
  return undefined;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const { type } = await searchParams;
  const unitType = type === "resale" ? "resale" : "primary";
  const unit = await resolveUnitByNameOrId(id, unitType, locale, "USD");

  const title = unit?.name ? `${unit.name} | Unit Details` : "Unit Details";
  const description =
    unit?.description ||
    "Explore unit specifications, floor plans, photo gallery, amenities, and investment pricing.";
  const primaryImage = getUnitPrimaryImage(unit);
  const slug = toUrlSlug(unit?.name, unit?.id || id);

  return buildPageMetadata({
    title,
    description,
    locale,
    path: `/units/${slug}?type=${unitType}`,
    image: primaryImage,
  });
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id, locale } = await params;
  const { type } = await searchParams;
  const unitType = type === "resale" ? "resale" : "primary";
  const unit = await resolveUnitByNameOrId(id, unitType, locale, "USD");
  const unitId = unit?.id || parseInt(id, 10) || 0;
  const slug = toUrlSlug(unit?.name, unitId || id);

  const priceUsd =
    unit?.prices?.find((p) => p.currency === "USD")?.price ||
    unit?.prices?.[0]?.price;

  const schemaJsonLd = unit
    ? buildRealEstateJsonLd({
        name: unit.name,
        description: unit.description,
        image: getUnitPrimaryImage(unit),
        url: `/${locale}/units/${slug}?type=${unitType}`,
        city: "Hurghada",
        price: priceUsd,
        currency: "USD",
        numberOfRooms: unit.noBedRoom,
      })
    : null;

  return (
    <>
      {schemaJsonLd && (
        <script
          id="json-ld-unit"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      )}
      <UnitDetailsPage id={unitId} nameOrSlug={id} type={unitType} />
    </>
  );
}
