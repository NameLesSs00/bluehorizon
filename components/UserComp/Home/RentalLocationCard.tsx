"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { RentalLocationItem } from "@/models/rentalLocation";
import { getFullRentalLocationMediaUrl } from "@/clientApi/rentalLocationsApi";
import { useTranslation } from "@/features/i18n/useTranslation";

interface RentalLocationCardProps {
  location: RentalLocationItem;
}

export default function RentalLocationCard({
  location,
}: RentalLocationCardProps) {
  const { t, locale, direction } = useTranslation();
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
      href={`/${locale}/locations/${location.id}`}
      className="group relative flex aspect-[300/380] w-full flex-col justify-end overflow-hidden rounded-[20px] bg-[#F9F7F4] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      {/* Background Image */}
      <Image
        src={displayImage}
        alt={location.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        onError={() => setImageError(true)}
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark Navy Bottom Gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(22, 46, 86, 0) 35%, rgba(22, 46, 86, 0.2) 60%, rgba(22, 46, 86, 0.94) 100%)",
        }}
      />

      {/* Bottom Content Area */}
      <div className="relative z-20 flex items-end justify-between p-6">
        <div className="space-y-1">
          <h3
            className="text-[22px] sm:text-[24px] font-semibold leading-tight text-white transition-colors"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {location.name}
          </h3>

          {typeof location.propertiesCount === "number" && (
            <p
              className="text-[13px] font-normal leading-none text-white/90"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {location.propertiesCount}{" "}
              {t("home.popularAreas.propertiesCount", "properties")}
            </p>
          )}
        </div>

        {/* Diagonal Arrow Indicator */}
        <div className="flex h-7 w-7 shrink-0 items-center justify-center text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <FiArrowUpRight
            className={`h-5 w-5 ${direction === "rtl" ? "scale-x-[-1]" : ""}`}
          />
        </div>
      </div>
    </Link>
  );
}
