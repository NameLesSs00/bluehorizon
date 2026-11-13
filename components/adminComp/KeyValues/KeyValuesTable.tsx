"use client";

import { FiEdit2, FiExternalLink } from "react-icons/fi";
import { KeyValueItem } from "@/models/keyValue";

interface KeyValuesTableProps {
  items: KeyValueItem[];
  isLoading: boolean;
  onEdit: (item: KeyValueItem) => void;
}

export default function KeyValuesTable({
  items,
  isLoading,
  onEdit,
}: KeyValuesTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-[#E2E8F3] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#1B3A6B] border-t-transparent" />
          <p
            className="text-[13px] text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Loading site links and key values...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E2E8F3] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F3] bg-[#F9F7F4]">
              <th
                className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Key Name
              </th>
              <th
                className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Value / URL
              </th>
              <th
                className="w-28 px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F3]">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-12 text-center text-[14px] text-[#65706B]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  No site links or key values found. Click "Add New Link" to create one.
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const isUrl =
                  item.value.startsWith("http://") ||
                  item.value.startsWith("https://") ||
                  item.value.startsWith("mailto:") ||
                  item.value.startsWith("tel:");

                return (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-[#F0F3FA]/50"
                  >
                    <td className="px-6 py-4">
                      <span
                        className="rounded-lg bg-[#F9F7F4] border border-[#E2E8F3] px-3 py-1 text-[13px] font-semibold text-[#202326]"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item.key}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {isUrl ? (
                        <a
                          href={item.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[13px] text-[#2B5FA6] hover:underline"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          <span className="max-w-md truncate">{item.value}</span>
                          <FiExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      ) : (
                        <span
                          className="text-[13px] text-[#65706B]"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {item.value}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#D0D9EA] px-3 py-1.5 text-[12px] font-semibold text-[#2B5FA6] transition-colors hover:bg-[#2B5FA6] hover:text-white"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        <FiEdit2 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

