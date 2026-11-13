"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FiSend } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { RentalItem } from "@/models/rental";

interface RentalInquiryCardProps {
  unit: RentalItem;
}

export default function RentalInquiryCard({ unit }: RentalInquiryCardProps) {
  const { t } = useTranslation();
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
    : t("rent.details.priceUponInquiry");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !phone.trim()) {
      toast.error(t("rent.details.inquiryValidation"));
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success(
        t("rent.details.inquirySuccess")
          .replace("{name}", firstName)
          .replace("{unit}", unit.name)
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      toast.error(t("rent.details.inquiryError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <aside className="w-full lg:w-[380px] shrink-0">
      <div className="sticky top-28 rounded-[24px] border border-[#D9E2EE] bg-white p-6 sm:p-7 shadow-lg">
        {/* Price Header */}
        <div className="border-b border-[#D9E2EE] pb-5">
          <span
            className="block text-xs font-bold uppercase tracking-wider text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("rent.details.specs.price")}
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span
              className="text-2xl sm:text-3xl font-bold text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {priceFormatted}
            </span>
            <span className="text-xs sm:text-sm text-[#65706B]">
              {t("rent.card.perMonth")}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mt-5">
          <h3
            className="text-base sm:text-lg font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("rent.details.inquiryTitle")}
          </h3>
          <p
            className="mt-1 text-xs text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("rent.details.privacyNote")}
          </p>
        </div>

        {/* Inquiry Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="rental-first-name"
                className="block text-xs font-semibold text-[#202326] mb-1.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("rent.details.firstName")}
              </label>
              <input
                id="rental-first-name"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={t("rent.details.firstNamePlaceholder")}
                className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#9CA3AF] transition-colors focus:border-[#2B5FA6] focus:bg-white focus:outline-none"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>

            <div>
              <label
                htmlFor="rental-last-name"
                className="block text-xs font-semibold text-[#202326] mb-1.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("rent.details.lastName")}
              </label>
              <input
                id="rental-last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={t("rent.details.lastNamePlaceholder")}
                className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#9CA3AF] transition-colors focus:border-[#2B5FA6] focus:bg-white focus:outline-none"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="rental-email"
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.details.email")}
            </label>
            <input
              id="rental-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("rent.details.emailPlaceholder")}
              className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#9CA3AF] transition-colors focus:border-[#2B5FA6] focus:bg-white focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="rental-phone"
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.details.phone")}
            </label>
            <input
              id="rental-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("rent.details.phonePlaceholder")}
              className="w-full rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#9CA3AF] transition-colors focus:border-[#2B5FA6] focus:bg-white focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="rental-message"
              className="block text-xs font-semibold text-[#202326] mb-1.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.details.message")}
            </label>
            <textarea
              id="rental-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("rent.details.messagePlaceholder")}
              className="w-full resize-none rounded-[12px] border border-[#D9E2EE] bg-[#F0F3FA] px-3.5 py-2.5 text-xs text-[#202326] placeholder-[#9CA3AF] transition-colors focus:border-[#2B5FA6] focus:bg-white focus:outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#2B5FA6] py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#1B3A6B] active:scale-[0.99] disabled:opacity-70"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>
              {submitting
                ? t("rent.details.sending")
                : t("rent.details.sendInquiry")}
            </span>
            <FiSend className="h-4 w-4" />
          </button>
        </form>
      </div>
    </aside>
  );
}
