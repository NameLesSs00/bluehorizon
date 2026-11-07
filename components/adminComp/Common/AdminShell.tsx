"use client";

import AdminAuthGuard from "./AdminAuthGuard";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard mode="protected">
      <div className="flex min-h-screen flex-col bg-[#F3F5F3] lg:flex-row">
        {/* Persistent Left Sidebar - No Top Header */}
        <AdminSidebar />

        {/* Dynamic Page Content */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          <main className="flex-1 p-6 sm:p-8 lg:p-10">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}

