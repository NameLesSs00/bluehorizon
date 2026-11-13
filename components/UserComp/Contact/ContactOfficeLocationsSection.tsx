"use client";

import { FiMapPin } from "react-icons/fi";

const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.689588139131!2d33.82077477495712!3d27.197491347795122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14528759394cdb8d%3A0x9d181f1b75fba03f!2sTech%20gear%20Solutions!5e0!3m2!1sen!2seg!4v1794336530570!5m2!1sen!2seg";

export default function ContactOfficeLocationsSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="rounded-[24px] border border-[#E1E7E3] bg-white p-6 shadow-xs sm:p-8 lg:p-10">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              VISIT OUR OFFICE
            </span>

            <h2
              className="mt-1 text-[22px] font-bold text-[#202326] sm:text-[26px]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Our Office Location
            </h2>

            <div className="mt-2 flex items-center gap-2 text-[13.5px] font-medium text-[#6B7570]">
              <FiMapPin className="h-4 w-4 shrink-0 text-[#145C4B]" />
              <span style={{ fontFamily: "var(--font-inter)" }}>
                El Kawthar, Hurghada, Red Sea, Egypt
              </span>
            </div>
          </div>

          <div className="self-start sm:self-center">
            <span
              className="inline-flex items-center rounded-full bg-[#E8F1EC] px-4 py-1.5 text-xs font-semibold text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Hurghada Head Office
            </span>
          </div>
        </div>

        {/* Full-width Google Map without overlay box */}
        <div className="relative mt-6 h-[340px] w-full overflow-hidden rounded-[20px] border border-[#E1E7E3] sm:h-[420px]">
          <iframe
            src={MAP_URL}
            title="Blue Horizon Office Location - El Kawthar, Hurghada"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}
