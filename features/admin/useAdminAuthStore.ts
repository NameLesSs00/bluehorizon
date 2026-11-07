"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthTokenData, CurrentAdminSession } from "@/models/admin";

interface JwtPayload {
  nameid?: string;
  email?: string;
  unique_name?: string;
  role?: string;
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
        const sessionUser: CurrentAdminSession = {
          id: claims?.nameid || "",
          email: data.email || claims?.email || "",
          fullName: data.fullName || claims?.unique_name || "Admin",
          role: claims?.role || "Admin",
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

