"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";

interface AreaDetailsHeroBannerProps {
  title?: string;
  imageUrl?: string | null;
}

export default function AreaDetailsHeroBanner({
  title,
  imageUrl,
}: AreaDetailsHeroBannerProps) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const imageSrc = imageUrl || "/Areas/heroAreaImage.jpg";
  const altText = title ? `${title} Banner` : t("areas.details.defaultTitle");

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
      <motion.div
        className="relative h-[260px] sm:h-[360px] lg:h-[440px] w-full overflow-hidden rounded-[24px] bg-[#E5ECF6]"
        initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1360px"
          className="object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
        />
      </motion.div>
    </section>
  );
}
