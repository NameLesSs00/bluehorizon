"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBookOpen,
  FiCheckSquare,
  FiEdit2,
  FiGrid,
  FiHelpCircle,
  FiInbox,
  FiKey,
  FiLink2,
  FiLogOut,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { LuBuilding, LuSparkles } from "react-icons/lu";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";
import { useLogoutMutation } from "@/features/admin/useAdminQueries";
import EditProfileModal from "@/components/adminComp/Dashboard/EditProfileModal";
import ChangePasswordModal from "@/components/adminComp/Dashboard/ChangePasswordModal";

interface AdminSidebarProps {
  onProfileModalStateChange?: (isOpen: boolean) => void;
}

export default function AdminSidebar({}: AdminSidebarProps) {
  const pathname = usePathname();
  const currentUser = useAdminAuthStore((state) => state.user);
  const logoutMutation = useLogoutMutation();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const navLinks = [
    {
      label: "Administrators",
      href: "/admin/dashboard",
      icon: FiUsers,
      active: pathname === "/admin/dashboard",
    },
    {
      label: "Contact Inquiries",
      href: "/admin/contacts",
      icon: FiInbox,
      active: pathname.startsWith("/admin/contacts"),
    },
    {
      label: "Articles & Blogs",
      href: "/admin/blogs",
      icon: FiBookOpen,
      active: pathname.startsWith("/admin/blogs"),
    },
    {
      label: "Project Types",
      href: "/admin/project-types",
      icon: LuBuilding,
      active: pathname.startsWith("/admin/project-types"),
    },
    {
      label: "Project Facilities",
      href: "/admin/project-facilities",
      icon: LuSparkles,
      active: pathname.startsWith("/admin/project-facilities"),
    },
    {
      label: "Rental Categories",
      href: "/admin/rental-categories",
      icon: FiGrid,
      active:
        pathname.startsWith("/admin/rental-categories") ||
        pathname.startsWith("/admin/property-categories"),
    },
    {
      label: "Rental Items",
      href: "/admin/rental-items",
      icon: FiCheckSquare,
      active:
        pathname.startsWith("/admin/rental-items") ||
        pathname.startsWith("/admin/property-category-items"),
    },
    {
      label: "FAQ / Questions",
      href: "/admin/questions",
      icon: FiHelpCircle,
      active: pathname.startsWith("/admin/questions"),
    },
    {
      label: "Site Links / Keys",
      href: "/admin/site-links",
      icon: FiLink2,
      active: pathname.startsWith("/admin/site-links"),
    },
  ];

  return (
    <>
      <aside className="flex w-full flex-col justify-between border-r border-[#E6EAE7] bg-[#0F473A] text-white lg:min-h-screen lg:w-72 shrink-0">
        <div className="flex flex-col p-6">
          {/* Logo & Portal Identity */}
          <Link href="/" className="inline-block">
            <div className="relative h-14 w-44">
              <Image
                src="/logo.svg"
                alt="Blue Horizon"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          <div className="mt-4 rounded-xl bg-white/10 px-3.5 py-2">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#CBDFD5]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              ADMINISTRATION PORTAL
            </p>
            <p
              className="text-[13px] font-semibold text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Control Panel
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium transition-all ${
                    item.active
                      ? "bg-[#145C4B] font-semibold text-white shadow-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Current User & Quick Actions */}
        <div className="border-t border-white/15 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
              <FiShield className="h-5 w-5" />
            </div>
            <div className="overflow-hidden">
              <p
                className="truncate text-[13px] font-semibold text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {currentUser?.fullName || "Administrator"}
              </p>
              <p
                className="truncate text-[11px] text-[#CBDFD5]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {currentUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1.5 pt-2">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(true)}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <FiEdit2 className="h-3.5 w-3.5 text-[#CBDFD5]" />
              <span>Edit My Profile</span>
            </button>

            <button
              type="button"
              onClick={() => setIsChangePasswordOpen(true)}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <FiKey className="h-3.5 w-3.5 text-[#CBDFD5]" />
              <span>Change My Password</span>
            </button>

            <button
              type="button"
              disabled={logoutMutation.isPending}
              onClick={() => logoutMutation.mutate()}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] text-red-300 transition-colors hover:bg-red-500/20 hover:text-red-100 disabled:opacity-50"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <FiLogOut className="h-3.5 w-3.5" />
              <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Profile & Password Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </>
  );
}
