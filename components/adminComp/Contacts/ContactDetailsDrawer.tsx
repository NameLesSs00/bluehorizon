"use client";

import { FiCalendar, FiCheckCircle, FiClock, FiMail, FiPhone, FiTag } from "react-icons/fi";
import { ContactItem } from "@/models/contact";
import { useUpdateContactStatusMutation } from "@/features/contacts/useContactsQueries";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";

interface ContactDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactItem | null;
}

function formatDate(dateString?: string | null): string {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

export default function ContactDetailsDrawer({
  isOpen,
  onClose,
  contact,
}: ContactDetailsDrawerProps) {
  const updateStatusMutation = useUpdateContactStatusMutation();

  if (!contact) return null;

  const isPending = contact.status === "Pending";

  function handleToggleStatus() {
    if (!contact) return;
    const nextStatus = isPending ? "Viewed" : "Pending";
    updateStatusMutation.mutate({
      id: contact.id,
      payload: { status: nextStatus },
    });
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Inquiry Details"
      subtitle={`${contact.firstName} ${contact.lastName}`}
      maxWidthClass="max-w-xl"
    >
      <div className="flex h-full flex-col justify-between space-y-6">
        <div className="space-y-6">
          {/* Header Status Bar */}
          <div className="flex items-center justify-between rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-4">
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-wider text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Inquiry Status
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${
                    contact.status === "Viewed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {contact.status === "Viewed" ? (
                    <FiCheckCircle className="h-3.5 w-3.5" />
                  ) : (
                    <FiClock className="h-3.5 w-3.5" />
                  )}
                  <span>{contact.status}</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={updateStatusMutation.isPending}
              onClick={handleToggleStatus}
              className={`rounded-xl px-4 py-2 text-[12px] font-semibold transition-colors ${
                isPending
                  ? "bg-[#1B3A6B] text-white hover:bg-[#2B5FA6]"
                  : "border border-[#D0D9EA] bg-white text-[#202326] hover:bg-[#F0F3FA]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {updateStatusMutation.isPending
                ? "Updating..."
                : isPending
                ? "Mark as Viewed"
                : "Mark as Pending"}
            </button>
          </div>

          {/* Contact Information */}
          <div className="rounded-xl border border-[#E2E8F3] bg-white p-5 space-y-4">
            <h4
              className="text-[13px] font-bold uppercase tracking-wider text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Contact Person
            </h4>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[11px] text-[#65706B]">Full Name</p>
                <p className="mt-0.5 text-[14px] font-semibold text-[#202326]">
                  {contact.firstName} {contact.lastName}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-[#65706B]">Inquiry Type</p>
                <span className="mt-0.5 inline-flex items-center gap-1 rounded-md bg-[#F0F3FA] px-2.5 py-0.5 text-[12px] font-medium text-[#202326]">
                  <FiTag className="h-3 w-3 text-[#2B5FA6]" />
                  <span>{contact.type}</span>
                </span>
              </div>

              <div>
                <p className="text-[11px] text-[#65706B]">Email Address</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] text-[#2B5FA6] hover:underline"
                >
                  <FiMail className="h-3.5 w-3.5" />
                  <span>{contact.email}</span>
                </a>
              </div>

              <div>
                <p className="text-[11px] text-[#65706B]">Phone Number</p>
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] text-[#2B5FA6] hover:underline"
                >
                  <FiPhone className="h-3.5 w-3.5" />
                  <span>{contact.phone}</span>
                </a>
              </div>

              <div>
                <p className="text-[11px] text-[#65706B]">Discovery Source</p>
                <p className="mt-0.5 text-[13px] text-[#202326]">
                  {contact.hearFrom}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-[#65706B]">Received On</p>
                <p className="mt-0.5 text-[13px] text-[#65706B]">
                  {formatDate(contact.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Message / Notes */}
          <div className="rounded-xl border border-[#E2E8F3] bg-white p-5 space-y-2">
            <h4
              className="text-[13px] font-bold uppercase tracking-wider text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Client Message &amp; Notes
            </h4>
            <div className="rounded-lg bg-[#F9F7F4] p-4 text-[13px] leading-relaxed text-[#202326] whitespace-pre-wrap">
              {contact.notes || "No additional notes provided by client."}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-[#E2E8F3] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#D0D9EA] px-5 py-2.5 text-[13px] font-medium text-[#65706B] transition-colors hover:bg-[#F0F3FA]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Close Panel
          </button>
        </div>
      </div>
    </AdminSlideDrawer>
  );
}

