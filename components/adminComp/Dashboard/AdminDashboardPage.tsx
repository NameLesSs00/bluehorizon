"use client";

import { useState } from "react";
import { FiPlus, FiShield, FiUsers } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { isSuperAdminSession, useAdminAuthStore } from "@/features/admin/useAdminAuthStore";
import { useAdminsQuery } from "@/features/admin/useAdminQueries";
import AdminsTable from "./AdminsTable";
import AddAdminModal from "./AddAdminModal";

export default function AdminDashboardPage() {
  const currentUser = useAdminAuthStore((state) => state.user);
  const accessToken = useAdminAuthStore((state) => state.accessToken);
  const isSuperAdmin = isSuperAdminSession(currentUser, accessToken);

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const {
    data: adminsData,
    isLoading,
  } = useAdminsQuery({
    PageNumber: pageNumber,
    PageSize: pageSize,
  });

  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);

  const admins = adminsData?.items ?? [];
  const totalCount = adminsData?.totalCount ?? admins.length;
  const totalPages = adminsData?.totalPages ?? 1;
  const hasPreviousPage = adminsData?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = adminsData?.hasNextPage ?? pageNumber < totalPages;

  return (
    <AdminShell requireSuperAdmin={true}>
      <div className="w-full space-y-8">
        {/* Page Title & Metrics */}
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ADMINISTRATORS CONTROLLER
          </p>
          <h1
            className="mt-1 text-[28px] font-semibold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Administrators Management
          </h1>
          <p
            className="mt-1 text-[13px] text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Manage team administrator accounts, credentials, and access permissions.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-2xl border border-[#E2E8F3] bg-white p-6 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2B5FA6]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  CURRENT SESSION
                </p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                    isSuperAdmin
                      ? "bg-[#2B5FA6]/10 text-[#2B5FA6]"
                      : "bg-[#E2E8F3] text-[#65706B]"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {isSuperAdmin ? "Super Admin" : "Admin"}
                </span>
              </div>
              <h2
                className="mt-1 text-[20px] font-semibold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {currentUser?.fullName || "Administrator"}
              </h2>
              <p
                className="mt-0.5 text-[12px] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {currentUser?.email}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3A6B]/10 text-[#1B3A6B]">
              <FiShield className="h-6 w-6" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-[#E2E8F3] bg-white p-6 shadow-sm">
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2B5FA6]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                TOTAL ADMINISTRATORS
              </p>
              <h2
                className="mt-1 text-[28px] font-bold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {totalCount}
              </h2>
              <p
                className="mt-0.5 text-[12px] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Registered admin accounts
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B3A6B]/10 text-[#1B3A6B]">
              <FiUsers className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Action Header & Table */}
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2
              className="text-[20px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              All Administrators
            </h2>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAddAdminOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2B5FA6]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <FiPlus className="h-4 w-4" />
                <span>Add New Admin</span>
              </button>
            </div>
          </div>

          <AdminsTable
            admins={admins}
            isLoading={isLoading}
            pageNumber={pageNumber}
            totalPages={totalPages}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            onPageChange={(page) => setPageNumber(page)}
          />
        </div>

        <AddAdminModal
          isOpen={isAddAdminOpen}
          onClose={() => setIsAddAdminOpen(false)}
        />
      </div>
    </AdminShell>
  );
}
