"use client";

import { FiCheck, FiDollarSign, FiPlus, FiStar } from "react-icons/fi";
import { ResaleFormPayload } from "@/models/resale";
import { useServicesQuery } from "@/features/services/useServicesQueries";

interface ResalePricingServicesFieldsProps {
  formData: ResaleFormPayload;
  onChange: (
    updater: (prev: ResaleFormPayload) => ResaleFormPayload
  ) => void;
}

export default function ResalePricingServicesFields({
  formData,
  onChange,
}: ResalePricingServicesFieldsProps) {
  const { data: services = [], isLoading: isLoadingServices } =
    useServicesQuery("en");

  const toggleService = (serviceId: number) => {
    onChange((prev) => {
      const exists = prev.serviceIds.includes(serviceId);
      return {
        ...prev,
        serviceIds: exists
          ? prev.serviceIds.filter((id) => id !== serviceId)
          : [...prev.serviceIds, serviceId],
      };
    });
  };

  return (
    <div className="space-y-5">
      <h3 className="border-b border-[#E2E8F3] pb-2 text-[14px] font-bold text-[#2B5FA6]">
        Pricing, Amenities & Services
      </h3>

      {/* Pricing USD */}
      <div>
        <label className="block text-[12px] font-semibold text-[#202326]">
          Base Price (USD) *
        </label>
        <div className="relative mt-1">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#5A6561]">
            <FiDollarSign className="h-4 w-4" />
          </span>
          <input
            type="number"
            min={0}
            step={100}
            required
            value={formData.priceUSD}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                priceUSD: Math.max(0, parseFloat(e.target.value) || 0),
              }))
            }
            placeholder="e.g. 250000"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white py-2.5 pr-3.5 pl-9 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
          />
        </div>
        <p className="mt-1 text-[11px] text-[#5A6561]">
          The backend automatically computes and maintains equivalent prices in EUR, GBP, and EGP.
        </p>
      </div>

      {/* Featured Toggle */}
      <div className="flex items-center justify-between rounded-xl border border-[#E2E8F3] bg-[#F7F9F8] p-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
            <FiStar className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#202326]">
              Featured Property
            </p>
            <p className="text-[11px] text-[#5A6561]">
              Promote this listing at the top of client search and spotlight views
            </p>
          </div>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                isFeatured: e.target.checked,
              }))
            }
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-[#2B5FA6] peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']" />
        </label>
      </div>

      {/* Property Services Multi-select */}
      <div>
        <label className="block text-[12px] font-semibold text-[#202326]">
          Property Services & Amenities ({formData.serviceIds.length} selected)
        </label>
        <p className="mb-2 text-[11px] text-[#5A6561]">
          Select all services and amenities included in this resale property:
        </p>

        {isLoadingServices ? (
          <p className="text-[12px] text-[#5A6561]">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-[12px] text-[#5A6561]">No services found.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {services.map((svc) => {
              const selected = formData.serviceIds.includes(svc.id);
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => toggleService(svc.id)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all ${
                    selected
                      ? "border-[#2B5FA6] bg-[#2B5FA6] text-white shadow-xs"
                      : "border-[#D0D9EA] bg-white text-[#202326] hover:border-[#2B5FA6]/40 hover:bg-[#F7F9F8]"
                  }`}
                >
                  {selected ? (
                    <FiCheck className="h-3 w-3" />
                  ) : (
                    <FiPlus className="h-3 w-3 text-[#5A6561]" />
                  )}
                  <span>{svc.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

