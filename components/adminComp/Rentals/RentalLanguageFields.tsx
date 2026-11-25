"use client";

import { RentalFormPayload } from "@/models/rental";
import MultilingualInputGroup from "./MultilingualInputGroup";

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
    <div className="space-y-6 rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-4">
      <p className="text-[12px] font-bold uppercase tracking-wider text-[#2B5FA6]">
        Multilingual Content (All Languages)
      </p>

      {/* 1. Property Title */}
      <MultilingualInputGroup
        label="Rental Title (Multilingual) *"
        required
        value={formData.name}
        onChange={(val) =>
          onChange((prev) => ({
            ...prev,
            name: val,
          }))
        }
        placeholders={{
          en: "e.g. Seaside Luxury Pool Villa",
          de: "z.B. Luxus-Pool-Villa am Meer",
          ar: "مثال: فيلا فاخرة على شاطئ البحر",
          ru: "например: Роскошная вилла с бассейном у моря",
        }}
      />

      {/* 2. Floor / Level */}
      <MultilingualInputGroup
        label="Floor / Level (Multilingual)"
        value={formData.floor}
        onChange={(val) =>
          onChange((prev) => ({
            ...prev,
            floor: val,
          }))
        }
        placeholders={{
          en: "e.g. Ground Floor, 2nd Floor, Penthouse",
          de: "z.B. Erdgeschoss, 1. Stock",
          ar: "مثال: الطابق الأرضي، الطابق الأول",
          ru: "например: Первый этаж, Второй этаж, Пентхаус",
        }}
      />

      {/* 3. Cancellation Policy */}
      <MultilingualInputGroup
        label="Cancellation Policy (Multilingual)"
        value={formData.rulesCancellation}
        onChange={(val) =>
          onChange((prev) => ({
            ...prev,
            rulesCancellation: val,
          }))
        }
        placeholders={{
          en: "e.g. Free cancellation up to 7 days before check-in",
          de: "z.B. Kostenlose Stornierung bis 7 Tage vor Anreise",
          ar: "مثال: إلغاء مجاني حتى 7 أيام قبل تسجيل الوصول",
          ru: "например: Бесплатная отмена за 7 дней до заезда",
        }}
      />

      {/* 4. Arrival & Host Notes */}
      <MultilingualInputGroup
        label="Arrival & Host Notes (Multilingual)"
        value={formData.notes}
        onChange={(val) =>
          onChange((prev) => ({
            ...prev,
            notes: val,
          }))
        }
        placeholders={{
          en: "e.g. Quiet hours from 11:00 PM to 08:00 AM",
          de: "z.B. Ruhezeiten von 23:00 bis 08:00 Uhr",
          ar: "مثال: ساعات الهدوء من 11:00 مساءً حتى 08:00 صباحاً",
          ru: "например: Тихие часы с 23:00 до 08:00",
        }}
      />

      {/* 5. Detailed Description */}
      <MultilingualInputGroup
        label="Description (Multilingual)"
        isTextarea
        rows={3}
        value={formData.description}
        onChange={(val) =>
          onChange((prev) => ({
            ...prev,
            description: val,
          }))
        }
        placeholders={{
          en: "Detail the vacation unit layout, comfort, and appeal...",
          de: "Deutsche Beschreibung der Unterkunft...",
          ar: "وصف تفصيلي للشقة أو الفيلا ومميزات الإقامة...",
          ru: "Подробное описание планировки и удобств...",
        }}
      />
    </div>
  );
}
