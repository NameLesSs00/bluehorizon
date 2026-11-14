"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

interface LocationDetailsHeroBannerProps {
  title?: string;
  imageUrl?: string | null;
}

export default function LocationDetailsHeroBanner({
  title,
  imageUrl,
}: LocationDetailsHeroBannerProps) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const displayImage = imageUrl || "/default-fallback.png";
  const displayTitle = title || t("locations.details.defaultTitle");

  return (
    <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-5 sm:mt-6">
      <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] w-full overflow-hidden rounded-[24px] sm:rounded-[32px] border border-[#D9E2EE] shadow-xs">
        {/* Background Image */}
        <Image
          src={displayImage}
          alt={displayTitle}
          fill
          priority
          sizes="(max-width: 1400px) 100vw, 1360px"
          className="object-cover object-center"
        />

        {/* Ambient Dark Gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(27, 58, 107, 0.1) 0%, rgba(27, 58, 107, 0.35) 45%, rgba(27, 58, 107, 0.94) 100%)",
          }}
        />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
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
  );
}
