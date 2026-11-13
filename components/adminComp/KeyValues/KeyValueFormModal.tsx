"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  CreateKeyValueRequestDto,
  KeyValueItem,
  UpdateKeyValueRequestDto,
} from "@/models/keyValue";
import {
  useCreateKeyValueMutation,
  useUpdateKeyValueMutation,
} from "@/features/keyValues/useKeyValuesQueries";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";

interface KeyValueFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyValueToEdit?: KeyValueItem | null;
}

export default function KeyValueFormModal({
  isOpen,
  onClose,
  keyValueToEdit,
}: KeyValueFormModalProps) {
  const isEditing = Boolean(keyValueToEdit);

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (keyValueToEdit) {
        setKey(keyValueToEdit.key);
        setValue(keyValueToEdit.value);
      } else {
        setKey("");
        setValue("");
      }
    }
  }, [isOpen, keyValueToEdit]);

  const createMutation = useCreateKeyValueMutation(() => onClose());
  const updateMutation = useUpdateKeyValueMutation(() => onClose());

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!key.trim() || !value.trim()) {
      toast.error("Both Key and Value are required.");
      return;
    }

    if (isEditing && keyValueToEdit) {
      const payload: UpdateKeyValueRequestDto = {
        id: keyValueToEdit.id,
        key: key.trim(),
        value: value.trim(),
      };
      updateMutation.mutate(payload);
    } else {
      const payload: CreateKeyValueRequestDto = {
        key: key.trim(),
        value: value.trim(),
      };
      createMutation.mutate(payload);
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Site Link / Key" : "Add New Site Link / Key"}
      subtitle="Configure platform keys, social links, and external endpoints"
      maxWidthClass="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between" noValidate>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="keyvalue-key-input"
              className="block text-[12px] font-medium text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Key Name / Identifier
            </label>
            <input
              id="keyvalue-key-input"
              type="text"
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="e.g. FaceBook, Instagram, WhatsApp, SupportEmail"
              className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          <div>
            <label
              htmlFor="keyvalue-value-input"
              className="block text-[12px] font-medium text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Value / URL
            </label>
            <input
              id="keyvalue-value-input"
              type="text"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. https://www.facebook.com/bluehorizon"
              className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#E2E8F3] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#D0D9EA] px-4 py-2.5 text-[13px] font-medium text-[#65706B] transition-colors hover:bg-[#F0F3FA]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[#1B3A6B] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2B5FA6] disabled:opacity-65"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isPending
              ? "Saving..."
              : isEditing
              ? "Save Changes"
              : "Create Link"}
          </button>
        </div>
      </form>
    </AdminSlideDrawer>
  );
}
