"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { TbBed, TbBath, TbRulerMeasure } from "react-icons/tb";
import {
  RentalItem,
  PROPERTY_TYPE_LABELS,
  normalizePropertyType,
} from "@/models/rental";
import { getFullRentalMediaUrl } from "@/clientApi/rentalsApi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import { toUrlSlug } from "@/shared/utils/slug";

interface RentalUnitCardProps {
  unit: RentalItem;
}

export default function RentalUnitCard({ unit }: RentalUnitCardProps) {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
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
    if (unit.propertyType !== undefined && unit.propertyType !== null) {
      const normalized = normalizePropertyType(unit.propertyType);
      const translated = t(`rent.details.propertyTypes.${normalized}`);
      if (translated && !translated.startsWith("rent.")) {
        return translated;
      }
      if (PROPERTY_TYPE_LABELS[normalized]) {
        return PROPERTY_TYPE_LABELS[normalized];
      }
    }
    const catName = unit.categoryItems?.[0]?.name;
    if (
      catName &&
      !["home", "rental", "unit", "properties"].includes(catName.toLowerCase())
    ) {
      return catName;
    }
    if (typeof unit.bedroomNo === "number") {
      if (unit.bedroomNo === 0) return t("rent.card.studio", "Studio");
      if (unit.bedroomNo === 1) return t("rent.card.bedroomSingle", "1 Bedroom");
      if (unit.bedroomNo > 1) {
        return t("rent.card.bedrooms", "{count} Bedrooms").replace("{count}", String(unit.bedroomNo));
      }
    }
    return t("rent.card.villa", "Villa");
  };

  const primaryPrice =
    unit.prices?.find(
      (p) => p.currency.toUpperCase() === currentCurrency.toUpperCase()
    ) || unit.prices?.[0];

  const priceText = primaryPrice
    ? `${primaryPrice.currency.toUpperCase()} ${Number(primaryPrice.price).toLocaleString()}`
    : t("home.featuredProjects.priceOnRequest", "Price on request");

  const bedroomsLabel =
    typeof unit.bedroomNo === "number"
      ? unit.bedroomNo === 1
        ? t("rent.card.bedroomSingle", "1 Bedroom")
        : t("rent.card.bedrooms", "{count} Bedrooms").replace("{count}", String(unit.bedroomNo))
      : null;

  const bathroomsLabel =
    typeof unit.bathroomNo === "number"
      ? unit.bathroomNo === 1
        ? t("rent.card.bathroomSingle", "1 Bathroom")
        : t("rent.card.bathrooms", "{count} Bathrooms").replace("{count}", String(unit.bathroomNo))
      : null;

  const areaLabel =
    typeof unit.size === "number" && unit.size > 0
      ? t("rent.card.area", "{size} m²").replace("{size}", String(unit.size))
      : null;

  const unitHref = `/${locale}/rent/${toUrlSlug(unit.name, unit.id)}`;

  return (
    <Link
      href={unitHref}
      className="group flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-[#D9E2EE] bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-[#B8963E]/50 hover:shadow-xl cursor-pointer"
    >
      <div>
        {/* Card Image */}
        <div className="relative h-[195px] sm:h-[210px] w-full overflow-hidden bg-[#F0F3FA]">
          <Image
            src={displayImage}
            alt={unit.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />

          {/* Badge */}
          <div className="absolute top-3.5 start-3.5 z-10 rounded-full bg-[#1B3A6B]/85 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
            {resolveBadgeText()}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-5.5">
          {/* Location */}
          {unit.rentalLocation?.name && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#65706B]">
              <FiMapPin className="h-3.5 w-3.5 text-[#B8963E] shrink-0" />
              <span className="truncate">{unit.rentalLocation.name}</span>
            </div>
          )}

          {/* Title (2 lines) */}
          <h3
            className="mt-2 min-h-[2.8rem] text-base sm:text-[17px] font-bold leading-snug text-[#202326] line-clamp-2 group-hover:text-[#2B5FA6] transition-colors"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {unit.name}
          </h3>

          {/* Specs */}
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#D9E2EE] pt-3.5 text-xs text-[#65706B]">
            {bedroomsLabel && (
              <div className="flex items-center gap-1">
                <TbBed className="h-4 w-4 text-[#2B5FA6]" />
                <span>{bedroomsLabel}</span>
              </div>
            )}
            {bathroomsLabel && (
              <div className="flex items-center gap-1">
                <TbBath className="h-4 w-4 text-[#2B5FA6]" />
                <span>{bathroomsLabel}</span>
              </div>
            )}
            {areaLabel && (
              <div className="flex items-center gap-1">
                <TbRulerMeasure className="h-4 w-4 text-[#2B5FA6]" />
                <span>{areaLabel}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Price & CTA */}
      <div className="flex flex-col gap-2.5 border-t border-[#D9E2EE] bg-[#F0F3FA]/50 p-4 sm:px-5">
        <div className="flex items-baseline gap-1 whitespace-nowrap">
          <span
            className="text-base sm:text-lg font-bold text-[#1B3A6B]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {priceText}
          </span>
          <span className="text-xs text-[#65706B]">
            {t("rent.card.perMonth", "/ month")}
          </span>
        </div>

        <span className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] bg-[#B8963E] px-4 py-2.5 text-xs font-semibold text-white transition-colors duration-300 group-hover:bg-[#D4A843]">
          <span>{t("rent.card.viewDetails", "View Details")}</span>
          {isRtl ? (
            <FiChevronLeft className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <FiChevronRight className="h-3.5 w-3.5 shrink-0" />
          )}
        </span>
      </div>
    </Link>
  );
}
