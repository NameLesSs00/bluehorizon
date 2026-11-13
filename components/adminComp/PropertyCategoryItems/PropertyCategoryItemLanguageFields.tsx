"use client";

import {
  EgyptFlag,
  GermanyFlag,
  UkFlag,
} from "@/components/adminComp/Common/LanguageFlags";

interface PropertyCategoryItemLanguageFieldsProps {
  nameEn: string;
  setNameEn: (val: string) => void;
  nameDe: string;
  setNameDe: (val: string) => void;
  nameAr: string;
  setNameAr: (val: string) => void;
}

export default function PropertyCategoryItemLanguageFields({
  nameEn,
  setNameEn,
  nameDe,
  setNameDe,
  nameAr,
  setNameAr,
}: PropertyCategoryItemLanguageFieldsProps) {
  return (
    <div className="rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-5 space-y-4">
      <div>
        <label className="flex items-center gap-2 text-[12px] font-semibold text-[#202326]">
          <UkFlag />
          <span>English Item Name *</span>
        </label>
        <input
          type="text"
          required
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          placeholder="e.g. Espresso Machine, Bathtub, Safe Deposit"
          className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[14px] text-[#202326] outline-none transition-all placeholder:text-[#65706B] focus:border-[#2B5FA6] focus:ring-2 focus:ring-[#2B5FA6]/15"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-[12px] font-semibold text-[#202326]">
          <GermanyFlag />
          <span>German Item Name</span>
        </label>
        <input
          type="text"
          value={nameDe}
          onChange={(e) => setNameDe(e.target.value)}
          placeholder="z.B. Espressomaschine, Badewanne, Zimmersafe"
          className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[14px] text-[#202326] outline-none transition-all placeholder:text-[#65706B] focus:border-[#2B5FA6] focus:ring-2 focus:ring-[#2B5FA6]/15"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-[12px] font-semibold text-[#202326]">
          <EgyptFlag />
          <span>Arabic Item Name</span>
        </label>
        <input
          type="text"
          dir="rtl"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          placeholder="مثال: آلة تحضير القهوة، حوض استحمام، خزنة"
          className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[14px] text-[#202326] outline-none transition-all placeholder:text-[#65706B] focus:border-[#2B5FA6] focus:ring-2 focus:ring-[#2B5FA6]/15 text-right"
        />
      </div>
    </div>
  );
}

