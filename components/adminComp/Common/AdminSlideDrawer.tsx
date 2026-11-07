"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";

interface AdminSlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export default function AdminSlideDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidthClass = "max-w-lg",
}: AdminSlideDrawerProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide Drawer on the Right */}
      <div
        className={`relative z-10 flex h-full w-full ${maxWidthClass} flex-col bg-white shadow-2xl border-l border-[#E6EAE7] animate-in slide-in-from-right duration-200`}
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#E6EAE7] px-6 py-5">
          <div>
            <h3
              className="text-[18px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {title}
            </h3>
            {subtitle && (
              <p
                className="mt-0.5 text-[12px] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#65706B] transition-colors hover:bg-[#F3F5F3] hover:text-[#202326]"
            aria-label="Close panel"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

