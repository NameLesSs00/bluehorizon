"use client";

import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";
import { RentalFormPayload } from "@/models/rental";
import RentalServicesField from "./RentalServicesField";

interface RentalListingDetailsFieldsProps {
  formData: RentalFormPayload;
  onChange: (
    updater: (prev: RentalFormPayload) => RentalFormPayload
  ) => void;
}

export default function RentalListingDetailsFields({
  formData,
  onChange,
}: RentalListingDetailsFieldsProps) {
  const details = formData.listingDetails;

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
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
              <FlagUK className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              value={details.lateCheckIn.en || ""}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  listingDetails: {
                    ...prev.listingDetails,
                    lateCheckIn: {
                      ...prev.listingDetails.lateCheckIn,
                      en: e.target.value,
                    },
                  },
                }))
              }
              placeholder="e.g. Smart lock after 3 PM"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-8 pr-3 py-1.5 text-[12px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
              <FlagGermany className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              value={details.lateCheckIn.de || ""}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  listingDetails: {
                    ...prev.listingDetails,
                    lateCheckIn: {
                      ...prev.listingDetails.lateCheckIn,
                      de: e.target.value,
                    },
                  },
                }))
              }
              placeholder="z.B. Smart Lock ab 15 Uhr"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-8 pr-3 py-1.5 text-[12px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
              <FlagEgypt className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              dir="rtl"
              value={details.lateCheckIn.ar || ""}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  listingDetails: {
                    ...prev.listingDetails,
                    lateCheckIn: {
                      ...prev.listingDetails.lateCheckIn,
                      ar: e.target.value,
                    },
                  },
                }))
              }
              placeholder="مثال: دخول ذاتي بعد 3 مساءً"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-8 pr-3 py-1.5 text-[12px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Extra Guest Guidelines (Multilingual) & Fee */}
      <div className="space-y-1.5">
        <label className="block text-[12px] font-medium text-[#202326]">
          Extra Guest Rules &amp; Fee
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
          <div className="relative sm:col-span-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
              <FlagUK className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              value={details.extraPeople.en || ""}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  listingDetails: {
                    ...prev.listingDetails,
                    extraPeople: {
                      ...prev.listingDetails.extraPeople,
                      en: e.target.value,
                    },
                  },
                }))
              }
              placeholder="English rule (e.g. 1 child free)"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-8 pr-3 py-1.5 text-[12px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div className="relative sm:col-span-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
              <FlagGermany className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              value={details.extraPeople.de || ""}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  listingDetails: {
                    ...prev.listingDetails,
                    extraPeople: {
                      ...prev.listingDetails.extraPeople,
                      de: e.target.value,
                    },
                  },
                }))
              }
              placeholder="Deutsch (z.B. 1 Kind frei)"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-8 pr-3 py-1.5 text-[12px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div className="relative sm:col-span-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
              <FlagEgypt className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              dir="rtl"
              value={details.extraPeople.ar || ""}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  listingDetails: {
                    ...prev.listingDetails,
                    extraPeople: {
                      ...prev.listingDetails.extraPeople,
                      ar: e.target.value,
                    },
                  },
                }))
              }
              placeholder="العربية (مثال: طفل واحد مجاناً)"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-8 pr-3 py-1.5 text-[12px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>

          <div className="relative sm:col-span-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-[12px] text-[#65706B]">
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
              placeholder="Fee ($)"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-6 pr-3 py-1.5 text-[12px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
            />
          </div>
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
