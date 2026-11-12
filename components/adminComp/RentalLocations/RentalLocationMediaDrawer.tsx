"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  FiCheck,
  FiFilm,
  FiImage,
  FiPlus,
  FiTrash2,
  FiUploadCloud,
} from "react-icons/fi";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import { getFullRentalLocationMediaUrl } from "@/clientApi/rentalLocationsApi";
import {
  useDeleteRentalLocationImageMutation,
  useDeleteRentalLocationVideoMutation,
  useRentalLocationByIdQuery,
  useRentalLocationImagesQuery,
  useSetPrimaryRentalLocationImageMutation,
  useUploadRentalLocationImagesMutation,
  useUploadRentalLocationVideoMutation,
} from "@/features/rentalLocations/useRentalLocationsQueries";
import { RentalLocationItem } from "@/models/rentalLocation";

interface RentalLocationMediaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  location: RentalLocationItem | null;
}

export default function RentalLocationMediaDrawer({
  isOpen,
  onClose,
  location,
}: RentalLocationMediaDrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const locId = location?.id ?? null;

  const { data: latestLocation } = useRentalLocationByIdQuery(
    locId,
    "en",
    isOpen
  );
  const { data: imagesData } = useRentalLocationImagesQuery(locId, isOpen);

  const uploadImagesMutation = useUploadRentalLocationImagesMutation();
  const deleteImageMutation = useDeleteRentalLocationImageMutation();
  const setPrimaryMutation = useSetPrimaryRentalLocationImageMutation();
  const uploadVideoMutation = useUploadRentalLocationVideoMutation();
  const deleteVideoMutation = useDeleteRentalLocationVideoMutation();

  if (!location) return null;

  const activeVideoUrl =
    latestLocation?.videoUrl !== undefined
      ? latestLocation.videoUrl
      : location.videoUrl;

  const images =
    imagesData && imagesData.length > 0 ? imagesData : location.images || [];

  function handleBatchUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0 && locId) {
      uploadImagesMutation.mutate(
        { id: locId, files },
        {
          onSettled: () => {
            if (fileInputRef.current) fileInputRef.current.value = "";
          },
        }
      );
    }
  }

  function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && locId) {
      uploadVideoMutation.mutate({ id: locId, file });
    }
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Rental Media"
      subtitle={`Images & promotional video for ${location.name}`}
      maxWidthClass="max-w-3xl"
    >
      <div className="space-y-8">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[14px] font-bold text-[#202326]">
                Photo Gallery ({images.length})
              </h3>
              <p className="text-[12px] text-[#65706B]">
                Upload high-resolution landscape images. Set one as primary.
              </p>
            </div>

            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#0F473A] px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#145C4B]">
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

          {images.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#DCE2DE] bg-[#FAF8F5] p-10 text-center">
              <FiImage className="h-10 w-10 text-[#9BA5A0]" />
              <p className="mt-3 text-[14px] font-semibold text-[#202326]">
                No photos uploaded yet
              </p>
              <p className="mt-1 text-[12px] text-[#65706B]">
                Click &quot;Add Photos&quot; above to upload destination views.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#DCE2DE] bg-neutral-100"
                >
                  <Image
                    src={getFullRentalLocationMediaUrl(img.imageUrl)}
                    alt={`Location photo ${img.id}`}
                    fill
                    className="object-cover"
                  />

                  {img.isPrimary && (
                    <div className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1 rounded-md bg-[#0F473A] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      <FiCheck className="h-3 w-3" />
                      <span>Primary</span>
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 opacity-0 transition-opacity group-hover:opacity-100">
                    {!img.isPrimary ? (
                      <button
                        type="button"
                        onClick={() =>
                          locId &&
                          setPrimaryMutation.mutate({
                            rentalLocationId: locId,
                            imageId: img.id,
                          })
                        }
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
                        locId &&
                        deleteImageMutation.mutate({
                          id: locId,
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

        {/* Promotional Video Section */}
        <div className="space-y-4 border-t border-[#E6EAE7] pt-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-[14px] font-bold text-[#202326]">
              Promotional Video
            </h3>
            <p className="text-[12px] text-[#65706B]">
              Upload a high quality MP4 video clip presenting this rental
              area.
            </p>
          </div>

          {activeVideoUrl ? (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl border border-[#DCE2DE] bg-black">
                <video
                  src={getFullRentalLocationMediaUrl(activeVideoUrl)}
                  controls
                  className="aspect-video w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#DCE2DE] bg-white px-3 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#FAF8F5]">
                  <FiUploadCloud className="h-4 w-4 text-[#145C4B]" />
                  <span>Replace Video</span>
                  <input
                    type="file"
                    accept="video/*"
                    disabled={uploadVideoMutation.isPending}
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() =>
                    locId && deleteVideoMutation.mutate(locId)
                  }
                  disabled={deleteVideoMutation.isPending}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-[12px] font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                  <span>Remove Video</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#DCE2DE] bg-[#FAF8F5] p-8 text-center">
              <FiFilm className="h-8 w-8 text-[#9BA5A0]" />
              <p className="mt-2 text-[13px] font-semibold text-[#202326]">
                No video uploaded
              </p>
              <label className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#145C4B] px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#0F473A]">
                <FiUploadCloud className="h-4 w-4" />
                <span>Upload Video</span>
                <input
                  type="file"
                  accept="video/*"
                  disabled={uploadVideoMutation.isPending}
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </AdminSlideDrawer>
  );
}

