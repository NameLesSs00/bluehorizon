"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HeroBannerContent from "./HeroBannerContent";
import HeroSearchFilterCard from "./HeroSearchFilterCard";

export default function HomeHeroSection() {
  return (
    <div className="relative w-full">
      {/* Hero Banner Section */}
      <section className="relative flex min-h-[380px] sm:min-h-[480px] lg:min-h-[780px] w-full flex-col justify-center overflow-visible">
        {/* Background Villa Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/HomePage/hero/homeImage.jpg"
            alt="Luxury Red Sea Architecture"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Soft deep navy gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A6B] via-[#1B3A6B]/85 sm:via-[#1B3A6B]/80 via-75% sm:via-35% to-transparent" />
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 pt-8 pb-14 sm:px-6 sm:pt-16 sm:pb-24 lg:px-8 lg:pt-32 lg:pb-44">
          <HeroBannerContent />
        </div>

        {/* Desktop Floating Search Filter Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="hidden lg:block absolute bottom-0 left-0 right-0 z-30 translate-y-1/2 pointer-events-none"
        >
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 pointer-events-auto">
            <div className="flex justify-start">
              <HeroSearchFilterCard />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mobile & Tablet Search Filter Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="block lg:hidden relative z-20 mx-auto w-full max-w-[1360px] px-3.5 sm:px-6 -mt-8 sm:-mt-12"
      >
        <HeroSearchFilterCard />
      </motion.div>
    </div>
  );
}
