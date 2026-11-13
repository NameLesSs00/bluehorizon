"use client";

import { useState } from "react";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RentalImageItem } from "@/models/rental";
import { getFullRentalMediaUrl } from "@/clientApi/rentalsApi";
import { useTranslation } from "@/features/i18n/useTranslation";

interface RentalImageGalleryProps {
  images: RentalImageItem[];
  title: string;
}

export default function RentalImageGallery({
  images,
  title,
}: RentalImageGalleryProps) {
  const { t, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const validImages = images && images.length > 0 ? images : [];
  const primaryIdx = validImages.findIndex((img) => img.isPrimary);
  const initialMainIdx = primaryIdx >= 0 ? primaryIdx : 0;
  const currentMainIdx =
    selectedIdx < validImages.length ? selectedIdx : initialMainIdx;

  const currentMainImage = validImages[currentMainIdx];
  const mainImageUrl = currentMainImage?.imageUrl
    ? getFullRentalMediaUrl(currentMainImage.imageUrl)
    : "/default-fallback.png";

  const gridImages = validImages.slice(1, 5);
  const extraCount = validImages.length > 5 ? validImages.length - 5 : 0;

  const openLightbox = (index: number) => {
    setLightboxIdx(index);
    setLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxIdx((prev) => (prev + 1) % validImages.length);
  };

  const prevLightboxImage = () => {
    setLightboxIdx(
      (prev) => (prev - 1 + validImages.length) % validImages.length
    );
  };

  return (
    <>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        {/* Main Large Hero Image */}
        <div
          onClick={() => openLightbox(currentMainIdx)}
          className="group relative h-[320px] sm:h-[420px] lg:h-[480px] lg:col-span-7 overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#D9E2EE] bg-[#F9F7F4] cursor-pointer"
        >
          <Image
            src={mainImageUrl}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
          />
        </div>

        {/* 2x2 Grid of 4 Smaller Images */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:col-span-5 h-[320px] sm:h-[420px] lg:h-[480px]">
          {Array.from({ length: 4 }).map((_, idx) => {
            const item = gridImages[idx];
            const isLastWithExtra = idx === 3 && extraCount > 0;
            const imgUrl = item?.imageUrl
              ? getFullRentalMediaUrl(item.imageUrl)
              : "/default-fallback.png";

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  const targetIdx = idx + 1 < validImages.length ? idx + 1 : 0;
                  openLightbox(targetIdx);
                }}
                className="group relative h-full w-full overflow-hidden rounded-[16px] sm:rounded-[20px] border border-[#D9E2EE] bg-[#F9F7F4] text-left transition-transform hover:scale-[1.01]"
              >
                <Image
                  src={imgUrl}
                  alt={`${title} photo ${idx + 2}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />

                {isLastWithExtra && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                    <span
                      className="text-sm sm:text-base font-bold text-white tracking-wide"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {t("rent.details.morePhotos").replace(
                        "{count}",
                        String(extraCount + 1)
                      )}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && validImages.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label={t("rent.details.closeGallery")}
            className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <FiX className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={isRtl ? nextLightboxImage : prevLightboxImage}
            aria-label={t("rent.details.prevPhoto")}
            className="absolute left-4 rtl:left-auto rtl:right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            {isRtl ? (
              <FiChevronRight className="h-6 w-6" />
            ) : (
              <FiChevronLeft className="h-6 w-6" />
            )}
          </button>

          <div className="relative h-[75vh] w-[90vw] max-w-5xl">
            <Image
              src={
                validImages[lightboxIdx]?.imageUrl
                  ? getFullRentalMediaUrl(validImages[lightboxIdx].imageUrl)
                  : "/default-fallback.png"
              }
              alt={`${title} - Photo ${lightboxIdx + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={isRtl ? prevLightboxImage : nextLightboxImage}
            aria-label={t("rent.details.nextPhoto")}
            className="absolute right-4 rtl:right-auto rtl:left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            {isRtl ? (
              <FiChevronLeft className="h-6 w-6" />
            ) : (
              <FiChevronRight className="h-6 w-6" />
            )}
          </button>

          <div className="absolute bottom-5 text-sm font-semibold text-white/80">
            {lightboxIdx + 1} / {validImages.length}
          </div>
        </div>
      )}
    </>
  );
}

