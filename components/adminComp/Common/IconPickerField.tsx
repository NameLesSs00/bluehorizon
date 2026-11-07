"use client";

import { useState } from "react";
import { FiCheck, FiFolder, FiX } from "react-icons/fi";
import {
  getIconMetadata,
  IconCategory,
  resolveIcon,
} from "@/shared/utils/iconRegistry";
import DynamicIcon from "./DynamicIcon";
import IconPickerModal from "./IconPickerModal";

interface IconPickerFieldProps {
  value: string;
  onChange: (iconName: string) => void;
  defaultCategory?: IconCategory;
  label?: string;
  required?: boolean;
}

export default function IconPickerField({
  value,
  onChange,
  defaultCategory,
  label = "Select Icon",
  required = false,
}: IconPickerFieldProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedMeta = getIconMetadata(value);
  const SelectedIcon = resolveIcon(value);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          className="text-[13px] font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#65706B] hover:text-red-600 transition-colors"
          >
            <FiX className="h-3 w-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Clean Trigger Card */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#DCE2DE] bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] text-[#145C4B]">
            {SelectedIcon ? (
              <DynamicIcon name={value} className="h-7 w-7" />
            ) : (
              <FiFolder className="h-6 w-6 text-[#65706B]" />
            )}
          </div>

          <div className="min-w-0">
            <p
              className="text-[14px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {selectedMeta?.label || value || "No icon chosen"}
            </p>
            <p className="text-[12px] text-[#65706B]">
              {value
                ? `Stored Identifier: ${value}`
                : "Open library to choose an icon"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCE2DE] bg-[#FAF8F5] px-4 py-2 text-[13px] font-semibold text-[#202326] transition-all hover:border-[#145C4B] hover:bg-white hover:text-[#145C4B] hover:shadow-xs"
        >
          {value ? "Change Icon" : "Choose Icon"}
        </button>
      </div>

      {/* Spacious Fullscreen Popup Modal */}
      <IconPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedIcon={value}
        onSelect={onChange}
        defaultCategory={defaultCategory}
        title={
          defaultCategory === "projectType"
            ? "Choose Project Type Icon"
            : defaultCategory === "facility"
            ? "Choose Project Facility Icon"
            : "Choose Icon"
        }
      />
    </div>
  );
}
