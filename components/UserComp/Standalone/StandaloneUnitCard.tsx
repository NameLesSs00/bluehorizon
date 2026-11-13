"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StandaloneUnitItem } from "@/models/standaloneUnit";
import { getFullStandaloneUnitMediaUrl } from "@/clientApi/standaloneUnitsApi";

interface StandaloneUnitCardProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneUnitCard({ unit }: StandaloneUnitCardProps) {
  const [imageError, setImageError] = useState(false);

  const primaryImage =
    unit.images?.find((img) => img.isPrimary) || unit.images?.[0];
  const resolvedUrl =
    primaryImage?.imageUrl && !imageError
      ? getFullStandaloneUnitMediaUrl(primaryImage.imageUrl)
      : "/default-fallback.png";

  const resolveBadgeTag = () => {
    if (unit.propertyType && unit.propertyType.trim().length > 0) {
      return unit.propertyType.trim();
    }
    if (typeof unit.noBedRoom === "number") {
      if (unit.noBedRoom === 0) return "Studio";
      if (unit.noBedRoom === 1) return "1 Bedroom";
      if (unit.noBedRoom > 1) return `${unit.noBedRoom} Bedrooms`;
    }
    return "Villa";
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
      : "Price on request";

  const descriptionText =
    unit.description ||
    [unit.city, unit.country].filter(Boolean).join(", ") ||
    null;

  const hasArea = typeof unit.area === "number" && unit.area > 0;
  const hasRooms = typeof unit.noBedRoom === "number" && unit.noBedRoom > 0;
  const hasBaths = typeof unit.noBathRoom === "number" && unit.noBathRoom > 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[20px] border border-[#E1E7E3] bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#145C4B]/40">
      {/* Image Container */}
      <div className="relative h-[220px] w-full overflow-hidden bg-[#F3F5F3]">
        <Image
          src={resolvedUrl}
          alt={unit.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImageError(true)}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Property Type Badge - only if real data */}
        {propertyTag && (
          <div className="absolute top-3.5 left-3.5 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#145C4B] shadow-sm backdrop-blur-sm">
            <span style={{ fontFamily: "var(--font-inter)" }}>{propertyTag}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Title */}
        <h3
          className="text-base sm:text-lg font-bold text-[#202326] transition-colors group-hover:text-[#145C4B] line-clamp-1"
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
            className="mt-3 flex items-center gap-2 text-xs text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {hasArea && (
              <div className="flex items-center gap-1">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3h18v18H3z" />
                  <path d="M3 9h18" />
                  <path d="M9 3v18" />
                </svg>
                <span>{unit.area} m²</span>
              </div>
            )}

            {hasArea && (hasRooms || hasBaths) && (
              <span className="text-[#E1E7E3]">&bull;</span>
            )}

            {hasRooms && (
              <div className="flex items-center gap-1">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
                  <path d="M21 11H3" />
                  <path d="M7 7V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
                </svg>
                <span>{unit.noBedRoom} Rooms</span>
              </div>
            )}

            {hasRooms && hasBaths && (
              <span className="text-[#E1E7E3]">&bull;</span>
            )}

            {hasBaths && (
              <div className="flex items-center gap-1">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
                  <path d="M6 12V6a3 3 0 0 1 6 0v6" />
                </svg>
                <span>{unit.noBathRoom} Baths</span>
              </div>
            )}
          </div>
        )}

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-[#E1E7E3]/60 flex flex-col gap-3">
          <div
            className="text-base sm:text-lg font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {formattedPrice}
          </div>

          <Link
            href={`/standalone/${unit.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#145C4B] py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0F473A]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>View Details</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
