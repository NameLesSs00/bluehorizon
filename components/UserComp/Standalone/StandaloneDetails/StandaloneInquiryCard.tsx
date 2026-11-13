"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createContact } from "@/clientApi/contactsApi";
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
  const [message, setMessage] = useState(
    `Hello, I am interested in ${unit.name} (ID: ${unit.id}) and would like to receive more details.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currencySymbol =
    unit.currencyCode === "USD"
      ? "$ "
      : unit.currencyCode === "EUR"
      ? "€ "
      : unit.currencyCode === "GBP"
      ? "£ "
      : unit.currencyCode
      ? `${unit.currencyCode} `
      : "EGP ";

  const formattedPrice =
    typeof unit.price === "number" && unit.price > 0
      ? `${currencySymbol}${unit.price.toLocaleString()}`
      : "Price on request";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await createContact({
        firstName: firstName.trim(),
        lastName: lastName.trim() || "Client",
        email: email.trim(),
        phone: phone.trim(),
        type: "BuyUnit",
        hearFrom: "Other",
        notes: message,
      });

      setSubmitSuccess(true);
      toast.success("Thank you! Your inquiry has been submitted successfully.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    } catch {
      setErrorMessage("Failed to submit inquiry. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
      <div className="sticky top-24 rounded-[20px] border border-[#D9E2EE] bg-white p-6 sm:p-7 shadow-sm">
        {/* Header with price */}
        <span
          className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Asking Price
        </span>
        <div
          className="mt-1 text-2xl sm:text-3xl font-bold text-[#2B5FA6]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {formattedPrice}
        </div>

        {/* Inquiry Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {submitSuccess && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs text-blue-900">
              Your inquiry has been sent to our sales advisors. We will contact
              you shortly.
            </div>
          )}

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50/70 p-3.5 text-xs text-red-900">
              {errorMessage}
            </div>
          )}

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
              placeholder="First name"
              className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
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
              Last Name
            </label>
            <input
              id="inquiry-last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
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
              className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
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
              className="mt-1.5 w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
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
              Message
            </label>
            <textarea
              id="inquiry-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your inquiry or questions..."
              className="mt-1.5 w-full resize-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs sm:text-sm text-[#202326] outline-none transition-colors placeholder:text-[#6B7570] focus:border-[#2B5FA6] focus:bg-white"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-[12px] bg-[#2B5FA6] py-3 text-center text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1B3A6B] disabled:opacity-50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </aside>
  );
}
