"use client";

import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useDeleteServiceMutation } from "@/features/services/useServicesQueries";
import { PropertyServiceItem } from "@/models/service";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

interface PropertyServicesTableProps {
  services: PropertyServiceItem[];
  isLoading: boolean;
  onEdit: (item: PropertyServiceItem) => void;
}

export default function PropertyServicesTable({
  services,
  isLoading,
  onEdit,
}: PropertyServicesTableProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const deleteMutation = useDeleteServiceMutation();

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
            Loading property services...
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
                Icon
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Service Name (English)
              </th>
              <th className="w-48 px-6 py-4 text-right text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6EAE7]">
            {services.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-16 text-center text-[14px] text-[#65706B]"
                >
                  No property services found. Click "Add Property Service" to create one.
                </td>
              </tr>
            ) : (
              services.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-[#F3F5F3]/50"
                >
                  {/* Icon badge */}
                  <td className="px-6 py-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DCE2DE] bg-[#FAF8F5] text-[#145C4B]">
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
                          title="Delete Service"
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

