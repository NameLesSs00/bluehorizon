"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

interface ProjectDetailsHeroBannerProps {
  title?: string;
  imageUrl?: string | null;
}

export default function ProjectDetailsHeroBanner({
  title,
  imageUrl,
}: ProjectDetailsHeroBannerProps) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const resolvedUrl = getFullProjectImageUrl(imageUrl);
  const hasValidImage = Boolean(resolvedUrl && resolvedUrl.trim().length > 0);
  const altText = title ? `${title} Banner` : t("projects.details.defaultTitle");

  return (
    <section className="w-full">
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeInUpVariants}
        className="relative h-[320px] sm:h-[420px] lg:h-[520px] w-full overflow-hidden bg-[#1B3A6B]"
      >
        {hasValidImage ? (
          <Image
            src={resolvedUrl}
            alt={altText}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-8 bg-[#1B3A6B]">
            <div className="relative h-28 w-52 opacity-80">
              <Image
                src="/default-fallback.png"
                alt={altText}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
