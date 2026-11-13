"use client";

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
import { getProjectById } from "@/clientApi/projectsApi";

interface ProjectDetailsPageProps {
  id: number;
}

export default function ProjectDetailsPage({ id }: ProjectDetailsPageProps) {
  const { data: projectRes, isLoading } = useQuery({
    queryKey: ["publicProject", id],
    queryFn: async () => {
      if (!id || id <= 0) return null;
      const res = await getProjectById(id, "en", "EGP");
      return res.data;
    },
    enabled: typeof id === "number" && id > 0,
    staleTime: 1000 * 60 * 5,
  });

  const project = projectRes;

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

  return (
    <div className="flex min-h-screen flex-col bg-[#F3F5F3]">
      <Navbar />
      <main className="flex-1 pb-16">
        <ProjectBreadcrumb projectName={project?.name} />
        <ProjectDetailsHeroBanner
          title={project?.name}
          imageUrl={project?.imageUrls?.[0]}
        />
        <ProjectOverviewSection
          title={project?.name}
          locationName={project?.locationName}
          description={project?.description}
        />
        <ProjectGallerySection
          imageUrls={project?.imageUrls}
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
