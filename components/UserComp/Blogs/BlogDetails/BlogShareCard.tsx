"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useTranslation } from "@/features/i18n/useTranslation";

interface BlogShareCardProps {
  title: string;
}

export default function BlogShareCard({ title }: BlogShareCardProps) {
  const { t } = useTranslation();

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const handleCopy = async () => {
    try {
      const url = getShareUrl();
      if (url) {
        await navigator.clipboard.writeText(url);
        toast.success(t("blogs.details.linkCopied"));
      }
    } catch {
      toast.error(t("blogs.details.copyFailed"));
    }
  };

  const handleEmail = () => {
    const url = getShareUrl();
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(`Check out this article: ${url}`)}`;
    window.location.href = mailtoUrl;
  };

  const handleWhatsApp = () => {
    const url = getShareUrl();
    const waUrl = `https://wa.me/?text=${encodeURIComponent(
      `${title}\n${url}`
    )}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleShare = async () => {
    const url = getShareUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-sm">
      <span
        className="block text-xs font-bold uppercase tracking-wider text-[#6B7570] mb-3.5"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {t("blogs.details.shareArticle")}
      </span>

      <div className="flex items-center gap-2">
        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          className="flex flex-1 items-center justify-center gap-2 rounded-[12px] bg-[#F0F3FA] px-3.5 py-2.5 text-xs font-semibold text-[#202326] transition-all duration-200 hover:bg-[#E5ECF6] active:scale-95"
          style={{ fontFamily: "var(--font-inter)" }}
          aria-label={t("blogs.details.copyLink")}
        >
          <Image
            src="/Blogs/BlogDetails/icon-link.svg"
            alt=""
            width={16}
            height={16}
          />
          <span className="truncate">{t("blogs.details.copyLink")}</span>
        </button>

        {/* WhatsApp Share Button */}
        <button
          onClick={handleWhatsApp}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#F0F3FA] text-[#202326] transition-all duration-200 hover:bg-[#25D366] hover:text-white active:scale-95"
          aria-label={t("blogs.details.shareViaWhatsApp")}
        >
          <Image
            src="/Blogs/BlogDetails/icon-whatsapp.svg"
            alt=""
            width={16}
            height={16}
          />
        </button>

        {/* Email Share Button */}
        <button
          onClick={handleEmail}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#F0F3FA] text-[#202326] transition-all duration-200 hover:bg-[#2B5FA6] hover:text-white active:scale-95"
          aria-label={t("blogs.details.shareViaEmail")}
        >
          <Image
            src="/Blogs/BlogDetails/icon-mail.svg"
            alt=""
            width={16}
            height={16}
          />
        </button>

        {/* Native Web Share Button (if available) */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={handleShare}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#F0F3FA] text-[#202326] transition-all duration-200 hover:bg-[#1B3A6B] hover:text-white active:scale-95"
            aria-label="Share"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
