"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";
import AdminNotFoundView from "./AdminNotFoundView";

interface AdminAuthGuardProps {
  children: React.ReactNode;
  mode: "protected" | "guest-only";
}

export default function AdminAuthGuard({
  children,
  mode,
}: AdminAuthGuardProps) {
  const router = useRouter();
  const accessToken = useAdminAuthStore((state) => state.accessToken);
  const hasHydrated = useAdminAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (mode === "guest-only" && accessToken) {
      router.replace("/admin/dashboard");
    }
  }, [hasHydrated, mode, accessToken, router]);

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F5F3]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F473A] border-t-transparent" />
      </div>
    );
  }

  // On /admin/login: if user already has a token, redirect to /admin/dashboard
  if (mode === "guest-only" && accessToken) {
    return null;
  }

  // On protected admin routes: if no token, render 404 Not Found
  if (mode === "protected" && !accessToken) {
    return <AdminNotFoundView />;
  }

  return <>{children}</>;
}

