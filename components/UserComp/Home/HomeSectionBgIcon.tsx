"use client";

import { useRef } from "react";
import type { IconType } from "react-icons";
import { motion, useScroll, useTransform } from "framer-motion";
import { LUXURY_EASE } from "@/shared/utils/motionPresets";

interface HomeSectionBgIconProps {
  leftIcon: IconType;
  rightIcon: IconType;
  colorClassName?: string;
  hasBottomDivider?: boolean;
}

export default function HomeSectionBgIcon({
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  colorClassName = "text-[#1B3A6B]/[0.065]",
  hasBottomDivider = false,
}: HomeSectionBgIconProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const rightY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  const rightVerticalClass = hasBottomDivider
    ? "bottom-20 sm:bottom-24"
    : "bottom-8 sm:bottom-10";

  return (
    <div
      ref={containerRef}
      className="pointer-events-none select-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        style={{ y: leftY }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease: LUXURY_EASE }}
        className={`hidden sm:block absolute top-8 start-3 sm:start-5 lg:start-8 ${colorClassName}`}
      >
        <LeftIcon className="h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44" />
      </motion.div>

      <motion.div
        style={{ y: rightY }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, delay: 0.12, ease: LUXURY_EASE }}
        className={`hidden sm:block absolute ${rightVerticalClass} end-3 sm:end-5 lg:end-8 ${colorClassName}`}
      >
        <RightIcon className="h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44" />
      </motion.div>
    </div>
  );
}
