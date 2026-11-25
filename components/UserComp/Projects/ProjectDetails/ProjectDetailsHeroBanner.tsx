"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";
import { formatHotOfferEndDate } from "@/shared/utils/hotOffer";
import HotOfferRibbon from "@/components/UserComp/Common/HotOfferRibbon";

interface ProjectDetailsHeroBannerProps {
  title?: string;
  imageUrl?: string | null;
  isHotOffer?: boolean;
  endDateHotOffer?: string | null;
}

export default function ProjectDetailsHeroBanner({
  title,
  imageUrl,
  isHotOffer = false,
  endDateHotOffer,
}: ProjectDetailsHeroBannerProps) {
  const { t, locale } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const resolvedUrl = getFullProjectImageUrl(imageUrl);
  const hasValidImage = Boolean(resolvedUrl && resolvedUrl.trim().length > 0);
  const altText = title ? `${title} Banner` : t("projects.details.defaultTitle");

  const formattedEndDate = isHotOffer
    ? formatHotOfferEndDate(endDateHotOffer, locale)
    : null;

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

        {isHotOffer && <HotOfferRibbon size="hero" />}

        {isHotOffer && formattedEndDate && (
          <div className="absolute bottom-5 start-5 z-20 rounded-full border border-[#F5E1A4]/60 bg-[#1B3A6B]/85 px-4 py-2 shadow-lg backdrop-blur-sm">
            <span
              className="block text-[12px] font-semibold tracking-wide text-[#F5E1A4]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("home.hotOffers.ribbonLabel", "HOT OFFER")} ·{" "}
              {t("home.hotOffers.validUntil", "Valid until {date}").replace(
                "{date}",
                formattedEndDate
              )}
            </span>
          </div>
        )}
      </motion.div>
    </section>
  );
}
