import type { Metadata } from "next";
import ProjectDetailsPage from "@/components/UserComp/Projects/ProjectDetails/ProjectDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Project Details - Blue Horizon",
  description:
    "Explore project overview, gallery, facilities, payment plans, and available units.",
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const projectId = parseInt(resolvedParams.id, 10) || 0;

  return <ProjectDetailsPage id={projectId} />;
}

