"use client";

import { HeroSearchTab } from "./HeroSearchTypes";

interface HeroSearchTabsProps {
  tabs: HeroSearchTab[];
  activeTab: HeroSearchTab;
  onTabChange: (tab: HeroSearchTab) => void;
  getTabLabel: (tab: HeroSearchTab) => string;
}

export default function HeroSearchTabs({
  tabs,
  activeTab,
  onTabChange,
  getTabLabel,
}: HeroSearchTabsProps) {
  return (
    <>
      {/* Desktop Top Segmented Tabs */}
      <div className="hidden lg:flex">
        <div className="relative z-10 -mb-[2px] inline-flex items-center gap-1.5 rounded-t-3xl bg-white px-6 pt-4 pb-3.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                className={`rounded-full px-7 py-3 text-[15px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#1B3A6B] text-white"
                    : "text-[#202326] hover:text-[#1B3A6B]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {getTabLabel(tab)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Full-Width Segmented Tabs */}
      <div className="grid grid-cols-3 gap-1 rounded-full bg-[#F0F3FA] p-1 mb-3 lg:hidden">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`rounded-full py-2 text-xs font-semibold transition-all text-center ${
                isActive
                  ? "bg-[#1B3A6B] text-white shadow-2xs"
                  : "text-[#202326] hover:text-[#1B3A6B]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {getTabLabel(tab)}
            </button>
          );
        })}
      </div>
    </>
  );
}

