"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AdminRole, AuthTokenData, CurrentAdminSession } from "@/models/admin";

interface JwtPayload {
  nameid?: string;
  email?: string;
  unique_name?: string;
  role?: string | string[];
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
  exp?: number;
}

function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as JwtPayload;
  } catch {
    return null;
  }
}

export function isSuperAdminSession(
  user: CurrentAdminSession | null,
  accessToken?: string | null
): boolean {
  if (user?.role === "SuperAdmin" || user?.roles?.includes("SuperAdmin")) {
    return true;
  }

  if (accessToken) {
    const claims = parseJwtPayload(accessToken);
    const jwtRole =
      claims?.role ||
      claims?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (Array.isArray(jwtRole) && jwtRole.includes("SuperAdmin")) {
      return true;
    }
    if (typeof jwtRole === "string" && jwtRole === "SuperAdmin") {
      return true;
    }
  }

  return false;
}

interface AdminAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: CurrentAdminSession | null;
  hasHydrated: boolean;
  setHasHydrated: (status: boolean) => void;
  setAuth: (data: AuthTokenData) => void;
  updateCurrentUser: (info: { userName: string; email: string }) => void;
  clearAuth: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      hasHydrated: false,

      setHasHydrated: (status) => set({ hasHydrated: status }),

      setAuth: (data) => {
        const claims = parseJwtPayload(data.accessToken);
        const jwtRole =
          claims?.role ||
          claims?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const resolvedRole: AdminRole =
          data.role ||
          (data.roles && data.roles[0]) ||
          (typeof jwtRole === "string" ? (jwtRole as AdminRole) : undefined) ||
          (Array.isArray(jwtRole) ? (jwtRole[0] as AdminRole) : undefined) ||
          "Admin";

        const resolvedRoles: AdminRole[] =
          data.roles && data.roles.length > 0
            ? data.roles
            : Array.isArray(jwtRole)
              ? (jwtRole as AdminRole[])
              : [resolvedRole];

        const sessionUser: CurrentAdminSession = {
          id: claims?.nameid || "",
          email: data.email || claims?.email || "",
          fullName: data.fullName || claims?.unique_name || "Admin",
          role: resolvedRole,
          roles: resolvedRoles,
        };

        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: sessionUser,
        });
      },

      updateCurrentUser: ({ userName, email }) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                fullName: userName,
                email,
              }
            : null,
        })),

      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),
    }),
    {
      name: "blue-horizon-admin-auth",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

