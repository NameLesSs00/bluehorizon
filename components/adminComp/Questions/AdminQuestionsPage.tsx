"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { QuestionItem } from "@/models/faq";
import { useQuestionsQuery } from "@/features/questions/useQuestionsQueries";
import QuestionsTable from "./QuestionsTable";
import QuestionFormModal from "./QuestionFormModal";

export default function AdminQuestionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(
    null
  );

  // Always fetch and display English in the table
  const { data: questions = [], isLoading } = useQuestionsQuery("en");

  function handleOpenCreate() {
    setEditingQuestion(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(question: QuestionItem) {
    setEditingQuestion(question);
    setIsModalOpen(true);
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
            FAQ &amp; QUESTIONS CONTROLLER
          </p>
          <h1
            className="mt-1 text-[28px] font-semibold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Frequently Asked Questions
          </h1>
          <p
            className="mt-1 text-[13px] text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Manage multilingual customer questions and investment guidance for
            the Red Sea portal.
          </p>
        </div>

        {/* Action Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="text-[13px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              All Questions ({questions.length})
            </span>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F473A] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiPlus className="h-4 w-4" />
            <span>Add New FAQ</span>
          </button>
        </div>

        {/* Full-width Questions Table */}
        <QuestionsTable
          questions={questions}
          isLoading={isLoading}
          onEdit={handleOpenEdit}
        />

        {/* Multilingual Create/Edit Drawer */}
        <QuestionFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          questionToEdit={editingQuestion}
        />
      </div>
    </AdminShell>
  );
}
