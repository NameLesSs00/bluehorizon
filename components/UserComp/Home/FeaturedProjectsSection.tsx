"use client";

import Image from "next/image";
import Link from "next/link";
import { usePublicProjectsQuery } from "@/features/projects/useProjectsQueries";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";
import { ProjectItem } from "@/models/project";
import FeaturedProjectCard, { ProjectCardData } from "./FeaturedProjectCard";

function formatProjectCard(item: ProjectItem): ProjectCardData {
  const hasImage = Boolean(item.imageUrls && item.imageUrls.length > 0);
  const coverImage = hasImage
    ? getFullProjectImageUrl(item.imageUrls[0])
    : "/default-fallback.png";

  // Only show the badge ribbon if the project is actually a featured project
  const badge = item.isFeature ? "FEATURED PROJECT" : null;

  const usdPrice = item.prices?.find((p) => p.currency.toUpperCase() === "USD");
  const fallbackPrice = item.prices?.[0];
  const activePrice = usdPrice || fallbackPrice;

  let priceText = "Price on request";
  if (activePrice && (activePrice.minimumPrice || activePrice.maximumPrice)) {
    const symbol =
      activePrice.currency === "USD"
        ? "$"
        : activePrice.currency === "EUR"
        ? "€"
        : activePrice.currency === "GBP"
        ? "£"
        : `${activePrice.currency} `;

    if (activePrice.minimumPrice) {
      priceText = `Starting from ${symbol}${Number(activePrice.minimumPrice).toLocaleString()}`;
    } else if (activePrice.maximumPrice) {
      priceText = `Up to ${symbol}${Number(activePrice.maximumPrice).toLocaleString()}`;
    }
  }

  const propertyTypes =
    item.projectTypes && item.projectTypes.length > 0
      ? item.projectTypes.map((t) => t.name).join(" & ")
      : "";

  const specsSummary =
    item.furnitureType === "Fully" || item.furnitureType === 2
      ? "Fully Furnished"
      : item.furnitureType === "Semi" || item.furnitureType === 1
      ? "Semi-Furnished"
      : item.facilities && item.facilities.length > 0
      ? `${item.facilities.length} Facilities`
      : "";

  let footerLabel = "Explore Project";
  if (item.deliveryDate) {
    const year = new Date(item.deliveryDate).getFullYear();
    if (!isNaN(year)) {
      footerLabel = `Delivery ${year}`;
    }
  }

  return {
    id: String(item.id),
    badge,
    title: item.name,
    location: item.locationName || "",
    price: priceText,
    propertyTypes,
    specsSummary,
    footerLabel,
    imageSrc: coverImage,
    isFallback: !hasImage,
  };
}

export default function FeaturedProjectsSection() {
  const { data: projectsData, isLoading } = usePublicProjectsQuery({
    Language: "en",
    Currency: "USD",
    PageNumber: 1,
    PageSize: 8,
  });

  const rawItems = projectsData?.items || [];

  // Sort featured projects first, taking up to 4
  const displayProjects: ProjectCardData[] = [...rawItems]
    .sort((a, b) => (b.isFeature ? 1 : 0) - (a.isFeature ? 1 : 0))
    .slice(0, 4)
    .map(formatProjectCard);

  return (
    <section className="bg-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              DISCOVER THE EXTRAORDINARY
            </p>
            <h2
              className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Featured Projects
            </h2>
            <p
              className="mt-3 text-[15px] font-normal leading-[1.6] tracking-normal text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Thoughtfully selected communities. Exceptional homes. A future
              worth investing in.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 self-start text-[14px] font-semibold leading-none text-[#145C4B] transition-opacity hover:opacity-80 md:self-end"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>Explore all projects</span>
            <Image
              src="/HomePage/FeaturedProjects/link.svg"
              alt="Arrow"
              width={9}
              height={9}
              className="h-[9px] w-[9px] shrink-0"
            />
          </Link>
        </header>

        {isLoading ? (
          <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-[#E6EAE7] bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#145C4B] border-t-transparent" />
            <p
              className="mt-3 text-[13px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Loading featured projects...
            </p>
          </div>
        ) : displayProjects.length === 0 ? (
          <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-[#E6EAE7] bg-white text-[14px] text-[#65706B]">
            No projects available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayProjects.map((project) => (
              <FeaturedProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
