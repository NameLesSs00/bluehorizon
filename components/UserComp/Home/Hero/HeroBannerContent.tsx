"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HeroBannerContent() {
  return (
    <div className="max-w-2xl text-white">
      {/* Eyebrow Tag */}
      <div className="flex items-center gap-3">
        <span
          className="text-[13px] font-semibold uppercase tracking-wider text-white"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          FIND YOUR PLACE
        </span>
        <span className="h-[1px] w-12 bg-white/70" />
      </div>

      {/* Main Heading */}
      <h1
        className="mt-3 sm:mt-4 text-[28px] sm:text-5xl lg:text-[54px] font-bold leading-[1.1] sm:leading-[1.05] tracking-[-0.02em] text-white"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        Find Your Place.
        <br />
        Invest in Your Future.
      </h1>

      {/* Subtitle */}
      <p
        className="mt-3.5 sm:mt-5 max-w-xl text-[14px] sm:text-[16px] font-normal leading-[22px] sm:leading-[25px] text-white/90"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Discover exceptional properties, premium developments, and opportunities
        designed around your lifestyle.
      </p>

      {/* Action Buttons */}
      <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
        <Link
          href="/standalone"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#145C4B] border border-white/20 px-7 py-3.5 sm:px-8 sm:py-4 text-[14px] sm:text-[15px] font-semibold text-white shadow-md transition-all hover:bg-[#0F473A] hover:shadow-lg text-center"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span>Explore Properties</span>
          <FiArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href="/projects"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/80 bg-white/10 px-7 py-3.5 sm:px-8 sm:py-4 text-[14px] font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/20 text-center"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Discover Our Projects
        </Link>
      </div>
    </div>
  );
}

