"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  createSlideInVariants,
  imageSettleVariants,
  LUXURY_EASE,
} from "@/shared/utils/motionPresets";

interface DreamHomeSectionProps {
  sectionClassName?: string;
}

export default function DreamHomeSection({
  sectionClassName = "bg-white py-8 sm:py-10 lg:py-12",
}: DreamHomeSectionProps) {
  const { t, locale, direction } = useTranslation();
  const isRtl = direction === "rtl";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.16 });

  const textVariants = createSlideInVariants("start", isRtl, 0.1);

  return (
    <section ref={ref} className={sectionClassName}>
      <div className="mx-auto w-full max-w-[1540px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: LUXURY_EASE }}
          className="overflow-hidden rounded-[24px] bg-[#2B5FA6]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
            {/* Left Column: Text & Call to Action */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14 lg:col-span-7 lg:px-16 lg:py-16"
            >
              <p
                className="text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-[#E2C275]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t("home.dreamHome.eyebrow", "YOUR NEXT CHAPTER STARTS HERE")}
              </p>

              <h2
                className="mt-3 sm:mt-4 max-w-md text-[26px] font-normal leading-[1.18] sm:leading-[1.15] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[44px]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("home.dreamHome.heading", "Let us find your dream home.")}
              </h2>

              <p
                className="mt-5 max-w-lg text-[15px] font-normal leading-[1.6] tracking-normal text-[#C5D3E8]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t(
                  "home.dreamHome.subtitle",
                  "Tell us what matters to you. Our experts will take it from there."
                )}
              </p>

              <div className="mt-8">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex w-full items-center justify-center rounded-[8px] bg-[#B8963E] px-14 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#D4A843] hover:shadow-md sm:w-auto sm:min-w-[235px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("home.dreamHome.findMyHome", "Find my home")}
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Full-height Image */}
            <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:col-span-5 lg:min-h-full">
              <motion.div
                variants={imageSettleVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="absolute inset-0"
              >
                <Image
                  src="/HomePage/DreamHome/sectionImage.png"
                  alt="Luxury dream home villa"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
