import type { Metadata } from "next";
import AreaDetailsPage from "@/components/UserComp/Areas/AreaDetails/AreaDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Area Overview - Blue Horizon",
  description:
    "Explore area overview, local lifestyle, and available residential developments.",
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const areaId = parseInt(resolvedParams.id, 10) || 0;

  return <AreaDetailsPage id={areaId} />;
}

