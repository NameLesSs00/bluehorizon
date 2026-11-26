"use client";

import FeaturedProjectCard from "@/components/UserComp/Home/FeaturedProjectCard";

export interface ProjectDisplayItem {
  id: string | number;
  badge?: string | null;
  title: string;
  description: string;
  location?: string;
  priceFormatted: string;
  propertyTypes?: string;
  specsSummary?: string;
  footerLabel?: string;
  imageSrc: string;
  isFallback?: boolean;
  isHotOffer?: boolean;
  hotOfferEndLabel?: string | null;
}

interface ProjectGridCardProps {
  project: ProjectDisplayItem;
}

export default function ProjectGridCard({ project }: ProjectGridCardProps) {
  return (
    <FeaturedProjectCard
      project={{
        id: String(project.id),
        badge: project.badge,
        isHotOffer: project.isHotOffer,
        hotOfferEndLabel: project.hotOfferEndLabel,
        title: project.title,
        location: project.location || "Hurghada, Red Sea",
        price: project.priceFormatted,
        propertyTypes: project.propertyTypes || "",
        specsSummary: project.specsSummary || "",
        footerLabel: project.footerLabel || "Explore Project",
        imageSrc: project.imageSrc,
        isFallback: project.isFallback,
      }}
    />
  );
}
