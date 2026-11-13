import Image from "next/image";
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
  title: string;
  iconSrc: string;
}

const VIEW_CONFIGS: ViewItemConfig[] = [
  {
    key: "hasSeaView",
    title: "Sea View",
    iconSrc: "/rental/single/sea.svg",
  },
  {
    key: "hasPoolView",
    title: "Pool View",
    iconSrc: "/rental/single/poll.svg",
  },
  {
    key: "hasGardenView",
    title: "Garden View",
    iconSrc: "/rental/single/mount.svg",
  },
  {
    key: "hasMountainView",
    title: "Mountain View",
    iconSrc: "/rental/single/mount.svg",
  },
  {
    key: "hasCityView",
    title: "City View",
    iconSrc: "/rental/single/city.svg",
  },
];

export default function RentalViewsSection({ unit }: RentalViewsSectionProps) {
  // Only show views where backend boolean is true
  const activeViews = VIEW_CONFIGS.filter((cfg) => Boolean(unit[cfg.key]));

  if (activeViews.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 rounded-[16px] border border-[#E1E7E3] bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3.5">
        <h2
          className="text-base sm:text-lg font-bold text-[#145C4B]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Scenic Views &amp; Orientation
        </h2>
        <span
          className="text-xs text-[#65706B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {activeViews.length} verified view{activeViews.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Compact active views grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {activeViews.map((v) => (
          <div
            key={v.key}
            className="flex items-center gap-2.5 rounded-[12px] border border-[#145C4B]/15 bg-[#F4F8F6] px-3 py-2 text-left transition-colors hover:border-[#145C4B]/35"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white shadow-2xs">
              <Image
                src={v.iconSrc}
                alt={v.title}
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <span
                className="block text-xs font-bold text-[#202326] truncate"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {v.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
