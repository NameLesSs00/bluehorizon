"use client";

import {
  FlagEgypt,
  FlagGermany,
  FlagRussia,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";
import { LocalizedText } from "@/models/faq";
import { RentalFormPayload } from "@/models/rental";
import RentalServicesField from "./RentalServicesField";

interface RentalListingDetailsFieldsProps {
  formData: RentalFormPayload;
  onChange: (
    updater: (prev: RentalFormPayload) => RentalFormPayload
  ) => void;
}

const LATE_CHECKIN_LANGS: Array<{
  key: keyof LocalizedText;
  Flag: typeof FlagUK;
  placeholder: string;
  dir?: "rtl";
}> = [
  { key: "en", Flag: FlagUK, placeholder: "e.g. Smart lock after 3 PM" },
  { key: "de", Flag: FlagGermany, placeholder: "z.B. Smart Lock ab 15 Uhr" },
  { key: "ar", Flag: FlagEgypt, placeholder: "مثال: دخول ذاتي بعد 3 مساءً", dir: "rtl" },
  { key: "ru", Flag: FlagRussia, placeholder: "напр. Умный замок после 15:00" },
];

const EXTRA_PEOPLE_LANGS: Array<{
  key: keyof LocalizedText;
  Flag: typeof FlagUK;
  placeholder: string;
  dir?: "rtl";
}> = [
  { key: "en", Flag: FlagUK, placeholder: "English rule (e.g. 1 child free)" },
  { key: "de", Flag: FlagGermany, placeholder: "Deutsch (z.B. 1 Kind frei)" },
  { key: "ar", Flag: FlagEgypt, placeholder: "العربية (مثال: طفل واحد مجاناً)", dir: "rtl" },
  { key: "ru", Flag: FlagRussia, placeholder: "Русский (напр. 1 ребенок бесплатно)" },
];

export default function RentalListingDetailsFields({
  formData,
  onChange,
}: RentalListingDetailsFieldsProps) {
  const details = formData.listingDetails;

  function updateLocalizedDetail(
    field: "lateCheckIn" | "extraPeople",
    lang: keyof LocalizedText,
    value: string
  ) {
    onChange((prev) => ({
      ...prev,
      listingDetails: {
        ...prev.listingDetails,
        [field]: {
          ...prev.listingDetails[field],
          [lang]: value,
        },
      },
    }));
  }

  return (
    <div className="space-y-5 rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-4">
      <p className="text-[12px] font-bold uppercase tracking-wider text-[#2B5FA6]">
        Stay Amenities &amp; Guest Rules
      </p>

      {/* 1. Multilingual Services Component */}
      <RentalServicesField
        services={details.services}
        onChange={(services) =>
          onChange((prev) => ({
            ...prev,
            listingDetails: {
              ...prev.listingDetails,
              services,
            },
          }))
        }
      />

      {/* 2. Check-In Policy (Multilingual) */}
      <div className="space-y-1.5">
        <label className="block text-[12px] font-medium text-[#202326]">
          Late Check-In Notes (Multilingual)
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {LATE_CHECKIN_LANGS.map(({ key, Flag, placeholder, dir }) => (
            <div key={key} className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
                <Flag className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                dir={dir}
                value={details.lateCheckIn[key] || ""}
                onChange={(e) =>
                  updateLocalizedDetail("lateCheckIn", key, e.target.value)
                }
                placeholder={placeholder}
                className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-8 pr-3 py-1.5 text-[12px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Extra Guest Guidelines (Multilingual) & Fee */}
      <div className="space-y-1.5">
        <label className="block text-[12px] font-medium text-[#202326]">
          Extra Guest Rules &amp; Fee
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {EXTRA_PEOPLE_LANGS.map(({ key, Flag, placeholder, dir }) => (
            <div key={key} className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
                <Flag className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                dir={dir}
                value={details.extraPeople[key] || ""}
                onChange={(e) =>
                  updateLocalizedDetail("extraPeople", key, e.target.value)
                }
                placeholder={placeholder}
                className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-8 pr-3 py-1.5 text-[12px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="relative sm:max-w-[200px] pt-1">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 pt-1 text-[12px] text-[#65706B]">
            $
          </span>
          <input
            type="number"
            min={0}
            value={details.extraPeopleFee}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                listingDetails: {
                  ...prev.listingDetails,
                  extraPeopleFee: Number(e.target.value),
                },
              }))
            }
            placeholder="Extra Guest Fee ($)"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-6 pr-3 py-1.5 text-[12px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>
      </div>

      {/* 4. Guest Perks Checkboxes */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-1">
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#D0D9EA] bg-white p-2.5">
          <input
            type="checkbox"
            checked={details.familyFriendly}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                listingDetails: {
                  ...prev.listingDetails,
                  familyFriendly: e.target.checked,
                },
              }))
            }
            className="h-4 w-4 rounded border-gray-300 text-[#2B5FA6] focus:ring-[#2B5FA6]"
          />
          <span className="text-[12px] font-medium text-[#202326]">
            Family Friendly
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#D0D9EA] bg-white p-2.5">
          <input
            type="checkbox"
            checked={details.privateEntrance}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                listingDetails: {
                  ...prev.listingDetails,
                  privateEntrance: e.target.checked,
                },
              }))
            }
            className="h-4 w-4 rounded border-gray-300 text-[#2B5FA6] focus:ring-[#2B5FA6]"
          />
          <span className="text-[12px] font-medium text-[#202326]">
            Private Entrance
          </span>
        </label>
      </div>
    </div>
  );
}
