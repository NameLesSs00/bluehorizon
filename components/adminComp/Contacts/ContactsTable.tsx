"use client";

import { useState } from "react";
import {
  FiCheck,
  FiEye,
  FiMail,
  FiPhone,
  FiTrash2,
} from "react-icons/fi";
import { ContactItem } from "@/models/contact";
import {
  useDeleteContactMutation,
  useUpdateContactStatusMutation,
} from "@/features/contacts/useContactsQueries";

interface ContactsTableProps {
  contacts: ContactItem[];
  isLoading: boolean;
  onViewDetails: (contact: ContactItem) => void;
}

function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

export default function ContactsTable({
  contacts,
  isLoading,
  onViewDetails,
}: ContactsTableProps) {
  const deleteMutation = useDeleteContactMutation();
  const updateStatusMutation = useUpdateContactStatusMutation();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  function handleConfirmDelete(id: number) {
    deleteMutation.mutate(id, {
      onSettled: () => setConfirmDeleteId(null),
    });
  }

  function handleQuickMarkViewed(id: number) {
    updateStatusMutation.mutate({
      id,
      payload: { status: "Viewed" },
    });
  }

  if (isLoading) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-[#E6EAE7] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F473A] border-t-transparent" />
          <p
            className="text-[13px] text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Loading contact inquiries...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#E6EAE7] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E6EAE7] bg-[#FAF8F5]">
              <th
                className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Client Name
              </th>
              <th
                className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Contact
              </th>
              <th
                className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Inquiry Type
              </th>
              <th
                className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Status
              </th>
              <th
                className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Received On
              </th>
              <th
                className="w-48 px-6 py-4 text-right text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6EAE7]">
            {contacts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-16 text-center text-[14px] text-[#65706B]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  No contact inquiries found.
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="transition-colors hover:bg-[#F3F5F3]/50"
                >
                  <td className="px-6 py-4">
                    <p
                      className="text-[14px] font-semibold text-[#202326]"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {contact.firstName} {contact.lastName}
                    </p>
                    <p
                      className="text-[11px] text-[#65706B]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Source: {contact.hearFrom}
                    </p>
                  </td>

                  <td className="px-6 py-4 space-y-0.5">
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-1.5 text-[12px] text-[#202326] hover:text-[#145C4B]"
                    >
                      <FiMail className="h-3 w-3 text-[#65706B]" />
                      <span>{contact.email}</span>
                    </a>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-1.5 text-[12px] text-[#65706B] hover:text-[#145C4B]"
                    >
                      <FiPhone className="h-3 w-3 text-[#65706B]" />
                      <span>{contact.phone}</span>
                    </a>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-md bg-[#FAF8F5] border border-[#E6EAE7] px-2.5 py-1 text-[12px] font-medium text-[#202326]">
                      {contact.type}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase ${
                        contact.status === "Viewed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {contact.status}
                    </span>
                  </td>

                  <td
                    className="px-6 py-4 text-[13px] text-[#65706B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {formatDate(contact.createdAt)}
                  </td>

                  <td className="px-6 py-4 text-right">
                    {confirmDeleteId === contact.id ? (
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          disabled={deleteMutation.isPending}
                          onClick={() => handleConfirmDelete(contact.id)}
                          className="rounded-lg bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-lg border border-[#DCE2DE] px-2 py-1 text-[11px] font-medium text-[#65706B] hover:bg-[#F3F5F3]"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2">
                        {contact.status === "Pending" && (
                          <button
                            type="button"
                            title="Mark as Viewed"
                            onClick={() => handleQuickMarkViewed(contact.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 px-2.5 py-1.5 text-[12px] font-medium text-emerald-700 hover:bg-emerald-50"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            <FiCheck className="h-3.5 w-3.5" />
                            <span>Viewed</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onViewDetails(contact)}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] px-2.5 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#FAF8F5]"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          <FiEye className="h-3.5 w-3.5 text-[#145C4B]" />
                          <span>Details</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(contact.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-[12px] font-medium text-red-600 transition-colors hover:bg-red-50"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          <FiTrash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

