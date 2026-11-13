"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

interface FooterSocialLinksProps {
  isLoading: boolean;
  whatsappUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
}

export default function FooterSocialLinks({
  isLoading,
  whatsappUrl,
  instagramUrl,
  facebookUrl,
  linkedinUrl,
}: FooterSocialLinksProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-[18px] w-[18px] animate-pulse rounded-full bg-white/20"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center sm:justify-end gap-4 sm:w-44">
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="text-[#CBDFD5] transition-transform hover:scale-110 hover:text-white"
        >
          <FaWhatsapp className="h-[18px] w-[18px]" />
        </a>
      )}
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="transition-transform hover:scale-110 hover:opacity-90"
        >
          <Image
            src="/HomePage/footer/instagram.svg"
            alt="Instagram"
            width={18}
            height={18}
            className="h-[18px] w-[18px]"
          />
        </a>
      )}
      {facebookUrl && (
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="transition-transform hover:scale-110 hover:opacity-90"
        >
          <Image
            src="/HomePage/footer/facebook.svg"
            alt="Facebook"
            width={18}
            height={18}
            className="h-[18px] w-[18px]"
          />
        </a>
      )}
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="transition-transform hover:scale-110 hover:opacity-90"
        >
          <Image
            src="/HomePage/footer/linkedin.svg"
            alt="LinkedIn"
            width={18}
            height={18}
            className="h-[18px] w-[18px]"
          />
        </a>
      )}
    </div>
  );
}

