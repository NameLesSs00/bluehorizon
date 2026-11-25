"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PiFlameLight, PiTagLight } from "react-icons/pi";
import { usePublicProjectsQuery } from "@/features/projects/useProjectsQueries";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";
import { ProjectItem } from "@/models/project";
import { useTranslation } from "@/features/i18n/useTranslation";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import { formatHotOfferEndDate, isActiveHotOfferToday } from "@/shared/utils/hotOffer";
import {
  cardGridItemVariants,
  headerContainerVariants,
  headerItemVariants,
} from "@/shared/utils/motionPresets";
import FeaturedProjectCard, { ProjectCardData } from "./FeaturedProjectCard";
import HomeSectionBgIcon from "./HomeSectionBgIcon";

export default function HotOffersSection() {
  const { t, locale, direction } = useTranslation();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { data: projectsData, isLoading } = usePublicProjectsQuery({
    Language: locale,
    Currency: currentCurrency,
    IsHotOffer: true,
    PageNumber: 1,
    PageSize: 8,
  });

  const activeOffers = (projectsData?.items || [])
    .filter((item) => isActiveHotOfferToday(item))
    .slice(0, 4);

  if (!isLoading && activeOffers.length === 0) {
    return null;
  }

  function formatHotOfferCard(item: ProjectItem): ProjectCardData {
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
    const activePrice = matchedPrice || item.prices?.[0];

    let priceText = t("home.featuredProjects.priceOnRequest", "Price on request");
    if (activePrice && (activePrice.minimumPrice || activePrice.maximumPrice)) {
      const code = (activePrice.currency || currentCurrency).toUpperCase();
      const symbol = code === "USD" ? "$" : code === "EUR" ? "€" : code === "GBP" ? "£" : `${code} `;
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

    const formattedEnd = formatHotOfferEndDate(item.endDateHotOffer, locale);
    const hotOfferEndLabel = formattedEnd
      ? t("home.hotOffers.validUntil", "Valid until {date}").replace("{date}", formattedEnd)
      : null;

    return {
      id: String(item.id),
      badge,
      isHotOffer: true,
      hotOfferEndLabel,
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

  const displayOffers = activeOffers.map(formatHotOfferCard);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-[#E9DFC8]/75 bg-[#FBF9F4] py-14 sm:py-18 lg:py-20"
    >
      <HomeSectionBgIcon
        leftIcon={PiFlameLight}
        rightIcon={PiTagLight}
        colorClassName="text-[#B8963E]/[0.085]"
      />
      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <motion.header
          variants={headerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              variants={headerItemVariants}
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#B8963E]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("home.hotOffers.eyebrow", "LIMITED TIME DEALS")}
            </motion.p>
            <motion.h2
              variants={headerItemVariants}
              className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("home.hotOffers.heading", "Hot Offers")}
            </motion.h2>
            <motion.p
              variants={headerItemVariants}
              className="mt-3 text-[15px] font-normal leading-[1.6] tracking-normal text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t(
                "home.hotOffers.subtitle",
                "Exclusive today-only and limited-time offers on premier Red Sea developments."
              )}
            </motion.p>
          </div>

          <motion.div variants={headerItemVariants} className="self-start md:self-end shrink-0">
            <Link
              href={`/${locale}/projects?hotOffer=true`}
              className="group inline-flex items-center gap-2 text-[14px] font-semibold leading-none text-[#2B5FA6] transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>{t("home.hotOffers.viewAll", "View all projects")}</span>
              <Image
                src="/HomePage/FeaturedProjects/link.svg"
                alt=""
                width={9}
                height={9}
                className={`h-[9px] w-[9px] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  direction === "rtl"
                    ? "scale-x-[-1] group-hover:-translate-x-0.5"
                    : "group-hover:translate-x-0.5"
                }`}
              />
            </Link>
          </motion.div>
        </motion.header>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[360px] w-full animate-pulse rounded-[16px] bg-[#EFE8D6]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayOffers.map((project, idx) => (
              <motion.div
                key={project.id}
                custom={idx}
                variants={cardGridItemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="h-full"
              >
                <div
                  className="h-full hot-offer-float"
                  style={{ animationDelay: `${idx * 0.45}s` }}
                >
                  <FeaturedProjectCard project={project} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
