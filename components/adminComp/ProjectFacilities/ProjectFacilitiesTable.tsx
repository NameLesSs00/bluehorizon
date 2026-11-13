"use client";

import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useDeleteFacilityMutation } from "@/features/facilities/useFacilitiesQueries";
import { FacilityItem } from "@/models/facility";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

interface ProjectFacilitiesTableProps {
  facilities: FacilityItem[];
  isLoading: boolean;
  onEdit: (item: FacilityItem) => void;
}

export default function ProjectFacilitiesTable({
  facilities,
  isLoading,
  onEdit,
}: ProjectFacilitiesTableProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const deleteMutation = useDeleteFacilityMutation();

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
            Loading project facilities...
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
              <th className="w-24 px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Icon
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Facility Name (English)
              </th>
              <th className="w-48 px-6 py-4 text-right text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F3]">
            {facilities.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-16 text-center text-[14px] text-[#65706B]"
                >
                  No project facilities found. Click "Add Project Facility" to create one.
                </td>
              </tr>
            ) : (
              facilities.map((item) => (
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
                          title="Delete Facility"
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
    </div>
  );
}

