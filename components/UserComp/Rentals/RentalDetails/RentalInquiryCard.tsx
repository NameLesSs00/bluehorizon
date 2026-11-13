"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FiSend } from "react-icons/fi";
import { RentalItem } from "@/models/rental";

interface RentalInquiryCardProps {
  unit: RentalItem;
}

export default function RentalInquiryCard({ unit }: RentalInquiryCardProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const primaryPrice =
    unit.prices?.find((p) => p.currency.toUpperCase() === "EGP") ||
    unit.prices?.[0];

  const priceFormatted = primaryPrice
    ? `${primaryPrice.currency.toUpperCase()} ${Number(primaryPrice.price).toLocaleString()}`
    : "Price upon inquiry";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in First Name, Email, and Phone Number.");
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success(
        `Thank you ${firstName}! Your inquiry for ${unit.name} has been received.`
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
      <div className="sticky top-28 rounded-[24px] border border-[#E1E7E3] bg-white p-6 sm:p-7 shadow-lg">
        {/* Asking Price Header */}
        <div>
          <span
            className="block text-[11px] font-bold uppercase tracking-wider text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ASKING PRICE
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className="text-2xl sm:text-3xl font-bold text-[#145C4B]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {priceFormatted}
            </span>
            {primaryPrice && (
              <span
                className="text-xs font-normal text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                per month
              </span>
            )}
          </div>
        </div>

        {/* Inquiry Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
          <div>
            <label
              htmlFor="first-name"
              className="block text-[11px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              First Name *
            </label>
            <input
              id="first-name"
              type="text"
              required
              placeholder="e.g. Ahmed"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full rounded-[10px] border border-[#E1E7E3] bg-[#FCFCFC] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] placeholder:text-[#9CA3AF] focus:border-[#145C4B] focus:bg-white focus:outline-hidden"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="block text-[11px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Last Name *
            </label>
            <input
              id="last-name"
              type="text"
              required
              placeholder="e.g. Ali"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full rounded-[10px] border border-[#E1E7E3] bg-[#FCFCFC] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] placeholder:text-[#9CA3AF] focus:border-[#145C4B] focus:bg-white focus:outline-hidden"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          <div>
            <label
              htmlFor="email-address"
              className="block text-[11px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Email Address *
            </label>
            <input
              id="email-address"
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-[10px] border border-[#E1E7E3] bg-[#FCFCFC] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] placeholder:text-[#9CA3AF] focus:border-[#145C4B] focus:bg-white focus:outline-hidden"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          <div>
            <label
              htmlFor="phone-number"
              className="block text-[11px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Phone Number *
            </label>
            <input
              id="phone-number"
              type="tel"
              required
              placeholder="+20 100 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-[10px] border border-[#E1E7E3] bg-[#FCFCFC] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] placeholder:text-[#9CA3AF] focus:border-[#145C4B] focus:bg-white focus:outline-hidden"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          <div>
            <label
              htmlFor="inquiry-message"
              className="block text-[11px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Message
            </label>
            <textarea
              id="inquiry-message"
              rows={3}
              placeholder="I am interested in leasing this unit..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full resize-none rounded-[10px] border border-[#E1E7E3] bg-[#FCFCFC] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] placeholder:text-[#9CA3AF] focus:border-[#145C4B] focus:bg-white focus:outline-hidden"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0F473A] text-sm font-semibold text-white shadow-md transition-all hover:bg-[#145C4B] disabled:opacity-50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>{submitting ? "Sending..." : "Send Inquiry"}</span>
            <FiSend className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </aside>
  );
}
