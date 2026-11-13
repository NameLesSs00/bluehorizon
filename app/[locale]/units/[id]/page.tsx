import type { Metadata } from "next";
import UnitDetailsPage from "@/components/UserComp/Units/UnitDetailsPage";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ type?: string }>;
}

export const metadata: Metadata = {
  title: "Unit Details - Blue Horizon",
  description:
    "Explore unit specifications, photo gallery, amenities, and pricing.",
};

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const unitId = parseInt(resolvedParams.id, 10) || 0;
  const unitType =
    resolvedSearchParams.type === "resale" ? "resale" : "primary";

  return <UnitDetailsPage id={unitId} type={unitType} />;
}

