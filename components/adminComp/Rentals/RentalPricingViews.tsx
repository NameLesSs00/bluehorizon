"use client";

import { RentalFormPayload } from "@/models/rental";

interface RentalPricingViewsProps {
  formData: RentalFormPayload;
  onChange: (
    updater: (prev: RentalFormPayload) => RentalFormPayload
  ) => void;
}

export default function RentalPricingViews({
  formData,
  onChange,
}: RentalPricingViewsProps) {
  const viewsList: Array<{
    key:
      | "hasSeaView"
      | "hasPoolView"
      | "hasGardenView"
      | "hasMountainView"
      | "hasCityView";
    label: string;
  }> = [
    { key: "hasSeaView", label: "Sea View" },
    { key: "hasPoolView", label: "Pool View" },
    { key: "hasGardenView", label: "Garden View" },
    { key: "hasMountainView", label: "Mountain View" },
    { key: "hasCityView", label: "City View" },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-4">
      <p className="text-[12px] font-bold uppercase tracking-wider text-[#145C4B]">
        Pricing, Status &amp; Views
      </p>

      {/* Pricing USD & Status Toggles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-[12px] font-medium text-[#202326]">
            Nightly Rate (USD) *
          </label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[13px] text-[#65706B]">
              $
            </span>
            <input
              type="number"
              min={0}
              step={1}
              required
              value={formData.priceUSD}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  priceUSD: Number(e.target.value),
                }))
              }
              placeholder="e.g. 150"
              className="w-full rounded-xl border border-[#DCE2DE] bg-white pl-8 pr-3.5 py-2 text-[13px] text-[#202326] focus:border-[#145C4B] focus:outline-none"
            />
          </div>
          <span className="mt-1 block text-[10px] text-[#65706B]">
            Auto-converts to EUR, GBP, and EGP.
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  isAvailable: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-gray-300 text-[#145C4B] focus:ring-[#145C4B]"
            />
            <span className="text-[13px] font-medium text-[#202326]">
              Available for Rent
            </span>
          </label>
          <span className="ml-6 block text-[11px] text-[#65706B]">
            Uncheck to mark as fully booked / inactive.
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  isFeatured: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-gray-300 text-[#145C4B] focus:ring-[#145C4B]"
            />
            <span className="text-[13px] font-medium text-[#202326]">
              Featured Listing
            </span>
          </label>
          <span className="ml-6 block text-[11px] text-[#65706B]">
            Promote on homepage showcase.
          </span>
        </div>
      </div>

      {/* Views Options */}
      <div>
        <label className="block text-[12px] font-medium text-[#202326]">
          Property Views
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {viewsList.map((view) => (
            <label
              key={view.key}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 transition-colors ${
                formData[view.key]
                  ? "border-[#145C4B] bg-[#145C4B]/5 text-[#145C4B]"
                  : "border-[#DCE2DE] bg-white text-[#202326] hover:bg-neutral-50"
              }`}
            >
              <input
                type="checkbox"
                checked={formData[view.key]}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    [view.key]: e.target.checked,
                  }))
                }
                className="h-3.5 w-3.5 rounded border-gray-300 text-[#145C4B] focus:ring-[#145C4B]"
              />
              <span className="text-[12px] font-medium">{view.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Host / Arrival Notes */}
      <div>
        <label className="block text-[12px] font-medium text-[#202326]">
          Arrival &amp; Host Notes
        </label>
        <textarea
          rows={2}
          value={formData.notes}
          onChange={(e) =>
            onChange((prev) => ({ ...prev, notes: e.target.value }))
          }
          placeholder="e.g. Check-in after 2:00 PM, quiet hours after 10:00 PM..."
          className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#145C4B] focus:outline-none"
        />
      </div>
    </div>
  );
}

