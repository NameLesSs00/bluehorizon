"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getFullLocationMediaUrl } from "@/clientApi/projectLocationsApi";
import { ProjectLocationItem } from "@/models/projectLocation";

interface AreaListCardProps {
  area: ProjectLocationItem;
}

export default function AreaListCard({ area }: AreaListCardProps) {
  const primaryImage =
    area.images?.find((img) => img.isPrimary) || area.images?.[0];

  const isFallback = !primaryImage?.imageUrl;
  const imageSrc = primaryImage?.imageUrl
    ? getFullLocationMediaUrl(primaryImage.imageUrl)
    : "/default-fallback.png";

  return (
    <Link
      href={`/areas/${area.id}`}
      className="group block overflow-hidden rounded-[22px] border border-[#DCE4DF] bg-white transition-all duration-300 hover:bg-[#E5ECF6] hover:shadow-md cursor-pointer"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 md:items-stretch">
        {/* Left Column: Image with 22px outer curvature */}
        <div className="relative min-h-[240px] sm:min-h-[280px] md:col-span-5 md:min-h-[320px] overflow-hidden rounded-[22px] md:rounded-r-none">
          {isFallback ? (
            <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#F9F7F4]">
              <div className="relative h-28 w-44 transition-transform duration-500 group-hover:scale-105">
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
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        {/* Right Column: Information & Action */}
        <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7 md:p-10">
          <div>
            <h3
              className="text-[24px] font-bold leading-tight tracking-[-0.02em] text-[#141716] sm:text-[28px]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {area.name}
            </h3>

            {area.description && (
              <p
                className="mt-4 max-w-2xl text-[14px] font-normal leading-[1.65] text-[#65706B] sm:text-[15px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {area.description}
              </p>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <span
              className="inline-flex items-center gap-2 rounded-full bg-[#2B5FA6] px-6 py-2.5 text-[13px] font-medium text-white transition-all duration-200 group-hover:bg-[#1B3A6B] group-hover:gap-3"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>View Area</span>
              <FiArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
