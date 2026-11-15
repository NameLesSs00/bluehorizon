import type { Metadata } from "next";
import ProjectDetailsPage from "@/components/UserComp/Projects/ProjectDetails/ProjectDetailsPage";
import { resolveProjectByNameOrId } from "@/clientApi/resolversApi";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";
import { buildRealEstateJsonLd } from "@/shared/utils/jsonLd";
import { toUrlSlug } from "@/shared/utils/slug";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const project = await resolveProjectByNameOrId(id, locale);

  const title = project?.name || "Project Details";
  const description =
    project?.description ||
    "Explore luxury residential compounds, master plans, facilities, and units in Hurghada.";
  const primaryImage = project?.images?.find((img) => img.isPrimary)?.imageUrl || project?.imageUrls?.[0];
  const slug = toUrlSlug(project?.name, project?.id || id);

  return buildPageMetadata({
    title,
    description,
    locale,
    path: `/projects/${slug}`,
    image: primaryImage,
  });
}

export default async function Page({ params }: PageProps) {
  const { id, locale } = await params;
  const project = await resolveProjectByNameOrId(id, locale);
  const projectId = project?.id || parseInt(id, 10) || 0;
  const slug = toUrlSlug(project?.name, projectId || id);

  const schemaJsonLd = project
    ? buildRealEstateJsonLd({
        name: project.name,
        description: project.description,
        image: project.images?.[0]?.imageUrl || project.imageUrls?.[0],
        url: `/${locale}/projects/${slug}`,
        city: project.locationName || "Hurghada",
      })
    : null;

  return (
    <>
      {schemaJsonLd && (
        <script
          id="json-ld-project"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      )}
      <ProjectDetailsPage id={projectId} nameOrSlug={id} />
    </>
  );
}
