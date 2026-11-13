"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCreateContactMutation } from "@/features/contacts/useContactsQueries";
import ContactInfoChannels from "./ContactInfoChannels";
import { useTranslation } from "@/features/i18n/useTranslation";
import { fadeInUpVariants } from "@/shared/utils/animations";

export default function ContactInfoSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
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
        <ContactInfoChannels />

        {/* Right Column: Send an Inquiry Form */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
          className="rounded-[24px] border border-[#D9E2EE] bg-white p-7 sm:p-10 shadow-xs lg:col-span-7"
        >
          <p
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("contact.form.eyebrow")}
          </p>

          <h2
            className="mt-1.5 text-[26px] sm:text-[28px] font-bold tracking-tight text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("contact.form.heading")}
          </h2>

          <p
            className="mt-2 text-[13.5px] font-normal leading-relaxed text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("contact.form.description")}
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
                  {t("contact.form.firstName")}
                </label>
                <input
                  id="contact-first-name"
                  type="text"
                  required
                  placeholder={t("contact.form.firstNamePlaceholder")}
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  className="w-full rounded-[12px] border border-transparent bg-[#F0F3FA] px-4 py-3 text-[14px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-last-name"
                  className="mb-1.5 block text-[12px] font-medium text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("contact.form.lastName")}
                </label>
                <input
                  id="contact-last-name"
                  type="text"
                  required
                  placeholder={t("contact.form.lastNamePlaceholder")}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  className="w-full rounded-[12px] border border-transparent bg-[#F0F3FA] px-4 py-3 text-[14px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
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
                  {t("contact.form.phone")}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  placeholder={t("contact.form.phonePlaceholder")}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full rounded-[12px] border border-transparent bg-[#F0F3FA] px-4 py-3 text-[14px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-[12px] font-medium text-[#202326]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("contact.form.email")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder={t("contact.form.emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full rounded-[12px] border border-transparent bg-[#F0F3FA] px-4 py-3 text-[14px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
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
                {t("contact.form.message")}
              </label>
              <textarea
                id="contact-notes"
                required
                rows={4}
                placeholder={t("contact.form.messagePlaceholder")}
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                className="w-full resize-none rounded-[12px] border border-transparent bg-[#F0F3FA] p-4 text-[14px] text-[#202326] placeholder-[#6B7570]/70 transition-all focus:border-[#2B5FA6]/40 focus:bg-white focus:outline-none"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#2B5FA6] py-3.5 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#1B3A6B] hover:shadow-xs active:scale-[0.99] disabled:opacity-70"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>
                {createMutation.isPending
                  ? t("contact.form.sending")
                  : t("contact.form.sendInquiry")}
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
                {t("contact.form.privacyNote")}
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
