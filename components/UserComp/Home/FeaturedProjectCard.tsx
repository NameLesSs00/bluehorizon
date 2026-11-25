"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/features/i18n/useTranslation";
import { toUrlSlug } from "@/shared/utils/slug";
import HotOfferRibbon from "@/components/UserComp/Common/HotOfferRibbon";

export interface ProjectCardData {
  id: string;
  badge?: string | null;
  isHotOffer?: boolean;
  hotOfferEndLabel?: string | null;
  title: string;
  location: string;
  price: string;
  propertyTypes: string;
  specsSummary: string;
  footerLabel: string;
  imageSrc: string;
  isFallback?: boolean;
}

interface FeaturedProjectCardProps {
  project: ProjectCardData;
}

export default function FeaturedProjectCard({
  project,
}: FeaturedProjectCardProps) {
  const { locale, direction } = useTranslation();

  return (
    <Link
      href={`/${locale}/projects/${toUrlSlug(project.title, project.id)}`}
      className={`group flex h-full w-full flex-col overflow-hidden rounded-[16px] border bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-xl ${
        project.isHotOffer
          ? "border-[#D4A843]/50 shadow-[0_6px_24px_rgba(184,150,62,0.08)]"
          : "border-[#E2E8F3]"
      }`}
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#F9F7F4]">
        {project.isFallback ? (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative h-20 w-36 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/default-fallback.png"
                alt={project.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        )}

        {project.badge && (
          <div className="absolute top-[14px] start-[14px] z-10 rounded-full border border-[#B8963E]/35 bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur-xs">
            <span
              className="block text-[10px] font-semibold uppercase leading-none tracking-wider text-[#9A7A2C]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {project.badge}
            </span>
          </div>
        )}

        {project.isHotOffer && <HotOfferRibbon size="card" />}

        {project.hotOfferEndLabel && (
          <div className="absolute bottom-2.5 start-2.5 z-10 rounded-full border border-[#D4A843]/50 bg-[#1B3A6B]/85 px-2.5 py-1 backdrop-blur-xs">
            <span
              className="block text-[10px] font-medium leading-none text-[#F5E1A4]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {project.hotOfferEndLabel}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-1.5">
          <h3
            className="text-[20px] font-normal leading-none tracking-normal text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {project.title}
          </h3>

          <div className="flex items-center gap-1.5 pt-0.5">
            <Image
              src="/HomePage/FeaturedProjects/location.svg"
              alt=""
              width={11}
              height={13}
              className="h-[13px] w-[11px] shrink-0"
            />
            <span
              className="text-[12px] font-normal leading-none tracking-normal text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {project.location}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-1.5 pb-4">
          <p
            className="text-[18px] font-bold leading-none tracking-normal text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.price}
          </p>
          <p
            className="line-clamp-2 min-h-[30px] text-[11px] font-normal leading-[1.35] tracking-normal text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.propertyTypes}
            {project.specsSummary ? ` · ${project.specsSummary}` : ""}
          </p>
        </div>

        <div className="mt-auto border-t border-[#E8ECE9] pt-3.5">
          <div className="flex items-center justify-between">
            <span
              className="text-[12px] font-semibold leading-none tracking-normal text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {project.footerLabel}
            </span>
            <Image
              src="/HomePage/FeaturedProjects/link.svg"
              alt=""
              width={9}
              height={9}
              className={`h-[9px] w-[9px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                direction === "rtl" ? "scale-x-[-1]" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
