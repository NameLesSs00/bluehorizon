"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

interface LocationDetailsHeroBannerProps {
  title?: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
}

export default function LocationDetailsHeroBanner({
  title,
  imageUrl,
  videoUrl,
}: LocationDetailsHeroBannerProps) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [failedVideoUrl, setFailedVideoUrl] = useState<string | null>(null);

  const displayImage = imageUrl || "/default-fallback.png";
  const displayTitle = title || t("locations.details.defaultTitle");
  const showVideo = Boolean(videoUrl && failedVideoUrl !== videoUrl);

  return (
    <section className="w-full">
      <div className="relative h-[360px] sm:h-[460px] lg:h-[540px] w-full overflow-hidden bg-[#1B3A6B]">
        {/* Background Video or Fallback Image */}
        {showVideo && videoUrl ? (
          <video
            key={videoUrl}
            src={videoUrl}
            poster={displayImage}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailedVideoUrl(videoUrl)}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <Image
            src={displayImage}
            alt={displayTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}

        {/* Ambient Dark Gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(27, 58, 107, 0.1) 0%, rgba(27, 58, 107, 0.35) 45%, rgba(27, 58, 107, 0.94) 100%)",
          }}
        />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 lg:p-16">
          <div className="mx-auto w-full max-w-[1360px]">
            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
              variants={shouldReduceMotion ? undefined : fadeInUpVariants}
              initial="hidden"
              animate="visible"
            >
              <div>
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C5D3E8]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("locations.details.rentalDestination")}
                </p>
                <h1
                  className="mt-2 text-3xl sm:text-4xl lg:text-[46px] font-bold leading-tight text-white"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {displayTitle}
                </h1>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
