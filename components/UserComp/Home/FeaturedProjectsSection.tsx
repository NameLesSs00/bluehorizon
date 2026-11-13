"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { usePublicProjectsQuery } from "@/features/projects/useProjectsQueries";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";
import { ProjectItem } from "@/models/project";
import { useTranslation } from "@/features/i18n/useTranslation";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import FeaturedProjectCard, { ProjectCardData } from "./FeaturedProjectCard";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function FeaturedProjectsSection() {
  const { t, locale, direction } = useTranslation();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { data: projectsData, isLoading } = usePublicProjectsQuery({
    Language: locale,
    Currency: currentCurrency,
    PageNumber: 1,
    PageSize: 8,
  });

  const rawItems = projectsData?.items || [];

  function formatProjectCard(item: ProjectItem): ProjectCardData {
    const hasImage = Boolean(item.imageUrls && item.imageUrls.length > 0);
    const coverImage = hasImage
      ? getFullProjectImageUrl(item.imageUrls[0])
      : "/default-fallback.png";

    const badge = item.isFeature
      ? t("home.featuredProjects.featuredBadge", "FEATURED PROJECT")
      : null;

    const matchedPrice = item.prices?.find(
      (p) => p.currency.toUpperCase() === currentCurrency.toUpperCase()
    );
    const fallbackPrice = item.prices?.[0];
    const activePrice = matchedPrice || fallbackPrice;

    let priceText = t("home.featuredProjects.priceOnRequest", "Price on request");
    if (activePrice && (activePrice.minimumPrice || activePrice.maximumPrice)) {
      const code = (activePrice.currency || currentCurrency).toUpperCase();
      const symbol =
        code === "USD"
          ? "$"
          : code === "EUR"
          ? "€"
          : code === "GBP"
          ? "£"
          : `${code} `;

      if (activePrice.minimumPrice) {
        priceText = `${t("home.featuredProjects.startingFrom", "Starting from")} ${symbol}${Number(
          activePrice.minimumPrice
        ).toLocaleString()}`;
      } else if (activePrice.maximumPrice) {
        priceText = `${t("home.featuredProjects.upTo", "Up to")} ${symbol}${Number(
          activePrice.maximumPrice
        ).toLocaleString()}`;
      }
    }

    const propertyTypes =
      item.projectTypes && item.projectTypes.length > 0
        ? item.projectTypes.map((tp) => tp.name).join(" & ")
        : "";

    const specsSummary =
      item.furnitureType === "Fully" || item.furnitureType === 2
        ? t("home.featuredProjects.fullyFurnished", "Fully Furnished")
        : item.furnitureType === "Semi" || item.furnitureType === 1
        ? t("home.featuredProjects.semiFurnished", "Semi-Furnished")
        : item.facilities && item.facilities.length > 0
        ? `${item.facilities.length} ${t("home.featuredProjects.facilities", "Facilities")}`
        : "";

    let footerLabel = t("home.featuredProjects.exploreProject", "Explore Project");
    if (item.deliveryDate) {
      const year = new Date(item.deliveryDate).getFullYear();
      if (!isNaN(year)) {
        footerLabel = t("home.featuredProjects.delivery", "Delivery {year}").replace(
          "{year}",
          String(year)
        );
      }
    }

    return {
      id: String(item.id),
      badge,
      title: item.name,
      location: item.locationName || "Hurghada, Red Sea",
      price: priceText,
      propertyTypes,
      specsSummary,
      footerLabel,
      imageSrc: coverImage,
      isFallback: !hasImage,
    };
  }

  const displayProjects: ProjectCardData[] = [...rawItems]
    .sort((a, b) => (b.isFeature ? 1 : 0) - (a.isFeature ? 1 : 0))
    .slice(0, 4)
    .map(formatProjectCard);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white py-8 sm:py-10 lg:py-12"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("home.featuredProjects.eyebrow", "FEATURED OPPORTUNITIES")}
            </p>
            <h2
              className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("home.featuredProjects.heading", "Explore Featured Projects")}
            </h2>
            <p
              className="mt-3 text-[15px] font-normal leading-[1.6] tracking-normal text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t(
                "home.featuredProjects.subtitle",
                "Discover premier developments and high-yield investment properties."
              )}
            </p>
          </div>

          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 self-start text-[14px] font-semibold leading-none text-[#2B5FA6] transition-opacity hover:opacity-80 md:self-end"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>{t("home.featuredProjects.viewAll", "View all projects")}</span>
            <Image
              src="/HomePage/FeaturedProjects/link.svg"
              alt=""
              width={9}
              height={9}
              className={`h-[9px] w-[9px] shrink-0 ${
                direction === "rtl" ? "scale-x-[-1]" : ""
              }`}
            />
          </Link>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[360px] w-full animate-pulse rounded-[16px] bg-[#E5ECF6]"
              />
            ))}
          </div>
        ) : displayProjects.length === 0 ? (
          <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-[#E2E8F3] bg-white text-[14px] text-[#65706B]">
            {t(
              "home.featuredProjects.noProjectsFound",
              "No featured projects currently available."
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <FeaturedProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
