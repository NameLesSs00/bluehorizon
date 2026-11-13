"use client";

import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import {
  ICON_REGISTRY,
  IconCategory,
  RegisteredIcon,
  resolveIcon,
} from "@/shared/utils/iconRegistry";
import IconPickerItemCard from "./IconPickerItemCard";

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
        activeCategory === "all" ||
        (item.categories
          ? item.categories.includes(activeCategory)
          : item.category === activeCategory);
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
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#D0D9EA] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F3] px-6 py-4.5 bg-[#F9F7F4]">
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
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D0D9EA] bg-white text-[#65706B] transition-colors hover:bg-neutral-100 hover:text-[#202326]"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="border-b border-[#E2E8F3] p-5 space-y-3 bg-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Filter Pills */}
            <div className="inline-flex rounded-xl border border-[#D0D9EA] bg-[#F9F7F4] p-1">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`rounded-lg px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                  activeCategory === "all"
                    ? "bg-[#2B5FA6] text-white shadow-xs"
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
                    ? "bg-[#2B5FA6] text-white shadow-xs"
                    : "text-[#65706B] hover:text-[#202326]"
                }`}
              >
                Project Types
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("facility")}
                className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
                  activeCategory === "facility"
                    ? "bg-[#2B5FA6] text-white shadow-xs"
                    : "text-[#65706B] hover:text-[#202326]"
                }`}
              >
                Project Facilities
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("service")}
                className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
                  activeCategory === "service"
                    ? "bg-[#2B5FA6] text-white shadow-xs"
                    : "text-[#65706B] hover:text-[#202326]"
                }`}
              >
                Property Services
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("rentalAmenity")}
                className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
                  activeCategory === "rentalAmenity"
                    ? "bg-[#2B5FA6] text-white shadow-xs"
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
                className="w-full rounded-xl border border-[#D0D9EA] bg-white py-2 pl-9 pr-8 text-[13px] text-[#202326] outline-none transition-all placeholder:text-[#65706B] focus:border-[#2B5FA6] focus:ring-2 focus:ring-[#2B5FA6]/15"
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
              {filteredIcons.map((item) => (
                <IconPickerItemCard
                  key={item.name}
                  item={item}
                  isSelected={tempSelection.toLowerCase() === item.name.toLowerCase()}
                  onSelect={setTempSelection}
                  onDoubleClick={handleSelectAndApply}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer with Active Selection & Actions */}
        <div className="flex flex-col gap-3 border-t border-[#E2E8F3] bg-[#F9F7F4] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D0D9EA] bg-white text-[#2B5FA6]">
              {ActiveIconPreview ? (
                <ActiveIconPreview className="h-6 w-6" />
              ) : (
                <span className="text-[11px] text-[#65706B]">None</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#2B5FA6]">
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
              className="rounded-xl border border-[#D0D9EA] bg-white px-4 py-2 text-[13px] font-medium text-[#202326] transition-colors hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!tempSelection}
              className="rounded-xl bg-[#2B5FA6] px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#1B3A6B] disabled:opacity-50"
            >
              Apply Icon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

