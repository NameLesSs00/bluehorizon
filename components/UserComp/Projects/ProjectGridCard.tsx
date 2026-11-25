"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/features/i18n/useTranslation";
import { toUrlSlug } from "@/shared/utils/slug";
import HotOfferRibbon from "@/components/UserComp/Common/HotOfferRibbon";

export interface ProjectDisplayItem {
  id: string | number;
  title: string;
  description: string;
  priceFormatted: string;
  imageSrc: string;
  isFallback?: boolean;
  isHotOffer?: boolean;
  hotOfferEndLabel?: string | null;
}

interface ProjectGridCardProps {
  project: ProjectDisplayItem;
}

export default function ProjectGridCard({ project }: ProjectGridCardProps) {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";

  return (
    <Link
      href={`/${locale}/projects/${toUrlSlug(project.title, project.id)}`}
      className={`group flex h-full w-full flex-col justify-between overflow-hidden rounded-[20px] border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer ${
        project.isHotOffer
          ? "border-[#D4A843]/60 shadow-[0_6px_24px_rgba(184,150,62,0.12)] hover:border-[#B8963E]"
          : "border-[#D9E2EE] hover:border-[#2B5FA6]/40"
      }`}
    >
      <div>
        {/* Project Card Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F9F7F4]">
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
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          {project.isHotOffer && <HotOfferRibbon size="card" />}

          {project.isHotOffer && project.hotOfferEndLabel && (
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

        {/* Project Content */}
        <div className="p-5 sm:p-6 pb-2">
          <h3
            className="text-[18px] sm:text-[19px] font-bold leading-snug text-[#202326] transition-colors group-hover:text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {project.title}
          </h3>

          <p
            className="mt-2 line-clamp-2 text-[13px] font-normal leading-[1.6] text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Starting Price & Action Button */}
      <div className="flex items-center justify-between px-5 sm:px-6 pb-5 pt-3">
        <div>
          <span
            className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("projects.grid.startingFrom")}
          </span>
          <span
            className="mt-0.5 block text-[16px] sm:text-[17px] font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {project.priceFormatted}
          </span>
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E5ECF6] text-[#2B5FA6] transition-transform duration-200 ${
            isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className={isRtl ? "rotate-180" : ""}
          >
            <path
              d="M2.91669 7H11.0834M11.0834 7L7.00002 2.91667M11.0834 7L7.00002 11.0833"
              stroke="#2B5FA6"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
