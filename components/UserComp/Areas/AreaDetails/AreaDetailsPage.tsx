"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AreaBreadcrumb from "./AreaBreadcrumb";
import AreaDetailsHeroBanner from "./AreaDetailsHeroBanner";
import AreaOverviewSection from "./AreaOverviewSection";
import AreaAvailableUnitsSection from "./AreaAvailableUnitsSection";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import {
  getProjectLocationById,
  getFullLocationMediaUrl,
} from "@/clientApi/projectLocationsApi";

interface AreaDetailsPageProps {
  id: number;
}

export default function AreaDetailsPage({ id }: AreaDetailsPageProps) {
  const [activeUnitsCount, setActiveUnitsCount] = useState<number>(0);

  const { data: areaRes, isLoading } = useQuery({
    queryKey: ["publicAreaLocation", id],
    queryFn: async () => {
      if (!id || id <= 0) return null;
      const res = await getProjectLocationById(id, "en");
      return res.data;
    },
    enabled: typeof id === "number" && id > 0,
    staleTime: 1000 * 60 * 5,
  });

  const area = areaRes;

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
    area?.images?.find((img) => img.isPrimary) || area?.images?.[0];
  const primaryImageUrl = primaryImage?.imageUrl
    ? getFullLocationMediaUrl(primaryImage.imageUrl)
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#F3F5F3]">
      <Navbar />
      <main className="flex-1 pb-16">
        <AreaBreadcrumb areaName={area?.name} />
        <AreaDetailsHeroBanner
          title={area?.name}
          imageUrl={primaryImageUrl}
        />
        <AreaOverviewSection
          areaName={area?.name}
          description={area?.description}
          activeUnitsCount={activeUnitsCount}
        />
        <AreaAvailableUnitsSection
          areaId={id}
          areaName={area?.name}
          onCountLoaded={setActiveUnitsCount}
        />
      </main>
      <Footer />
    </div>
  );
}

