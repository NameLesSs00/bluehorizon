"use client";

import { useEffect } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";

interface LocationGalleryLightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  locationTitle: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LocationGalleryLightbox({
  isOpen,
  images,
  currentIndex,
  locationTitle,
  onClose,
  onNext,
  onPrev,
}: LocationGalleryLightboxProps) {
  const { t, direction } = useTranslation();
  const isRtl = direction === "rtl";

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        if (isRtl) onPrev();
        else onNext();
      }
      if (e.key === "ArrowLeft") {
        if (isRtl) onNext();
        else onPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, onNext, onPrev, isRtl]);

  if (!isOpen || images.length === 0) {
    return null;
  }

  const currentImageUrl = images[currentIndex] || "/default-fallback.png";

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label={t("locations.details.closeGallery")}
        className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
      >
        <FiX className="h-6 w-6" />
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (isRtl) onNext();
          else onPrev();
        }}
        aria-label={t("locations.details.prevPhoto")}
        className="absolute left-4 rtl:left-auto rtl:right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
      >
        {isRtl ? <FiChevronRight className="h-6 w-6" /> : <FiChevronLeft className="h-6 w-6" />}
      </button>

      {/* Active Image */}
      <div
        className="relative h-[75vh] w-[90vw] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImageUrl}
          alt={`${locationTitle} - Fullscreen ${currentIndex + 1}`}
          fill
          priority
          sizes="90vw"
          className="object-contain"
        />
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (isRtl) onPrev();
          else onNext();
        }}
        aria-label={t("locations.details.nextPhoto")}
        className="absolute right-4 rtl:right-auto rtl:left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
      >
        {isRtl ? <FiChevronLeft className="h-6 w-6" /> : <FiChevronRight className="h-6 w-6" />}
      </button>

      {/* Counter Indicator */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
