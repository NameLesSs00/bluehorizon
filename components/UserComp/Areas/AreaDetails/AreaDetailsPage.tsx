"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AreaBreadcrumb from "./AreaBreadcrumb";
import AreaDetailsHeroBanner from "./AreaDetailsHeroBanner";
import AreaOverviewSection from "./AreaOverviewSection";
import AreaAvailableProjectsSection from "./AreaAvailableProjectsSection";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import {
  getFullLocationMediaUrl,
} from "@/clientApi/projectLocationsApi";
import { resolveProjectLocationByNameOrId } from "@/clientApi/resolversApi";
import { useTranslation } from "@/features/i18n/useTranslation";

interface AreaDetailsPageProps {
  id?: number;
  nameOrSlug?: string;
}

export default function AreaDetailsPage({ id, nameOrSlug }: AreaDetailsPageProps) {
  const { locale } = useTranslation();
  const [activeProjectsCount, setActiveProjectsCount] = useState<number>(0);
  const targetKey = nameOrSlug || id || 0;

  const { data: areaRes, isLoading } = useQuery({
    queryKey: ["publicAreaLocation", targetKey, locale],
    queryFn: async () => {
      const target = nameOrSlug || id;
      if (!target) return null;
      return await resolveProjectLocationByNameOrId(target, locale);
    },
    enabled: Boolean(nameOrSlug || (typeof id === "number" && id > 0)),
    staleTime: 1000 * 60 * 5,
  });

  const area = areaRes;

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

  const sortedImages = [...(area?.images || [])].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return a.sortOrder - b.sortOrder;
  });

  const primaryImage =
    sortedImages.find((img) => img.isPrimary) || sortedImages[0];
  const primaryImageUrl = primaryImage?.imageUrl
    ? getFullLocationMediaUrl(primaryImage.imageUrl)
    : null;

  const resolvedVideoUrl = area?.videoUrl
    ? getFullLocationMediaUrl(area.videoUrl)
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#F0F3FA]">
      <Navbar />
      <main className="flex-1 pb-16">
        <AreaBreadcrumb areaName={area?.name} />
        <AreaDetailsHeroBanner
          title={area?.name}
          imageUrl={primaryImageUrl}
          videoUrl={resolvedVideoUrl}
        />
        <AreaOverviewSection
          areaName={area?.name}
          description={area?.description}
          activeProjectsCount={activeProjectsCount}
        />
        <AreaAvailableProjectsSection
          areaId={area?.id || id || 0}
          areaName={area?.name}
          onCountLoaded={setActiveProjectsCount}
        />
      </main>
      <Footer />
    </div>
  );
}
