"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { getFullLocationMediaUrl } from "@/clientApi/projectLocationsApi";
import { ProjectLocationItem } from "@/models/projectLocation";
import { useTranslation } from "@/features/i18n/useTranslation";

interface PopularAreaCardProps {
  area: ProjectLocationItem;
}

export default function PopularAreaCard({ area }: PopularAreaCardProps) {
  const { t, locale, direction } = useTranslation();

  const primaryImage =
    area.images?.find((img) => img.isPrimary) || area.images?.[0];

  const isFallback = !primaryImage?.imageUrl;
  const imageSrc = primaryImage?.imageUrl
    ? getFullLocationMediaUrl(primaryImage.imageUrl)
    : "/default-fallback.png";

  return (
    <Link
      href={`/${locale}/areas/${area.id}`}
      className="group relative flex aspect-[300/380] w-full flex-col justify-end overflow-hidden rounded-[16px] bg-[#F9F7F4] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      {/* Background Image / Fallback Emblem */}
      {isFallback ? (
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#F9F7F4]">
          <div className="relative h-32 w-48 transition-transform duration-500 group-hover:scale-105">
            <Image
              src="/default-fallback.png"
              alt={area.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      ) : (
        <Image
          src={imageSrc}
          alt={area.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Specified Dark Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(22, 46, 86, 0) 0%, rgba(22, 46, 86, 0.0627451) 50%, rgba(22, 46, 86, 0.941176) 100%)",
        }}
      />

      {/* Bottom Content */}
      <div className="relative z-20 flex items-end justify-between p-6">
        <div className="space-y-1.5">
          <h3
            className="text-[23px] font-semibold leading-none tracking-normal text-white"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {area.name}
          </h3>

          {typeof area.propertiesCount === "number" && (
            <p
              className="text-[12px] font-normal leading-none tracking-normal text-white/90"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {area.propertiesCount}{" "}
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
