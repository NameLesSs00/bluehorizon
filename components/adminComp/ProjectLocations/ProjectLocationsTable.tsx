"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiEdit2, FiFilm, FiImage, FiMapPin, FiTrash2 } from "react-icons/fi";
import { ProjectLocationItem } from "@/models/projectLocation";
import { getFullLocationMediaUrl } from "@/clientApi/projectLocationsApi";
import { useDeleteProjectLocationMutation } from "@/features/projectLocations/useProjectLocationsQueries";

interface ProjectLocationsTableProps {
  locations: ProjectLocationItem[];
  isLoading: boolean;
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
  onEdit: (location: ProjectLocationItem) => void;
  onManageMedia: (location: ProjectLocationItem) => void;
}

export default function ProjectLocationsTable({
  locations,
  isLoading,
  pageNumber,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onEdit,
  onManageMedia,
}: ProjectLocationsTableProps) {
  const deleteMutation = useDeleteProjectLocationMutation();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

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
          <p className="text-[13px] text-[#65706B]">Loading project locations...</p>
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
                Location
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Description
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Media Status
              </th>
              <th className="px-6 py-4 text-right text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F3]">
            {locations.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center text-[14px] text-[#65706B]">
                  No project locations found. Add your first location to get started.
                </td>
              </tr>
            ) : (
              locations.map((loc) => {
                const primaryImage =
                  loc.images?.find((img) => img.isPrimary) || loc.images?.[0];
                const imageCount = loc.images?.length || 0;
                const hasVideo = Boolean(loc.videoUrl);

                return (
                  <tr key={loc.id} className="transition-colors hover:bg-[#F0F3FA]/50">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-[#D0D9EA] bg-neutral-100">
                          {primaryImage?.imageUrl ? (
                            <Image
                              src={getFullLocationMediaUrl(primaryImage.imageUrl)}
                              alt={loc.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#1B3A6B]/10 text-[#1B3A6B]">
                              <FiMapPin className="h-5 w-5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="text-[15px] font-semibold text-[#202326]">
                            {loc.name}
                          </p>
                          <span className="text-[11px] text-[#65706B]">
                            Projects & Units Destination
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 max-w-md">
                      <p className="line-clamp-2 text-[13px] leading-relaxed text-[#65706B]">
                        {loc.description || "No description provided."}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#F9F7F4] border border-[#E2E8F3] px-2.5 py-1 text-[11px] font-medium text-[#202326]">
                          <FiImage className="h-3.5 w-3.5 text-[#2B5FA6]" />
                          <span>{imageCount} Photo{imageCount !== 1 ? "s" : ""}</span>
                        </span>

                        {hasVideo ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 px-2.5 py-1 text-[11px] font-medium text-[#1B3A6B]">
                            <FiFilm className="h-3.5 w-3.5" />
                            <span>Video</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-[10px] text-[#9BA5A0]">
                            No video
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-right">
                      {confirmDeleteId === loc.id ? (
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            disabled={deleteMutation.isPending}
                            onClick={() => handleConfirmDelete(loc.id)}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            {deleteMutation.isPending ? "Deleting..." : "Confirm"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-lg border border-[#D0D9EA] px-2.5 py-1.5 text-[12px] font-medium text-[#65706B] hover:bg-[#F0F3FA]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onManageMedia(loc)}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#2B5FA6] transition-colors hover:bg-[#F9F7F4]"
                          >
                            <FiImage className="h-3.5 w-3.5" />
                            <span>Media</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onEdit(loc)}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA]"
                          >
                            <FiEdit2 className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(loc.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-[12px] font-medium text-red-600 transition-colors hover:bg-red-50"
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

