"use client";

import { useState } from "react";
import { useTranslation } from "@/features/i18n/useTranslation";
import { FacilityItem } from "@/models/facility";
import { PROJECT_TIER_OPTIONS } from "@/models/project";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

interface ProjectsExtraFilterFieldsProps {
  projectTier: string;
  onProjectTierChange: (val: string) => void;
  isHotOffer: boolean;
  onIsHotOfferChange: (val: boolean) => void;
  facilityIds: number[];
  onToggleFacility: (id: number) => void;
  onClearFacilities: () => void;
  facilities: FacilityItem[];
}

const COLLAPSED_FACILITY_LIMIT = 8;

export default function ProjectsExtraFilterFields({
  projectTier,
  onProjectTierChange,
  isHotOffer,
  onIsHotOfferChange,
  facilityIds,
  onToggleFacility,
  onClearFacilities,
  facilities,
}: ProjectsExtraFilterFieldsProps) {
  const { t } = useTranslation();
  const [showAllFacilities, setShowAllFacilities] = useState(false);

  function getTierLabel(value: string, fallback: string) {
    if (value === "TopSeller") return t("projects.filters.tierTopSeller", "Top Seller");
    if (value === "Luxury") return t("projects.filters.tierLuxury", "Luxury");
    if (value === "BigHit") return t("projects.filters.tierBigHit", "Big Hit");
    return fallback;
  }

  const visibleFacilities =
    showAllFacilities || facilities.length <= COLLAPSED_FACILITY_LIMIT
      ? facilities
      : facilities.slice(0, COLLAPSED_FACILITY_LIMIT);

  return (
    <div className="space-y-4">
      {/* Project Tier (TopSeller / Luxury / BigHit) */}
      <div>
        <label
          htmlFor="project-filter-tier"
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.tierLabel", "Project Category")}
        </label>
        <div className="relative mt-1.5">
          <select
            id="project-filter-tier"
            value={projectTier}
            onChange={(e) => onProjectTierChange(e.target.value)}
            className="w-full appearance-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors focus:border-[#2B5FA6] focus:bg-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="">{t("projects.filters.anyTier", "All Categories")}</option>
            {PROJECT_TIER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {getTierLabel(opt.value, opt.label)}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center pr-3.5 rtl:pr-0 rtl:pl-3.5 text-[#6B7570]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hot Offers Toggle */}
      <label
        className={`flex cursor-pointer items-center justify-between rounded-[12px] border px-3.5 py-2.5 transition-colors ${
          isHotOffer
            ? "border-[#D4A843] bg-[#FBF6E8]"
            : "border-[#D9E2EE] bg-[#F0F3FA] hover:bg-white"
        }`}
      >
        <span
          className={`text-xs sm:text-sm font-semibold ${
            isHotOffer ? "text-[#9A7A2C]" : "text-[#202326]"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("projects.filters.hotOffersOnly", "Hot Offers Only")}
        </span>
        <input
          type="checkbox"
          checked={isHotOffer}
          onChange={(e) => onIsHotOfferChange(e.target.checked)}
          className="h-4 w-4 rounded border-[#D0D9EA] text-[#B8963E] focus:ring-[#B8963E]"
        />
      </label>

      {/* Facilities Pill Chips (no inner scroll) */}
      {facilities.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <span
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("projects.filters.facilitiesLabel", "Facilities")}
              {facilityIds.length > 0 && (
                <span className="ms-1.5 rounded-full bg-[#2B5FA6]/10 px-2 py-0.5 text-[10px] font-bold text-[#2B5FA6]">
                  {facilityIds.length}
                </span>
              )}
            </span>
            {facilityIds.length > 0 && (
              <button
                type="button"
                onClick={onClearFacilities}
                className="text-[11px] font-semibold text-[#2B5FA6] hover:underline"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("projects.filters.clearFacilities", "Clear")}
              </button>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {visibleFacilities.map((fac) => {
              const checked = facilityIds.includes(fac.id);
              return (
                <button
                  key={fac.id}
                  type="button"
                  onClick={() => onToggleFacility(fac.id)}
                  aria-pressed={checked}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition-all ${
                    checked
                      ? "border-[#2B5FA6] bg-[#2B5FA6] text-white shadow-2xs"
                      : "border-[#D9E2EE] bg-[#F0F3FA] text-[#202326] hover:border-[#2B5FA6]/50 hover:bg-white"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <DynamicIcon
                    name={fac.icon}
                    className={`h-3.5 w-3.5 shrink-0 ${
                      checked ? "text-white" : "text-[#2B5FA6]"
                    }`}
                  />
                  <span>{fac.name}</span>
                </button>
              );
            })}
          </div>

          {facilities.length > COLLAPSED_FACILITY_LIMIT && (
            <button
              type="button"
              onClick={() => setShowAllFacilities((prev) => !prev)}
              className="mt-2 text-[11px] font-semibold text-[#2B5FA6] hover:underline"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {showAllFacilities
                ? t("projects.filters.hideFilters", "Show less")
                : `+${facilities.length - COLLAPSED_FACILITY_LIMIT} ${t(
                    "projects.filters.facilitiesLabel",
                    "Facilities"
                  )}`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
