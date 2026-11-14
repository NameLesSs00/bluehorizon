"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiVideo } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";
import AreaGalleryLightbox from "./AreaGalleryLightbox";

interface AreaGallerySectionProps {
  images?: string[];
  videoUrl?: string | null;
  title?: string;
}

function toEmbedUrl(url: string): string | null {
  try {
    const trimmed = url.trim();
    if (!trimmed) return null;
    const u = new URL(trimmed);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export default function AreaGallerySection({
  images = [],
  videoUrl,
  title,
}: AreaGallerySectionProps) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const validImages = images.filter((img) => Boolean(img && img.trim().length > 0));
  const hasImages = validImages.length > 0;
  const hasVideo = Boolean(videoUrl && videoUrl.trim().length > 0);

  const openLightbox = (index: number) => {
    if (!validImages.length) return;
    setLightboxIdx(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextLightboxImage = useCallback(() => {
    if (!validImages.length) return;
    setLightboxIdx((prev) => (prev + 1) % validImages.length);
  }, [validImages.length]);

  const prevLightboxImage = useCallback(() => {
    if (!validImages.length) return;
    setLightboxIdx((prev) => (prev - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  if (!hasImages && !hasVideo) {
    return null;
  }

  const areaTitle = title || t("areas.details.defaultTitle");
  const embedUrl = videoUrl ? toEmbedUrl(videoUrl) : null;

  return (
    <>
      <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2
                className="text-2xl sm:text-[28px] font-bold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("areas.details.galleryTitle")}
              </h2>
              <p
                className="mt-1 text-sm text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("areas.details.gallerySubtitle")}
              </p>
            </div>
            {hasImages && (
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="self-start sm:self-auto text-xs sm:text-sm font-semibold text-[#2B5FA6] hover:text-[#1B3A6B] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("areas.details.viewAllImages").replace("{count}", String(validImages.length))}
              </button>
            )}
          </div>

          {/* Photos Grid */}
          {hasImages && (
            <div className="mb-8">
              {validImages.length === 1 && (
                <div
                  onClick={() => openLightbox(0)}
                  className="group relative h-[320px] sm:h-[420px] lg:h-[480px] w-full cursor-pointer overflow-hidden rounded-[20px] bg-[#E5ECF6] border border-[#D9E2EE]"
                >
                  <Image
                    src={validImages[0]}
                    alt={`${areaTitle} 1`}
                    fill
                    sizes="(max-width: 1360px) 100vw, 1360px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}

              {validImages.length === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {validImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => openLightbox(idx)}
                      className="group relative h-[280px] sm:h-[380px] w-full cursor-pointer overflow-hidden rounded-[20px] bg-[#E5ECF6] border border-[#D9E2EE]"
                    >
                      <Image
                        src={img}
                        alt={`${areaTitle} ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {validImages.length >= 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                  {/* Left Column: Large Showcase Image */}
                  <div
                    onClick={() => openLightbox(0)}
                    className="group relative h-[320px] sm:h-[420px] lg:h-[520px] w-full cursor-pointer overflow-hidden rounded-[20px] bg-[#E5ECF6] border border-[#D9E2EE]"
                  >
                    <Image
                      src={validImages[0]}
                      alt={`${areaTitle} 1`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Right Column: 1 Top Wide + 2 Bottom Split */}
                  <div className="flex flex-col gap-4 sm:gap-5">
                    <div
                      onClick={() => openLightbox(1)}
                      className="group relative h-[200px] sm:h-[248px] w-full cursor-pointer overflow-hidden rounded-[20px] bg-[#E5ECF6] border border-[#D9E2EE]"
                    >
                      <Image
                        src={validImages[1]}
                        alt={`${areaTitle} 2`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:gap-5">
                      <div
                        onClick={() => openLightbox(2)}
                        className="group relative h-[180px] sm:h-[256px] w-full cursor-pointer overflow-hidden rounded-[20px] bg-[#E5ECF6] border border-[#D9E2EE]"
                      >
                        <Image
                          src={validImages[2]}
                          alt={`${areaTitle} 3`}
                          fill
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div
                        onClick={() => openLightbox(3 < validImages.length ? 3 : 0)}
                        className="group relative h-[180px] sm:h-[256px] w-full cursor-pointer overflow-hidden rounded-[20px] bg-[#E5ECF6] border border-[#D9E2EE]"
                      >
                        <Image
                          src={validImages[3] || validImages[0]}
                          alt={`${areaTitle} 4`}
                          fill
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        {validImages.length > 4 && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[2px] transition-colors group-hover:bg-black/70">
                            <span
                              className="text-base sm:text-lg font-bold text-white tracking-wide"
                              style={{ fontFamily: "var(--font-manrope)" }}
                            >
                              +{validImages.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Video Section */}
          {hasVideo && videoUrl && (
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E5ECF6] text-[#2B5FA6]">
                  <FiVideo className="h-3.5 w-3.5" />
                </span>
                <h3
                  className="text-base sm:text-lg font-bold text-[#202326]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {t("areas.details.videoTourLabel")}
                </h3>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-black shadow-md border border-[#D9E2EE]">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={`${areaTitle} Video Tour`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : (
                  <video
                    src={videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AreaGalleryLightbox
        isOpen={lightboxOpen}
        images={validImages}
        currentIndex={lightboxIdx}
        areaTitle={areaTitle}
        onClose={closeLightbox}
        onNext={nextLightboxImage}
        onPrev={prevLightboxImage}
      />
    </>
  );
}
