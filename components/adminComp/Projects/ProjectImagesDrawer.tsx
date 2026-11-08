"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiPlus, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { LuBuilding } from "react-icons/lu";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";
import {
  useDeleteProjectImageMutation,
  useProjectByIdQuery,
  useUploadProjectImagesMutation,
} from "@/features/projects/useProjectsQueries";
import { ProjectItem } from "@/models/project";

interface ProjectImagesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}

export default function ProjectImagesDrawer({
  isOpen,
  onClose,
  project,
}: ProjectImagesDrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projId = project?.id ?? null;

  const { data: latestProject } = useProjectByIdQuery(projId, isOpen, "USD");

  const uploadImagesMutation = useUploadProjectImagesMutation();
  const deleteImageMutation = useDeleteProjectImageMutation();

  if (!project) return null;

  const imageUrls = latestProject?.imageUrls || project.imageUrls || [];

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0 && projId) {
      uploadImagesMutation.mutate({ id: projId, files }, {
        onSettled: () => {
          if (fileInputRef.current) fileInputRef.current.value = "";
        },
      });
    }
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Project Gallery"
      subtitle={`Photo gallery for ${project.name}`}
      maxWidthClass="max-w-2xl"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#202326]">
              Project Images ({imageUrls.length})
            </h3>
            <p className="text-[12px] text-[#65706B]">
              Upload high-resolution landscape renderings, aerial views, and floorplans.
            </p>
          </div>

          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#0F473A] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#145C4B]">
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

        {imageUrls.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCE2DE] bg-[#FAF8F5] p-8 text-center">
            <LuBuilding className="h-8 w-8 text-[#9BA5A0]" />
            <p className="mt-2 text-[13px] font-medium text-[#202326]">
              No images uploaded yet
            </p>
            <p className="text-[12px] text-[#65706B]">
              Click Add Photos above to upload renders for this project.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {imageUrls.map((url, idx) => (
              <div
                key={`${url}-${idx}`}
                className="group relative overflow-hidden rounded-xl border border-[#E6EAE7] bg-white shadow-xs"
              >
                <div className="relative aspect-video w-full bg-neutral-100">
                  <Image
                    src={getFullProjectImageUrl(url)}
                    alt={`Project image ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  {idx === 0 && (
                    <span className="absolute top-2 left-2 rounded-md bg-[#0F473A] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      Cover
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-[#E6EAE7] bg-[#FAF8F5] p-2 text-[11px]">
                  <span className="truncate max-w-[180px] text-[#65706B]">
                    Photo #{idx + 1}
                  </span>
                  <button
                    type="button"
                    disabled={deleteImageMutation.isPending}
                    onClick={() =>
                      projId && deleteImageMutation.mutate({ id: projId, url })
                    }
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 hover:underline disabled:opacity-50"
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

