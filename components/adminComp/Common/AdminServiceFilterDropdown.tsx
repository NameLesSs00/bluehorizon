"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

export interface AdminServiceOption {
  id: number;
  name: string;
  icon?: string | null;
}

interface AdminServiceFilterDropdownProps {
  label?: string;
  options: AdminServiceOption[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onClear: () => void;
}

export default function AdminServiceFilterDropdown({
  label = "Services",
  options,
  selectedIds,
  onToggle,
  onClear,
}: AdminServiceFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buttonLabel =
    selectedIds.length === 0
      ? `All ${label}`
      : selectedIds.length === 1
      ? options.find((o) => o.id === selectedIds[0])?.name || `1 Selected`
      : `${selectedIds.length} ${label}`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] transition-colors ${
          selectedIds.length > 0
            ? "border-[#1B3A6B] bg-[#1B3A6B]/5 font-medium text-[#1B3A6B]"
            : "border-[#D0D9EA] bg-white text-[#202326] hover:bg-[#F0F3FA]"
        }`}
      >
        <span>{buttonLabel}</span>
        <FiChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-30 mt-2 w-64 rounded-xl border border-[#D0D9EA] bg-white p-2 shadow-lg">
          <div className="mb-1.5 flex items-center justify-between border-b border-[#E2E8F3] px-2 pb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#65706B]">
              Select {label}
            </span>
            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="text-[11px] font-semibold text-[#2B5FA6] hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          <div data-lenis-prevent className="max-h-56 space-y-1 overflow-y-auto overscroll-contain pr-1">
            {options.length === 0 ? (
              <p className="px-2 py-2 text-[12px] text-[#65706B]">No items found</p>
            ) : (
              options.map((opt) => {
                const checked = selectedIds.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12px] transition-colors ${
                      checked
                        ? "bg-[#F0F3FA] font-medium text-[#1B3A6B]"
                        : "text-[#202326] hover:bg-[#F9F7F4]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(opt.id)}
                      className="h-3.5 w-3.5 rounded border-[#D0D9EA] text-[#1B3A6B] focus:ring-[#1B3A6B]"
                    />
                    {opt.icon && (
                      <DynamicIcon
                        name={opt.icon}
                        className="h-3.5 w-3.5 shrink-0 text-[#2B5FA6]"
                      />
                    )}
                    <span className="truncate">{opt.name}</span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
