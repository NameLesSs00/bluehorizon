"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiChevronRight } from "react-icons/fi";
import { TbBed, TbBath, TbRulerMeasure } from "react-icons/tb";
import { RentalItem, PROPERTY_TYPE_LABELS } from "@/models/rental";
import { getFullRentalMediaUrl } from "@/clientApi/rentalsApi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";

interface RentalUnitCardProps {
  unit: RentalItem;
}

export default function RentalUnitCard({ unit }: RentalUnitCardProps) {
  const { t, locale, direction } = useTranslation();
  const [imageError, setImageError] = useState(false);

  const primaryImage =
    unit.images?.find((img) => img.isPrimary) || unit.images?.[0];
  const resolvedImageUrl = primaryImage?.imageUrl
    ? getFullRentalMediaUrl(primaryImage.imageUrl)
    : null;

  const displayImage =
    !imageError && resolvedImageUrl && resolvedImageUrl.trim().length > 0
      ? resolvedImageUrl
      : "/default-fallback.png";

  const resolveBadgeText = () => {
    if (
      unit.propertyType !== undefined &&
      unit.propertyType !== null &&
      PROPERTY_TYPE_LABELS[unit.propertyType]
    ) {
      return PROPERTY_TYPE_LABELS[unit.propertyType];
    }
    const catName = unit.categoryItems?.[0]?.name;
    if (
      catName &&
      !["home", "rental", "unit", "properties"].includes(catName.toLowerCase())
    ) {
      return catName;
    }
    if (typeof unit.bedroomNo === "number") {
      if (unit.bedroomNo === 0) return t("standaloneList.filters.types.Studio", "Studio");
      if (unit.bedroomNo === 1) return `1 ${t("standaloneDetail.specs.room", "Room")}`;
      if (unit.bedroomNo > 1) return `${unit.bedroomNo} ${t("standaloneDetail.specs.rooms", "Rooms")}`;
    }
    return t("standaloneList.filters.types.Villa", "Villa");
  };

  const categoryBadge = resolveBadgeText();

  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);

  const primaryPrice =
    unit.prices?.find(
      (p) => p.currency.toUpperCase() === currentCurrency.toUpperCase()
    ) || unit.prices?.[0];

  const priceText = primaryPrice
    ? `${primaryPrice.currency.toUpperCase()} ${Number(primaryPrice.price).toLocaleString()}`
    : t("home.featuredProjects.priceOnRequest", "Price on request");

  const locationName = unit.rentalLocation?.name || "Hurghada, Red Sea";

  return (
    <div className="group flex flex-col overflow-hidden rounded-[20px] border border-[#D9E2EE] bg-white transition-all duration-300 hover:shadow-xl hover:border-[#1B3A6B]/30">
      {/* Image Container with Category Badge */}
      <div className="relative h-[210px] w-full overflow-hidden bg-[#F9F7F4]">
        <Image
          src={displayImage}
          alt={unit.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImageError(true)}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <div className="absolute top-3.5 start-3.5 z-10 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#1B3A6B] shadow-xs backdrop-blur-xs">
          <span style={{ fontFamily: "var(--font-inter)" }}>{categoryBadge}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Title */}
          <h3
            className="line-clamp-1 text-[17px] font-bold text-[#202326] transition-colors group-hover:text-[#1B3A6B]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {unit.name}
          </h3>

          {/* Subtitle / Excerpt */}
          <p
            className="mt-1 line-clamp-1 text-xs text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {unit.description || "Panoramic sea view with spacious living areas."}
          </p>

          {/* Specs Row */}
          <div
            className="mt-4 flex items-center gap-2.5 text-[11px] text-[#65706B] border-y border-[#F0F3FA] py-2.5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <div className="flex items-center gap-1">
              <TbRulerMeasure className="h-3.5 w-3.5 text-[#1B3A6B]" />
              <span>{unit.size || 125} m²</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <TbBed className="h-3.5 w-3.5 text-[#1B3A6B]" />
              <span>
                {unit.bedroomNo || 2}{" "}
                {(unit.bedroomNo || 2) === 1
                  ? t("standaloneDetail.specs.room", "Room")
                  : t("standaloneDetail.specs.rooms", "Rooms")}
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <TbBath className="h-3.5 w-3.5 text-[#1B3A6B]" />
              <span>
                {unit.bathroomNo || 2}{" "}
                {(unit.bathroomNo || 2) === 1
                  ? t("standaloneDetail.specs.bath", "Bath")
                  : t("standaloneDetail.specs.baths", "Baths")}
              </span>
            </div>
          </div>

          {/* Price & Location Row */}
          <div className="mt-3.5 flex items-center justify-between">
            <span
              className="text-base font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {priceText}
            </span>

            <div
              className="flex items-center gap-1 text-[11px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <FiMapPin className="h-3 w-3 text-[#1B3A6B]" />
              <span className="line-clamp-1 max-w-[110px]">{locationName}</span>
            </div>
          </div>
        </div>

        {/* View Details Action Button */}
        <div className="mt-4 pt-1">
          <Link
            href={`/${locale}/rent/${unit.id}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-[#1B3A6B] py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>{t("standaloneList.card.viewDetails", "View Details")}</span>
            <FiChevronRight
              className={`h-3.5 w-3.5 ${direction === "rtl" ? "rotate-180" : ""}`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
