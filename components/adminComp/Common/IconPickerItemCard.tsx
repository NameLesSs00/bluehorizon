"use client";

import { FiCheck } from "react-icons/fi";
import { RegisteredIcon } from "@/shared/utils/iconRegistry";

interface IconPickerItemCardProps {
  item: RegisteredIcon;
  isSelected: boolean;
  onSelect: (name: string) => void;
  onDoubleClick: (name: string) => void;
}

export default function IconPickerItemCard({
  item,
  isSelected,
  onSelect,
  onDoubleClick,
}: IconPickerItemCardProps) {
  const IconComponent = item.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(item.name)}
      onDoubleClick={() => onDoubleClick(item.name)}
      className={`group relative flex flex-col items-center justify-center gap-2.5 rounded-2xl border p-4 text-center transition-all ${
        isSelected
          ? "border-[#2B5FA6] bg-[#2B5FA6]/10 text-[#2B5FA6] ring-2 ring-[#2B5FA6]/20"
          : "border-[#E2E8F3] bg-[#F9F7F4]/60 text-[#202326] hover:border-[#2B5FA6]/40 hover:bg-white hover:shadow-xs"
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${
          isSelected
            ? "bg-[#2B5FA6] text-white"
            : "bg-white text-[#2B5FA6] shadow-2xs border border-[#E2E8F3]"
        }`}
      >
        <IconComponent className="h-6 w-6" />
      </div>

      <div className="w-full">
        <p className="truncate text-[12px] font-semibold text-[#202326]">
          {item.label}
        </p>
        <p className="truncate text-[10px] text-[#65706B]">{item.name}</p>
      </div>

      {isSelected && (
        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#2B5FA6] text-[9px] text-white">
          <FiCheck />
        </span>
      )}
    </button>
  );
}

