"use client";

import { PROPERTY_TYPE_LABELS, PropertyType } from "@/models/resale";
import { PrimaryUnitFormPayload } from "@/models/primaryUnit";
import { useProjectsQuery } from "@/features/projects/useProjectsQueries";

interface PrimaryUnitBasicFieldsProps {
  formData: PrimaryUnitFormPayload;
  onChange: (
    updater: (prev: PrimaryUnitFormPayload) => PrimaryUnitFormPayload
  ) => void;
}

export default function PrimaryUnitBasicFields({
  formData,
  onChange,
}: PrimaryUnitBasicFieldsProps) {
  const { data: projectsData, isLoading: isLoadingProjects } = useProjectsQuery({
    Language: "en",
    PageSize: 100,
  });

  const projects = projectsData?.items || [];

  return (
    <div className="space-y-4">
      <h3 className="border-b border-[#E6EAE7] pb-2 text-[14px] font-bold text-[#145C4B]">
        Unit Association &amp; Specifications
      </h3>

      {/* Associated Project */}
      <div>
        <label className="block text-[12px] font-semibold text-[#202326]">
          Associated Project / Compound *
        </label>
        <select
          required
          value={formData.projectId || ""}
          onChange={(e) =>
            onChange((prev) => ({
              ...prev,
              projectId: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
          className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#145C4B] focus:outline-none"
        >
          <option value="">
            {isLoadingProjects ? "Loading projects..." : "Select Project (Compound)"}
          </option>
          {projects.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.name} {proj.locationName ? `(${proj.locationName})` : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-[12px] font-semibold text-[#202326]">
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
          className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#145C4B] focus:outline-none"
        >
          {Object.entries(PROPERTY_TYPE_LABELS).map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Specs Grid: Beds, Baths, Kitchens */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#5A6561]">
            Bedrooms
          </label>
          <input
            type="number"
            min={0}
            value={formData.noBedRoom}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                noBedRoom: Math.max(0, parseInt(e.target.value) || 0),
              }))
            }
            className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#145C4B] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#5A6561]">
            Bathrooms
          </label>
          <input
            type="number"
            min={0}
            value={formData.noBathRoom}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                noBathRoom: Math.max(0, parseInt(e.target.value) || 0),
              }))
            }
            className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#145C4B] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#5A6561]">
            Kitchens
          </label>
          <input
            type="number"
            min={0}
            value={formData.noKitchen}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                noKitchen: Math.max(0, parseInt(e.target.value) || 0),
              }))
            }
            className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#145C4B] focus:outline-none"
          />
        </div>
      </div>

      {/* Floor Number & Area */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#5A6561]">
            Floor Number
          </label>
          <input
            type="number"
            value={formData.floorNumber}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                floorNumber: parseInt(e.target.value) || 0,
              }))
            }
            className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#145C4B] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#5A6561]">
            Area (m²) *
          </label>
          <input
            type="number"
            min={1}
            value={formData.area}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                area: Math.max(0, parseFloat(e.target.value) || 0),
              }))
            }
            className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#145C4B] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

