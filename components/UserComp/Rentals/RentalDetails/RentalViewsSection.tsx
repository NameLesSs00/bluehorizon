"use client";

import Image from "next/image";
import { useTranslation } from "@/features/i18n/useTranslation";
import { RentalItem } from "@/models/rental";

interface RentalViewsSectionProps {
  unit: RentalItem;
}

interface ViewItemConfig {
  key: keyof Pick<
    RentalItem,
    | "hasSeaView"
    | "hasPoolView"
    | "hasGardenView"
    | "hasMountainView"
    | "hasCityView"
  >;
  translationKey: string;
  iconSrc: string;
}

const VIEW_CONFIGS: ViewItemConfig[] = [
  {
    key: "hasSeaView",
    translationKey: "rent.details.views.seaView",
    iconSrc: "/rental/single/sea.svg",
  },
  {
    key: "hasPoolView",
    translationKey: "rent.details.views.poolView",
    iconSrc: "/rental/single/poll.svg",
  },
  {
    key: "hasGardenView",
    translationKey: "rent.details.views.gardenView",
    iconSrc: "/rental/single/mount.svg",
  },
  {
    key: "hasMountainView",
    translationKey: "rent.details.views.mountainView",
    iconSrc: "/rental/single/mount.svg",
  },
  {
    key: "hasCityView",
    translationKey: "rent.details.views.cityView",
    iconSrc: "/rental/single/city.svg",
  },
];

export default function RentalViewsSection({ unit }: RentalViewsSectionProps) {
  const { t } = useTranslation();

  // Only show views where backend boolean is true
  const activeViews = VIEW_CONFIGS.filter((cfg) => Boolean(unit[cfg.key]));

  if (activeViews.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-6 sm:p-7 shadow-xs">
      <h2
        className="text-xl sm:text-2xl font-bold text-[#2B5FA6]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {t("rent.details.viewsTitle")}
      </h2>

      {activeViews.length > 0 && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {activeViews.map((cfg) => (
            <div
              key={cfg.key}
              className="flex items-center gap-3 rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] p-3 text-xs sm:text-sm font-semibold text-[#202326] transition-colors hover:border-[#2B5FA6]/50 hover:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <div className="relative h-7 w-7 shrink-0">
                <Image
                  src={cfg.iconSrc}
                  alt={t(cfg.translationKey)}
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </div>
              <span className="truncate">{t(cfg.translationKey)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
