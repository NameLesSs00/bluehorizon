"use client";

import { FurnitureTypeEnum } from "@/models/project";
import { useProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { useProjectTypesQuery } from "@/features/projectTypes/useProjectTypesQueries";
import { useFacilitiesQuery } from "@/features/facilities/useFacilitiesQueries";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

interface ProjectRelationsFieldsProps {
  locationId: number | null;
  onLocationChange: (id: number | null) => void;
  deliveryDate: string;
  onDeliveryDateChange: (date: string) => void;
  isFurniture: boolean;
  onIsFurnitureChange: (val: boolean) => void;
  furnitureType: FurnitureTypeEnum;
  onFurnitureTypeChange: (val: FurnitureTypeEnum) => void;
  isFeature: boolean;
  onIsFeatureChange: (val: boolean) => void;
  selectedProjectTypeIds: number[];
  onToggleProjectType: (id: number) => void;
  selectedFacilityIds: number[];
  onToggleFacility: (id: number) => void;
}

export default function ProjectRelationsFields({
  locationId,
  onLocationChange,
  deliveryDate,
  onDeliveryDateChange,
  isFurniture,
  onIsFurnitureChange,
  furnitureType,
  onFurnitureTypeChange,
  isFeature,
  onIsFeatureChange,
  selectedProjectTypeIds,
  onToggleProjectType,
  selectedFacilityIds,
  onToggleFacility,
}: ProjectRelationsFieldsProps) {
  const { data: locationsData } = useProjectLocationsQuery({
    Language: "en",
    PageSize: 100,
  });
  const { data: typesData } = useProjectTypesQuery({
    Language: "en",
    PageSize: 100,
  });
  const { data: facilitiesData } = useFacilitiesQuery("en");

  const locations = locationsData?.items || [];
  const projectTypes = typesData?.items || [];
  const facilities = facilitiesData || [];

  return (
    <div className="space-y-6">
      {/* Location & Delivery Date */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[13px] font-bold text-[#202326]">
            Location (Destination)
          </label>
          <select
            value={locationId ?? ""}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value, 10) : null;
              onLocationChange(val);
            }}
            className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
          >
            <option value="">Select a location (Hurghada, El Gouna, etc.)</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-[#202326]">
            Expected Delivery Date
          </label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => onDeliveryDateChange(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
          />
        </div>
      </div>

      {/* Furniture & Featured Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-[13px] font-bold text-[#202326]">
            Furniture Type
          </label>
          <select
            value={furnitureType}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10) as FurnitureTypeEnum;
              onFurnitureTypeChange(val);
              onIsFurnitureChange(val !== FurnitureTypeEnum.None);
            }}
            className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
          >
            <option value={FurnitureTypeEnum.None}>None (Unfurnished)</option>
            <option value={FurnitureTypeEnum.Semi}>Semi-Furnished</option>
            <option value={FurnitureTypeEnum.Fully}>Fully Furnished</option>
          </select>
        </div>

        <div className="flex flex-col justify-end">
          <label className="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-[#DCE2DE] bg-white p-3 hover:bg-[#FAF8F5]">
            <input
              type="checkbox"
              checked={isFurniture}
              onChange={(e) => onIsFurnitureChange(e.target.checked)}
              className="h-4 w-4 rounded text-[#0F473A] focus:ring-[#0F473A]"
            />
            <span className="text-[13px] font-medium text-[#202326]">
              Furniture Included
            </span>
          </label>
        </div>

        <div className="flex flex-col justify-end">
          <label className="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-[#DCE2DE] bg-white p-3 hover:bg-[#FAF8F5]">
            <input
              type="checkbox"
              checked={isFeature}
              onChange={(e) => onIsFeatureChange(e.target.checked)}
              className="h-4 w-4 rounded text-[#0F473A] focus:ring-[#0F473A]"
            />
            <span className="text-[13px] font-semibold text-[#145C4B]">
              Featured Project
            </span>
          </label>
        </div>
      </div>

      {/* Project Types Multi-Select */}
      <div className="space-y-2">
        <label className="block text-[13px] font-bold text-[#202326]">
          Project Types (e.g. Villa, Apartment, Chalet, Duplex)
        </label>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((t) => {
            const isSelected = selectedProjectTypeIds.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onToggleProjectType(t.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-[12px] font-medium transition-all ${
                  isSelected
                    ? "border-[#0F473A] bg-[#0F473A] text-white shadow-xs"
                    : "border-[#DCE2DE] bg-white text-[#202326] hover:bg-[#F3F5F3]"
                }`}
              >
                <DynamicIcon name={t.icon} className="h-3.5 w-3.5 shrink-0" />
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Facilities Multi-Select */}
      <div className="space-y-2">
        <label className="block text-[13px] font-bold text-[#202326]">
          Project Facilities &amp; Amenities
        </label>
        <div className="flex flex-wrap gap-2">
          {facilities.map((fac) => {
            const isSelected = selectedFacilityIds.includes(fac.id);
            return (
              <button
                key={fac.id}
                type="button"
                onClick={() => onToggleFacility(fac.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-[12px] font-medium transition-all ${
                  isSelected
                    ? "border-[#145C4B] bg-[#145C4B] text-white shadow-xs"
                    : "border-[#DCE2DE] bg-white text-[#202326] hover:bg-[#F3F5F3]"
                }`}
              >
                <DynamicIcon name={fac.icon} className="h-3.5 w-3.5 shrink-0" />
                <span>{fac.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
