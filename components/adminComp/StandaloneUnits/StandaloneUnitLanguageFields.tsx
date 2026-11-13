"use client";

import { LocalizedText } from "@/models/faq";
import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";

interface StandaloneUnitLanguageFieldsProps {
  name: LocalizedText;
  setName: (val: LocalizedText) => void;
  description: LocalizedText;
  setDescription: (val: LocalizedText) => void;
  view: LocalizedText;
  setView: (val: LocalizedText) => void;
  floorName: LocalizedText;
  setFloorName: (val: LocalizedText) => void;
}

export default function StandaloneUnitLanguageFields({
  name,
  setName,
  description,
  setDescription,
  view,
  setView,
  floorName,
  setFloorName,
}: StandaloneUnitLanguageFieldsProps) {
  return (
    <div className="space-y-4 rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-5">
      <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#2B5FA6]">
        Property Descriptions &amp; Names
      </h4>

      {/* Property Name */}
      <div className="space-y-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#65706B]">
          Property Name *
        </p>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagUK className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>English Name</span>
          </label>
          <input
            type="text"
            required
            value={name.en}
            onChange={(e) => setName({ ...name, en: e.target.value })}
            placeholder="e.g. Luxury Beachfront Standalone Villa"
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagGermany className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>German Name</span>
          </label>
          <input
            type="text"
            value={name.de}
            onChange={(e) => setName({ ...name, de: e.target.value })}
            placeholder="e.g. Luxuriöse freistehende Strandvilla"
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagEgypt className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>Arabic Name</span>
          </label>
          <input
            type="text"
            dir="rtl"
            value={name.ar}
            onChange={(e) => setName({ ...name, ar: e.target.value })}
            placeholder="مثال: فيلا مستقلة فاخرة على شاطئ البحر"
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3 pt-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#65706B]">
          Overview / Description
        </p>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagUK className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>English Description</span>
          </label>
          <textarea
            rows={2}
            value={description.en}
            onChange={(e) => setDescription({ ...description, en: e.target.value })}
            placeholder="Describe the unit features, finishes, and layout..."
            className="mt-1 w-full resize-none rounded-xl border border-[#D0D9EA] bg-white p-3 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagGermany className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>German Description</span>
          </label>
          <textarea
            rows={2}
            value={description.de}
            onChange={(e) => setDescription({ ...description, de: e.target.value })}
            placeholder="Beschreiben Sie die Ausstattungsmerkmale..."
            className="mt-1 w-full resize-none rounded-xl border border-[#D0D9EA] bg-white p-3 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagEgypt className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>Arabic Description</span>
          </label>
          <textarea
            rows={2}
            dir="rtl"
            value={description.ar}
            onChange={(e) => setDescription({ ...description, ar: e.target.value })}
            placeholder="اكتب وصفاً مميزاً للوحدة وتشطيباتها..."
            className="mt-1 w-full resize-none rounded-xl border border-[#D0D9EA] bg-white p-3 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>
      </div>

      {/* View & Floor Name */}
      <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            View (EN / DE / AR)
          </label>
          <input
            type="text"
            value={view.en}
            onChange={(e) => setView({ ...view, en: e.target.value })}
            placeholder="e.g. Direct Sea View"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Floor Name (EN / DE / AR)
          </label>
          <input
            type="text"
            value={floorName.en}
            onChange={(e) => setFloorName({ ...floorName, en: e.target.value })}
            placeholder="e.g. Ground Floor & Garden"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

