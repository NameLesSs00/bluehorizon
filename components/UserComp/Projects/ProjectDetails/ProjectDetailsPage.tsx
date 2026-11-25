"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import ProjectBreadcrumb from "./ProjectBreadcrumb";
import ProjectDetailsHeroBanner from "./ProjectDetailsHeroBanner";
import ProjectOverviewSection from "./ProjectOverviewSection";
import ProjectGallerySection from "./ProjectGallerySection";
import ProjectFacilitiesSection from "./ProjectFacilitiesSection";
import ProjectPaymentPlansSection from "./ProjectPaymentPlansSection";
import ProjectAvailableUnitsSection from "./ProjectAvailableUnitsSection";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import { getFullProjectImageUrl, getProjectById } from "@/clientApi/projectsApi";
import { resolveProjectByNameOrId } from "@/clientApi/resolversApi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import { isActiveHotOfferToday } from "@/shared/utils/hotOffer";

interface ProjectDetailsPageProps {
  id?: number;
  nameOrSlug?: string;
}

export default function ProjectDetailsPage({ id, nameOrSlug }: ProjectDetailsPageProps) {
  const { locale } = useTranslation();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const targetKey = nameOrSlug || id || 0;

  const { data: projectRes, isLoading } = useQuery({
    queryKey: ["publicProject", targetKey, locale, currentCurrency],
    queryFn: async () => {
      const target = nameOrSlug || id;
      if (!target) return null;
      return await resolveProjectByNameOrId(target, locale, currentCurrency || "EGP");
    },
    enabled: Boolean(nameOrSlug || (typeof id === "number" && id > 0)),
    staleTime: 1000 * 60 * 5,
  });

  const project = projectRes;

  // Sort images: primary first
  const galleryImageUrls = useMemo(() => {
    if (project?.images && project.images.length > 0) {
      const sorted = [...project.images].sort((a, b) => {
        if (a.isPrimary && !b.isPrimary) return -1;
        if (!a.isPrimary && b.isPrimary) return 1;
        return 0;
      });
      return sorted.map((img) => getFullProjectImageUrl(img.imageUrl));
    }
    if (project?.imageUrls && project.imageUrls.length > 0) {
      return project.imageUrls.map((url) => getFullProjectImageUrl(url));
    }
    return [];
  }, [project?.images, project?.imageUrls]);

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

  return (
    <div className="flex min-h-screen flex-col bg-[#F0F3FA]">
      <Navbar />
      <main className="flex-1 pb-16">
        <ProjectBreadcrumb projectName={project?.name} />
        <ProjectDetailsHeroBanner
          title={project?.name}
          imageUrl={galleryImageUrls[0] || project?.imageUrls?.[0]}
          isHotOffer={isActiveHotOfferToday(project)}
          endDateHotOffer={project?.endDateHotOffer}
        />
        <ProjectOverviewSection
          title={project?.name}
          locationName={project?.locationName}
          description={project?.description}
        />
        <ProjectGallerySection
          images={galleryImageUrls}
          title={project?.name}
        />
        <ProjectFacilitiesSection facilities={project?.facilities} />
        <ProjectPaymentPlansSection projectId={project?.id} />
        <ProjectAvailableUnitsSection
          projectId={project?.id}
          locationOrProjectName={project?.locationName || project?.name}
        />
      </main>
      <Footer />
    </div>
  );
}
