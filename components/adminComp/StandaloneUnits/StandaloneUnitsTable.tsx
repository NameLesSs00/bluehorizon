"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { StandaloneUnitItem } from "@/models/standaloneUnit";
import StandaloneUnitsTableRow from "./StandaloneUnitsTableRow";

interface StandaloneUnitsTableProps {
  units: StandaloneUnitItem[];
  isLoading: boolean;
  selectedCurrency: string;
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
  onEdit: (unit: StandaloneUnitItem) => void;
  onManageImages: (unit: StandaloneUnitItem) => void;
}

export default function StandaloneUnitsTable({
  units,
  isLoading,
  selectedCurrency,
  pageNumber,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onEdit,
  onManageImages,
}: StandaloneUnitsTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-[#E2E8F3] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1B3A6B] border-t-transparent" />
          <p className="text-[13px] text-[#65706B]">Loading standalone properties...</p>
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
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Property Details
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Type &amp; Specs
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Price ({selectedCurrency})
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Status &amp; Feature
              </th>
              <th className="px-6 py-4 text-right text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F3]">
            {units.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-16 text-center text-[14px] text-[#65706B]"
                >
                  No standalone properties found. Click &quot;Add Standalone Property&quot; to list one.
                </td>
              </tr>
            ) : (
              units.map((unit) => (
                <StandaloneUnitsTableRow
                  key={unit.id}
                  unit={unit}
                  onEdit={onEdit}
                  onManageImages={onManageImages}
                  selectedCurrency={selectedCurrency}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t border-[#E2E8F3] bg-[#F9F7F4] px-6 py-4">
        <p className="text-[13px] text-[#65706B]">
          Page <span className="font-semibold text-[#202326]">{pageNumber}</span> of{" "}
          <span className="font-semibold text-[#202326]">{Math.max(1, totalPages)}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!hasPreviousPage && pageNumber <= 1}
            onClick={() => onPageChange(Math.max(1, pageNumber - 1))}
            className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <FiChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            disabled={!hasNextPage && pageNumber >= totalPages}
            onClick={() => onPageChange(pageNumber + 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <span>Next</span>
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

