"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HomeChapterDividerProps {
  bgClassName?: string;
}

export default function HomeChapterDivider({
  bgClassName = "bg-white",
}: HomeChapterDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${bgClassName} py-5 sm:py-8`}
      aria-hidden="true"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <Image
          src="/HomePage/roofline-divider.svg"
          alt=""
          width={1200}
          height={160}
          className="h-16 w-full max-w-[780px] select-none pointer-events-none object-contain opacity-90 sm:h-24 sm:max-w-[1020px] lg:h-28 lg:max-w-[1200px]"
        />
      </div>
    </motion.div>
  );
}
