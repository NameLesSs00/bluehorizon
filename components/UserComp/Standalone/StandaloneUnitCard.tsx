"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiMapPin } from "react-icons/fi";
import { TbBath, TbBed, TbRulerMeasure } from "react-icons/tb";
import { StandaloneUnitItem } from "@/models/standaloneUnit";
import { getFullStandaloneUnitMediaUrl } from "@/clientApi/standaloneUnitsApi";
import { useTranslation } from "@/features/i18n/useTranslation";

interface StandaloneUnitCardProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneUnitCard({ unit }: StandaloneUnitCardProps) {
  const { t, locale } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const primaryImage =
    unit.images?.find((img) => img.isPrimary) || unit.images?.[0];
  const resolvedUrl =
    primaryImage?.imageUrl && !imageError
      ? getFullStandaloneUnitMediaUrl(primaryImage.imageUrl)
      : "/default-fallback.png";

  const resolveBadgeTag = () => {
    if (unit.propertyType && unit.propertyType.trim().length > 0) {
      const typeKey = unit.propertyType.trim();
      return t(`standaloneList.filters.types.${typeKey}`, typeKey);
    }
    if (typeof unit.noBedRoom === "number") {
      if (unit.noBedRoom === 0)
        return t("standaloneList.filters.types.Studio", "Studio");
      if (unit.noBedRoom === 1)
        return `1 ${t("standaloneList.card.bed", "Bed")}`;
      if (unit.noBedRoom > 1)
        return `${unit.noBedRoom} ${t("standaloneList.card.beds", "Beds")}`;
    }
    return t("standaloneList.filters.types.Villa", "Villa");
  };

  const propertyTag = resolveBadgeTag();

  // Formatted price
  const currencySymbol =
    unit.currencyCode === "USD"
      ? "$ "
      : unit.currencyCode === "EUR"
      ? "€ "
      : unit.currencyCode === "GBP"
      ? "£ "
      : unit.currencyCode
      ? `${unit.currencyCode} `
      : "EGP ";

  const formattedPrice =
    typeof unit.price === "number" && unit.price > 0
      ? `${currencySymbol}${unit.price.toLocaleString()}`
      : t("standaloneList.card.priceOnRequest", "Price on request");

  const descriptionText =
    unit.description ||
    [unit.city, unit.country].filter(Boolean).join(", ") ||
    null;

  const hasArea = typeof unit.area === "number" && unit.area > 0;
  const hasRooms = typeof unit.noBedRoom === "number" && unit.noBedRoom > 0;
  const hasBaths = typeof unit.noBathRoom === "number" && unit.noBathRoom > 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[20px] border border-[#D9E2EE] bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#2B5FA6]/40">
      {/* Image Container */}
      <div className="relative h-[220px] w-full overflow-hidden bg-[#F0F3FA]">
        <Image
          src={resolvedUrl}
          alt={unit.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImageError(true)}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Property Type Badge */}
        {propertyTag && (
          <div className="absolute top-3.5 left-3.5 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#2B5FA6] shadow-sm backdrop-blur-sm">
            <span style={{ fontFamily: "var(--font-inter)" }}>{propertyTag}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Title */}
        <h3
          className="text-base sm:text-lg font-bold text-[#202326] transition-colors group-hover:text-[#2B5FA6] line-clamp-1"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {unit.name}
        </h3>

        {/* Short Description */}
        {descriptionText && (
          <p
            className="mt-1 text-xs text-[#6B7570] line-clamp-1"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {descriptionText}
          </p>
        )}

        {/* Specs Row */}
        {(hasArea || hasRooms || hasBaths) && (
          <div
            className="my-3 flex items-center justify-around rounded-xl border border-[#D9E2EE]/60 bg-[#F0F3FA]/60 py-2.5 px-3 text-[11px] sm:text-xs text-[#202326]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {hasArea && (
              <div className="flex items-center gap-1.5 font-medium whitespace-nowrap">
                <TbRulerMeasure className="h-4 w-4 text-[#1B3A6B] shrink-0" />
                <span className="whitespace-nowrap">{unit.area} m²</span>
              </div>
            )}

            {hasArea && (hasRooms || hasBaths) && (
              <span className="text-[#D9E2EE] font-bold select-none">&bull;</span>
            )}

            {hasRooms && (
              <div className="flex items-center gap-1.5 font-medium whitespace-nowrap">
                <TbBed className="h-4 w-4 text-[#1B3A6B] shrink-0" />
                <span className="whitespace-nowrap">
                  {unit.noBedRoom}{" "}
                  {unit.noBedRoom === 1
                    ? t("standaloneList.card.bed", "Bed")
                    : t("standaloneList.card.beds", "Beds")}
                </span>
              </div>
            )}

            {hasRooms && hasBaths && (
              <span className="text-[#D9E2EE] font-bold select-none">&bull;</span>
            )}

            {hasBaths && (
              <div className="flex items-center gap-1.5 font-medium whitespace-nowrap">
                <TbBath className="h-4 w-4 text-[#1B3A6B] shrink-0" />
                <span className="whitespace-nowrap">
                  {unit.noBathRoom}{" "}
                  {unit.noBathRoom === 1
                    ? t("standaloneList.card.bath", "Bath")
                    : t("standaloneList.card.baths", "Baths")}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Price & Action */}
        <div className="mt-auto pt-3 border-t border-[#D9E2EE]/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div
              className="text-base sm:text-lg font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {formattedPrice}
            </div>

            {unit.city && (
              <div
                className="flex items-center gap-1 text-[11px] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <FiMapPin className="h-3.5 w-3.5 text-[#1B3A6B]" />
                <span className="line-clamp-1 max-w-[120px]">{unit.city}</span>
              </div>
            )}
          </div>

          <Link
            href={`/${locale}/standalone/${unit.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#2B5FA6] py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1B3A6B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>{t("standaloneList.card.viewDetails", "View Details")}</span>
            <FiChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
