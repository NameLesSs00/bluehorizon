import type { Metadata } from "next";
import RentalDetailsPage from "@/components/UserComp/Rentals/RentalDetails/RentalDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Rental Property Details | Blue Horizon Real Estate",
  description:
    "View full gallery, scenic views, amenities, rental terms, and booking options for this luxury rental property.",
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const unitId = parseInt(resolvedParams.id, 10) || 1;
  return <RentalDetailsPage id={unitId} />;
}

