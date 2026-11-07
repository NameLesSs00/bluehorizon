"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  CreateQuestionRequestDto,
  LocalizedText,
  QuestionItem,
  UpdateQuestionRequestDto,
} from "@/models/faq";
import { getFullLocalizedQuestion } from "@/clientApi/questionsApi";
import {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from "@/features/questions/useQuestionsQueries";
import {
  FlagEgypt,
  FlagGermany,
  FlagUK,
} from "@/components/adminComp/Common/LanguageFlags";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";

interface QuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionToEdit?: QuestionItem | null;
}

export default function QuestionFormModal({
  isOpen,
  onClose,
  questionToEdit,
}: QuestionFormModalProps) {
  const isEditing = Boolean(questionToEdit);

  const [title, setTitle] = useState<LocalizedText>({ en: "", ar: "", de: "" });
  const [description, setDescription] = useState<LocalizedText>({
    en: "",
    ar: "",
    de: "",
  });
  const [isPreloading, setIsPreloading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (questionToEdit) {
      setIsPreloading(true);
      getFullLocalizedQuestion(questionToEdit.id)
        .then((fullData) => {
          setTitle({
            en: fullData.title.en || questionToEdit.title || "",
            ar: fullData.title.ar || "",
            de: fullData.title.de || "",
          });
          setDescription({
            en: fullData.description.en || questionToEdit.description || "",
            ar: fullData.description.ar || "",
            de: fullData.description.de || "",
          });
        })
        .catch(() => {
          setTitle({ en: questionToEdit.title, ar: "", de: "" });
          setDescription({ en: questionToEdit.description, ar: "", de: "" });
        })
        .finally(() => {
          setIsPreloading(false);
        });
    } else {
      setTitle({ en: "", ar: "", de: "" });
      setDescription({ en: "", ar: "", de: "" });
    }
  }, [isOpen, questionToEdit]);

  const createMutation = useCreateQuestionMutation(() => onClose());
  const updateMutation = useUpdateQuestionMutation(() => onClose());

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.en.trim() || !title.ar.trim() || !title.de.trim()) {
      toast.error("Please provide FAQ title in English, Arabic, and German.");
      return;
    }

    if (!description.en.trim() || !description.ar.trim() || !description.de.trim()) {
      toast.error("Please provide FAQ description in English, Arabic, and German.");
      return;
    }

    if (isEditing && questionToEdit) {
      const payload: UpdateQuestionRequestDto = {
        id: questionToEdit.id,
        title,
        description,
      };
      updateMutation.mutate(payload);
    } else {
      const payload: CreateQuestionRequestDto = {
        title,
        description,
      };
      createMutation.mutate(payload);
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit FAQ Question" : "Create New FAQ Question"}
      subtitle="Multilingual FAQ displayed across all supported customer languages"
      maxWidthClass="max-w-xl"
    >
      {isPreloading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F473A] border-t-transparent" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between" noValidate>
          <div className="space-y-6">
            {/* Titles Section */}
            <div className="space-y-4">
              <h4
                className="text-[13px] font-bold uppercase tracking-wider text-[#145C4B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Question / Title
              </h4>

              {/* English (UK Flag) */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
                  <FlagUK className="h-3.5 w-5 rounded-2xs" />
                  <span>English (UK)</span>
                </label>
                <input
                  type="text"
                  required
                  value={title.en}
                  onChange={(e) => setTitle({ ...title, en: e.target.value })}
                  placeholder="How can I purchase a villa in Hurghada?"
                  className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              {/* German (Germany Flag) */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
                  <FlagGermany className="h-3.5 w-5 rounded-2xs" />
                  <span>German (Deutschland)</span>
                </label>
                <input
                  type="text"
                  required
                  value={title.de}
                  onChange={(e) => setTitle({ ...title, de: e.target.value })}
                  placeholder="Wie kann ich eine Villa in Hurghada kaufen?"
                  className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              {/* Arabic (Egypt Flag) */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
                  <FlagEgypt className="h-3.5 w-5 rounded-2xs" />
                  <span>Arabic (مصر)</span>
                </label>
                <input
                  type="text"
                  required
                  dir="rtl"
                  value={title.ar}
                  onChange={(e) => setTitle({ ...title, ar: e.target.value })}
                  placeholder="كيف يمكنني شراء فيلا في الغردقة؟"
                  className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
            </div>

            {/* Descriptions Section */}
            <div className="space-y-4 border-t border-[#E6EAE7] pt-4">
              <h4
                className="text-[13px] font-bold uppercase tracking-wider text-[#145C4B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Answer / Description
              </h4>

              {/* English (UK Flag) */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
                  <FlagUK className="h-3.5 w-5 rounded-2xs" />
                  <span>English Description</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={description.en}
                  onChange={(e) =>
                    setDescription({ ...description, en: e.target.value })
                  }
                  placeholder="Detailed answer in English..."
                  className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              {/* German (Germany Flag) */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
                  <FlagGermany className="h-3.5 w-5 rounded-2xs" />
                  <span>German Description</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={description.de}
                  onChange={(e) =>
                    setDescription({ ...description, de: e.target.value })
                  }
                  placeholder="Detaillierte Antwort auf Deutsch..."
                  className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              {/* Arabic (Egypt Flag) */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-medium text-[#202326]">
                  <FlagEgypt className="h-3.5 w-5 rounded-2xs" />
                  <span>Arabic Description</span>
                </label>
                <textarea
                  rows={2}
                  required
                  dir="rtl"
                  value={description.ar}
                  onChange={(e) =>
                    setDescription({ ...description, ar: e.target.value })
                  }
                  placeholder="الإجابة بالتفصيل باللغة العربية..."
                  className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] px-3.5 py-2 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#E6EAE7] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#DCE2DE] px-4 py-2.5 text-[13px] font-medium text-[#65706B] transition-colors hover:bg-[#F3F5F3]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-[#0F473A] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#145C4B] disabled:opacity-65"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {isPending
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Question"}
            </button>
          </div>
        </form>
      )}
    </AdminSlideDrawer>
  );
}
