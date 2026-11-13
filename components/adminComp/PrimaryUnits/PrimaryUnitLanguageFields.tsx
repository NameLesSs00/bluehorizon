"use client";

import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";
import { PrimaryUnitFormPayload } from "@/models/primaryUnit";

interface PrimaryUnitLanguageFieldsProps {
  formData: PrimaryUnitFormPayload;
  onChange: (
    updater: (prev: PrimaryUnitFormPayload) => PrimaryUnitFormPayload
  ) => void;
}

export default function PrimaryUnitLanguageFields({
  formData,
  onChange,
}: PrimaryUnitLanguageFieldsProps) {
  return (
    <div className="space-y-6">
      <h3 className="border-b border-[#E2E8F3] pb-2 text-[14px] font-bold text-[#2B5FA6]">
        Multilingual Content (All Languages)
      </h3>

      {/* Property Name / Title */}
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-[#202326]">
          Unit Title
        </label>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagUK className="h-3.5 w-3.5" />
              <span>English Title *</span>
            </div>
            <input
              type="text"
              required
              value={formData.name.en}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  name: { ...prev.name, en: e.target.value },
                }))
              }
              placeholder="e.g. Garden View Duplex Suite"
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagGermany className="h-3.5 w-3.5" />
              <span>German Title (Deutsch)</span>
            </div>
            <input
              type="text"
              value={formData.name.de}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  name: { ...prev.name, de: e.target.value },
                }))
              }
              placeholder="e.g. Gartenblick-Duplex-Suite"
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagEgypt className="h-3.5 w-3.5" />
              <span>Arabic Title (العربية)</span>
            </div>
            <input
              type="text"
              dir="rtl"
              value={formData.name.ar}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  name: { ...prev.name, ar: e.target.value },
                }))
              }
              placeholder="مثال: جناح دوبلكس بإطلالة على الحديقة"
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-[#202326]">
          Description
        </label>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagUK className="h-3.5 w-3.5" />
              <span>English Description *</span>
            </div>
            <textarea
              rows={3}
              required
              value={formData.description.en}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  description: { ...prev.description, en: e.target.value },
                }))
              }
              placeholder="Enter comprehensive English unit description..."
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagGermany className="h-3.5 w-3.5" />
              <span>German Description</span>
            </div>
            <textarea
              rows={3}
              value={formData.description.de}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  description: { ...prev.description, de: e.target.value },
                }))
              }
              placeholder="Geben Sie eine ausführliche Beschreibung auf Deutsch ein..."
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagEgypt className="h-3.5 w-3.5" />
              <span>Arabic Description (العربية)</span>
            </div>
            <textarea
              rows={3}
              dir="rtl"
              value={formData.description.ar}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  description: { ...prev.description, ar: e.target.value },
                }))
              }
              placeholder="أدخل وصف الوحدة باللغة العربية..."
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* View Details */}
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-[#202326]">
          View / Outlook
        </label>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagUK className="h-3.5 w-3.5" />
              <span>English View</span>
            </div>
            <input
              type="text"
              value={formData.view.en}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  view: { ...prev.view, en: e.target.value },
                }))
              }
              placeholder="e.g. Landscaped Garden & Pool View"
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagGermany className="h-3.5 w-3.5" />
              <span>German View</span>
            </div>
            <input
              type="text"
              value={formData.view.de}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  view: { ...prev.view, de: e.target.value },
                }))
              }
              placeholder="e.g. Blick auf den angelegten Garten und Pool"
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagEgypt className="h-3.5 w-3.5" />
              <span>Arabic View (العربية)</span>
            </div>
            <input
              type="text"
              dir="rtl"
              value={formData.view.ar}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  view: { ...prev.view, ar: e.target.value },
                }))
              }
              placeholder="مثال: إطلالة على الحديقة المنسقة والمسبح"
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Floor Name */}
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-[#202326]">
          Floor Name / Label
        </label>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagUK className="h-3.5 w-3.5" />
              <span>English Floor Name</span>
            </div>
            <input
              type="text"
              value={formData.floorName.en}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  floorName: { ...prev.floorName, en: e.target.value },
                }))
              }
              placeholder="e.g. Ground Floor"
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagGermany className="h-3.5 w-3.5" />
              <span>German Floor Name</span>
            </div>
            <input
              type="text"
              value={formData.floorName.de}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  floorName: { ...prev.floorName, de: e.target.value },
                }))
              }
              placeholder="e.g. Erdgeschoss"
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
              <FlagEgypt className="h-3.5 w-3.5" />
              <span>Arabic Floor Name (العربية)</span>
            </div>
            <input
              type="text"
              dir="rtl"
              value={formData.floorName.ar}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  floorName: { ...prev.floorName, ar: e.target.value },
                }))
              }
              placeholder="مثال: الطابق الأرضي"
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

