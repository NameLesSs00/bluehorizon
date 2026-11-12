"use client";

import { useState } from "react";
import { toast } from "sonner";
import { StandaloneUnitItem } from "@/models/standaloneUnit";

interface StandaloneInquiryCardProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneInquiryCard({
  unit,
}: StandaloneInquiryCardProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formattedPrice =
    typeof unit.price === "number" && unit.price > 0
      ? `EGP ${unit.price.toLocaleString()}`
      : "Price on request";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitted(true);
    toast.success("Thank you! Our sales team will contact you shortly.");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
      <div className="sticky top-24 rounded-[20px] border border-[#E1E7E3] bg-white p-6 sm:p-7 shadow-sm">
        {/* Header with price */}
        <span
          className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Asking Price
        </span>
        <div
          className="mt-1 text-2xl sm:text-3xl font-bold text-[#145C4B]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {formattedPrice}
        </div>

        {/* Inquiry Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="inquiry-first-name"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              First Name *
            </label>
            <input
              id="inquiry-first-name"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Ahmed"
              className="mt-1.5 w-full rounded-[12px] border border-[#E1E7E3] bg-[#F3F5F3] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#145C4B] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="inquiry-last-name"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Last Name *
            </label>
            <input
              id="inquiry-last-name"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Ali"
              className="mt-1.5 w-full rounded-[12px] border border-[#E1E7E3] bg-[#F3F5F3] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#145C4B] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="inquiry-email"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Email Address *
            </label>
            <input
              id="inquiry-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="mt-1.5 w-full rounded-[12px] border border-[#E1E7E3] bg-[#F3F5F3] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#145C4B] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="inquiry-phone"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Phone Number *
            </label>
            <input
              id="inquiry-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+20 100 000 0000"
              className="mt-1.5 w-full rounded-[12px] border border-[#E1E7E3] bg-[#F3F5F3] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#145C4B] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="inquiry-message"
              className="block text-xs font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Message *
            </label>
            <textarea
              id="inquiry-message"
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="mt-1.5 w-full resize-none rounded-[12px] border border-[#E1E7E3] bg-[#F3F5F3] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#145C4B] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#145C4B] py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0F473A]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>{submitted ? "Inquiry Sent" : "Send Inquiry"}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </aside>
  );
}

