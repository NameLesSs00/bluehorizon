"use client";

import { useQuery } from "@tanstack/react-query";
import { FiCheckSquare, FiSquare, FiStar, FiImage } from "react-icons/fi";
import { getServices } from "@/clientApi/servicesApi";

interface StandaloneUnitServicesFieldsProps {
  selectedServiceIds: number[];
  onChangeServices: (ids: number[]) => void;
  isFeatured: boolean;
  setIsFeatured: (val: boolean) => void;
  isEditing: boolean;
  onFilesSelected?: (files: File[]) => void;
}

export default function StandaloneUnitServicesFields({
  selectedServiceIds,
  onChangeServices,
  isFeatured,
  setIsFeatured,
  isEditing,
  onFilesSelected,
}: StandaloneUnitServicesFieldsProps) {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services", "en"],
    queryFn: () => getServices("en"),
    staleTime: 1000 * 60 * 10,
  });

  function toggleService(id: number) {
    if (selectedServiceIds.includes(id)) {
      onChangeServices(selectedServiceIds.filter((item) => item !== id));
    } else {
      onChangeServices([...selectedServiceIds, id]);
    }
  }

  return (
    <div className="space-y-5">
      {/* Featured Property Toggle */}
      <div className="flex items-center justify-between rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-4">
        <div>
          <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#202326]">
            <FiStar className="h-4 w-4 text-amber-500" />
            <span>Feature on Homepage &amp; Highlights</span>
          </span>
          <p className="mt-0.5 text-[12px] text-[#65706B]">
            Promote this standalone unit on hero showcases and featured property ribbons.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFeatured(!isFeatured)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isFeatured ? "bg-[#0F473A]" : "bg-neutral-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isFeatured ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Initial Photos Selection (When Creating) */}
      {!isEditing && onFilesSelected && (
        <div className="rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-4">
          <label className="flex items-center gap-2 text-[12px] font-bold text-[#202326]">
            <FiImage className="h-4 w-4 text-[#145C4B]" />
            <span>Initial Property Gallery Images (Optional)</span>
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files ? Array.from(e.target.files) : [];
              onFilesSelected(files);
            }}
            className="mt-2 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#0F473A] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#145C4B]"
          />
        </div>
      )}

      {/* Amenities & Services */}
      <div className="space-y-3 rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-5">
        <div className="flex items-center justify-between">
          <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#145C4B]">
            Included Services &amp; Amenities ({selectedServiceIds.length})
          </h4>
          <span className="text-[11px] text-[#65706B]">
            Select all available features
          </span>
        </div>

        {isLoading ? (
          <div className="flex h-20 items-center justify-center">
            <span className="text-[12px] text-[#65706B]">Loading services...</span>
          </div>
        ) : services.length === 0 ? (
          <p className="text-[12px] text-[#65706B]">No services registered yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {services.map((srv) => {
              const isChecked = selectedServiceIds.includes(srv.id);
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => toggleService(srv.id)}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-[12px] transition-colors ${
                    isChecked
                      ? "border-[#145C4B] bg-[#E8F1EC] text-[#0F473A] font-semibold"
                      : "border-[#DCE2DE] bg-white text-[#202326] hover:bg-[#F3F5F3]"
                  }`}
                >
                  {isChecked ? (
                    <FiCheckSquare className="h-4 w-4 shrink-0 text-[#145C4B]" />
                  ) : (
                    <FiSquare className="h-4 w-4 shrink-0 text-[#9BA5A0]" />
                  )}
                  <span className="truncate">{srv.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

