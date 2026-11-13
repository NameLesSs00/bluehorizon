"use client";

import { useState } from "react";
import Image from "next/image";
import { StandaloneUnitImageItem } from "@/models/standaloneUnit";
import { getFullStandaloneUnitMediaUrl } from "@/clientApi/standaloneUnitsApi";

interface StandaloneImageGalleryProps {
  images: StandaloneUnitImageItem[];
  title: string;
}

export default function StandaloneImageGallery({
  images,
  title,
}: StandaloneImageGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const validImages = images && images.length > 0 ? images : [];
  const primaryIdx = validImages.findIndex((img) => img.isPrimary);
  const initialMainIdx = primaryIdx >= 0 ? primaryIdx : 0;
  const currentMainIdx = selectedIdx < validImages.length ? selectedIdx : initialMainIdx;

  const currentMainImage = validImages[currentMainIdx];
  const mainImageUrl = currentMainImage?.imageUrl
    ? getFullStandaloneUnitMediaUrl(currentMainImage.imageUrl)
    : "/default-fallback.png";

  // Smaller grid images (up to 4)
  const gridImages = validImages.slice(1, 5);
  const extraCount = validImages.length > 5 ? validImages.length - 5 : 0;

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Main Large Image */}
      <div className="relative h-[320px] sm:h-[420px] lg:h-[480px] lg:col-span-7 overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#E1E7E3] bg-[#F3F5F3]">
        <Image
          src={mainImageUrl}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center transition-all duration-300"
        />
      </div>

      {/* 2x2 Grid of Smaller Images */}
      <div className="grid grid-cols-2 gap-4 lg:col-span-5 h-[320px] sm:h-[420px] lg:h-[480px]">
        {Array.from({ length: 4 }).map((_, idx) => {
          const item = gridImages[idx];
          const isLastWithExtra = idx === 3 && extraCount > 0;
          const imgUrl = item?.imageUrl
            ? getFullStandaloneUnitMediaUrl(item.imageUrl)
            : "/default-fallback.png";

          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (item) {
                  const originalIndex = validImages.findIndex((img) => img.id === item.id);
                  if (originalIndex >= 0) setSelectedIdx(originalIndex);
                }
              }}
              className="group relative h-full w-full overflow-hidden rounded-[16px] sm:rounded-[20px] border border-[#E1E7E3] bg-[#F3F5F3] text-left transition-transform hover:scale-[1.01]"
            >
              <Image
                src={imgUrl}
                alt={`${title} photo ${idx + 2}`}
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />

              {/* Extra count overlay */}
              {isLastWithExtra && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                  <span
                    className="text-sm sm:text-base font-bold text-white"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    +{extraCount + 1} More Photos
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

