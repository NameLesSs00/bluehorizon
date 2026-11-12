"use client";

import { FlagEgypt, FlagGermany, FlagUK } from "@/components/adminComp/Common/LanguageFlags";

interface ProjectLanguageFieldsProps {
  nameEn: string;
  setNameEn: (val: string) => void;
  nameDe: string;
  setNameDe: (val: string) => void;
  nameAr: string;
  setNameAr: (val: string) => void;
  descEn: string;
  setDescEn: (val: string) => void;
  descDe: string;
  setDescDe: (val: string) => void;
  descAr: string;
  setDescAr: (val: string) => void;
}

export default function ProjectLanguageFields({
  nameEn,
  setNameEn,
  nameDe,
  setNameDe,
  nameAr,
  setNameAr,
  descEn,
  setDescEn,
  descDe,
  setDescDe,
  descAr,
  setDescAr,
}: ProjectLanguageFieldsProps) {
  return (
    <>
      {/* Multilingual Names */}
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-[#202326]">
          Project Name (Multilingual) *
        </label>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagUK />
              <span>English *</span>
            </div>
            <input
              type="text"
              required
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="e.g. Modern Sunset Residence"
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagGermany />
              <span>German (Deutsch)</span>
            </div>
            <input
              type="text"
              value={nameDe}
              onChange={(e) => setNameDe(e.target.value)}
              placeholder="Deutsche Projektbezeichnung..."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagEgypt />
              <span>Arabic (العربية)</span>
            </div>
            <input
              type="text"
              dir="rtl"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              placeholder="اسم المشروع بالعربية..."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Multilingual Descriptions */}
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-[#202326]">
          Project Description (Multilingual)
        </label>
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagUK />
              <span>English Description</span>
            </div>
            <textarea
              rows={3}
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              placeholder="Describe master plan, lifestyle, architecture, and sea proximity..."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagGermany />
              <span>German Description</span>
            </div>
            <textarea
              rows={3}
              value={descDe}
              onChange={(e) => setDescDe(e.target.value)}
              placeholder="Deutsche Beschreibung..."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
              <FlagEgypt />
              <span>Arabic Description</span>
            </div>
            <textarea
              rows={3}
              dir="rtl"
              value={descAr}
              onChange={(e) => setDescAr(e.target.value)}
              placeholder="وصف المشروع المعماري والموقع والإطلالة..."
              className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}

