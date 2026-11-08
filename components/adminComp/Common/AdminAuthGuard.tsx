"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isSuperAdminSession, useAdminAuthStore } from "@/features/admin/useAdminAuthStore";
import AdminNotFoundView from "./AdminNotFoundView";

interface AdminAuthGuardProps {
  children: React.ReactNode;
  mode: "protected" | "guest-only";
  requireSuperAdmin?: boolean;
}

export default function AdminAuthGuard({
  children,
  mode,
  requireSuperAdmin = false,
}: AdminAuthGuardProps) {
  const router = useRouter();
  const accessToken = useAdminAuthStore((state) => state.accessToken);
  const currentUser = useAdminAuthStore((state) => state.user);
  const hasHydrated = useAdminAuthStore((state) => state.hasHydrated);

  const isSuperAdmin = isSuperAdminSession(currentUser, accessToken);

  useEffect(() => {
    if (!hasHydrated) return;

    if (mode === "guest-only" && accessToken) {
      if (isSuperAdmin) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/admin/contacts");
      }
      return;
    }

    if (mode === "protected" && accessToken && requireSuperAdmin && !isSuperAdmin) {
      router.replace("/admin/contacts");
    }
  }, [hasHydrated, mode, accessToken, requireSuperAdmin, isSuperAdmin, router]);

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F5F3]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F473A] border-t-transparent" />
      </div>
    );
  }

  // On /admin/login: if user already has a token, redirect out
  if (mode === "guest-only" && accessToken) {
    return null;
  }

  // On protected admin routes: if no token, render 404 Not Found
  if (mode === "protected" && !accessToken) {
    return <AdminNotFoundView />;
  }

  // If a SuperAdmin-only page is visited by a non-SuperAdmin, block rendering
  if (mode === "protected" && requireSuperAdmin && !isSuperAdmin) {
    return null;
  }

  return <>{children}</>;
}

