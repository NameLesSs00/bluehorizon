"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCreateContactMutation } from "@/features/contacts/useContactsQueries";

interface ContactChannel {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    icon: "/ContactUs/icon-box.svg",
    label: "PHONE NUMBERS",
    value: "+20 123 456 7890",
    href: "tel:+201234567890",
  },
  {
    icon: "/ContactUs/icon-box (1).svg",
    label: "EMAIL ADDRESSES",
    value: "info@bluehorizon.com",
    href: "mailto:info@bluehorizon.com",
  },
  {
    icon: "/ContactUs/icon-box (2).svg",
    label: "OUR OFFICES",
    value: "Red Sea Coast: Hurghada Promenade, Egypt",
  },
  {
    icon: "/ContactUs/icon-box (3).svg",
    label: "WORKING HOURS",
    value: "Monday - Saturday: 9:00 AM - 9:00 PM",
  },
];

export default function ContactInfoSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const createMutation = useCreateContactMutation(() => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      notes: "",
    });
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone) {
      return;
    }

    createMutation.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      type: "BuyUnit",
      hearFrom: "SocialMedia",
      notes: formData.notes,
    });
  }

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
        {/* Left Column: Direct Reach Contact Information */}
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
            {CONTACT_CHANNELS.map((item) => {
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
                <a key={item.label} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          {/* Social Channels Bar */}
          <div className="mt-4 flex items-center justify-between rounded-[16px] border border-[#E1E7E3]/70 bg-[#F3F5F3] px-5 py-3.5">
            <span
              className="text-[13px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Follow Our Channels:
            </span>

            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E1E7E3] bg-white text-[11px] font-bold text-[#145C4B] transition-colors hover:bg-[#145C4B] hover:text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                IG
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E1E7E3] bg-white text-[11px] font-bold text-[#145C4B] transition-colors hover:bg-[#145C4B] hover:text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                in
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E1E7E3] bg-white text-[12px] font-bold text-[#145C4B] transition-colors hover:bg-[#145C4B] hover:text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                f
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E1E7E3] bg-white text-[11px] font-bold text-[#145C4B] transition-colors hover:bg-[#145C4B] hover:text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                X
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Send an Inquiry Form */}
        <div className="rounded-[24px] border border-[#E1E7E3] bg-white p-7 sm:p-10 shadow-xs lg:col-span-7">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            SEND AN INQUIRY
          </p>

          <h2
            className="mt-1.5 text-[26px] sm:text-[28px] font-bold tracking-tight text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            How Can We Help You?
          </h2>

          <p
            className="mt-2 text-[13.5px] font-normal leading-relaxed text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Fill out your details and our senior property advisor will reach out
            within 2 hours.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-first-name"
                  className="mb-1.5 block text-[12px] font-medium text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  First Name *
                </label>
                <input
                  id="contact-first-name"
                  type="text"
                  required
                  placeholder="e.g. Ahmed"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  className="w-full rounded-[12px] border border-transparent bg-[#F3F5F3] px-4 py-3 text-[14px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#145C4B]/40 focus:bg-white focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-last-name"
                  className="mb-1.5 block text-[12px] font-medium text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Last Name *
                </label>
                <input
                  id="contact-last-name"
                  type="text"
                  required
                  placeholder="e.g. Hassan"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  className="w-full rounded-[12px] border border-transparent bg-[#F3F5F3] px-4 py-3 text-[14px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#145C4B]/40 focus:bg-white focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
            </div>

            {/* Phone Number & Email Address */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-1.5 block text-[12px] font-medium text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Phone Number *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  placeholder="+20 100 000 0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full rounded-[12px] border border-transparent bg-[#F3F5F3] px-4 py-3 text-[14px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#145C4B]/40 focus:bg-white focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-[12px] font-medium text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full rounded-[12px] border border-transparent bg-[#F3F5F3] px-4 py-3 text-[14px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#145C4B]/40 focus:bg-white focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
            </div>

            {/* Message or Preferred Unit Details */}
            <div>
              <label
                htmlFor="contact-notes"
                className="mb-1.5 block text-[12px] font-medium text-[#202326]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Message or Preferred Unit Details *
              </label>
              <textarea
                id="contact-notes"
                required
                rows={4}
                placeholder="Tell us about the area, property type, or payment plan you are looking for..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                className="w-full resize-none rounded-[12px] border border-transparent bg-[#F3F5F3] p-4 text-[14px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#145C4B]/40 focus:bg-white focus:outline-none"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#145C4B] py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#0F473A] disabled:opacity-70"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>
                {createMutation.isPending ? "Sending..." : "Send Inquiry"}
              </span>
              <Image
                src="/ContactUs/icon-send.svg"
                alt=""
                width={18}
                height={18}
                className="h-4 w-4 object-contain"
              />
            </button>

            {/* Privacy Terms Notice */}
            <div className="flex items-center justify-center gap-2 pt-2 text-[12px] text-[#6B7570]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-[#6B7570]"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span style={{ fontFamily: "var(--font-inter)" }}>
                Your information is kept strictly confidential and protected
                under our privacy terms.
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

