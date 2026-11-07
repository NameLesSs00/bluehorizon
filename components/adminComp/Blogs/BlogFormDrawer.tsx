"use client";

import { FormEvent, useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
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
import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";

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
        })
        .finally(() => {
          setIsPreloading(false);
        });
    } else {
      setTitle({ ...emptyLocalizedText });
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

    if (isEditing && blogToEdit) {
      const payload: UpdateBlogRequestDto = {
        id: blogToEdit.id,
        title,
        sections,
      };
      updateMutation.mutate(payload);
    } else {
      const payload: CreateBlogRequestDto = {
        title,
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
      subtitle="Multilingual articles and guides for Red Sea real estate"
      maxWidthClass="max-w-2xl"
    >
      {isPreloading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F473A] border-t-transparent" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Blog Title */}
          <div className="rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-5 space-y-4">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#145C4B]">
              Blog Title
            </h4>

            <div>
              <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
                <FlagUK className="h-3.5 w-5 rounded-2xs shadow-xs" />
                <span>English Title</span>
              </label>
              <input
                type="text"
                required
                value={title.en}
                onChange={(e) => setTitle({ ...title, en: e.target.value })}
                placeholder="e.g. Discovering Coastal Living in Hurghada"
                className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
                <FlagGermany className="h-3.5 w-5 rounded-2xs shadow-xs" />
                <span>German Title</span>
              </label>
              <input
                type="text"
                required
                value={title.de}
                onChange={(e) => setTitle({ ...title, de: e.target.value })}
                placeholder="e.g. Entdeckung von Küstenleben in Hurghada"
                className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
                <FlagEgypt className="h-3.5 w-5 rounded-2xs shadow-xs" />
                <span>Arabic Title</span>
              </label>
              <input
                type="text"
                required
                dir="rtl"
                value={title.ar}
                onChange={(e) => setTitle({ ...title, ar: e.target.value })}
                placeholder="مثال: اكتشاف الحياة الساحلية في الغردقة"
                className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#202326]">
                {isEditing ? "Replace Cover Image (Optional)" : "Cover Image (Optional)"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                className="mt-1.5 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#0F473A] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#145C4B]"
              />
            </div>
          </div>

          {/* Sections List */}
          <div className="space-y-5">
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
              <div
                key={idx}
                className="rounded-xl border border-[#E6EAE7] bg-white p-5 space-y-5 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-[#E6EAE7] pb-3">
                  <span className="text-[13px] font-bold text-[#145C4B]">
                    Section #{sec.sectionNumber}
                  </span>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(idx)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Section Subheadings with Flags */}
                <div className="space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#65706B]">
                    Section Subheadings
                  </p>
                  
                  {/* English Subheading */}
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-medium text-[#202326]">
                      <FlagUK className="h-3 w-4.5 rounded-2xs shadow-xs" />
                      <span>English Subheading</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. The Appeal of Hurghada Real Estate"
                      value={sec.tittle.en}
                      onChange={(e) =>
                        handleSectionChange(idx, "tittle", "en", e.target.value)
                      }
                      className="mt-1 w-full rounded-lg border border-[#DCE2DE] px-3 py-2 text-[12px] focus:outline-none focus:border-[#0F473A]"
                    />
                  </div>

                  {/* German Subheading */}
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-medium text-[#202326]">
                      <FlagGermany className="h-3 w-4.5 rounded-2xs shadow-xs" />
                      <span>German Subheading</span>
                    </label>
                    <input
                      type="text"
                      placeholder="z.B. Der Reiz von Immobilien in Hurghada"
                      value={sec.tittle.de}
                      onChange={(e) =>
                        handleSectionChange(idx, "tittle", "de", e.target.value)
                      }
                      className="mt-1 w-full rounded-lg border border-[#DCE2DE] px-3 py-2 text-[12px] focus:outline-none focus:border-[#0F473A]"
                    />
                  </div>

                  {/* Arabic Subheading */}
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-medium text-[#202326]">
                      <FlagEgypt className="h-3 w-4.5 rounded-2xs shadow-xs" />
                      <span>Arabic Subheading</span>
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      placeholder="مثال: جاذبية العقارات في الغردقة"
                      value={sec.tittle.ar}
                      onChange={(e) =>
                        handleSectionChange(idx, "tittle", "ar", e.target.value)
                      }
                      className="mt-1 w-full rounded-lg border border-[#DCE2DE] px-3 py-2 text-[12px] focus:outline-none focus:border-[#0F473A]"
                    />
                  </div>
                </div>

                {/* Section Content Bodies with Flags */}
                <div className="space-y-3 border-t border-[#E6EAE7] pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#65706B]">
                    Section Content Body
                  </p>

                  {/* English Content */}
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-medium text-[#202326]">
                      <FlagUK className="h-3 w-4.5 rounded-2xs shadow-xs" />
                      <span>English Content Body</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Detailed content paragraph in English..."
                      value={sec.content.en}
                      onChange={(e) =>
                        handleSectionChange(idx, "content", "en", e.target.value)
                      }
                      className="mt-1 w-full rounded-lg border border-[#DCE2DE] px-3 py-2 text-[12px] focus:outline-none focus:border-[#0F473A]"
                    />
                  </div>

                  {/* German Content */}
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-medium text-[#202326]">
                      <FlagGermany className="h-3 w-4.5 rounded-2xs shadow-xs" />
                      <span>German Content Body</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ausführlicher Textabschnitt auf Deutsch..."
                      value={sec.content.de}
                      onChange={(e) =>
                        handleSectionChange(idx, "content", "de", e.target.value)
                      }
                      className="mt-1 w-full rounded-lg border border-[#DCE2DE] px-3 py-2 text-[12px] focus:outline-none focus:border-[#0F473A]"
                    />
                  </div>

                  {/* Arabic Content */}
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-medium text-[#202326]">
                      <FlagEgypt className="h-3 w-4.5 rounded-2xs shadow-xs" />
                      <span>Arabic Content Body</span>
                    </label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      placeholder="فقرة المحتوى بالتفصيل باللغة العربية..."
                      value={sec.content.ar}
                      onChange={(e) =>
                        handleSectionChange(idx, "content", "ar", e.target.value)
                      }
                      className="mt-1 w-full rounded-lg border border-[#DCE2DE] px-3 py-2 text-[12px] focus:outline-none focus:border-[#0F473A]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#E6EAE7] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#DCE2DE] px-4 py-2.5 text-[13px] font-medium text-[#65706B] hover:bg-[#F3F5F3]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-[#0F473A] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#145C4B] disabled:opacity-65"
            >
              {isPending
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Blog"}
            </button>
          </div>
        </form>
      )}
    </AdminSlideDrawer>
  );
}
