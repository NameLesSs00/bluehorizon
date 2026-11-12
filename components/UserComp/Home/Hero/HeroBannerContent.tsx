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
        className="mt-4 text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-[54px]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        Find Your Place.
        <br />
        Invest in Your Future.
      </h1>

      {/* Subtitle */}
      <p
        className="mt-5 max-w-xl text-[15px] sm:text-[16px] font-normal leading-[25px] text-white/90"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Discover exceptional properties, premium developments, and opportunities
        designed around your lifestyle.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2.5 rounded-full bg-[#0F473A] px-8 py-4 text-[15px] font-semibold text-white shadow-md transition-all hover:bg-[#145C4B] hover:shadow-lg"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span>Explore Properties</span>
          <FiArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/5 px-8 py-4 text-[14px] font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/15"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Discover Our Projects
        </Link>
      </div>
    </div>
  );
}

