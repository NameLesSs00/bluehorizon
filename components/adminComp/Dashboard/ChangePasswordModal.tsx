"use client";

import { FormEvent, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";
import { useUpdatePasswordMutation } from "@/features/admin/useAdminQueries";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const currentUser = useAdminAuthStore((state) => state.user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const updatePasswordMutation = useUpdatePasswordMutation(() => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    updatePasswordMutation.mutate({
      oldPassword,
      newPassword,
      confirmPassword,
    });
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Change My Password"
      subtitle={currentUser?.email ? `Updating credentials for ${currentUser.email}` : undefined}
      maxWidthClass="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between" noValidate>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="current-user-old-password"
              className="block text-[12px] font-medium text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Current Password
            </label>
            <input
              id="current-user-old-password"
              type={showPasswords ? "text" : "password"}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          <div>
            <label
              htmlFor="current-user-new-password"
              className="block text-[12px] font-medium text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              New Password
            </label>
            <input
              id="current-user-new-password"
              type={showPasswords ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          <div>
            <label
              htmlFor="current-user-confirm-password"
              className="block text-[12px] font-medium text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Confirm New Password
            </label>
            <div className="relative mt-1.5">
              <input
                id="current-user-confirm-password"
                type={showPasswords ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-[#D0D9EA] py-2.5 pr-10 pl-3.5 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
                style={{ fontFamily: "var(--font-inter)" }}
              />
              <button
                type="button"
                onClick={() => setShowPasswords((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#65706B] hover:text-[#202326]"
              >
                {showPasswords ? (
                  <FiEyeOff className="h-4 w-4" />
                ) : (
                  <FiEye className="h-4 w-4" />
                )}
              </button>
            </div>
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
            disabled={updatePasswordMutation.isPending}
            className="rounded-xl bg-[#1B3A6B] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2B5FA6] disabled:opacity-65"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {updatePasswordMutation.isPending
              ? "Updating..."
              : "Update Password"}
          </button>
        </div>
      </form>
    </AdminSlideDrawer>
  );
}
