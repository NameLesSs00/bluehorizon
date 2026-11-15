import type { Metadata } from "next";
import AreaDetailsPage from "@/components/UserComp/Areas/AreaDetails/AreaDetailsPage";
import { resolveProjectLocationByNameOrId } from "@/clientApi/resolversApi";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";
import { buildBreadcrumbJsonLd } from "@/shared/utils/jsonLd";
import { toUrlSlug } from "@/shared/utils/slug";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const area = await resolveProjectLocationByNameOrId(id, locale);

  const title = area?.name ? `${area.name} Area Guide` : "Area Overview";
  const description =
    area?.description ||
    "Explore coastal neighborhoods, real estate investment zones, and luxury beachfront developments.";
  const primaryImage = area?.images?.find((img) => img.isPrimary)?.imageUrl || area?.images?.[0]?.imageUrl;
  const slug = toUrlSlug(area?.name, area?.id || id);

  return buildPageMetadata({
    title,
    description,
    locale,
    path: `/areas/${slug}`,
    image: primaryImage,
  });
}

export default async function Page({ params }: PageProps) {
  const { id, locale } = await params;
  const area = await resolveProjectLocationByNameOrId(id, locale);
  const areaId = area?.id || parseInt(id, 10) || 0;
  const slug = toUrlSlug(area?.name, areaId || id);

  const breadcrumbs = [
    { name: "Home", url: `/${locale}` },
    { name: "Areas", url: `/${locale}/areas` },
    { name: area?.name || "Area Details", url: `/${locale}/areas/${slug}` },
  ];

  return (
    <>
      <script
        id="json-ld-area-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <AreaDetailsPage id={areaId} nameOrSlug={id} />
    </>
  );
}
