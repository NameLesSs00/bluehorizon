"use client";

import { FormEvent, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";
import { useAddAdminMutation } from "@/features/admin/useAdminQueries";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAdminModal({ isOpen, onClose }: AddAdminModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const addAdminMutation = useAddAdminMutation(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    onClose();
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    addAdminMutation.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
    });
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Administrator"
      subtitle="Create credentials and grant dashboard access"
      maxWidthClass="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between" noValidate>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="add-admin-first-name"
                className="block text-[12px] font-medium text-[#202326]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                First Name
              </label>
              <input
                id="add-admin-first-name"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Pola"
                className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>

            <div>
              <label
                htmlFor="add-admin-last-name"
                className="block text-[12px] font-medium text-[#202326]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Last Name
              </label>
              <input
                id="add-admin-last-name"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Samy"
                className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="add-admin-email"
              className="block text-[12px] font-medium text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Email Address
            </label>
            <input
              id="add-admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bluehorizon.com"
              className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          <div>
            <label
              htmlFor="add-admin-password"
              className="block text-[12px] font-medium text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Password
            </label>
            <div className="relative mt-1.5">
              <input
                id="add-admin-password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Strong password (e.g. Pola123!)"
                className="w-full rounded-xl border border-[#DCE2DE] py-2.5 pr-10 pl-3.5 text-[13px] text-[#202326] focus:border-[#0F473A] focus:outline-none"
                style={{ fontFamily: "var(--font-inter)" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#65706B] hover:text-[#202326]"
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 w-4" />
                ) : (
                  <FiEye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#E6EAE7] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#DCE2DE] px-4 py-2.5 text-[13px] font-medium text-[#65706B] transition-colors hover:bg-[#F3F5F3]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={addAdminMutation.isPending}
            className="rounded-xl bg-[#0F473A] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#145C4B] disabled:opacity-65"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {addAdminMutation.isPending ? "Creating..." : "Create Admin"}
          </button>
        </div>
      </form>
    </AdminSlideDrawer>
  );
}
