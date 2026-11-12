"use client";

import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";
import { RentalLocationFormPayload } from "@/models/rentalLocation";

interface RentalLocationLanguageFieldsProps {
  formData: RentalLocationFormPayload;
  onChange: (updater: (prev: RentalLocationFormPayload) => RentalLocationFormPayload) => void;
}

export default function RentalLocationLanguageFields({
  formData,
  onChange,
}: RentalLocationLanguageFieldsProps) {
  return (
    <>
      {/* Location Names in all languages */}
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-[#202326]">
          Location Name (Multilingual)
        </label>

        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagUK className="h-3.5 w-3.5" />
              <span>English Name *</span>
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
              placeholder="e.g. El Gouna, Sahl Hasheesh, Makadi Bay"
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagGermany className="h-3.5 w-3.5" />
              <span>German Name (Deutsch)</span>
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
              placeholder="e.g. El Gouna, Sahl Hasheesh"
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagEgypt className="h-3.5 w-3.5" />
              <span>Arabic Name (العربية)</span>
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
              placeholder="مثال: الجونة، سهل حشيش، مكادي باي"
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Location Descriptions in all languages */}
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-[#202326]">
          Description (Multilingual)
        </label>

        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagUK className="h-3.5 w-3.5" />
              <span>English Description</span>
            </div>
            <textarea
              rows={3}
              value={formData.description.en}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  description: { ...prev.description, en: e.target.value },
                }))
              }
              placeholder="Describe the area, rental appeal, amenities, and beaches..."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
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
              placeholder="Deutsche Beschreibung der Mietregion..."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagEgypt className="h-3.5 w-3.5" />
              <span>Arabic Description</span>
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
              placeholder="وصف تفصيلي للمنطقة والخدمات والمميزات للإيجار..."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}

