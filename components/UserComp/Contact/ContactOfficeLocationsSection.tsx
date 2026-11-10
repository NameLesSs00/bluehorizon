
"use client";

import { useState } from "react";

type OfficeTab = "hurghada" | "cairo";

interface OfficeInfo {
  tag: string;
  title: string;
  address: string;
}

const OFFICE_DETAILS: Record<OfficeTab, OfficeInfo> = {
  hurghada: {
    tag: "RED SEA OFFICE",
    title: "Hurghada Promenade Branch",
    address: "Suite 402, Sea View Plaza, Promenade Road, Hurghada, Egypt",
  },
  cairo: {
    tag: "CAIRO HEADQUARTERS",
    title: "New Cairo Branch",
    address: "5th Settlement, New Cairo, Cairo, Egypt",
  },
};

const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.689588139131!2d33.82077477495712!3d27.197491347795122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14528759394cdb8d%3A0x9d181f1b75fba03f!2sTech%20gear%20Solutions!5e0!3m2!1sen!2seg!4v1794336530570!5m2!1sen!2seg";

export default function ContactOfficeLocationsSection() {
  const [activeTab, setActiveTab] = useState<OfficeTab>("hurghada");
  const currentOffice = OFFICE_DETAILS[activeTab];

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="rounded-[24px] border border-[#E1E7E3] bg-white p-6 shadow-xs sm:p-8 lg:p-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              className="text-[22px] font-bold text-[#202326] sm:text-[24px]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Our Office Locations
            </h2>

            <p
              className="mt-1 text-[13px] font-normal text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Visit us in Hurghada or Cairo for face-to-face property
              consultation
            </p>
          </div>

          {/* Office Tabs */}
          <div className="inline-flex self-start rounded-[12px] bg-[#F3F5F3] p-1 sm:self-center">
            <button
              type="button"
              onClick={() => setActiveTab("hurghada")}
              aria-pressed={activeTab === "hurghada"}
              className={`rounded-[9px] px-4 py-2 text-[12px] font-semibold transition-all ${
                activeTab === "hurghada"
                  ? "bg-[#145C4B] text-white shadow-xs"
                  : "text-[#6B7570] hover:text-[#202326]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Hurghada Branch
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("cairo")}
              aria-pressed={activeTab === "cairo"}
              className={`rounded-[9px] px-4 py-2 text-[12px] font-semibold transition-all ${
                activeTab === "cairo"
                  ? "bg-[#145C4B] text-white shadow-xs"
                  : "text-[#6B7570] hover:text-[#202326]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Cairo HQ
            </button>
          </div>
        </div>

        {/* Google Map - Temporary for both offices */}
        <div className="relative mt-6 h-[320px] w-full overflow-hidden rounded-[20px] border border-[#E1E7E3] sm:h-[380px]">
          <iframe
            src={MAP_URL}
            title="Blue Horizon Office Location"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />

          {/* Floating Office Details */}
          <div className="absolute left-4 top-4 z-10 max-w-[280px] rounded-[16px] border border-[#E1E7E3] bg-white p-4 shadow-sm sm:left-6 sm:top-6">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {currentOffice.tag}
            </span>

            <h3
              className="mt-1 text-[14px] font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {currentOffice.title}
            </h3>

            <p
              className="mt-1 text-[11.5px] font-normal leading-snug text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {currentOffice.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
