"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LocationBreadcrumb from "./LocationBreadcrumb";
import LocationDetailsHeroBanner from "./LocationDetailsHeroBanner";
import LocationOverviewSection from "./LocationOverviewSection";
import LocationAvailableRentalsSection from "./LocationAvailableRentalsSection";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import {
  getRentalLocationById,
  getFullRentalLocationMediaUrl,
} from "@/clientApi/rentalLocationsApi";

interface LocationDetailsPageProps {
  id: number;
}

export default function LocationDetailsPage({ id }: LocationDetailsPageProps) {
  const [activeRentalsCount, setActiveRentalsCount] = useState<number>(0);

  const { data: locationRes, isLoading } = useQuery({
    queryKey: ["publicRentalLocation", id],
    queryFn: async () => {
      if (!id || id <= 0) return null;
      const res = await getRentalLocationById(id, "en");
      return res.data;
    },
    enabled: typeof id === "number" && id > 0,
    staleTime: 1000 * 60 * 5,
  });

  const location = locationRes;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F3F5F3]">
        <Navbar />
        <main className="flex-1 pb-16">
          <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pt-8">
            <div className="h-4 w-48 animate-pulse rounded bg-[#E1E7E3] mb-6" />
            <div className="h-[360px] lg:h-[440px] w-full animate-pulse rounded-[24px] bg-[#E8F1EC]" />
            <div className="mt-10 h-8 w-80 animate-pulse rounded bg-[#E1E7E3]" />
            <div className="mt-4 h-20 w-full animate-pulse rounded bg-[#F3F5F3]" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const primaryImage =
    location?.images?.find((img) => img.isPrimary) || location?.images?.[0];
  const primaryImageUrl = primaryImage?.imageUrl
    ? getFullRentalLocationMediaUrl(primaryImage.imageUrl)
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#F3F5F3]">
      <Navbar />
      <main className="flex-1 pb-16">
        <LocationBreadcrumb locationName={location?.name} />
        <LocationDetailsHeroBanner
          title={location?.name}
          imageUrl={primaryImageUrl}
          videoUrl={location?.videoUrl}
        />
        <LocationOverviewSection
          locationName={location?.name}
          description={location?.description}
          activeRentalsCount={activeRentalsCount}
        />
        <LocationAvailableRentalsSection
          locationId={id}
          locationName={location?.name}
          onCountLoaded={setActiveRentalsCount}
        />
      </main>
      <Footer />
    </div>
  );
}

