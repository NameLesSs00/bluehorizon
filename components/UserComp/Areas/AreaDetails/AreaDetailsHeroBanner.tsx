"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";

interface AreaDetailsHeroBannerProps {
  title?: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
}

export default function AreaDetailsHeroBanner({
  title,
  imageUrl,
  videoUrl,
}: AreaDetailsHeroBannerProps) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [failedVideoUrl, setFailedVideoUrl] = useState<string | null>(null);

  const imageSrc = imageUrl || "/Areas/heroAreaImage.jpg";
  const altText = title ? `${title} Banner` : t("areas.details.defaultTitle");
  const showVideo = Boolean(videoUrl && failedVideoUrl !== videoUrl);

  return (
    <section className="w-full">
      <motion.div
        className="relative h-[320px] sm:h-[420px] lg:h-[520px] w-full overflow-hidden bg-[#1B3A6B]"
        initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {showVideo && videoUrl ? (
          <video
            key={videoUrl}
            src={videoUrl}
            poster={imageSrc}
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
            src={imageSrc}
            alt={altText}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
          />
        )}
      </motion.div>
    </section>
  );
}
