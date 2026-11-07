"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { BlogItem } from "@/models/blog";
import { useBlogsQuery } from "@/features/blogs/useBlogsQueries";
import BlogsTable from "./BlogsTable";
import BlogFormDrawer from "./BlogFormDrawer";
import BlogImagesDrawer from "./BlogImagesDrawer";

export default function AdminBlogsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data: blogsData, isLoading } = useBlogsQuery({
    Language: "en",
    PageNumber: pageNumber,
    PageSize: pageSize,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);

  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [imagesBlog, setImagesBlog] = useState<BlogItem | null>(null);

  const blogs = blogsData?.items ?? [];
  const totalCount = blogsData?.totalCount ?? blogs.length;
  const totalPages = blogsData?.totalPages ?? 1;
  const hasPreviousPage = blogsData?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = blogsData?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setEditingBlog(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(blog: BlogItem) {
    setEditingBlog(blog);
    setIsFormOpen(true);
  }

  function handleOpenImages(blog: BlogItem) {
    setImagesBlog(blog);
    setIsImagesOpen(true);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ARTICLES &amp; BLOGS CONTROLLER
          </p>
          <h1
            className="mt-1 text-[28px] font-semibold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Articles &amp; Coastal Insights
          </h1>
          <p
            className="mt-1 text-[13px] text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Publish multilingual articles, investment guides, and real estate insights for the Red Sea region.
          </p>
        </div>

        {/* Action Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="text-[13px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Published Articles ({totalCount})
            </span>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F473A] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiPlus className="h-4 w-4" />
            <span>Add New Article</span>
          </button>
        </div>

        {/* Full-width Blogs Table */}
        <BlogsTable
          blogs={blogs}
          isLoading={isLoading}
          pageNumber={pageNumber}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={(p) => setPageNumber(p)}
          onEdit={handleOpenEdit}
          onManageImages={handleOpenImages}
        />

        {/* Create/Edit Blog Right-Side Drawer */}
        <BlogFormDrawer
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          blogToEdit={editingBlog}
        />

        {/* Manage Images Right-Side Drawer */}
        <BlogImagesDrawer
          isOpen={isImagesOpen}
          onClose={() => setIsImagesOpen(false)}
          blog={imagesBlog}
        />
      </div>
    </AdminShell>
  );
}

