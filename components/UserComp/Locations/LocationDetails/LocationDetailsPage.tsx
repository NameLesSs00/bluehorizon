"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "@/features/i18n/useTranslation";
import LocationBreadcrumb from "./LocationBreadcrumb";
import LocationDetailsHeroBanner from "./LocationDetailsHeroBanner";
import LocationOverviewSection from "./LocationOverviewSection";
import LocationAvailableRentalsSection from "./LocationAvailableRentalsSection";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import {
  getFullRentalLocationMediaUrl,
} from "@/clientApi/rentalLocationsApi";
import { resolveRentalLocationByNameOrId } from "@/clientApi/resolversApi";

interface LocationDetailsPageProps {
  id?: number;
  nameOrSlug?: string;
}

export default function LocationDetailsPage({ id, nameOrSlug }: LocationDetailsPageProps) {
  const [activeRentalsCount, setActiveRentalsCount] = useState<number>(0);
  const { locale } = useTranslation();
  const targetKey = nameOrSlug || id || 0;

  const { data: locationRes, isLoading } = useQuery({
    queryKey: ["publicRentalLocation", targetKey, locale],
    queryFn: async () => {
      const target = nameOrSlug || id;
      if (!target) return null;
      return await resolveRentalLocationByNameOrId(target, locale);
    },
    enabled: Boolean(nameOrSlug || (typeof id === "number" && id > 0)),
    staleTime: 1000 * 60 * 5,
  });

  const location = locationRes;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F0F3FA]">
        <Navbar />
        <main className="flex-1 pb-16">
          <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pt-8">
            <div className="h-4 w-48 animate-pulse rounded bg-[#D9E2EE] mb-6" />
            <div className="h-[360px] lg:h-[440px] w-full animate-pulse rounded-[24px] bg-[#E5ECF6]" />
            <div className="mt-10 h-8 w-80 animate-pulse rounded bg-[#D9E2EE]" />
            <div className="mt-4 h-20 w-full animate-pulse rounded bg-[#F0F3FA]" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const sortedImages = [...(location?.images || [])].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return a.sortOrder - b.sortOrder;
  });

  const primaryImage =
    sortedImages.find((img) => img.isPrimary) || sortedImages[0];
  const primaryImageUrl = primaryImage?.imageUrl
    ? getFullRentalLocationMediaUrl(primaryImage.imageUrl)
    : null;

  const resolvedVideoUrl = location?.videoUrl
    ? getFullRentalLocationMediaUrl(location.videoUrl)
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#F0F3FA]">
      <Navbar />
      <main className="flex-1 pb-16">
        <LocationBreadcrumb locationName={location?.name} />
        <LocationDetailsHeroBanner
          title={location?.name}
          imageUrl={primaryImageUrl}
          videoUrl={resolvedVideoUrl}
        />
        <LocationOverviewSection
          locationName={location?.name}
          description={location?.description}
          activeRentalsCount={activeRentalsCount}
        />
        <LocationAvailableRentalsSection
          locationId={location?.id || id || 0}
          locationName={location?.name}
          onCountLoaded={setActiveRentalsCount}
        />
      </main>
      <Footer />
    </div>
  );
}
