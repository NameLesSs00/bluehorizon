"use client";

import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { AdminUserItem } from "@/models/admin";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";
import { useDeleteAdminMutation } from "@/features/admin/useAdminQueries";

interface AdminsTableProps {
  admins: AdminUserItem[];
  isLoading: boolean;
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
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

export default function AdminsTable({
  admins,
  isLoading,
  pageNumber,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}: AdminsTableProps) {
  const currentUser = useAdminAuthStore((state) => state.user);
  const deleteAdminMutation = useDeleteAdminMutation();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  function handleConfirmDelete(id: string) {
    deleteAdminMutation.mutate(id, {
      onSettled: () => setConfirmDeleteId(null),
    });
  }

  if (isLoading) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-[#E2E8F3] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1B3A6B] border-t-transparent" />
          <p
            className="text-[13px] text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Loading administrators...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#E2E8F3] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F3] bg-[#F9F7F4]">
              <th
                className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Administrator
              </th>
              <th
                className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Role
              </th>
              <th
                className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Email
              </th>
              <th
                className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Created At
              </th>
              <th
                className="px-6 py-4 text-right text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F3]">
            {admins.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-16 text-center text-[14px] text-[#65706B]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  No administrators found or access is restricted.
                </td>
              </tr>
            ) : (
              admins.map((admin) => {
                const isCurrentUser =
                  currentUser?.id === admin.id ||
                  (currentUser?.email &&
                    admin.email.toLowerCase() ===
                      currentUser.email.toLowerCase());

                const isAdminSuperAdmin =
                  admin.role === "SuperAdmin" ||
                  admin.roles?.includes("SuperAdmin");

                return (
                  <tr
                    key={admin.id}
                    className="transition-colors hover:bg-[#F0F3FA]/50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B3A6B]/10 text-[#1B3A6B]">
                          <FiUser className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[15px] font-semibold text-[#202326]"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {admin.username}
                            </span>
                            {isCurrentUser && (
                              <span
                                className="rounded-full bg-[#2B5FA6]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-[#2B5FA6]"
                                style={{ fontFamily: "var(--font-inter)" }}
                              >
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                          isAdminSuperAdmin
                            ? "bg-[#2B5FA6]/10 text-[#2B5FA6]"
                            : "bg-[#E2E8F3] text-[#4F5955]"
                        }`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {isAdminSuperAdmin ? "Super Admin" : "Admin"}
                      </span>
                    </td>

                    <td
                      className="px-6 py-5 text-[14px] text-[#202326]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {admin.email}
                    </td>

                    <td
                      className="px-6 py-5 text-[14px] text-[#65706B]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {formatDate(admin.createdAt)}
                    </td>

                    <td className="px-6 py-5 text-right">
                      {confirmDeleteId === admin.id ? (
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            disabled={deleteAdminMutation.isPending}
                            onClick={() => handleConfirmDelete(admin.id)}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            {deleteAdminMutation.isPending
                              ? "Deleting..."
                              : "Confirm"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-lg border border-[#D0D9EA] px-2.5 py-1.5 text-[12px] font-medium text-[#65706B] hover:bg-[#F0F3FA]"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(admin.id)}
                          disabled={Boolean(isCurrentUser)}
                          title={
                            isCurrentUser
                              ? "Cannot delete your own active session"
                              : "Delete administrator"
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-[12px] font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          <FiTrash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t border-[#E2E8F3] bg-[#F9F7F4] px-6 py-4">
        <p
          className="text-[13px] text-[#65706B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Page <span className="font-semibold text-[#202326]">{pageNumber}</span>{" "}
          of{" "}
          <span className="font-semibold text-[#202326]">
            {Math.max(1, totalPages)}
          </span>
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!hasPreviousPage && pageNumber <= 1}
            onClick={() => onPageChange(Math.max(1, pageNumber - 1))}
            className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:cursor-not-allowed disabled:opacity-45"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            disabled={!hasNextPage && pageNumber >= totalPages}
            onClick={() => onPageChange(pageNumber + 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:cursor-not-allowed disabled:opacity-45"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>Next</span>
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
