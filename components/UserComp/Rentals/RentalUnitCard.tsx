"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiChevronRight } from "react-icons/fi";
import { TbBed, TbBath, TbRulerMeasure } from "react-icons/tb";
import { RentalItem, PROPERTY_TYPE_LABELS } from "@/models/rental";
import { getFullRentalMediaUrl } from "@/clientApi/rentalsApi";

interface RentalUnitCardProps {
  unit: RentalItem;
}

export default function RentalUnitCard({ unit }: RentalUnitCardProps) {
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
      if (unit.bedroomNo === 0) return "Studio";
      if (unit.bedroomNo === 1) return "1 Bedroom";
      if (unit.bedroomNo > 1) return `${unit.bedroomNo} Bedrooms`;
    }
    return "Villa";
  };

  const categoryBadge = resolveBadgeText();

  const primaryPrice =
    unit.prices?.find((p) => p.currency.toUpperCase() === "EGP") ||
    unit.prices?.[0];

  const priceText = primaryPrice
    ? `${primaryPrice.currency.toUpperCase()} ${Number(primaryPrice.price).toLocaleString()}`
    : "Price upon inquiry";

  const locationName = unit.rentalLocation?.name || "Hurghada, Red Sea";

  return (
    <div className="group flex flex-col overflow-hidden rounded-[20px] border border-[#E1E7E3] bg-white transition-all duration-300 hover:shadow-xl hover:border-[#0F473A]/30">
      {/* Image Container with Category Badge */}
      <div className="relative h-[210px] w-full overflow-hidden bg-[#FAF8F5]">
        <Image
          src={displayImage}
          alt={unit.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImageError(true)}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <div className="absolute top-3.5 left-3.5 z-10 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#0F473A] shadow-xs backdrop-blur-xs">
          <span style={{ fontFamily: "var(--font-inter)" }}>{categoryBadge}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Title */}
          <h3
            className="line-clamp-1 text-[17px] font-bold text-[#202326] transition-colors group-hover:text-[#0F473A]"
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
            className="mt-4 flex items-center gap-2.5 text-[11px] text-[#65706B] border-y border-[#F3F5F3] py-2.5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <div className="flex items-center gap-1">
              <TbRulerMeasure className="h-3.5 w-3.5 text-[#0F473A]" />
              <span>{unit.size || 125} m²</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <TbBed className="h-3.5 w-3.5 text-[#0F473A]" />
              <span>{unit.bedroomNo || 2} Rooms</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <TbBath className="h-3.5 w-3.5 text-[#0F473A]" />
              <span>{unit.bathroomNo || 2} Baths</span>
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
              <FiMapPin className="h-3 w-3 text-[#0F473A]" />
              <span className="line-clamp-1 max-w-[110px]">{locationName}</span>
            </div>
          </div>
        </div>

        {/* View Details Action Button */}
        <div className="mt-4 pt-1">
          <Link
            href={`/rent/${unit.id}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-[#0F473A] py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>View Details</span>
            <FiChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

