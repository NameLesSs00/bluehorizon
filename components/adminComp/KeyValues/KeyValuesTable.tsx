"use client";

import { useState } from "react";
import { FiEdit2, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { KeyValueItem } from "@/models/keyValue";
import { useDeleteKeyValueMutation } from "@/features/keyValues/useKeyValuesQueries";

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
  const deleteMutation = useDeleteKeyValueMutation();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  function handleConfirmDelete(id: number) {
    deleteMutation.mutate(id, {
      onSettled: () => setConfirmDeleteId(null),
    });
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-[#E6EAE7] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#0F473A] border-t-transparent" />
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
    <div className="overflow-hidden rounded-2xl border border-[#E6EAE7] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E6EAE7] bg-[#FAF8F5]">
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
                className="w-40 px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6EAE7]">
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
                    className="transition-colors hover:bg-[#F3F5F3]/50"
                  >
                    <td className="px-6 py-4">
                      <span
                        className="rounded-lg bg-[#FAF8F5] border border-[#E6EAE7] px-3 py-1 text-[13px] font-semibold text-[#202326]"
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
                          className="inline-flex items-center gap-1.5 text-[13px] text-[#145C4B] hover:underline"
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
                      {confirmDeleteId === item.id ? (
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            disabled={deleteMutation.isPending}
                            onClick={() => handleConfirmDelete(item.id)}
                            className="rounded-lg bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-lg border border-[#DCE2DE] px-2 py-1 text-[11px] font-medium text-[#65706B] hover:bg-[#F3F5F3]"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onEdit(item)}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] px-2.5 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#FAF8F5]"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            <FiEdit2 className="h-3.5 w-3.5 text-[#145C4B]" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(item.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-[12px] font-medium text-red-600 transition-colors hover:bg-red-50"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            <FiTrash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
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

