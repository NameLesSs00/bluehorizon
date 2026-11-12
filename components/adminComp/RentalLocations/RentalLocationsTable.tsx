"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiFilm,
  FiImage,
  FiMapPin,
  FiTrash2,
} from "react-icons/fi";
import { RentalLocationItem } from "@/models/rentalLocation";
import { getFullRentalLocationMediaUrl } from "@/clientApi/rentalLocationsApi";
import { useDeleteRentalLocationMutation } from "@/features/rentalLocations/useRentalLocationsQueries";

interface RentalLocationsTableProps {
  locations: RentalLocationItem[];
  isLoading: boolean;
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
  onEdit: (location: RentalLocationItem) => void;
  onManageMedia: (location: RentalLocationItem) => void;
}

export default function RentalLocationsTable({
  locations,
  isLoading,
  pageNumber,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onEdit,
  onManageMedia,
}: RentalLocationsTableProps) {
  const deleteMutation = useDeleteRentalLocationMutation();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

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
          <p className="text-[13px] text-[#65706B]">Loading rental locations...</p>
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
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Rental Location
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
          <tbody className="divide-y divide-[#E6EAE7]">
            {locations.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-16 text-center text-[14px] text-[#65706B]"
                >
                  No rental locations found. Add your first rental location to
                  get started.
                </td>
              </tr>
            ) : (
              locations.map((loc) => {
                const primaryImage =
                  loc.images?.find((img) => img.isPrimary) || loc.images?.[0];
                const imageCount = loc.images?.length || 0;
                const hasVideo = Boolean(loc.videoUrl);

                return (
                  <tr
                    key={loc.id}
                    className="transition-colors hover:bg-[#F3F5F3]/50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-[#DCE2DE] bg-neutral-100">
                          {primaryImage?.imageUrl ? (
                            <Image
                              src={getFullRentalLocationMediaUrl(
                                primaryImage.imageUrl
                              )}
                              alt={loc.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#0F473A]/10 text-[#0F473A]">
                              <FiMapPin className="h-5 w-5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="text-[15px] font-semibold text-[#202326]">
                            {loc.name}
                          </p>
                          <span className="text-[11px] text-[#65706B]">
                            Rental Destination
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
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#FAF8F5] border border-[#E6EAE7] px-2.5 py-1 text-[11px] font-medium text-[#202326]">
                          <FiImage className="h-3.5 w-3.5 text-[#145C4B]" />
                          <span>
                            {imageCount} Photo{imageCount !== 1 ? "s" : ""}
                          </span>
                        </span>

                        {hasVideo ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/30 px-2.5 py-1 text-[11px] font-medium text-[#0F473A]">
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
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onManageMedia(loc)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE2DE] bg-white px-3 py-1.5 text-[12px] font-medium text-[#145C4B] transition-colors hover:bg-[#FAF8F5]"
                          title="Manage Photos & Video"
                        >
                          <FiImage className="h-3.5 w-3.5" />
                          <span>Media</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onEdit(loc)}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] bg-white p-2 text-[#202326] transition-colors hover:bg-[#FAF8F5]"
                          title="Edit Info"
                        >
                          <FiEdit2 className="h-3.5 w-3.5" />
                        </button>

                        {confirmDeleteId === loc.id ? (
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleConfirmDelete(loc.id)}
                              disabled={deleteMutation.isPending}
                              className="rounded-lg bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-red-700 disabled:opacity-50"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="rounded-lg border border-[#DCE2DE] bg-white px-2 py-1 text-[11px] text-[#65706B] hover:bg-neutral-100"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(loc.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100"
                            title="Delete Rental Location"
                          >
                            <FiTrash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E6EAE7] bg-[#FAF8F5] px-6 py-4 sm:flex-row">
        <p className="text-[12px] text-[#65706B]">
          Showing page <span className="font-semibold text-[#202326]">{pageNumber}</span> of{" "}
          <span className="font-semibold text-[#202326]">{totalPages}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!hasPreviousPage || isLoading}
            onClick={() => onPageChange(pageNumber - 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-[#DCE2DE] bg-white px-3 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#FAF8F5] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            disabled={!hasNextPage || isLoading}
            onClick={() => onPageChange(pageNumber + 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-[#DCE2DE] bg-white px-3 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#FAF8F5] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>Next</span>
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

