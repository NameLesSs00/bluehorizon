"use client";

import { FiCalendar, FiTag } from "react-icons/fi";
import { LocalizedText } from "@/models/faq";
import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";

const CATEGORY_PRESETS: Array<{ en: string; de: string; ar: string }> = [
  { en: "Buying Guide", de: "Kaufberater", ar: "دليل الشراء" },
  { en: "Investment", de: "Investition", ar: "استثمار" },
  { en: "Lifestyle", de: "Lebensstil", ar: "نمط الحياة" },
  { en: "Market Insights", de: "Markteinblicke", ar: "رؤى السوق" },
  { en: "Red Sea News", de: "Rote Meer Nachrichten", ar: "أخبار البحر الأحمر" },
];

interface BlogTitleAndCategoryFieldsProps {
  title: LocalizedText;
  setTitle: (val: LocalizedText) => void;
  blogType: LocalizedText;
  setBlogType: (val: LocalizedText) => void;
  publishDate: string;
  setPublishDate: (val: string) => void;
  coverFile: File | null;
  setCoverFile: (val: File | null) => void;
  isEditing: boolean;
}

export default function BlogTitleAndCategoryFields({
  title,
  setTitle,
  blogType,
  setBlogType,
  publishDate,
  setPublishDate,
  setCoverFile,
  isEditing,
}: BlogTitleAndCategoryFieldsProps) {
  return (
    <div className="space-y-5">
      {/* Category & Date Card */}
      <div className="rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-5 space-y-4">
        <h4 className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-[#145C4B]">
          <FiTag className="h-4 w-4" />
          <span>Category &amp; Publication Date</span>
        </h4>

        {/* Quick Presets */}
        <div>
          <span className="block text-[11px] font-medium text-[#65706B] mb-1.5">
            Quick Category Presets:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_PRESETS.map((cat) => (
              <button
                key={cat.en}
                type="button"
                onClick={() => setBlogType({ en: cat.en, de: cat.de, ar: cat.ar })}
                className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  blogType.en === cat.en
                    ? "border-[#145C4B] bg-[#145C4B] text-white"
                    : "border-[#DCE2DE] bg-white text-[#202326] hover:bg-[#F3F5F3]"
                }`}
              >
                {cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Multilingual Blog Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-medium text-[#202326]">
              <FlagUK className="h-3 w-4 rounded-2xs" />
              <span>Type (EN) *</span>
            </label>
            <input
              type="text"
              required
              value={blogType.en}
              onChange={(e) => setTitleCategory(e.target.value, "en")}
              placeholder="e.g. Buying Guide"
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-medium text-[#202326]">
              <FlagGermany className="h-3 w-4 rounded-2xs" />
              <span>Type (DE)</span>
            </label>
            <input
              type="text"
              value={blogType.de}
              onChange={(e) => setBlogType({ ...blogType, de: e.target.value })}
              placeholder="e.g. Kaufberater"
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-medium text-[#202326]">
              <FlagEgypt className="h-3 w-4 rounded-2xs" />
              <span>Type (AR)</span>
            </label>
            <input
              type="text"
              dir="rtl"
              value={blogType.ar}
              onChange={(e) => setBlogType({ ...blogType, ar: e.target.value })}
              placeholder="مثال: دليل الشراء"
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
            />
          </div>
        </div>

        {/* Publish Date */}
        <div>
          <label className="flex items-center gap-1.5 text-[12px] font-medium text-[#202326]">
            <FiCalendar className="h-3.5 w-3.5 text-[#145C4B]" />
            <span>Publish Date &amp; Time *</span>
          </label>
          <input
            type="datetime-local"
            required
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
          />
        </div>
      </div>

      {/* Blog Title Card */}
      <div className="rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-5 space-y-4">
        <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#145C4B]">
          Blog Title
        </h4>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagUK className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>English Title *</span>
          </label>
          <input
            type="text"
            required
            value={title.en}
            onChange={(e) => setTitle({ ...title, en: e.target.value })}
            placeholder="e.g. Top 5 Tips for Buying Your First Property"
            className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagGermany className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>German Title *</span>
          </label>
          <input
            type="text"
            required
            value={title.de}
            onChange={(e) => setTitle({ ...title, de: e.target.value })}
            placeholder="e.g. Die 5 besten Tipps für den ersten Immobilienkauf"
            className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
            <FlagEgypt className="h-3.5 w-5 rounded-2xs shadow-xs" />
            <span>Arabic Title *</span>
          </label>
          <input
            type="text"
            required
            dir="rtl"
            value={title.ar}
            onChange={(e) => setTitle({ ...title, ar: e.target.value })}
            placeholder="مثال: أهم ٥ نصائح لشراء عقارك الأول"
            className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[12px] font-medium text-[#202326]">
            {isEditing ? "Replace Cover Image (Optional)" : "Cover Image (Optional)"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            className="mt-1.5 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#0F473A] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#145C4B]"
          />
        </div>
      </div>
    </div>
  );

  function setTitleCategory(val: string, lang: "en" | "de" | "ar") {
    setBlogType({ ...blogType, [lang]: val });
  }
}

