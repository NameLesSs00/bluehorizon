"use client";

import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";
import { LocalizedText } from "@/models/faq";

interface RentalServicesFieldProps {
  services: LocalizedText[];
  onChange: (services: LocalizedText[]) => void;
}

const EMPTY_SERVICE: LocalizedText = { en: "", ar: "", de: "" };

export default function RentalServicesField({
  services,
  onChange,
}: RentalServicesFieldProps) {
  const [newService, setNewService] = useState<LocalizedText>(EMPTY_SERVICE);

  function handleAddService() {
    const trimmedEn = newService.en.trim();
    if (!trimmedEn) return;

    onChange([
      ...services,
      {
        en: trimmedEn,
        ar: newService.ar.trim() || trimmedEn,
        de: newService.de.trim() || trimmedEn,
      },
    ]);
    setNewService(EMPTY_SERVICE);
  }

  function handleRemoveService(indexToRemove: number) {
    onChange(services.filter((_, idx) => idx !== indexToRemove));
  }

  return (
    <div className="space-y-2">
      <label className="block text-[12px] font-medium text-[#202326]">
        Included Hospitality Services (Multilingual)
      </label>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
            <FlagUK className="h-3.5 w-3.5" />
          </span>
          <input
            type="text"
            value={newService.en}
            onChange={(e) =>
              setNewService((prev) => ({ ...prev, en: e.target.value }))
            }
            placeholder="English (e.g. Free Wi-Fi)"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-8 pr-3 py-1.5 text-[12px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
            <FlagGermany className="h-3.5 w-3.5" />
          </span>
          <input
            type="text"
            value={newService.de}
            onChange={(e) =>
              setNewService((prev) => ({ ...prev, de: e.target.value }))
            }
            placeholder="Deutsch (z.B. Gratis WLAN)"
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
            value={newService.ar}
            onChange={(e) =>
              setNewService((prev) => ({ ...prev, ar: e.target.value }))
            }
            placeholder="العربية (مثال: واي فاي مجاني)"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white pl-8 pr-3 py-1.5 text-[12px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end pt-0.5">
        <button
          type="button"
          onClick={handleAddService}
          disabled={!newService.en.trim()}
          className="inline-flex items-center gap-1 rounded-xl bg-[#2B5FA6] px-3.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#1B3A6B] disabled:opacity-40"
        >
          <FiPlus className="h-3.5 w-3.5" />
          <span>Add Service</span>
        </button>
      </div>

      {services.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {services.map((service, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E2E8F3] px-3 py-1 text-[11px] font-medium text-[#202326]"
            >
              <span>{service.en}</span>
              {service.ar && (
                <span className="text-[#65706B] text-[10px]">({service.ar})</span>
              )}
              <button
                type="button"
                onClick={() => handleRemoveService(idx)}
                className="text-[#9BA5A0] hover:text-red-500"
              >
                <FiX className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
