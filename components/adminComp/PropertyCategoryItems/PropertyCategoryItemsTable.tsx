"use client";

import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { useDeletePropertyCategoryItemMutation } from "@/features/propertyCategoryItems/usePropertyCategoryItemsQueries";
import { PropertyCategoryDetailItem } from "@/models/propertyCategoryItem";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

interface PropertyCategoryItemsTableProps {
  items: PropertyCategoryDetailItem[];
  isLoading: boolean;
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
  onEdit: (item: PropertyCategoryDetailItem) => void;
}

export default function PropertyCategoryItemsTable({
  items,
  isLoading,
  pageNumber,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onEdit,
}: PropertyCategoryItemsTableProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const deleteMutation = useDeletePropertyCategoryItemMutation();

  function handleConfirmDelete(id: number) {
    deleteMutation.mutate(id, {
      onSettled: () => setConfirmDeleteId(null),
    });
  }

  if (isLoading) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-[#E2E8F3] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1B3A6B] border-t-transparent" />
          <p
            className="text-[13px] text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Loading rental category items...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#E2E8F3] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F3] bg-[#F9F7F4]">
              <th className="w-20 px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Icon
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Item Name (English)
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Parent Category
              </th>
              <th className="w-36 px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Display Order
              </th>
              <th className="w-48 px-6 py-4 text-right text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F3]">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-16 text-center text-[14px] text-[#65706B]"
                >
                  No category items found. Click "Add Category Item" to create one.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-[#F0F3FA]/50"
                >
                  {/* Icon badge */}
                  <td className="px-6 py-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D0D9EA] bg-[#F9F7F4] text-[#2B5FA6]">
                      <DynamicIcon name={item.icon} className="h-5 w-5" />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4">
                    <p
                      className="text-[14px] font-semibold text-[#202326]"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {item.name}
                    </p>
                    {item.icon && (
                      <p className="mt-0.5 text-[11px] text-[#65706B]">
                        Icon: {item.icon}
                      </p>
                    )}
                  </td>

                  {/* Parent Category Badge */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-lg bg-[#1B3A6B]/10 px-2.5 py-1 text-[12px] font-semibold text-[#1B3A6B]">
                      {item.propertyCategoryName || "Uncategorized"}
                    </span>
                  </td>

                  {/* Display Order */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-lg border border-[#D0D9EA] bg-[#F9F7F4] px-2.5 py-1 text-[12px] font-semibold text-[#202326]">
                      #{item.displayOrder}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    {confirmDeleteId === item.id ? (
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          disabled={deleteMutation.isPending}
                          onClick={() => handleConfirmDelete(item.id)}
                          className="rounded-lg bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-lg border border-[#D0D9EA] px-2 py-1 text-[11px] font-medium text-[#65706B] hover:bg-[#F0F3FA]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#D0D9EA] bg-white px-3 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:border-[#2B5FA6] hover:text-[#2B5FA6]"
                        >
                          <FiEdit2 className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(item.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#D0D9EA] bg-white px-2.5 py-1.5 text-[12px] font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
                          title="Delete Item"
                        >
                          <FiTrash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[#E2E8F3] bg-[#F9F7F4] px-6 py-3.5">
          <p className="text-[12px] text-[#65706B]">
            Page <span className="font-semibold text-[#202326]">{pageNumber}</span> of{" "}
            <span className="font-semibold text-[#202326]">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!hasPreviousPage}
              onClick={() => onPageChange(pageNumber - 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-3 py-1 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:opacity-40"
            >
              <FiChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              disabled={!hasNextPage}
              onClick={() => onPageChange(pageNumber + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-3 py-1 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:opacity-40"
            >
              <span>Next</span>
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

