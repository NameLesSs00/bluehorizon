"use client";

import { FiTrash2 } from "react-icons/fi";
import { LocalizedBlogSectionInput } from "@/models/blog";
import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";

interface BlogSectionFormCardProps {
  section: LocalizedBlogSectionInput;
  index: number;
  totalSections: number;
  onRemove: (index: number) => void;
  onChange: (
    index: number,
    field: "tittle" | "content",
    lang: "en" | "ar" | "de",
    value: string
  ) => void;
}

export default function BlogSectionFormCard({
  section,
  index,
  totalSections,
  onRemove,
  onChange,
}: BlogSectionFormCardProps) {
  return (
    <div className="rounded-xl border border-[#E2E8F3] bg-white p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#E2E8F3] pb-3">
        <span className="text-[13px] font-bold text-[#2B5FA6]">
          Section #{section.sectionNumber}
        </span>
        {totalSections > 1 && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="rounded-lg p-1 text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
            title="Remove Section"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Subheadings */}
      <div className="space-y-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#65706B]">
          Section Subheadings
        </p>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagUK className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>English Subheading</span>
          </label>
          <input
            type="text"
            value={section.tittle.en}
            onChange={(e) => onChange(index, "tittle", "en", e.target.value)}
            placeholder="e.g. 1. Define Your Budget"
            className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagGermany className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>German Subheading</span>
          </label>
          <input
            type="text"
            value={section.tittle.de}
            onChange={(e) => onChange(index, "tittle", "de", e.target.value)}
            placeholder="e.g. 1. Budget festlegen"
            className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagEgypt className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>Arabic Subheading</span>
          </label>
          <input
            type="text"
            dir="rtl"
            value={section.tittle.ar}
            onChange={(e) => onChange(index, "tittle", "ar", e.target.value)}
            placeholder="مثال: ١. حدد ميزانيتك"
            className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>
      </div>

      {/* Paragraph Contents */}
      <div className="space-y-3 pt-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#65706B]">
          Section Content
        </p>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagUK className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>English Content</span>
          </label>
          <textarea
            rows={3}
            value={section.content.en}
            onChange={(e) => onChange(index, "content", "en", e.target.value)}
            placeholder="Write section explanation in English..."
            className="mt-1.5 w-full resize-none rounded-xl border border-[#D0D9EA] bg-white p-3 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagGermany className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>German Content</span>
          </label>
          <textarea
            rows={3}
            value={section.content.de}
            onChange={(e) => onChange(index, "content", "de", e.target.value)}
            placeholder="Write section explanation in German..."
            className="mt-1.5 w-full resize-none rounded-xl border border-[#D0D9EA] bg-white p-3 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagEgypt className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>Arabic Content</span>
          </label>
          <textarea
            rows={3}
            dir="rtl"
            value={section.content.ar}
            onChange={(e) => onChange(index, "content", "ar", e.target.value)}
            placeholder="اكتب تفاصيل هذا القسم باللغة العربية..."
            className="mt-1.5 w-full resize-none rounded-xl border border-[#D0D9EA] bg-white p-3 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

