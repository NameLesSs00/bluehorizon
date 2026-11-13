"use client";

import { FiMapPin } from "react-icons/fi";
import { LocalizedText } from "@/models/faq";
import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";

interface StandaloneUnitLocationFieldsProps {
  country: LocalizedText;
  setCountry: (val: LocalizedText) => void;
  city: LocalizedText;
  setCity: (val: LocalizedText) => void;
  district: LocalizedText;
  setDistrict: (val: LocalizedText) => void;
  street: LocalizedText;
  setStreet: (val: LocalizedText) => void;
  address: LocalizedText;
  setAddress: (val: LocalizedText) => void;
}

export default function StandaloneUnitLocationFields({
  country,
  setCountry,
  city,
  setCity,
  district,
  setDistrict,
  street,
  setStreet,
  address,
  setAddress,
}: StandaloneUnitLocationFieldsProps) {
  return (
    <div className="space-y-4 rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-5">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-[#2B5FA6]">
          <FiMapPin className="h-4 w-4" />
          <span>Location &amp; Address</span>
        </h4>
        <button
          type="button"
          onClick={() => {
            setCountry({ en: "Egypt", de: "Ägypten", ar: "مصر" });
            setCity({ en: "Hurghada", de: "Hurghada", ar: "الغردقة" });
          }}
          className="rounded-lg border border-[#D0D9EA] bg-white px-2.5 py-1 text-[11px] font-medium text-[#2B5FA6] hover:bg-[#F0F3FA]"
        >
          Preset: Hurghada, Egypt
        </button>
      </div>

      {/* Country and City */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-[12px] font-medium text-[#202326]">
            Country (EN / DE / AR) *
          </label>
          <div className="space-y-1.5">
            <input
              type="text"
              required
              value={country.en}
              onChange={(e) => setCountry({ ...country, en: e.target.value })}
              placeholder="Country (EN) e.g. Egypt"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
            <input
              type="text"
              value={country.de}
              onChange={(e) => setCountry({ ...country, de: e.target.value })}
              placeholder="Country (DE) e.g. Ägypten"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
            <input
              type="text"
              dir="rtl"
              value={country.ar}
              onChange={(e) => setCountry({ ...country, ar: e.target.value })}
              placeholder="الدولة (عربي) مثال: مصر"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[12px] font-medium text-[#202326]">
            City (EN / DE / AR) *
          </label>
          <div className="space-y-1.5">
            <input
              type="text"
              required
              value={city.en}
              onChange={(e) => setCity({ ...city, en: e.target.value })}
              placeholder="City (EN) e.g. Hurghada"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
            <input
              type="text"
              value={city.de}
              onChange={(e) => setCity({ ...city, de: e.target.value })}
              placeholder="City (DE) e.g. Hurghada"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
            <input
              type="text"
              dir="rtl"
              value={city.ar}
              onChange={(e) => setCity({ ...city, ar: e.target.value })}
              placeholder="المدينة (عربي) مثال: الغردقة"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* District & Street */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-[12px] font-medium text-[#202326]">
            District / Neighborhood (EN / AR)
          </label>
          <div className="space-y-1.5">
            <input
              type="text"
              value={district.en}
              onChange={(e) => setDistrict({ ...district, en: e.target.value })}
              placeholder="District (EN) e.g. El Memsha"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
            <input
              type="text"
              dir="rtl"
              value={district.ar}
              onChange={(e) => setDistrict({ ...district, ar: e.target.value })}
              placeholder="الحي / المنطقة (عربي) مثال: الممشى السياحي"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[12px] font-medium text-[#202326]">
            Street Name (EN / AR)
          </label>
          <div className="space-y-1.5">
            <input
              type="text"
              value={street.en}
              onChange={(e) => setStreet({ ...street, en: e.target.value })}
              placeholder="Street (EN) e.g. Sheraton Road"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
            <input
              type="text"
              dir="rtl"
              value={street.ar}
              onChange={(e) => setStreet({ ...street, ar: e.target.value })}
              placeholder="اسم الشارع (عربي) مثال: طريق شيراتون"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Full Address */}
      <div className="space-y-2 pt-1">
        <label className="block text-[12px] font-medium text-[#202326]">
          Full Address Line (EN &amp; AR)
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input
            type="text"
            value={address.en}
            onChange={(e) => setAddress({ ...address, en: e.target.value })}
            placeholder="Address (EN) e.g. Villa 12, Sunset Avenue, Hurghada"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
          <input
            type="text"
            dir="rtl"
            value={address.ar}
            onChange={(e) => setAddress({ ...address, ar: e.target.value })}
            placeholder="العنوان بالكامل (عربي)"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[12px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

