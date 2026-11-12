"use client";

import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";
import { RentalFormPayload } from "@/models/rental";

interface RentalLanguageFieldsProps {
  formData: RentalFormPayload;
  onChange: (
    updater: (prev: RentalFormPayload) => RentalFormPayload
  ) => void;
}

export default function RentalLanguageFields({
  formData,
  onChange,
}: RentalLanguageFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Property Names (EN, DE, AR) */}
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-[#202326]">
          Rental Title (Multilingual)
        </label>

        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
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
              placeholder="e.g. Seaside Luxury Pool Villa"
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
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
              placeholder="e.g. Luxus-Pool-Villa am Meer"
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
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
              placeholder="مثال: فيلا فاخرة على شاطئ البحر مع مسبح"
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Descriptions (EN, DE, AR) */}
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
              placeholder="Detail the vacation unit layout, comfort, and interior appeal..."
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
              placeholder="Deutsche Beschreibung der Unterkunft..."
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
              placeholder="وصف تفصيلي للشقة أو الفيلا ومميزات الإقامة..."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Cancellation Rules (EN, DE, AR) */}
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-[#202326]">
          Cancellation Policy (Multilingual)
        </label>

        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagUK className="h-3.5 w-3.5" />
              <span>English Policy</span>
            </div>
            <input
              type="text"
              value={formData.rulesCancellation.en}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  rulesCancellation: {
                    ...prev.rulesCancellation,
                    en: e.target.value,
                  },
                }))
              }
              placeholder="e.g. Free cancellation up to 7 days before check-in."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagGermany className="h-3.5 w-3.5" />
              <span>German Policy</span>
            </div>
            <input
              type="text"
              value={formData.rulesCancellation.de}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  rulesCancellation: {
                    ...prev.rulesCancellation,
                    de: e.target.value,
                  },
                }))
              }
              placeholder="e.g. Kostenlose Stornierung bis zu 7 Tage vor Anreise."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagEgypt className="h-3.5 w-3.5" />
              <span>Arabic Policy</span>
            </div>
            <input
              type="text"
              dir="rtl"
              value={formData.rulesCancellation.ar}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  rulesCancellation: {
                    ...prev.rulesCancellation,
                    ar: e.target.value,
                  },
                }))
              }
              placeholder="مثال: إلغاء مجاني حتى 7 أيام قبل تسجيل الوصول."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

