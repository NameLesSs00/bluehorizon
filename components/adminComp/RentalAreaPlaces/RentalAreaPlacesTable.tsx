"use client";

import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiMapPin,
  FiTrash2,
} from "react-icons/fi";
import { useDeleteInfoAreaPlaceMutation } from "@/features/infoAreaPlaces/useInfoAreaPlacesQueries";
import { InfoAreaPlaceItem } from "@/models/infoAreaPlace";

interface RentalAreaPlacesTableProps {
  places: InfoAreaPlaceItem[];
  isLoading: boolean;
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
  onEdit: (item: InfoAreaPlaceItem) => void;
}

export default function RentalAreaPlacesTable({
  places,
  isLoading,
  pageNumber,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onEdit,
}: RentalAreaPlacesTableProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const deleteMutation = useDeleteInfoAreaPlaceMutation();

  function handleConfirmDelete(id: number) {
    deleteMutation.mutate(id, {
      onSettled: () => setConfirmDeleteId(null),
    });
  }

  if (isLoading) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-[#E6EAE7] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F473A] border-t-transparent" />
          <p
            className="text-[13px] text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Loading rental area landmarks...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#E6EAE7] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E6EAE7] bg-[#FAF8F5]">
              <th className="w-20 px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Type
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Landmark / Place Name (English)
              </th>
              <th className="w-48 px-6 py-4 text-right text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6EAE7]">
            {places.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-16 text-center text-[14px] text-[#65706B]"
                >
                  No area places found. Click "Add Area Place" to create one.
                </td>
              </tr>
            ) : (
              places.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-[#F3F5F3]/50"
                >
                  {/* Pin badge */}
                  <td className="px-6 py-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DCE2DE] bg-[#FAF8F5] text-[#145C4B]">
                      <FiMapPin className="h-5 w-5" />
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
                          className="rounded-lg border border-[#DCE2DE] px-2 py-1 text-[11px] font-medium text-[#65706B] hover:bg-[#F3F5F3]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE2DE] bg-white px-3 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:border-[#145C4B] hover:text-[#145C4B]"
                        >
                          <FiEdit2 className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(item.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE2DE] bg-white px-2.5 py-1.5 text-[12px] font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
                          title="Delete Place"
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
        <div className="flex items-center justify-between border-t border-[#E6EAE7] bg-[#FAF8F5] px-6 py-3.5">
          <p className="text-[12px] text-[#65706B]">
            Page <span className="font-semibold text-[#202326]">{pageNumber}</span> of{" "}
            <span className="font-semibold text-[#202326]">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!hasPreviousPage}
              onClick={() => onPageChange(pageNumber - 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] bg-white px-3 py-1 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F3F5F3] disabled:opacity-40"
            >
              <FiChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              disabled={!hasNextPage}
              onClick={() => onPageChange(pageNumber + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] bg-white px-3 py-1 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F3F5F3] disabled:opacity-40"
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

