"use client";

import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { usePublicSiteSettingsQuery } from "@/features/keyValues/useKeyValuesQueries";

interface ContactChannel {
  icon: string;
  label: string;
  value: string;
  href?: string;
  target?: string;
  rel?: string;
}

export default function ContactInfoChannels() {
  const { data: settingsData, isLoading } = usePublicSiteSettingsQuery();
  const settings = settingsData?.map || {};

  const phone = settings["phone"] || "";
  const email = settings["email"] || "";
  const address = settings["address"] || "";
  const workingHours = settings["working_hours"] || "";
  const googleMapsUrl = settings["google_maps_url"] || "";

  const instagramUrl = settings["instagram"] || "";
  const facebookUrl = settings["facebook"] || "";
  const linkedinUrl = settings["linkedin"] || "";
  const whatsappUrl = settings["whatsapp"] || "";

  const cleanPhone = phone.replace(/\s+/g, "");

  const channels: ContactChannel[] = [
    {
      icon: "/ContactUs/icon-box.svg",
      label: "PHONE NUMBERS",
      value: phone,
      href: cleanPhone ? `tel:${cleanPhone}` : undefined,
    },
    {
      icon: "/ContactUs/icon-box (1).svg",
      label: "EMAIL ADDRESSES",
      value: email,
      href: email ? `mailto:${email}` : undefined,
    },
    {
      icon: "/ContactUs/icon-box (2).svg",
      label: "OUR OFFICE",
      value: address,
      href: googleMapsUrl || undefined,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      icon: "/ContactUs/icon-box (3).svg",
      label: "WORKING HOURS",
      value: workingHours,
    },
  ];

  return (
    <div className="lg:col-span-5">
      <p
        className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#145C4B]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        DIRECT REACH
      </p>

      <h2
        className="mt-2 text-[26px] sm:text-[30px] font-bold leading-tight tracking-tight text-[#202326]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        Our Contact Information
      </h2>

      <p
        className="mt-3 text-[13.5px] font-normal leading-[1.65] text-[#6B7570]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Have a question about a compound, resale unit, or rental
        investment? Connect with our dedicated property advisors through
        any of the channels below.
      </p>

      {/* 4 Contact Cards */}
      <div className="mt-8 space-y-3.5">
        {isLoading ? (
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-[18px] border border-[#E1E7E3] bg-white p-4 sm:p-5"
            >
              <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-[#E8F1EC]" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 animate-pulse rounded bg-[#E1E7E3]" />
                <div className="h-4 w-44 animate-pulse rounded bg-[#F3F5F3]" />
              </div>
            </div>
          ))
        ) : (
          channels
            .filter((item) => Boolean(item.value))
            .map((item) => {
              const content = (
                <div className="flex items-center gap-4 rounded-[18px] border border-[#E1E7E3] bg-white p-4 sm:p-5 transition-all duration-200 hover:border-[#145C4B]/40 hover:shadow-xs">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={48}
                      height={48}
                      className="h-12 w-12 object-contain"
                    />
                  </div>

                  <div>
                    <span
                      className="block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#6B7570]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="mt-0.5 block text-[14px] sm:text-[15px] font-bold text-[#202326]"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {item.value}
                    </span>
                  </div>
                </div>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  className="block transition-transform hover:-translate-y-0.5"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })
        )}
      </div>

      {/* Social Channels Bar */}
      <div className="mt-4 flex items-center justify-between rounded-[18px] border border-[#E1E7E3] bg-white p-4 sm:p-5 shadow-xs">
        <span
          className="text-[13px] sm:text-[14px] font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Follow Our Channels:
        </span>

        <div className="flex items-center gap-2.5">
          {isLoading ? (
            <div className="flex items-center gap-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 animate-pulse rounded-full bg-[#E8F1EC]"
                />
              ))}
            </div>
          ) : (
            <>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F473A] text-white shadow-xs transition-all duration-200 hover:bg-[#25D366] hover:scale-110 active:scale-95"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </a>
              )}

              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F473A] text-white shadow-xs transition-all duration-200 hover:bg-[#E1306C] hover:scale-110 active:scale-95"
                >
                  <FaInstagram className="h-4.5 w-4.5" />
                </a>
              )}

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F473A] text-white shadow-xs transition-all duration-200 hover:bg-[#0077B5] hover:scale-110 active:scale-95"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>
              )}

              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F473A] text-white shadow-xs transition-all duration-200 hover:bg-[#1877F2] hover:scale-110 active:scale-95"
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
