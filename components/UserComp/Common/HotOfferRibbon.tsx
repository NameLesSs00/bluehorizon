"use client";

import { useTranslation } from "@/features/i18n/useTranslation";

interface HotOfferRibbonProps {
  size?: "card" | "hero";
}

export default function HotOfferRibbon({ size = "card" }: HotOfferRibbonProps) {
  const { t, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const label = t("home.hotOffers.ribbonLabel", "HOT OFFER");

  if (size === "hero") {
    return (
      <div
        className={`pointer-events-none absolute top-0 z-20 h-36 w-36 overflow-hidden ${
          isRtl ? "left-0" : "right-0"
        }`}
      >
        <div
          className={`absolute top-7 w-48 overflow-hidden border-y border-[#F5E1A4]/75 bg-linear-to-r from-[#9A7A2C] via-[#D4A843] to-[#B8963E] py-1.5 text-center text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-lg ${
            isRtl ? "-left-12 -rotate-45" : "-right-12 rotate-45"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span className="relative z-10">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute top-0 z-20 h-24 w-24 overflow-hidden ${
        isRtl ? "left-0" : "right-0"
      }`}
    >
      <div
        className={`absolute top-[18px] w-32 overflow-hidden border-y border-[#F5E1A4]/70 bg-linear-to-r from-[#9A7A2C] via-[#D4A843] to-[#B8963E] py-1 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-md ${
          isRtl ? "-left-[34px] -rotate-45" : "-right-[34px] rotate-45"
        }`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <span className="relative z-10">{label}</span>
      </div>
    </div>
  );
}
