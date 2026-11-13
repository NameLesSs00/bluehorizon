"use client";

import Image from "next/image";
import HeroBannerContent from "./HeroBannerContent";
import HeroSearchFilterCard from "./HeroSearchFilterCard";

export default function HomeHeroSection() {
  return (
    <div className="relative w-full">
      {/* Hero Banner Section */}
      <section className="relative flex min-h-[380px] sm:min-h-[480px] lg:min-h-[780px] w-full flex-col justify-center overflow-visible">
        {/* Background Villa Image - Covers only the hero banner */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/HomePage/hero/homeImage.jpg"
            alt="Luxury Red Sea Architecture"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Soft emerald gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F473A] via-[#0F473A]/85 sm:via-[#0F473A]/80 via-75% sm:via-35% to-transparent" />
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 pt-8 pb-14 sm:px-6 sm:pt-16 sm:pb-24 lg:px-8 lg:pt-32 lg:pb-44">
          <HeroBannerContent />
        </div>

        {/* Desktop Floating Search Filter Card - Absolutely split 50/50 across the hero bottom boundary */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-30 translate-y-1/2 pointer-events-none">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 pointer-events-auto">
            <div className="flex justify-start">
              <HeroSearchFilterCard />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile & Tablet Search Filter Card - Natural document flow with smooth pull-up */}
      <div className="block lg:hidden relative z-20 mx-auto w-full max-w-[1360px] px-3.5 sm:px-6 -mt-8 sm:-mt-12">
        <HeroSearchFilterCard />
      </div>
    </div>
  );
}
