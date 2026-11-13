"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AdminAuthGuard mode="protected" requireSuperAdmin={requireSuperAdmin}>
      <div className="min-h-screen bg-[#F3F5F3] lg:flex">
        {/* Mobile Header Bar (Only visible on screens < lg) */}
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#0B382E] bg-[#0F473A] px-4 text-white sm:px-6 lg:hidden">
          <Link href="/admin/dashboard" className="inline-flex items-center">
            <div className="relative h-9 w-36">
              <Image
                src="/logo-white.png"
                alt="Blue Horizon"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle admin navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
          >
            {mobileMenuOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </button>
        </header>

        {/* Mobile Drawer Backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar Container: Drawer on mobile (< lg), Sticky Sidebar on desktop (lg+) */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-72 lg:shrink-0 lg:transform-none ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <AdminSidebar onNavigate={() => setMobileMenuOpen(false)} />
        </div>

        {/* Dynamic Page Content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <main className="flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
