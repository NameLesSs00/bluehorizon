"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

export interface FilterChipOption {
  id: number;
  name: string;
  icon?: string | null;
}

interface ServicePillsFilterProps {
  label: string;
  options: FilterChipOption[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onClear: () => void;
}

export default function ServicePillsFilter({
  label,
  options,
  selectedIds,
  onToggle,
  onClear,
}: ServicePillsFilterProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return options;
    return options.filter((o) => o.name.toLowerCase().includes(trimmed));
  }, [options, query]);

  if (options.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span
          className="block text-xs font-semibold text-[#202326]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {label}
          {selectedIds.length > 0 && (
            <span className="ms-1.5 rounded-full bg-[#2B5FA6]/10 px-2 py-0.5 text-[10px] font-bold text-[#2B5FA6]">
              {selectedIds.length}
            </span>
          )}
        </span>
        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] font-semibold text-[#2B5FA6] hover:underline"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("common.filters.clear", "Clear")}
          </button>
        )}
      </div>

      <div className="mt-2 overflow-hidden rounded-[12px] border border-[#D9E2EE] bg-[#F8FAFD]">
        {options.length > 10 && (
          <div className="relative border-b border-[#E2E8F3] bg-white px-2.5 py-2">
            <FiSearch className="pointer-events-none absolute top-1/2 start-4 h-3.5 w-3.5 -translate-y-1/2 text-[#9BA5A0]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`${label}...`}
              className="w-full rounded-lg border border-[#E2E8F3] bg-[#F8FAFD] py-1.5 ps-7 pe-2.5 text-[11.5px] text-[#202326] placeholder:text-[#9BA5A0] outline-none focus:border-[#2B5FA6] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>
        )}

        <div
          data-lenis-prevent
          className="max-h-52 space-y-1 overflow-y-auto overscroll-contain p-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C5D3E8]"
        >
          {filteredOptions.map((item) => {
            const checked = selectedIds.includes(item.id);
            return (
              <label
                key={item.id}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-2.5 py-1.5 text-[12px] transition-all ${
                  checked
                    ? "border-[#2B5FA6]/30 bg-white font-semibold text-[#1B3A6B] shadow-2xs"
                    : "border-transparent text-[#202326] hover:bg-white/80"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(item.id)}
                  className="h-3.5 w-3.5 shrink-0 rounded border-[#C5D3E8] accent-[#2B5FA6] focus:ring-[#2B5FA6]"
                />
                {item.icon && (
                  <DynamicIcon
                    name={item.icon}
                    className={`h-3.5 w-3.5 shrink-0 ${
                      checked ? "text-[#2B5FA6]" : "text-[#6B7570]"
                    }`}
                  />
                )}
                <span className="truncate">{item.name}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
