import type { Metadata } from "next";
import LocationDetailsPage from "@/components/UserComp/Locations/LocationDetails/LocationDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Rental Location Overview - Blue Horizon",
  description:
    "Explore vacation rentals, coastal holiday homes, and residential stays in this destination.",
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const locationId = parseInt(resolvedParams.id, 10) || 0;

  return <LocationDetailsPage id={locationId} />;
}

