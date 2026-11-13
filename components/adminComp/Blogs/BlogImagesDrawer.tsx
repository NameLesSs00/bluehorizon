"use client";

import { useState } from "react";
import Image from "next/image";
import { FiTrash2, FiUploadCloud } from "react-icons/fi";
import { BlogItem } from "@/models/blog";
import { getFullImageUrl } from "@/clientApi/blogsApi";
import {
  useDeleteBlogImageMutation,
  useDeleteBlogSectionImageMutation,
  useUploadBlogImageMutation,
  useUploadBlogSectionImageMutation,
} from "@/features/blogs/useBlogsQueries";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";

interface BlogImagesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  blog: BlogItem | null;
}

export default function BlogImagesDrawer({
  isOpen,
  onClose,
  blog,
}: BlogImagesDrawerProps) {
  const uploadCoverMutation = useUploadBlogImageMutation();
  const deleteCoverMutation = useDeleteBlogImageMutation();
  const uploadSectionMutation = useUploadBlogSectionImageMutation();
  const deleteSectionMutation = useDeleteBlogSectionImageMutation();

  const [activeUploadSectionId, setActiveUploadSectionId] = useState<number | null>(null);

  if (!blog) return null;

  function handleCoverFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && blog) {
      uploadCoverMutation.mutate({ id: blog.id, file });
    }
  }

  function handleSectionFileChange(
    sectionId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (file && blog) {
      uploadSectionMutation.mutate({
        id: blog.id,
        sectionId,
        file,
      });
    }
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Blog Images"
      subtitle={blog.title}
      maxWidthClass="max-w-xl"
    >
      <div className="space-y-6">
        {/* Main Cover Image */}
        <div className="rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#2B5FA6]">
              Blog Cover Image
            </h4>
            {blog.imageUrl && (
              <button
                type="button"
                disabled={deleteCoverMutation.isPending}
                onClick={() => deleteCoverMutation.mutate(blog.id)}
                className="inline-flex items-center gap-1 text-[12px] font-medium text-red-600 hover:underline"
              >
                <FiTrash2 className="h-3.5 w-3.5" />
                <span>Delete Cover</span>
              </button>
            )}
          </div>

          {blog.imageUrl ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#D0D9EA] bg-neutral-100">
              <Image
                src={getFullImageUrl(blog.imageUrl)}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#D0D9EA] bg-white p-6 text-center">
              <FiUploadCloud className="h-8 w-8 text-[#65706B]" />
              <p className="mt-1 text-[13px] text-[#65706B]">
                No cover image uploaded yet.
              </p>
            </div>
          )}

          <div>
            <label className="block text-[12px] font-medium text-[#202326]">
              {blog.imageUrl ? "Upload New Cover Image" : "Upload Cover Image"}
            </label>
            <input
              type="file"
              accept="image/*"
              disabled={uploadCoverMutation.isPending}
              onChange={handleCoverFileChange}
              className="mt-1.5 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#1B3A6B] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#2B5FA6]"
            />
          </div>
        </div>

        {/* Section Images */}
        <div className="space-y-4">
          <h4 className="text-[14px] font-semibold text-[#202326]">
            Section Specific Images
          </h4>

          {blog.sections.map((sec) => (
            <div
              key={sec.id}
              className="rounded-xl border border-[#E2E8F3] bg-white p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[12px] font-bold text-[#2B5FA6]">
                    Section #{sec.sectionNumber}
                  </span>
                  <p className="text-[13px] font-medium text-[#202326]">
                    {sec.tittle || "Untitled section"}
                  </p>
                </div>

                {sec.imageUrl && (
                  <button
                    type="button"
                    disabled={deleteSectionMutation.isPending}
                    onClick={() =>
                      deleteSectionMutation.mutate({
                        id: blog.id,
                        sectionId: sec.id,
                      })
                    }
                    className="inline-flex items-center gap-1 text-[12px] text-red-600 hover:underline"
                  >
                    <FiTrash2 className="h-3.5 w-3.5" />
                    <span>Delete Image</span>
                  </button>
                )}
              </div>

              {sec.imageUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#D0D9EA]">
                  <Image
                    src={getFullImageUrl(sec.imageUrl)}
                    alt={sec.tittle}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-[#65706B]">
                  {sec.imageUrl
                    ? "Replace section image"
                    : "Upload section image"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadSectionMutation.isPending}
                  onChange={(e) => handleSectionFileChange(sec.id, e)}
                  className="mt-1 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-md file:border-0 file:bg-[#2B5FA6] file:px-2.5 file:py-1 file:text-[11px] file:text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminSlideDrawer>
  );
}

