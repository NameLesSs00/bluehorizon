"use client";

import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { RentalFormPayload } from "@/models/rental";

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
  const [newService, setNewService] = useState("");

  const details = formData.listingDetails;

  function handleAddService() {
    const trimmed = newService.trim();
    if (!trimmed) return;
    if (details.services.includes(trimmed)) {
      setNewService("");
      return;
    }
    onChange((prev) => ({
      ...prev,
      listingDetails: {
        ...prev.listingDetails,
        services: [...prev.listingDetails.services, trimmed],
      },
    }));
    setNewService("");
  }

  function handleRemoveService(serviceToRemove: string) {
    onChange((prev) => ({
      ...prev,
      listingDetails: {
        ...prev.listingDetails,
        services: prev.listingDetails.services.filter(
          (s) => s !== serviceToRemove
        ),
      },
    }));
  }

  return (
    <div className="space-y-4 rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-4">
      <p className="text-[12px] font-bold uppercase tracking-wider text-[#2B5FA6]">
        Stay Amenities &amp; Guest Rules
      </p>

      {/* Services Tag Input */}
      <div>
        <label className="block text-[12px] font-medium text-[#202326]">
          Included Hospitality Services
        </label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddService();
              }
            }}
            placeholder="e.g. Daily Housekeeping, High-Speed Wi-Fi, Airport Shuttle"
            className="flex-1 rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddService}
            className="inline-flex items-center gap-1 rounded-xl bg-[#2B5FA6] px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#1B3A6B]"
          >
            <FiPlus className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
        </div>

        {details.services.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {details.services.map((service) => (
              <span
                key={service}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E2E8F3] px-3 py-1 text-[11px] font-medium text-[#202326]"
              >
                <span>{service}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveService(service)}
                  className="text-[#9BA5A0] hover:text-red-500"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[12px] font-medium text-[#202326]">
            Late Check-In Notes
          </label>
          <input
            type="text"
            value={details.lateCheckIn}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                listingDetails: {
                  ...prev.listingDetails,
                  lateCheckIn: e.target.value,
                },
              }))
            }
            placeholder="e.g. Available upon prior request"
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[12px] font-medium text-[#202326]">
            Extra Guest Fee ($)
          </label>
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
            placeholder="e.g. 25"
            className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-medium text-[#202326]">
          Extra Guest Rules
        </label>
        <input
          type="text"
          value={details.extraPeople}
          onChange={(e) =>
            onChange((prev) => ({
              ...prev,
              listingDetails: {
                ...prev.listingDetails,
                extraPeople: e.target.value,
              },
            }))
          }
          placeholder="e.g. Up to 2 additional guests allowed upon prior request"
          className="mt-1 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#2B5FA6] focus:outline-none"
        />
      </div>

      {/* Guest Perks / Checkboxes */}
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

