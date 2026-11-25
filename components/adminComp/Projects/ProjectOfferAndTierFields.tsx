"use client";

import { PROJECT_TIER_OPTIONS, ProjectTierType } from "@/models/project";

interface ProjectOfferAndTierFieldsProps {
  projectType: ProjectTierType;
  onProjectTypeChange: (val: ProjectTierType) => void;
  isHotOffer: boolean;
  onIsHotOfferChange: (val: boolean) => void;
  startDateHotOffer: string;
  onStartDateHotOfferChange: (val: string) => void;
  endDateHotOffer: string;
  onEndDateHotOfferChange: (val: string) => void;
}

export default function ProjectOfferAndTierFields({
  projectType,
  onProjectTypeChange,
  isHotOffer,
  onIsHotOfferChange,
  startDateHotOffer,
  onStartDateHotOfferChange,
  endDateHotOffer,
  onEndDateHotOfferChange,
}: ProjectOfferAndTierFieldsProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-[#C5D3E8] bg-[#F9F7F4] p-5">
      <div>
        <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#2B5FA6]">
          Project Classification &amp; Hot Offer
        </h4>
        <p className="mt-0.5 text-[12px] text-[#65706B]">
          Assign a marketing tier and configure time-limited hot offer promotions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[13px] font-bold text-[#202326]">
            Project Type (Tier) *
          </label>
          <select
            required
            value={projectType}
            onChange={(e) => onProjectTypeChange(e.target.value as ProjectTierType)}
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2.5 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          >
            {PROJECT_TIER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col justify-end">
          <label className="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-[#D0D9EA] bg-white p-3 hover:bg-[#F0F3FA]/50">
            <input
              type="checkbox"
              checked={isHotOffer}
              onChange={(e) => {
                const checked = e.target.checked;
                onIsHotOfferChange(checked);
                if (!checked) {
                  onStartDateHotOfferChange("");
                  onEndDateHotOfferChange("");
                }
              }}
              className="h-4 w-4 rounded text-[#B8963E] focus:ring-[#B8963E]"
            />
            <span className="text-[13px] font-semibold text-[#B8963E]">
              Active Hot Offer
            </span>
          </label>
        </div>
      </div>

      {isHotOffer && (
        <div className="grid grid-cols-1 gap-4 border-t border-[#E2E8F3] pt-4 sm:grid-cols-2">
          <div>
            <label className="block text-[12px] font-semibold text-[#202326]">
              Hot Offer Start Date *
            </label>
            <input
              type="datetime-local"
              required
              value={startDateHotOffer}
              onChange={(e) => onStartDateHotOfferChange(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#202326]">
              Hot Offer End Date *
            </label>
            <input
              type="datetime-local"
              required
              value={endDateHotOffer}
              onChange={(e) => onEndDateHotOfferChange(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
