"use client";

import { useState } from "react";
import { createContact } from "@/clientApi/contactsApi";

interface UnitInquiryCardProps {
  priceFormatted: string;
  unitTitle: string;
  unitId: number;
  unitType: "primary" | "resale";
}

export default function UnitInquiryCard({
  priceFormatted,
  unitTitle,
  unitId,
  unitType,
}: UnitInquiryCardProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    `Hello, I am interested in ${unitTitle} (ID: ${unitId}, ${unitType}) and would like to receive more details.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await createContact({
        firstName,
        lastName: lastName || "Client",
        email,
        phone,
        type: "BuyUnit",
        hearFrom: "Other",
        notes: message,
      });

      setSubmitSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    } catch {
      setErrorMessage("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-24 rounded-[24px] border border-[#E1E7E3] bg-white p-6 sm:p-7 shadow-sm">
      {/* Price Header */}
      <div className="pb-5 border-b border-[#E1E7E3]">
        <span
          className="block text-xs font-semibold uppercase tracking-wider text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Asking Price
        </span>
        <span
          className="block text-2xl sm:text-3xl font-extrabold text-[#145C4B]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {priceFormatted}
        </span>
      </div>

      {/* Inquiry Form */}
      <div className="mt-5">
        <h3
          className="text-lg font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Inquire About This Property
        </h3>
        <p
          className="mt-1 text-xs text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Speak directly with our investment advisors.
        </p>

        {submitSuccess ? (
          <div className="mt-5 rounded-xl bg-[#E8F1EC] p-4 text-center">
            <h4
              className="text-sm font-bold text-[#145C4B]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Inquiry Sent Successfully
            </h4>
            <p
              className="mt-1 text-xs text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Our team will review your request and get in touch with you shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitSuccess(false)}
              className="mt-3 text-xs font-semibold text-[#145C4B] underline"
            >
              Send another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            {errorMessage && (
              <div className="rounded-lg bg-red-50 p-2.5 text-xs text-red-600">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#202326] mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full rounded-xl bg-[#F3F5F3] px-3 py-2 text-xs text-[#202326] placeholder-[#8A9590] outline-none border border-transparent focus:border-[#145C4B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#202326] mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full rounded-xl bg-[#F3F5F3] px-3 py-2 text-xs text-[#202326] placeholder-[#8A9590] outline-none border border-transparent focus:border-[#145C4B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#202326] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl bg-[#F3F5F3] px-3 py-2 text-xs text-[#202326] placeholder-[#8A9590] outline-none border border-transparent focus:border-[#145C4B]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#202326] mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+20 ..."
                className="w-full rounded-xl bg-[#F3F5F3] px-3 py-2 text-xs text-[#202326] placeholder-[#8A9590] outline-none border border-transparent focus:border-[#145C4B]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#202326] mb-1">
                Message
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl bg-[#F3F5F3] px-3 py-2 text-xs text-[#202326] placeholder-[#8A9590] outline-none border border-transparent focus:border-[#145C4B] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#145C4B] py-3 text-xs font-bold text-white transition-colors hover:bg-[#0F473A] disabled:opacity-60 cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {isSubmitting ? "Sending Inquiry..." : "Send Inquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

