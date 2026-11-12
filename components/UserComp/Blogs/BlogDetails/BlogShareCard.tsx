"use client";

import Image from "next/image";
import { toast } from "sonner";

interface BlogShareCardProps {
  title: string;
}

export default function BlogShareCard({ title }: BlogShareCardProps) {
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
        toast.success("Article link copied to clipboard");
      }
    } catch {
      toast.error("Failed to copy link");
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
        // User cancelled or share dismissed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="rounded-[20px] border border-[#E1E7E3] bg-white p-5 sm:p-6 shadow-sm">
      <h3
        className="text-xs font-bold uppercase tracking-wider text-[#6B7570] mb-3.5"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Share this article:
      </h3>

      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex flex-col items-center justify-center gap-1.5 rounded-[12px] border border-[#E1E7E3] bg-[#FCFCFC] py-3 px-1 text-xs font-medium text-[#202326] transition-all hover:bg-[#E8F1EC] hover:border-[#145C4B]/40 hover:text-[#145C4B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Image
            src="/Blogs/BlogDetails/icon-copy.svg"
            alt="Copy"
            width={16}
            height={16}
          />
          <span className="text-[11px] sm:text-xs">Copy</span>
        </button>

        {/* Email Button */}
        <button
          type="button"
          onClick={handleEmail}
          className="flex flex-col items-center justify-center gap-1.5 rounded-[12px] border border-[#E1E7E3] bg-[#FCFCFC] py-3 px-1 text-xs font-medium text-[#202326] transition-all hover:bg-[#E8F1EC] hover:border-[#145C4B]/40 hover:text-[#145C4B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Image
            src="/Blogs/BlogDetails/icon-mail.svg"
            alt="Email"
            width={16}
            height={16}
          />
          <span className="text-[11px] sm:text-xs">Email</span>
        </button>

        {/* WhatsApp Button */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center gap-1.5 rounded-[12px] border border-[#E1E7E3] bg-[#FCFCFC] py-3 px-1 text-xs font-medium text-[#202326] transition-all hover:bg-[#E8F1EC] hover:border-[#145C4B]/40 hover:text-[#145C4B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Image
            src="/Blogs/BlogDetails/icon-chat.svg"
            alt="WhatsApp"
            width={16}
            height={16}
          />
          <span className="text-[11px] sm:text-xs">WhatsApp</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex flex-col items-center justify-center gap-1.5 rounded-[12px] border border-[#E1E7E3] bg-[#FCFCFC] py-3 px-1 text-xs font-medium text-[#202326] transition-all hover:bg-[#E8F1EC] hover:border-[#145C4B]/40 hover:text-[#145C4B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Image
            src="/Blogs/BlogDetails/icon-link.svg"
            alt="Share"
            width={16}
            height={16}
          />
          <span className="text-[11px] sm:text-xs">Share</span>
        </button>
      </div>
    </div>
  );
}

