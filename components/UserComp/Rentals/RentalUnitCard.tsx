"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { TbBed, TbBath, TbRulerMeasure } from "react-icons/tb";
import { RentalItem, PROPERTY_TYPE_LABELS } from "@/models/rental";
import { getFullRentalMediaUrl } from "@/clientApi/rentalsApi";
import { useTranslation } from "@/features/i18n/useTranslation";

interface RentalUnitCardProps {
  unit: RentalItem;
}

export default function RentalUnitCard({ unit }: RentalUnitCardProps) {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";
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
      if (unit.bedroomNo === 0) return t("rent.card.studio");
      if (unit.bedroomNo === 1) return t("rent.card.bedroomSingle");
      if (unit.bedroomNo > 1) {
        return t("rent.card.bedrooms").replace("{count}", String(unit.bedroomNo));
      }
    }
    return t("rent.card.villa");
  };

  const primaryPrice =
    unit.prices?.find((p) => p.currency.toUpperCase() === "EGP") ||
    unit.prices?.[0];

  const priceText = primaryPrice
    ? `${primaryPrice.currency.toUpperCase()} ${Number(primaryPrice.price).toLocaleString()}`
    : "Price on request";

  const bedroomsLabel =
    typeof unit.bedroomNo === "number"
      ? unit.bedroomNo === 1
        ? t("rent.card.bedroomSingle")
        : t("rent.card.bedrooms").replace("{count}", String(unit.bedroomNo))
      : null;

  const bathroomsLabel =
    typeof unit.bathroomNo === "number"
      ? unit.bathroomNo === 1
        ? t("rent.card.bathroomSingle")
        : t("rent.card.bathrooms").replace("{count}", String(unit.bathroomNo))
      : null;

  const areaLabel =
    typeof unit.size === "number" && unit.size > 0
      ? t("rent.card.area").replace("{size}", String(unit.size))
      : null;

  const unitHref = `/${locale}/rent/${unit.id}`;

  return (
    <Link
      href={unitHref}
      className="group flex flex-col justify-between overflow-hidden rounded-[20px] border border-[#D9E2EE] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2B5FA6]/50 hover:shadow-lg cursor-pointer"
    >
      <div>
        {/* Card Image */}
        <div className="relative h-[220px] sm:h-[240px] w-full overflow-hidden bg-[#F0F3FA]">
          <Image
            src={displayImage}
            alt={unit.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badge */}
          <div className="absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5 z-10 rounded-full bg-[#1B3A6B]/85 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
            {resolveBadgeText()}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Location */}
          {unit.rentalLocation?.name && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#65706B]">
              <FiMapPin className="h-3.5 w-3.5 text-[#2B5FA6] shrink-0" />
              <span className="truncate">{unit.rentalLocation.name}</span>
            </div>
          )}

          {/* Title */}
          <h3
            className="mt-2 text-base sm:text-lg font-bold text-[#202326] line-clamp-1 group-hover:text-[#2B5FA6] transition-colors"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {unit.name}
          </h3>

          {/* Specs */}
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#D9E2EE] pt-3 text-xs text-[#65706B]">
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
      <div className="flex items-center justify-between border-t border-[#D9E2EE] bg-[#F0F3FA]/50 p-4 sm:px-5">
        <div>
          <span
            className="text-base sm:text-lg font-bold text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {priceText}
          </span>
          <span className="text-xs text-[#65706B]"> {t("rent.card.perMonth")}</span>
        </div>

        <span
          className="inline-flex items-center gap-1 rounded-[10px] bg-white border border-[#D9E2EE] px-3 py-1.5 text-xs font-semibold text-[#2B5FA6] transition-colors group-hover:border-[#2B5FA6] group-hover:bg-[#2B5FA6] group-hover:text-white"
        >
          <span>{t("rent.card.viewDetails")}</span>
          {isRtl ? (
            <FiChevronLeft className="h-3 w-3" />
          ) : (
            <FiChevronRight className="h-3 w-3" />
          )}
        </span>
      </div>
    </Link>
  );
}
