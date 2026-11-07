"use client";

import { useEffect, useMemo, useState } from "react";
import { FiCheck, FiSearch, FiX } from "react-icons/fi";
import {
  ICON_REGISTRY,
  IconCategory,
  RegisteredIcon,
  resolveIcon,
} from "@/shared/utils/iconRegistry";

interface IconPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIcon: string;
  onSelect: (iconName: string) => void;
  defaultCategory?: IconCategory;
  title?: string;
}

export default function IconPickerModal({
  isOpen,
  onClose,
  selectedIcon,
  onSelect,
  defaultCategory,
  title = "Choose Icon",
}: IconPickerModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<IconCategory | "all">(
    defaultCategory || "all"
  );
  const [tempSelection, setTempSelection] = useState<string>(selectedIcon);

  useEffect(() => {
    if (isOpen) {
      setTempSelection(selectedIcon);
      setSearchTerm("");
      if (defaultCategory) setActiveCategory(defaultCategory);
    }
  }, [isOpen, selectedIcon, defaultCategory]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredIcons = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return ICON_REGISTRY.filter((item: RegisteredIcon) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.label.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchTerm, activeCategory]);

  if (!isOpen) return null;

  const ActiveIconPreview = resolveIcon(tempSelection);

  function handleApply() {
    onSelect(tempSelection);
    onClose();
  }

  function handleSelectAndApply(iconName: string) {
    setTempSelection(iconName);
    onSelect(iconName);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#DCE2DE] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E6EAE7] px-6 py-4.5 bg-[#FAF8F5]">
          <div>
            <h3
              className="text-[18px] font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {title}
            </h3>
            <p className="text-[12px] text-[#65706B]">
              Browse real estate and facility icons with instant live preview.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE2DE] bg-white text-[#65706B] transition-colors hover:bg-neutral-100 hover:text-[#202326]"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="border-b border-[#E6EAE7] p-5 space-y-3 bg-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Filter Pills */}
            <div className="inline-flex rounded-xl border border-[#DCE2DE] bg-[#FAF8F5] p-1">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`rounded-lg px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                  activeCategory === "all"
                    ? "bg-[#145C4B] text-white shadow-xs"
                    : "text-[#65706B] hover:text-[#202326]"
                }`}
              >
                All Icons ({ICON_REGISTRY.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("projectType")}
                className={`rounded-lg px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                  activeCategory === "projectType"
                    ? "bg-[#145C4B] text-white shadow-xs"
                    : "text-[#65706B] hover:text-[#202326]"
                }`}
              >
                Project Types
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("facility")}
                className={`rounded-lg px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                  activeCategory === "facility"
                    ? "bg-[#145C4B] text-white shadow-xs"
                    : "text-[#65706B] hover:text-[#202326]"
                }`}
              >
                Facilities
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("rentalAmenity")}
                className={`rounded-lg px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                  activeCategory === "rentalAmenity"
                    ? "bg-[#145C4B] text-white shadow-xs"
                    : "text-[#65706B] hover:text-[#202326]"
                }`}
              >
                Rental Amenities
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-xs">
              <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-[#65706B]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by villa, pool, gym, etc..."
                className="w-full rounded-xl border border-[#DCE2DE] bg-white py-2 pl-9 pr-8 text-[13px] text-[#202326] outline-none transition-all placeholder:text-[#65706B] focus:border-[#145C4B] focus:ring-2 focus:ring-[#145C4B]/15"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <FiX className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Spacious Icon Grid */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[50vh]">
          {filteredIcons.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
              <p className="text-[14px] font-semibold text-[#202326]">
                No matching icons found
              </p>
              <p className="text-[12px] text-[#65706B]">
                Try searching for general keywords like "villa", "pool", "beach", "gym" or "security".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredIcons.map((item) => {
                const IconComponent = item.icon;
                const isSelected =
                  tempSelection.toLowerCase() === item.name.toLowerCase();

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setTempSelection(item.name)}
                    onDoubleClick={() => handleSelectAndApply(item.name)}
                    className={`group relative flex flex-col items-center justify-center gap-2.5 rounded-2xl border p-4 text-center transition-all ${
                      isSelected
                        ? "border-[#145C4B] bg-[#145C4B]/10 text-[#145C4B] ring-2 ring-[#145C4B]/20"
                        : "border-[#E6EAE7] bg-[#FAF8F5]/60 text-[#202326] hover:border-[#145C4B]/40 hover:bg-white hover:shadow-xs"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${
                        isSelected
                          ? "bg-[#145C4B] text-white"
                          : "bg-white text-[#145C4B] shadow-2xs border border-[#E6EAE7]"
                      }`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>

                    <div className="w-full">
                      <p className="truncate text-[12px] font-semibold text-[#202326]">
                        {item.label}
                      </p>
                      <p className="truncate text-[10px] text-[#65706B]">
                        {item.name}
                      </p>
                    </div>

                    {isSelected && (
                      <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#145C4B] text-[9px] text-white">
                        <FiCheck />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer with Active Selection & Actions */}
        <div className="flex flex-col gap-3 border-t border-[#E6EAE7] bg-[#FAF8F5] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#DCE2DE] bg-white text-[#145C4B]">
              {ActiveIconPreview ? (
                <ActiveIconPreview className="h-6 w-6" />
              ) : (
                <span className="text-[11px] text-[#65706B]">None</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#145C4B]">
                Selected Icon
              </p>
              <p className="truncate text-[13px] font-semibold text-[#202326]">
                {tempSelection || "No icon selected"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#DCE2DE] bg-white px-4 py-2 text-[13px] font-medium text-[#202326] transition-colors hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!tempSelection}
              className="rounded-xl bg-[#145C4B] px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#0F473A] disabled:opacity-50"
            >
              Apply Icon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

