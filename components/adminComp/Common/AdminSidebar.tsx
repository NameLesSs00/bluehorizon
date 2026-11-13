"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiEdit2, FiKey, FiLogOut, FiShield } from "react-icons/fi";
import { isSuperAdminSession, useAdminAuthStore } from "@/features/admin/useAdminAuthStore";
import { useLogoutMutation } from "@/features/admin/useAdminQueries";
import EditProfileModal from "@/components/adminComp/Dashboard/EditProfileModal";
import ChangePasswordModal from "@/components/adminComp/Dashboard/ChangePasswordModal";
import { getAdminNavLinks } from "./adminNavLinks";

interface AdminSidebarProps {
  onProfileModalStateChange?: (isOpen: boolean) => void;
  onNavigate?: () => void;
}

export default function AdminSidebar({
  onNavigate,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const currentUser = useAdminAuthStore((state) => state.user);
  const accessToken = useAdminAuthStore((state) => state.accessToken);
  const logoutMutation = useLogoutMutation();

  const isSuperAdmin = isSuperAdminSession(currentUser, accessToken);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const allNavLinks = getAdminNavLinks(pathname);
  const visibleNavLinks = allNavLinks.filter(
    (item) => !item.superAdminOnly || isSuperAdmin
  );

  // Restore scroll position on route changes and ensure active element is in view
  useEffect(() => {
    if (!navRef.current) return;
    const savedScroll = sessionStorage.getItem("admin_sidebar_scroll");
    if (savedScroll) {
      navRef.current.scrollTop = Number(savedScroll);
    }
    const activeEl = navRef.current.querySelector<HTMLElement>(
      "[data-active='true']"
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }, [pathname]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    sessionStorage.setItem(
      "admin_sidebar_scroll",
      String(e.currentTarget.scrollTop)
    );
  };

  return (
    <>
      <aside className="flex h-full w-full flex-col justify-between border-r border-[#162E56] bg-[#1B3A6B] text-white shrink-0 overflow-hidden">
        {/* Top Header: Logo & Portal Identity */}
        <div className="shrink-0 p-6 pb-2">
          <Link
            href="/admin/dashboard"
            onClick={() => onNavigate?.()}
            className="inline-block"
          >
            <div className="relative h-14 w-44">
              <Image
                src="/logo-white.png"
                alt="Blue Horizon"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          <div className="mt-4 rounded-xl bg-white/10 px-3.5 py-2">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#C5D3E8]"
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
        </div>

        {/* Scrollable Navigation Links with Scroll Persistence */}
        <nav
          ref={navRef}
          onScroll={handleScroll}
          className="custom-admin-scrollbar flex-1 overflow-y-auto px-6 py-3 space-y-1.5"
        >
          {visibleNavLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={item.active ? "true" : undefined}
                onClick={() => {
                  if (navRef.current) {
                    sessionStorage.setItem(
                      "admin_sidebar_scroll",
                      String(navRef.current.scrollTop)
                    );
                  }
                  onNavigate?.();
                }}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-all ${
                  item.active
                    ? "bg-[#2B5FA6] font-semibold text-white shadow-xs"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer: Current User & Quick Actions */}
        <div className="shrink-0 border-t border-white/15 bg-[#1B3A6B] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
              <FiShield className="h-5 w-5" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <p
                  className="truncate text-[13px] font-semibold text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {currentUser?.fullName || "Administrator"}
                </p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                    isSuperAdmin
                      ? "bg-[#25D366]/20 text-[#6EE7B7]"
                      : "bg-white/15 text-white/90"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {isSuperAdmin ? "Super Admin" : "Admin"}
                </span>
              </div>
              <p
                className="truncate text-[11px] text-[#C5D3E8]"
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
              <FiEdit2 className="h-3.5 w-3.5 text-[#C5D3E8]" />
              <span>Edit My Profile</span>
            </button>

            <button
              type="button"
              onClick={() => setIsChangePasswordOpen(true)}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <FiKey className="h-3.5 w-3.5 text-[#C5D3E8]" />
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
