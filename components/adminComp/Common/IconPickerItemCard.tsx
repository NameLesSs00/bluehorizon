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
        <p className="truncate text-[10px] text-[#65706B]">{item.name}</p>
      </div>

      {isSelected && (
        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#145C4B] text-[9px] text-white">
          <FiCheck />
        </span>
      )}
    </button>
  );
}

