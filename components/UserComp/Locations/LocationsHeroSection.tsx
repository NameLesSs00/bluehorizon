"use client";

import Image from "next/image";
import Link from "next/link";

export default function LocationsHeroSection() {
  return (
    <section className="mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:px-8 mt-6">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-2 text-[13px] text-[#6B7570]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Link href="/" className="transition-colors hover:text-[#2B5FA6]">
          Home
        </Link>
        <span className="text-[#6B7570]/60">/</span>
        <span className="font-semibold text-[#202326]">Locations</span>
      </nav>

      {/* Hero Banner Card */}
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-end bg-[#1B3A6B] shadow-xl">
        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Locations/hero.png"
            alt="Prime Coastal and Urban Locations"
            fill
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-center"
          />
        </div>

        {/* Specified Linear Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(180deg, rgba(27, 58, 107, 0) 21.63%, #1B3A6B 94.71%)"
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 w-full p-6 sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            {/* Tag Badge */}
            <span
              className="inline-block rounded-full bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2B5FA6] shadow-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              PREMIER DESTINATIONS
            </span>

            {/* Title */}
            <h1
              className="mt-4 text-3xl sm:text-4xl lg:text-[46px] font-bold text-white leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Prime Coastal &amp; Urban Locations
            </h1>

            {/* Subtitle */}
            <p
              className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/90"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Explore premier real estate investment destinations across Egypt with
              verified compounds, standalone villas, and luxury rentals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

