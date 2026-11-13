import type { Metadata } from "next";
import StandaloneDetailsPage from "@/components/UserComp/Standalone/StandaloneDetails/StandaloneDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Standalone Unit Details | Blue Horizon Real Estate",
  description:
    "View full details, gallery, amenities, and pricing for this standalone residential property.",
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const unitId = parseInt(resolvedParams.id, 10) || 0;
  return <StandaloneDetailsPage id={unitId} />;
}
