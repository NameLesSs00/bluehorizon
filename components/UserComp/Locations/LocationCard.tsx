"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RentalLocationItem } from "@/models/rentalLocation";
import { getFullRentalLocationMediaUrl } from "@/clientApi/rentalLocationsApi";

interface LocationCardProps {
  location: RentalLocationItem;
  region?: string;
}

export default function LocationCard({ location, region }: LocationCardProps) {
  const [imageError, setImageError] = useState(false);

  const primaryImage =
    location.images?.find((img) => img.isPrimary) || location.images?.[0];
  const resolvedImageUrl = primaryImage?.imageUrl
    ? getFullRentalLocationMediaUrl(primaryImage.imageUrl)
    : null;

  const displayImage =
    !imageError && resolvedImageUrl && resolvedImageUrl.trim().length > 0
      ? resolvedImageUrl
      : "/default-fallback.png";

  return (
    <Link
      href={`/areas/${location.id}`}
      className="group relative block h-[360px] sm:h-[400px] w-full overflow-hidden rounded-[24px] sm:rounded-[28px] border border-[#E1E7E3] shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#145C4B]/40"
    >
      {/* Background Image */}
      <Image
        src={displayImage}
        alt={location.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onError={() => setImageError(true)}
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />

      {/* Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(15, 71, 58, 0) 30%, rgba(15, 71, 58, 0.92) 100%)",
        }}
      />

      {/* Top Left Region Badge - only render if real region is provided */}
      {region && (
        <div className="absolute top-5 left-5 z-20 rounded-full bg-white/95 px-3.5 py-1 text-xs font-semibold text-[#145C4B] shadow-sm backdrop-blur-sm">
          <span style={{ fontFamily: "var(--font-inter)" }}>{region}</span>
        </div>
      )}

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-white transition-colors group-hover:text-[#E8F1EC]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {location.name}
          </h2>
        </div>

        {/* Action Button: White Circle with Arrow Up-Right */}
        <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#145C4B] shadow-md transition-transform duration-300 group-hover:scale-110">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#145C4B"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
