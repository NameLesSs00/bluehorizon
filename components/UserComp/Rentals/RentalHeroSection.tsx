"use client";

import Image from "next/image";

export default function RentalHeroSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
      <div className="relative flex min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] w-full flex-col justify-end overflow-hidden rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-14 shadow-lg">
        {/* Background Image */}
        <Image
          src="/rental/heroRental.jpg"
          alt="Rental Properties & Short/Long-Term Stays"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Specified Emerald Gradient Filter */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 71, 58, 0) 21.63%, #0F473A 94.71%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 max-w-2xl text-white">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
            <span style={{ fontFamily: "var(--font-inter)" }}>
              VERIFIED PREMIUM UNITS
            </span>
          </div>

          {/* Heading */}
          <h1
            className="mt-4 text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-[46px]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Rental Properties & Short/Long-Term Stays
          </h1>

          {/* Subtitle */}
          <p
            className="mt-4 text-sm sm:text-base font-normal leading-relaxed text-white/90"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Discover fully furnished luxury apartments, chalets, and villas
            available for long-term lease or seasonal stay across Egypt&apos;s
            most sought-after prime neighborhoods.
          </p>
        </div>
      </div>
    </section>
  );
}

