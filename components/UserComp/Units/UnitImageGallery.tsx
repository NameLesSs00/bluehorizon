"use client";

import { useState } from "react";
import Image from "next/image";
import { NormalizedUnitImage } from "./unitTypes";

interface UnitImageGalleryProps {
  images: NormalizedUnitImage[];
  title: string;
}

export default function UnitImageGallery({
  images,
  title,
}: UnitImageGalleryProps) {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const displayImages = images.length > 0
    ? images
    : [{ url: "/default-fallback.png", isPrimary: true }];

  const mainImage = displayImages[0];
  const sideImages = displayImages.slice(1, 5);
  const remainingCount = displayImages.length > 5 ? displayImages.length - 5 : 0;

  const openLightbox = (index: number) => {
    setActiveModalIndex(index);
  };

  const closeLightbox = () => {
    setActiveModalIndex(null);
  };

  const nextImage = () => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((activeModalIndex + 1) % displayImages.length);
  };

  const prevImage = () => {
    if (activeModalIndex === null) return;
    setActiveModalIndex(
      (activeModalIndex - 1 + displayImages.length) % displayImages.length
    );
  };

  return (
    <>
      <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pb-8">
        {displayImages.length <= 1 ? (
          /* Single Image */
          <div
            onClick={() => openLightbox(0)}
            className="group relative aspect-[16/9] md:aspect-[21/9] w-full cursor-pointer overflow-hidden rounded-[24px] bg-[#F9F7F4] border border-[#D9E2EE]"
          >
            <Image
              src={mainImage.url || "/default-fallback.png"}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
            />
          </div>
        ) : (
          /* 5-Image Gallery Grid (60% Main / 40% 2x2) */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Main Featured Photo (7 of 12 cols = ~58%) */}
            <div
              onClick={() => openLightbox(0)}
              className="group relative md:col-span-7 aspect-[4/3] md:aspect-auto md:min-h-[460px] cursor-pointer overflow-hidden rounded-[20px] bg-[#F9F7F4] border border-[#D9E2EE]"
            >
              <Image
                src={mainImage.url || "/default-fallback.png"}
                alt={`${title} - Main`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
              />
            </div>

            {/* 2x2 Sub-Grid (5 of 12 cols = ~42%) */}
            <div className="md:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              {sideImages.map((img, idx) => {
                const isLastCell = idx === 3;
                const isOverlayVisible = isLastCell && remainingCount > 0;
                const imgIndex = idx + 1;

                return (
                  <div
                    key={img.url || idx}
                    onClick={() => openLightbox(imgIndex)}
                    className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[16px] bg-[#F9F7F4] border border-[#D9E2EE]"
                  >
                    <Image
                      src={img.url || "/default-fallback.png"}
                      alt={`${title} - Photo ${imgIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />

                    {isOverlayVisible && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white backdrop-blur-[2px] transition-colors hover:bg-black/70">
                        <span
                          className="text-lg sm:text-xl font-bold"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          +{remainingCount + 1}
                        </span>
                        <span
                          className="text-xs font-medium text-white/90"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          More Photos
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {activeModalIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image gallery"
            className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous image"
            className="absolute left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Active Image */}
          <div
            className="relative h-[80vh] w-full max-w-[1100px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={displayImages[activeModalIndex].url || "/default-fallback.png"}
              alt={`${title} - Fullscreen ${activeModalIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
            className="absolute right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter Indicator */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {activeModalIndex + 1} / {displayImages.length}
          </div>
        </div>
      )}
    </>
  );
}

