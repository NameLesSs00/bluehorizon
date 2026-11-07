"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { KeyValueItem } from "@/models/keyValue";
import { useKeyValuesQuery } from "@/features/keyValues/useKeyValuesQueries";
import KeyValuesTable from "./KeyValuesTable";
import KeyValueFormModal from "./KeyValueFormModal";

export default function AdminKeyValuesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KeyValueItem | null>(null);

  const { data: items = [], isLoading } = useKeyValuesQuery();

  function handleOpenCreate() {
    setEditingItem(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(item: KeyValueItem) {
    setEditingItem(item);
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
            SITE SETTINGS &amp; LINKS CONTROLLER
          </p>
          <h1
            className="mt-1 text-[28px] font-semibold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Site Links &amp; Key-Value Settings
          </h1>
          <p
            className="mt-1 text-[13px] text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Manage social media handles, external URLs, contact details, and platform key-value configurations.
          </p>
        </div>

        {/* Action Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span
              className="text-[13px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Configured Keys ({items.length})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0F473A] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <FiPlus className="h-4 w-4" />
              <span>Add New Link / Key</span>
            </button>
          </div>
        </div>

        {/* KeyValues Table */}
        <KeyValuesTable
          items={items}
          isLoading={isLoading}
          onEdit={handleOpenEdit}
        />

        {/* Create / Edit Modal */}
        <KeyValueFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          keyValueToEdit={editingItem}
        />
      </div>
    </AdminShell>
  );
}
