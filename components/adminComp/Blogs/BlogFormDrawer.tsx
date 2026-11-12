"use client";

import { FormEvent, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import { LocalizedText } from "@/models/faq";
import {
  BlogItem,
  CreateBlogRequestDto,
  LocalizedBlogSectionInput,
  UpdateBlogRequestDto,
} from "@/models/blog";
import { getFullLocalizedBlog } from "@/clientApi/blogsApi";
import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
} from "@/features/blogs/useBlogsQueries";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import BlogSectionFormCard from "./BlogSectionFormCard";
import BlogTitleAndCategoryFields from "./BlogTitleAndCategoryFields";

interface BlogFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  blogToEdit?: BlogItem | null;
}

const emptyLocalizedText: LocalizedText = { en: "", ar: "", de: "" };

export default function BlogFormDrawer({
  isOpen,
  onClose,
  blogToEdit,
}: BlogFormDrawerProps) {
  const isEditing = Boolean(blogToEdit);

  const [title, setTitle] = useState<LocalizedText>(emptyLocalizedText);
  const [blogType, setBlogType] = useState<LocalizedText>(emptyLocalizedText);
  const [publishDate, setPublishDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 16)
  );
  const [sections, setSections] = useState<LocalizedBlogSectionInput[]>([
    {
      sectionNumber: 1,
      tittle: { ...emptyLocalizedText },
      content: { ...emptyLocalizedText },
    },
  ]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isPreloading, setIsPreloading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (blogToEdit) {
      setIsPreloading(true);
      getFullLocalizedBlog(blogToEdit.id)
        .then((fullData) => {
          setTitle(fullData.title);
          setBlogType(fullData.blogType);
          if (fullData.publishDate) {
            setPublishDate(new Date(fullData.publishDate).toISOString().slice(0, 16));
          }
          setSections(
            fullData.sections.length > 0
              ? fullData.sections
              : [
                  {
                    sectionNumber: 1,
                    tittle: { ...emptyLocalizedText },
                    content: { ...emptyLocalizedText },
                  },
                ]
          );
        })
        .catch(() => {
          setTitle({ en: blogToEdit.title, ar: "", de: "" });
          setBlogType({ en: blogToEdit.blogType || "", ar: "", de: "" });
        })
        .finally(() => {
          setIsPreloading(false);
        });
    } else {
      setTitle({ ...emptyLocalizedText });
      setBlogType({ ...emptyLocalizedText });
      setPublishDate(new Date().toISOString().slice(0, 16));
      setSections([
        {
          sectionNumber: 1,
          tittle: { ...emptyLocalizedText },
          content: { ...emptyLocalizedText },
        },
      ]);
      setCoverFile(null);
    }
  }, [isOpen, blogToEdit]);

  const uploadCoverMutation = useUploadBlogImageMutation();

  const createMutation = useCreateBlogMutation((newBlogId) => {
    if (coverFile && newBlogId) {
      uploadCoverMutation.mutate({ id: newBlogId, file: coverFile });
    }
    onClose();
  });

  const updateMutation = useUpdateBlogMutation(() => {
    if (coverFile && blogToEdit) {
      uploadCoverMutation.mutate({ id: blogToEdit.id, file: coverFile });
    }
    onClose();
  });

  function handleAddSection() {
    setSections((prev) => [
      ...prev,
      {
        sectionNumber: prev.length + 1,
        tittle: { ...emptyLocalizedText },
        content: { ...emptyLocalizedText },
      },
    ]);
  }

  function handleRemoveSection(index: number) {
    if (sections.length <= 1) {
      toast.error("A blog must have at least one section.");
      return;
    }
    setSections((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((s, idx) => ({ ...s, sectionNumber: idx + 1 }))
    );
  }

  function handleSectionChange(
    index: number,
    field: "tittle" | "content",
    lang: "en" | "ar" | "de",
    value: string
  ) {
    setSections((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        [field]: {
          ...copy[index][field],
          [lang]: value,
        },
      };
      return copy;
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.en.trim() || !title.ar.trim() || !title.de.trim()) {
      toast.error("Please enter blog titles for English, German, and Arabic.");
      return;
    }

    if (!blogType.en.trim()) {
      toast.error("Please enter the blog category type.");
      return;
    }

    const isoDate = publishDate
      ? new Date(publishDate).toISOString()
      : new Date().toISOString();

    const normalizedBlogType: LocalizedText = {
      en: blogType.en.trim(),
      de: blogType.de.trim() || blogType.en.trim(),
      ar: blogType.ar.trim() || blogType.en.trim(),
    };

    if (isEditing && blogToEdit) {
      const payload: UpdateBlogRequestDto = {
        id: blogToEdit.id,
        title,
        publishDate: isoDate,
        blogType: normalizedBlogType,
        sections,
      };
      updateMutation.mutate(payload);
    } else {
      const payload: CreateBlogRequestDto = {
        title,
        publishDate: isoDate,
        blogType: normalizedBlogType,
        sections,
      };
      createMutation.mutate(payload);
    }
  }

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending ||
    uploadCoverMutation.isPending;

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Blog Article" : "Create New Blog Article"}
      subtitle="Multilingual articles, guides, and insights for Red Sea real estate"
      maxWidthClass="max-w-2xl"
    >
      {isPreloading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F473A] border-t-transparent" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <BlogTitleAndCategoryFields
            title={title}
            setTitle={setTitle}
            blogType={blogType}
            setBlogType={setBlogType}
            publishDate={publishDate}
            setPublishDate={setPublishDate}
            coverFile={coverFile}
            setCoverFile={setCoverFile}
            isEditing={isEditing}
          />

          {/* Sections List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[14px] font-semibold text-[#202326]">
                Article Sections ({sections.length})
              </h4>
              <button
                type="button"
                onClick={handleAddSection}
                className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] bg-white px-3 py-1.5 text-[12px] font-medium text-[#0F473A] hover:bg-[#FAF8F5]"
              >
                <FiPlus className="h-3.5 w-3.5" />
                <span>Add Section</span>
              </button>
            </div>

            {sections.map((sec, idx) => (
              <BlogSectionFormCard
                key={idx}
                section={sec}
                index={idx}
                totalSections={sections.length}
                onRemove={handleRemoveSection}
                onChange={handleSectionChange}
              />
            ))}
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-[#E6EAE7] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#DCE2DE] bg-white px-4 py-2.5 text-[13px] font-medium text-[#65706B] hover:bg-[#F3F5F3]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0F473A] px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#145C4B] disabled:opacity-50"
            >
              {isPending
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Article"}
            </button>
          </div>
        </form>
      )}
    </AdminSlideDrawer>
  );
}
