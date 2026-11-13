"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiCheck, FiFilm, FiImage, FiPlus, FiTrash2, FiUploadCloud } from "react-icons/fi";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import { getFullLocationMediaUrl } from "@/clientApi/projectLocationsApi";
import {
  useDeleteProjectLocationImageMutation,
  useDeleteProjectLocationVideoMutation,
  useProjectLocationByIdQuery,
  useProjectLocationImagesQuery,
  useReplaceProjectLocationImageMutation,
  useSetPrimaryProjectLocationImageMutation,
  useUploadProjectLocationImagesMutation,
  useUploadProjectLocationVideoMutation,
} from "@/features/projectLocations/useProjectLocationsQueries";
import { ProjectLocationItem } from "@/models/projectLocation";

interface ProjectLocationMediaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  location: ProjectLocationItem | null;
}

export default function ProjectLocationMediaDrawer({
  isOpen,
  onClose,
  location,
}: ProjectLocationMediaDrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const replaceTargetImageId = useRef<number | null>(null);

  const locId = location?.id ?? null;

  const { data: latestLocation } = useProjectLocationByIdQuery(locId, "en", isOpen);
  const { data: imagesData } = useProjectLocationImagesQuery(locId, isOpen);

  const uploadImagesMutation = useUploadProjectLocationImagesMutation();
  const deleteImageMutation = useDeleteProjectLocationImageMutation();
  const replaceImageMutation = useReplaceProjectLocationImageMutation();
  const setPrimaryMutation = useSetPrimaryProjectLocationImageMutation();
  const uploadVideoMutation = useUploadProjectLocationVideoMutation();
  const deleteVideoMutation = useDeleteProjectLocationVideoMutation();

  if (!location) return null;

  const activeVideoUrl =
    latestLocation?.videoUrl !== undefined
      ? latestLocation.videoUrl
      : location.videoUrl;

  const images = imagesData && imagesData.length > 0 ? imagesData : location.images || [];

  function handleBatchUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0 && locId) {
      uploadImagesMutation.mutate({ id: locId, files }, {
        onSettled: () => {
          if (fileInputRef.current) fileInputRef.current.value = "";
        },
      });
    }
  }

  function handleReplaceSelect(imageId: number) {
    replaceTargetImageId.current = imageId;
    replaceInputRef.current?.click();
  }

  function handleReplaceFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && locId && replaceTargetImageId.current) {
      replaceImageMutation.mutate({
        locationId: locId,
        imageId: replaceTargetImageId.current,
        file,
      }, {
        onSettled: () => {
          if (replaceInputRef.current) replaceInputRef.current.value = "";
          replaceTargetImageId.current = null;
        },
      });
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
      title="Manage Location Media"
      subtitle={`Images & promotional video for ${location.name}`}
      maxWidthClass="max-w-3xl"
    >
      <div className="space-y-8">
        {/* Hidden File Input for Image Replacement */}
        <input
          ref={replaceInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleReplaceFile}
        />

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

          {images.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D0D9EA] bg-[#F9F7F4] p-8 text-center">
              <FiImage className="h-8 w-8 text-[#9BA5A0]" />
              <p className="mt-2 text-[13px] font-medium text-[#202326]">
                No photos in this gallery yet
              </p>
              <p className="text-[12px] text-[#65706B]">
                Click Add Photos to upload images for this location.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-xl border border-[#E2E8F3] bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative aspect-video w-full bg-neutral-100">
                    <Image
                      src={getFullLocationMediaUrl(img.imageUrl)}
                      alt={`Location photo`}
                      fill
                      className="object-cover"
                    />
                    {img.isPrimary && (
                      <span className="absolute top-2 left-2 rounded-md bg-[#1B3A6B] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                        Primary
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E2E8F3] bg-[#F9F7F4] p-2 text-[11px]">
                    {!img.isPrimary ? (
                      <button
                        type="button"
                        onClick={() =>
                          locId &&
                          setPrimaryMutation.mutate({
                            locationId: locId,
                            imageId: img.id,
                          })
                        }
                        className="inline-flex items-center gap-1 font-semibold text-[#2B5FA6] hover:underline"
                      >
                        <FiCheck className="h-3.5 w-3.5" />
                        <span>Set Primary</span>
                      </button>
                    ) : (
                      <span className="font-semibold text-[#1B3A6B]">
                        Current Primary
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleReplaceSelect(img.id)}
                        className="text-[#65706B] hover:text-[#202326] hover:underline"
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          locId &&
                          deleteImageMutation.mutate({
                            id: locId,
                            imageId: img.id,
                          })
                        }
                        className="text-red-600 hover:text-red-700 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video Section */}
        <div className="space-y-4 border-t border-[#E2E8F3] pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-bold text-[#202326]">
                Promotional Video
              </h3>
              <p className="text-[12px] text-[#65706B]">
                Upload an MP4 video clip showcasing the destination and lifestyle.
              </p>
            </div>

            {activeVideoUrl && (
              <button
                type="button"
                disabled={deleteVideoMutation.isPending}
                onClick={() => locId && deleteVideoMutation.mutate(locId)}
                className="inline-flex items-center gap-1 text-[12px] font-medium text-red-600 hover:underline"
              >
                <FiTrash2 className="h-3.5 w-3.5" />
                <span>Delete Video</span>
              </button>
            )}
          </div>

          {activeVideoUrl ? (
            <div className="space-y-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#D0D9EA] bg-black">
                <video
                  key={activeVideoUrl}
                  src={getFullLocationMediaUrl(activeVideoUrl)}
                  controls
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#202326]">
                  Replace Video (MP4)
                </label>
                <input
                  type="file"
                  accept="video/*"
                  disabled={uploadVideoMutation.isPending}
                  onChange={handleVideoUpload}
                  className="mt-1 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#1B3A6B] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#2B5FA6]"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D0D9EA] bg-[#F9F7F4] p-6 text-center">
              <FiFilm className="h-8 w-8 text-[#9BA5A0]" />
              <p className="mt-2 text-[13px] font-medium text-[#202326]">
                No video attached
              </p>
              <label className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#1B3A6B] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#2B5FA6]">
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

