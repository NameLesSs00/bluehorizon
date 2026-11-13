"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";
import { useUpdateAdminProfileMutation } from "@/features/admin/useAdminQueries";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
}: EditProfileModalProps) {
  const currentUser = useAdminAuthStore((state) => state.user);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setUserName(currentUser.fullName || "");
      setEmail(currentUser.email || "");
    }
  }, [isOpen, currentUser]);

  const updateProfileMutation = useUpdateAdminProfileMutation(() => {
    onClose();
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userName.trim() || !email.trim()) {
      toast.error("Username and email are required.");
      return;
    }

    // Phone number is hidden and automatically sent as "00000000000" by adminApi
    updateProfileMutation.mutate({
      userName: userName.trim(),
      email: email.trim(),
    });
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Edit My Profile"
      subtitle="Update your administrator display name and contact email"
      maxWidthClass="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between" noValidate>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="edit-profile-username"
              className="block text-[12px] font-medium text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Username / Full Name
            </label>
            <input
              id="edit-profile-username"
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter username"
              className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          <div>
            <label
              htmlFor="edit-profile-email"
              className="block text-[12px] font-medium text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Email Address
            </label>
            <input
              id="edit-profile-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
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
            disabled={updateProfileMutation.isPending}
            className="rounded-xl bg-[#1B3A6B] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2B5FA6] disabled:opacity-65"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </AdminSlideDrawer>
  );
}
