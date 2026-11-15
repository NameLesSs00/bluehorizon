import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ApiResponse, AuthTokenData } from "@/models/admin";

export type { ApiResponse };

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://realestate44.runasp.net";

export interface AuthCallbacks {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  onAuthSuccess: (data: AuthTokenData) => void;
  onAuthClear: () => void;
}

let authCallbacks: AuthCallbacks | null = null;

export function registerAuthCallbacks(callbacks: AuthCallbacks) {
  authCallbacks = callbacks;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authCallbacks ? authCallbacks.getAccessToken() : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.headers) {
      config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
      config.headers["Pragma"] = "no-cache";
      config.headers["Expires"] = "0";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const isAuthEndpoint =
      originalRequest?.url?.includes("/api/Auth/login") ||
      originalRequest?.url?.includes("/api/Auth/refresh-token") ||
      originalRequest?.url?.includes("/api/Auth/logout");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint &&
      typeof window !== "undefined" &&
      authCallbacks
    ) {
      const refreshToken = authCallbacks.getRefreshToken();
      if (!refreshToken) {
        authCallbacks.onAuthClear();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post<ApiResponse<AuthTokenData>>(
          `${API_BASE_URL}/api/Auth/refresh-token`,
          { refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data?.success && res.data.data?.accessToken) {
          authCallbacks.onAuthSuccess(res.data.data);
          const newAccessToken = res.data.data.accessToken;
          processQueue(null, newAccessToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return apiClient(originalRequest);
        } else {
          authCallbacks.onAuthClear();
          processQueue(error, null);
          return Promise.reject(error);
        }
      } catch (refreshError) {
        authCallbacks.onAuthClear();
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
