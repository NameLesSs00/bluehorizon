"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiImage,
  FiTrash2,
} from "react-icons/fi";
import { BlogItem } from "@/models/blog";
import { getFullImageUrl } from "@/clientApi/blogsApi";
import { useDeleteBlogMutation } from "@/features/blogs/useBlogsQueries";

interface BlogsTableProps {
  blogs: BlogItem[];
  isLoading: boolean;
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
  onEdit: (blog: BlogItem) => void;
  onManageImages: (blog: BlogItem) => void;
}

export default function BlogsTable({
  blogs,
  isLoading,
  pageNumber,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onEdit,
  onManageImages,
}: BlogsTableProps) {
  const deleteMutation = useDeleteBlogMutation();
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
          <p className="text-[13px] text-[#65706B]">Loading articles and blogs...</p>
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
                Cover
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Article Title (English)
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Category &amp; Date
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Sections
              </th>
              <th className="w-56 px-6 py-4 text-right text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F3]">
            {blogs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-16 text-center text-[14px] text-[#65706B]"
                >
                  No blog articles found. Click "Add New Article" to write one.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => {
                const formattedDate = blog.publishDate
                  ? new Date(blog.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Date TBD";

                return (
                  <tr
                    key={blog.id}
                    className="transition-colors hover:bg-[#F0F3FA]/50"
                  >
                    <td className="px-6 py-4">
                      <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-[#D0D9EA] bg-neutral-100">
                        {blog.imageUrl ? (
                          <Image
                            src={getFullImageUrl(blog.imageUrl)}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-[#65706B]">
                            No image
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p
                        className="max-w-xl text-[14px] font-semibold text-[#202326]"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {blog.title}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className="inline-block rounded-md border border-[#D9E2EE] bg-[#F9F7F4] px-2 py-0.5 text-[11px] font-semibold text-[#2B5FA6]">
                          {blog.blogType || "General"}
                        </span>
                        <p className="text-[11px] text-[#65706B]">{formattedDate}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-md bg-[#F9F7F4] border border-[#E2E8F3] px-2.5 py-1 text-[12px] font-medium text-[#202326]">
                        {blog.sections.length} Section{blog.sections.length !== 1 ? "s" : ""}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                    {confirmDeleteId === blog.id ? (
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          disabled={deleteMutation.isPending}
                          onClick={() => handleConfirmDelete(blog.id)}
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
                          onClick={() => onManageImages(blog)}
                          title="Manage images"
                          className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] px-2.5 py-1.5 text-[12px] font-medium text-[#202326] hover:bg-[#F9F7F4]"
                        >
                          <FiImage className="h-3.5 w-3.5 text-[#2B5FA6]" />
                          <span>Images</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onEdit(blog)}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] px-2.5 py-1.5 text-[12px] font-medium text-[#202326] hover:bg-[#F9F7F4]"
                        >
                          <FiEdit2 className="h-3.5 w-3.5 text-[#2B5FA6]" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(blog.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-50"
                        >
                          <FiTrash2 className="h-3.5 w-3.5" />
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
            className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#202326] hover:bg-[#F0F3FA] disabled:opacity-45"
          >
            <FiChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            disabled={!hasNextPage && pageNumber >= totalPages}
            onClick={() => onPageChange(pageNumber + 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#202326] hover:bg-[#F0F3FA] disabled:opacity-45"
          >
            <span>Next</span>
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

