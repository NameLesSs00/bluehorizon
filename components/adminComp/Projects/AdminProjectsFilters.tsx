"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";
import { FacilityItem } from "@/models/facility";
import { ProjectLocationItem } from "@/models/projectLocation";
import { PROJECT_TIER_OPTIONS, ProjectTierType } from "@/models/project";

interface AdminProjectsFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedLocationId: number | undefined;
  onLocationChange: (val: number | undefined) => void;
  selectedFacilityIds: number[];
  onToggleFacility: (id: number) => void;
  onClearFacilities: () => void;
  selectedProjectType: ProjectTierType | undefined;
  onProjectTypeChange: (val: ProjectTierType | undefined) => void;
  isFeatureFilter: boolean | undefined;
  onToggleFeature: () => void;
  isHotOfferFilter: boolean | undefined;
  onToggleHotOffer: () => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
  locations: ProjectLocationItem[];
  facilities: FacilityItem[];
}

export default function AdminProjectsFilters({
  searchTerm,
  onSearchChange,
  selectedLocationId,
  onLocationChange,
  selectedFacilityIds,
  onToggleFacility,
  onClearFacilities,
  selectedProjectType,
  onProjectTypeChange,
  isFeatureFilter,
  onToggleFeature,
  isHotOfferFilter,
  onToggleHotOffer,
  hasActiveFilters,
  onClearAll,
  locations,
  facilities,
}: AdminProjectsFiltersProps) {
  const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsFacilitiesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const facilityButtonLabel =
    selectedFacilityIds.length === 0
      ? "All Facilities"
      : selectedFacilityIds.length === 1
      ? facilities.find((f) => f.id === selectedFacilityIds[0])?.name || "1 Facility"
      : `${selectedFacilityIds.length} Facilities`;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E2E8F3] bg-white p-4 shadow-xs">
      {/* Search */}
      <div className="relative min-w-[220px] flex-1 sm:flex-initial">
        <FiSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9BA5A0]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border border-[#D0D9EA] bg-white py-2 pr-3 pl-9 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#1B3A6B] focus:outline-none"
        />
      </div>

      {/* Location Filter */}
      <select
        value={selectedLocationId ?? ""}
        onChange={(e) =>
          onLocationChange(e.target.value ? parseInt(e.target.value, 10) : undefined)
        }
        className="rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
      >
        <option value="">All Locations</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      {/* Facilities Checklist Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsFacilitiesOpen((prev) => !prev)}
          className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] transition-colors ${
            selectedFacilityIds.length > 0
              ? "border-[#1B3A6B] bg-[#1B3A6B]/5 font-medium text-[#1B3A6B]"
              : "border-[#D0D9EA] bg-white text-[#202326] hover:bg-[#F0F3FA]"
          }`}
        >
          <span>{facilityButtonLabel}</span>
          <FiChevronDown
            className={`h-4 w-4 transition-transform ${isFacilitiesOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isFacilitiesOpen && (
          <div className="absolute left-0 z-30 mt-2 w-64 rounded-xl border border-[#D0D9EA] bg-white p-2 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#E2E8F3] px-2 pb-1.5 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#65706B]">
                Select Facilities
              </span>
              {selectedFacilityIds.length > 0 && (
                <button
                  type="button"
                  onClick={onClearFacilities}
                  className="text-[11px] font-semibold text-[#2B5FA6] hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
              {facilities.length === 0 ? (
                <p className="px-2 py-2 text-[12px] text-[#65706B]">No facilities found</p>
              ) : (
                facilities.map((fac) => {
                  const checked = selectedFacilityIds.includes(fac.id);
                  return (
                    <label
                      key={fac.id}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12px] transition-colors ${
                        checked ? "bg-[#F0F3FA] font-medium text-[#1B3A6B]" : "text-[#202326] hover:bg-[#F9F7F4]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleFacility(fac.id)}
                        className="h-3.5 w-3.5 rounded border-[#D0D9EA] text-[#1B3A6B] focus:ring-[#1B3A6B]"
                      />
                      <DynamicIcon name={fac.icon} className="h-3.5 w-3.5 shrink-0 text-[#2B5FA6]" />
                      <span className="truncate">{fac.name}</span>
                    </label>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Project Type Tier Filter */}
      <select
        value={selectedProjectType ?? ""}
        onChange={(e) =>
          onProjectTypeChange((e.target.value || undefined) as ProjectTierType | undefined)
        }
        className="rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
      >
        <option value="">All Project Types</option>
        {PROJECT_TIER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Featured Filter */}
      <button
        type="button"
        onClick={onToggleFeature}
        className={`rounded-xl border px-3.5 py-2 text-[12px] font-medium transition-colors ${
          isFeatureFilter === true
            ? "border-[#2B5FA6] bg-[#2B5FA6] text-white"
            : "border-[#D0D9EA] bg-white text-[#202326] hover:bg-[#F0F3FA]"
        }`}
      >
        Featured Only
      </button>

      {/* Hot Offer Filter */}
      <button
        type="button"
        onClick={onToggleHotOffer}
        className={`rounded-xl border px-3.5 py-2 text-[12px] font-medium transition-colors ${
          isHotOfferFilter === true
            ? "border-[#B8963E] bg-[#B8963E] text-white"
            : "border-[#D0D9EA] bg-white text-[#202326] hover:bg-[#F0F3FA]"
        }`}
      >
        Hot Offers Only
      </button>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-1 rounded-xl border border-[#D0D9EA] bg-[#F9F7F4] px-3 py-2 text-[12px] font-medium text-[#65706B] transition-colors hover:bg-[#F0F3FA] hover:text-[#202326]"
        >
          <FiX className="h-3.5 w-3.5" />
          <span>Clear</span>
        </button>
      )}
    </div>
  );
}
