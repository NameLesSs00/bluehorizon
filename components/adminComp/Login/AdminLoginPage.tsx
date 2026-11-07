"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiEyeOff, FiLock, FiMail, FiArrowRight } from "react-icons/fi";
import { toast } from "sonner";
import AdminAuthGuard from "@/components/adminComp/Common/AdminAuthGuard";
import { useLoginMutation } from "@/features/admin/useAdminQueries";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLoginMutation();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      toast.error("Please enter both your email and password.");
      return;
    }

    loginMutation.mutate({
      email: trimmedEmail,
      password,
    });
  }

  return (
    <AdminAuthGuard mode="guest-only">
      <div className="flex min-h-screen w-full flex-col lg:flex-row bg-[#FAF8F5]">
        {/* Left Side: Visual Image Panel */}
        <div className="relative h-72 w-full lg:h-auto lg:w-1/2 xl:w-[55%] overflow-hidden bg-[#0F473A]">
          <Image
            src="/admin/Login/loginPageImage.png"
            alt="Blue Horizon Red Sea Properties"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F473A]/85 via-[#0F473A]/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 lg:p-16 text-white">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#CBDFD5]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              BLUE HORIZON PORTAL
            </p>
            <h2
              className="mt-2 max-w-lg text-[26px] sm:text-[34px] font-semibold leading-[1.2] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Manage Premier Red Sea Developments &amp; Luxury Properties
            </h2>
            <p
              className="mt-3 max-w-md text-[14px] leading-[1.6] text-white/85"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Centralized administration for compounds, property listings, and
              team access across Hurghada and the Red Sea coast.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-md">
            <Link href="/" className="inline-block">
              <div className="relative h-16 w-52">
                <Image
                  src="/logo.svg"
                  alt="Blue Horizon"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <div className="mt-8">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#145C4B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                ADMINISTRATION ACCESS
              </p>
              <h1
                className="mt-2 text-[30px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Sign in to your account
              </h1>
              <p
                className="mt-2 text-[14px] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Enter your administrator credentials to access the dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-[13px] font-medium text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Email Address
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#65706B]">
                    <FiMail className="h-4 w-4" />
                  </span>
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@realestate.com"
                    className="w-full rounded-xl border border-[#DCE2DE] bg-white py-3.5 pr-4 pl-11 text-[14px] text-[#202326] placeholder-[#9BA5A0] transition-colors focus:border-[#0F473A] focus:outline-none"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-[13px] font-medium text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#65706B]">
                    <FiLock className="h-4 w-4" />
                  </span>
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-[#DCE2DE] bg-white py-3.5 pr-11 pl-11 text-[14px] text-[#202326] placeholder-[#9BA5A0] transition-colors focus:border-[#0F473A] focus:outline-none"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#65706B] transition-colors hover:text-[#202326]"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-4 w-4" />
                    ) : (
                      <FiEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F473A] px-6 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#145C4B] disabled:cursor-not-allowed disabled:opacity-65"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {loginMutation.isPending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in to Dashboard</span>
                    <FiArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}

