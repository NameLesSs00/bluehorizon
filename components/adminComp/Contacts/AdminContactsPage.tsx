"use client";

import { useState } from "react";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { ContactItem } from "@/models/contact";
import { useContactsQuery } from "@/features/contacts/useContactsQueries";
import ContactsTable from "./ContactsTable";
import ContactDetailsDrawer from "./ContactDetailsDrawer";

export default function AdminContactsPage() {
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: contacts = [], isLoading } = useContactsQuery();

  const pendingCount = contacts.filter((c) => c.status === "Pending").length;
  const viewedCount = contacts.filter((c) => c.status === "Viewed").length;

  function handleViewDetails(contact: ContactItem) {
    setSelectedContact(contact);
    setIsDrawerOpen(true);
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
            INQUIRIES &amp; LEADS CONTROLLER
          </p>
          <h1
            className="mt-1 text-[28px] font-semibold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Contact Inquiries
          </h1>
          <p
            className="mt-1 text-[13px] text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Review prospective buyer and investor messages, inquiries, and viewing requests.
          </p>
        </div>

        {/* Status Metrics Bar */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E6EAE7] bg-white p-5 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#65706B]">
              Total Inquiries
            </p>
            <p className="mt-1 text-[26px] font-bold text-[#202326]">
              {contacts.length}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Pending Review
            </p>
            <p className="mt-1 text-[26px] font-bold text-amber-900">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Viewed / Processed
            </p>
            <p className="mt-1 text-[26px] font-bold text-emerald-900">
              {viewedCount}
            </p>
          </div>
        </div>

        {/* Contacts Table (No create button, no refresh button) */}
        <ContactsTable
          contacts={contacts}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
        />

        {/* Right-Side Slide Drawer for Details */}
        <ContactDetailsDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          contact={selectedContact}
        />
      </div>
    </AdminShell>
  );
}

