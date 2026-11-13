"use client";

import Image from "next/image";
import { FormEvent } from "react";

interface BlogsHeroSectionProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (e: FormEvent) => void;
  totalArticles?: number;
}

export default function BlogsHeroSection({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  totalArticles,
}: BlogsHeroSectionProps) {
  const hasArticlesCount =
    typeof totalArticles === "number" && totalArticles > 0;
  const articlesCountLabel = hasArticlesCount
    ? `${totalArticles} Articles`
    : null;

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#1B3A6B] shadow-xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Blogs/hero.png"
            alt="Hero background"
            fill
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-center"
          />
        </div>

        {/* Linear Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(90deg, #2B5FA6 44.23%, rgba(43, 95, 166, 0.85) 67.31%)"
          }}
        />


        {/* Hero Content Grid */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
          {/* Left Column: Heading, Subtitle & Search */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3.5 py-1.5 text-xs font-medium text-[#E5ECF6] w-fit">
              <Image
                src="/Blogs/svg.svg"
                alt=""
                width={14}
                height={14}
                className="shrink-0"
              />
              <span style={{ fontFamily: "var(--font-inter)" }}>
                Stories, Insights &amp; Market Intelligence
              </span>
            </div>

            {/* Title */}
            <h1
              className="mt-5 text-3xl sm:text-4xl lg:text-[46px] font-bold text-white leading-tight tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              The Real Estate Journal &amp; Insights
            </h1>

            {/* Subtitle */}
            <p
              className="mt-4 max-w-2xl text-sm sm:text-[15px] leading-relaxed text-[#E5ECF6]/90"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Discover expert market analyses, investment strategy guides, coastal
              luxury living trends, and architectural inspirations curated for
              property enthusiasts.
            </p>

            {/* Search Input Bar */}
            <form
              onSubmit={onSearchSubmit}
              className="mt-8 flex w-full max-w-xl items-center rounded-full bg-white p-1.5 pl-4 sm:pl-5 shadow-lg border border-white/40"
            >
              <div className="flex items-center shrink-0">
                <Image
                  src="/Blogs/svg (4).svg"
                  alt="Search"
                  width={18}
                  height={18}
                />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search guides, market trends, Sahl Hasheesh news..."
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#202326] placeholder-[#6B7570] px-3 font-normal"
                style={{ fontFamily: "var(--font-inter)" }}
              />

              <button
                type="submit"
                className="shrink-0 rounded-full bg-[#2B5FA6] px-6 sm:px-7 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#1B3A6B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Column: Floating Expert Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-[340px] rounded-[24px] bg-white p-7 sm:p-8 shadow-2xl flex flex-col items-center text-center border border-white/40">
              <div className="mb-4 flex items-center justify-center">
                <Image
                  src="/Blogs/ricon.svg"
                  alt="Expert icon"
                  width={52}
                  height={52}
                />
              </div>

              <h2
                className="text-lg font-bold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Written by Experts
              </h2>

              <p
                className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#6B7570] max-w-[220px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                In-depth reporting on Egypt&apos;s top property destinations.
              </p>

              {/* Bottom Card Divider & Stats */}
              {articlesCountLabel && (
                <div className="mt-6 pt-5 border-t border-[#D9E2EE] w-full flex items-center justify-center text-xs font-medium text-[#202326]">
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/Blogs/svg (1).svg"
                      alt=""
                      width={14}
                      height={14}
                    />
                    <span style={{ fontFamily: "var(--font-inter)" }}>
                      {articlesCountLabel}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

