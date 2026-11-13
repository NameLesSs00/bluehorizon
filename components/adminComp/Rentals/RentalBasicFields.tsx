"use client";

import { useRentalLocationsQuery } from "@/features/rentalLocations/useRentalLocationsQueries";
import {
  PROPERTY_TYPE_LABELS,
  PropertyType,
  RentalFormPayload,
} from "@/models/rental";

interface RentalBasicFieldsProps {
  formData: RentalFormPayload;
  onChange: (
    updater: (prev: RentalFormPayload) => RentalFormPayload
  ) => void;
}

export default function RentalBasicFields({
  formData,
  onChange,
}: RentalBasicFieldsProps) {
  const { data: locationsData } = useRentalLocationsQuery({
    Language: "en",
    PageSize: 100,
  });

  const locations = locationsData?.items || [];

  const propertyTypes = Object.entries(PROPERTY_TYPE_LABELS).map(
    ([val, label]) => ({
      value: Number(val) as PropertyType,
      label,
    })
  );

  return (
    <div className="space-y-4 rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-4">
      <p className="text-[12px] font-bold uppercase tracking-wider text-[#2B5FA6]">
        Basic Specifications
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[12px] font-medium text-[#202326]">
            Property Code *
          </label>
          <input
            type="text"
            required
            value={formData.code}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, code: e.target.value }))
            }
            placeholder="e.g. HRG-RES-702"
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[12px] font-medium text-[#202326]">
            Property Type *
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                propertyType: Number(e.target.value) as PropertyType,
              }))
            }
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
          >
            {propertyTypes.map((pt) => (
              <option key={pt.value} value={pt.value}>
                {pt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[12px] font-medium text-[#202326]">
            Rental Location *
          </label>
          <select
            required
            value={formData.rentalLocationId || ""}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                rentalLocationId: Number(e.target.value),
              }))
            }
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
          >
            <option value="" disabled>
              Select Destination Area
            </option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[12px] font-medium text-[#202326]">
            Floor / Level
          </label>
          <input
            type="text"
            value={formData.floor}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, floor: e.target.value }))
            }
            placeholder="e.g. Ground Floor, 2nd Floor, Penthouse"
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>
      </div>

      {/* Numerical Specs Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <label className="block text-[11px] font-medium text-[#65706B]">
            Bedrooms
          </label>
          <input
            type="number"
            min={0}
            value={formData.bedroomNo}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                bedroomNo: Number(e.target.value),
              }))
            }
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-1.5 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-[#65706B]">
            Bathrooms
          </label>
          <input
            type="number"
            min={0}
            value={formData.bathroomNo}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                bathroomNo: Number(e.target.value),
              }))
            }
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-1.5 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-[#65706B]">
            Guests Capacity
          </label>
          <input
            type="number"
            min={1}
            value={formData.capacity}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                capacity: Number(e.target.value),
              }))
            }
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-1.5 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-[#65706B]">
            Size (sqm)
          </label>
          <input
            type="number"
            min={0}
            value={formData.size}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                size: Number(e.target.value),
              }))
            }
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-1.5 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

