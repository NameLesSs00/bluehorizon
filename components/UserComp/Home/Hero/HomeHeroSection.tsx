"use client";

import Image from "next/image";
import HeroBannerContent from "./HeroBannerContent";
import HeroSearchFilterCard from "./HeroSearchFilterCard";

export default function HomeHeroSection() {
  return (
    <section className="relative flex min-h-[680px] sm:min-h-[760px] lg:min-h-[820px] w-full flex-col justify-center overflow-visible">
      {/* Background Villa Image - Covers only the hero banner */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/HomePage/hero/homeImage.jpg"
          alt="Luxury Red Sea Architecture"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Soft, natural emerald gradient overlay strictly on left 40% */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F473A] via-[#0F473A]/80 via-35% to-transparent" />
      </div>

      {/* Main Content Area - Generous and spacious sizing */}
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 pt-24 pb-36 sm:px-6 sm:pt-32 sm:pb-44 lg:px-8 lg:pt-36 lg:pb-48">
        <HeroBannerContent />
      </div>

      {/* Floating Search Filter Card - Absolutely split 50/50 across the hero bottom boundary */}
      <div className="absolute bottom-0 left-0 right-0 z-30 translate-y-1/2 pointer-events-none">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 pointer-events-auto">
          <div className="flex justify-center lg:justify-start">
            <HeroSearchFilterCard />
          </div>
        </div>
      </div>
    </section>
  );
}
