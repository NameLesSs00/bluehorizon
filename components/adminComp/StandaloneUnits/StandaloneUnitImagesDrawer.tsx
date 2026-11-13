"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiCheck, FiPlus, FiStar, FiTrash2 } from "react-icons/fi";
import { LuBuilding } from "react-icons/lu";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import { getFullStandaloneUnitMediaUrl } from "@/clientApi/standaloneUnitsApi";
import {
  useStandaloneUnitImagesQuery,
} from "@/features/standaloneUnits/useStandaloneUnitsQueries";
import {
  useDeleteStandaloneUnitImageMutation,
  useSetPrimaryStandaloneUnitImageMutation,
  useUploadStandaloneUnitImagesMutation,
} from "@/features/standaloneUnits/useStandaloneUnitsMutations";
import { StandaloneUnitItem } from "@/models/standaloneUnit";

interface StandaloneUnitImagesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  unit: StandaloneUnitItem | null;
}

export default function StandaloneUnitImagesDrawer({
  isOpen,
  onClose,
  unit,
}: StandaloneUnitImagesDrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const unitId = unit?.id ?? null;

  const { data: images = [], isLoading } = useStandaloneUnitImagesQuery(
    unitId,
    isOpen
  );

  const uploadImagesMutation = useUploadStandaloneUnitImagesMutation();
  const deleteImageMutation = useDeleteStandaloneUnitImageMutation();
  const setPrimaryMutation = useSetPrimaryStandaloneUnitImageMutation();

  if (!unit) return null;

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0 && unitId) {
      uploadImagesMutation.mutate(
        { id: unitId, files },
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
      title="Standalone Property Gallery"
      subtitle={`Photo gallery for ${unit.name}`}
      maxWidthClass="max-w-3xl"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#202326]">
              Property Photos ({images.length})
            </h3>
            <p className="text-[12px] text-[#65706B]">
              Upload high-resolution photography, floor plans, and interior angles.
            </p>
          </div>

          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#1B3A6B] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#2B5FA6]">
            <FiPlus className="h-4 w-4" />
            <span>Add Photos</span>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              disabled={uploadImagesMutation.isPending}
              onChange={handleFilesSelected}
              className="hidden"
            />
          </label>
        </div>

        {isLoading ? (
          <div className="flex h-56 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#2B5FA6] border-t-transparent" />
              <p className="text-[12px] text-[#65706B]">Loading gallery...</p>
            </div>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D0D9EA] bg-[#F9F7F4] p-12 text-center">
            <LuBuilding className="h-10 w-10 text-[#9BA5A0]" />
            <p className="mt-3 text-[14px] font-semibold text-[#202326]">
              No images uploaded yet
            </p>
            <p className="mt-1 text-[12px] text-[#65706B]">
              Click &quot;Add Photos&quot; above to upload renders for this standalone property.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {images.map((img, idx) => (
              <div
                key={`${img.imageUrl}-${idx}`}
                className="group relative overflow-hidden rounded-xl border border-[#E2E8F3] bg-white shadow-xs"
              >
                <div className="relative aspect-video w-full bg-neutral-100">
                  <Image
                    src={getFullStandaloneUnitMediaUrl(img.imageUrl)}
                    alt={`Property photo ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  {img.isPrimary && (
                    <span className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-[#1B3A6B] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      <FiCheck className="h-3 w-3" />
                      <span>Primary</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-[#E2E8F3] bg-[#F9F7F4] p-2.5 text-[11px]">
                  {!img.isPrimary ? (
                    <button
                      type="button"
                      disabled={setPrimaryMutation.isPending}
                      onClick={() =>
                        unitId &&
                        setPrimaryMutation.mutate({
                          unitId,
                          imageId: img.id,
                        })
                      }
                      className="inline-flex items-center gap-1 text-[#2B5FA6] transition-colors hover:underline"
                    >
                      <FiStar className="h-3.5 w-3.5" />
                      <span>Set Primary</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#1B3A6B]">
                      Main Photo
                    </span>
                  )}

                  <button
                    type="button"
                    disabled={deleteImageMutation.isPending}
                    onClick={() =>
                      unitId &&
                      deleteImageMutation.mutate({
                        id: unitId,
                        imageId: img.id,
                      })
                    }
                    className="inline-flex items-center gap-1 text-red-600 transition-colors hover:text-red-700 hover:underline disabled:opacity-50"
                  >
                    <FiTrash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
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

