"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PrimaryUnitItem } from "@/models/primaryUnit";
import PrimaryUnitsTableRow from "./PrimaryUnitsTableRow";

interface PrimaryUnitsTableProps {
  units: PrimaryUnitItem[];
  isLoading: boolean;
  activeCurrency: string;
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
  onEdit: (unit: PrimaryUnitItem) => void;
  onManageMedia: (unit: PrimaryUnitItem) => void;
}

export default function PrimaryUnitsTable({
  units,
  isLoading,
  activeCurrency,
  pageNumber,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onEdit,
  onManageMedia,
}: PrimaryUnitsTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-[#E2E8F3] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1B3A6B] border-t-transparent" />
          <p className="text-[13px] text-[#65706B]">Loading primary units...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#E2E8F3] bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E2E8F3] bg-[#F9F7F4]">
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Unit
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Project &amp; Specs
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Price
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Status &amp; Badges
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
                  No primary units found. Add your first primary unit to get started.
                </td>
              </tr>
            ) : (
              units.map((unit) => (
                <PrimaryUnitsTableRow
                  key={unit.id}
                  unit={unit}
                  activeCurrency={activeCurrency}
                  onEdit={onEdit}
                  onManageMedia={onManageMedia}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E2E8F3] bg-[#F9F7F4] px-6 py-4 sm:flex-row">
        <p className="text-[12px] text-[#65706B]">
          Showing page <span className="font-semibold text-[#202326]">{pageNumber}</span> of{" "}
          <span className="font-semibold text-[#202326]">{totalPages}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!hasPreviousPage || isLoading}
            onClick={() => onPageChange(pageNumber - 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-[#D0D9EA] bg-white px-3 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F9F7F4] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            disabled={!hasNextPage || isLoading}
            onClick={() => onPageChange(pageNumber + 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-[#D0D9EA] bg-white px-3 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F9F7F4] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>Next</span>
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

