"use client";

import AdminAuthGuard from "./AdminAuthGuard";
import AdminSidebar from "./AdminSidebar";

interface AdminShellProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

export default function AdminShell({
  children,
  requireSuperAdmin = false,
}: AdminShellProps) {
  return (
    <AdminAuthGuard mode="protected" requireSuperAdmin={requireSuperAdmin}>
      <div className="flex min-h-screen flex-col bg-[#F3F5F3] lg:flex-row">
        {/* Persistent Left Sidebar - No Top Header */}
        <AdminSidebar />

        {/* Dynamic Page Content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <main className="flex-1 p-6 sm:p-8 lg:p-10">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}

