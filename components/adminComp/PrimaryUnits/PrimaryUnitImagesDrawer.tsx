"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiCheck, FiImage, FiPlus, FiTrash2 } from "react-icons/fi";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import { getFullPrimaryUnitMediaUrl } from "@/clientApi/primaryUnitsApi";
import {
  useDeletePrimaryUnitImageMutation,
  usePrimaryUnitImagesQuery,
  useSetPrimaryUnitImageMutation,
  useUploadPrimaryUnitImagesMutation,
} from "@/features/primaryUnits/usePrimaryUnitsQueries";
import { PrimaryUnitItem } from "@/models/primaryUnit";

interface PrimaryUnitImagesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  unit: PrimaryUnitItem | null;
}

export default function PrimaryUnitImagesDrawer({
  isOpen,
  onClose,
  unit,
}: PrimaryUnitImagesDrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const unitId = unit?.id ?? null;

  const { data: images = [], isLoading } = usePrimaryUnitImagesQuery(
    unitId,
    isOpen
  );

  const uploadImagesMutation = useUploadPrimaryUnitImagesMutation();
  const deleteImageMutation = useDeletePrimaryUnitImageMutation();
  const setPrimaryMutation = useSetPrimaryUnitImageMutation();

  if (!unit) return null;

  function handleBatchUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0 && unitId) {
      uploadImagesMutation.mutate(
        { primaryUnitId: unitId, files },
        {
          onSettled: () => {
            if (fileInputRef.current) fileInputRef.current.value = "";
          },
        }
      );
    }
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Primary Unit Photos"
      subtitle={`Photo gallery for ${unit.name} (Code: ${unit.markerId})`}
      maxWidthClass="max-w-3xl"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#202326]">
              Photo Gallery ({images.length})
            </h3>
            <p className="text-[12px] text-[#65706B]">
              Upload high-resolution property renders and floorplans. Set one as primary.
            </p>
          </div>

          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#1B3A6B] px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#2B5FA6]">
            <FiPlus className="h-4 w-4" />
            <span>Add Photos</span>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              disabled={uploadImagesMutation.isPending}
              onChange={handleBatchUpload}
              className="hidden"
            />
          </label>
        </div>

        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#2B5FA6] border-t-transparent" />
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D0D9EA] bg-[#F9F7F4] p-12 text-center">
            <FiImage className="h-10 w-10 text-[#9BA5A0]" />
            <p className="mt-3 text-[14px] font-semibold text-[#202326]">
              No photos uploaded yet
            </p>
            <p className="mt-1 text-[12px] text-[#65706B]">
              Click &quot;Add Photos&quot; above to upload your first image.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#D0D9EA] bg-neutral-100"
              >
                <Image
                  src={getFullPrimaryUnitMediaUrl(img.imageUrl)}
                  alt={`Unit photo ${img.id}`}
                  fill
                  className="object-cover"
                />

                {img.isPrimary && (
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 rounded-md bg-[#1B3A6B] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                    <FiCheck className="h-3 w-3" />
                    <span>Primary</span>
                  </div>
                )}

                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 opacity-0 transition-opacity group-hover:opacity-100">
                  {!img.isPrimary ? (
                    <button
                      type="button"
                      onClick={() => setPrimaryMutation.mutate(img.id)}
                      disabled={setPrimaryMutation.isPending}
                      className="rounded-lg bg-white/90 px-2 py-1 text-[11px] font-medium text-[#202326] transition-colors hover:bg-white"
                    >
                      Set Primary
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      unitId &&
                      deleteImageMutation.mutate({
                        unitId,
                        imageId: img.id,
                      })
                    }
                    disabled={deleteImageMutation.isPending}
                    className="rounded-lg bg-red-600/90 p-1.5 text-white transition-colors hover:bg-red-700"
                    title="Delete photo"
                  >
                    <FiTrash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminSlideDrawer>
  );
}

