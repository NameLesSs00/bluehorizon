"use client";

import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";
import { LocalizedText } from "@/models/faq";

interface MultilingualInputGroupProps {
  label: string;
  required?: boolean;
  value: LocalizedText;
  onChange: (val: LocalizedText) => void;
  placeholders: { en: string; de: string; ar: string };
  isTextarea?: boolean;
  rows?: number;
}

export default function MultilingualInputGroup({
  label,
  required = false,
  value,
  onChange,
  placeholders,
  isTextarea = false,
  rows = 3,
}: MultilingualInputGroupProps) {
  return (
    <div className="space-y-2">
      <label className="block text-[12px] font-bold text-[#202326]">
        {label}
      </label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* English */}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
            <FlagUK className="h-3.5 w-3.5" />
            <span>English{required ? " *" : ""}</span>
          </div>
          {isTextarea ? (
            <textarea
              rows={rows}
              required={required}
              value={value.en || ""}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
              placeholder={placeholders.en}
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          ) : (
            <input
              type="text"
              required={required}
              value={value.en || ""}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
              placeholder={placeholders.en}
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          )}
        </div>

        {/* German */}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
            <FlagGermany className="h-3.5 w-3.5" />
            <span>Deutsch</span>
          </div>
          {isTextarea ? (
            <textarea
              rows={rows}
              value={value.de || ""}
              onChange={(e) => onChange({ ...value, de: e.target.value })}
              placeholder={placeholders.de}
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          ) : (
            <input
              type="text"
              value={value.de || ""}
              onChange={(e) => onChange({ ...value, de: e.target.value })}
              placeholder={placeholders.de}
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          )}
        </div>

        {/* Arabic */}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2B5FA6]">
            <FlagEgypt className="h-3.5 w-3.5" />
            <span>العربية</span>
          </div>
          {isTextarea ? (
            <textarea
              rows={rows}
              dir="rtl"
              value={value.ar || ""}
              onChange={(e) => onChange({ ...value, ar: e.target.value })}
              placeholder={placeholders.ar}
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          ) : (
            <input
              type="text"
              dir="rtl"
              value={value.ar || ""}
              onChange={(e) => onChange({ ...value, ar: e.target.value })}
              placeholder={placeholders.ar}
              className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          )}
        </div>
      </div>
    </div>
  );
}
