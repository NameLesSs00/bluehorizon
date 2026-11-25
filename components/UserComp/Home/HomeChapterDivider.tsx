"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LUXURY_EASE } from "@/shared/utils/motionPresets";

interface HomeChapterDividerProps {
  src: string;
  opacityClassName?: string;
}

export default function HomeChapterDivider({
  src,
  opacityClassName = "opacity-[0.32]",
}: HomeChapterDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: LUXURY_EASE }}
      className="pointer-events-none select-none absolute inset-x-0 bottom-0 z-0 w-full overflow-hidden"
      aria-hidden="true"
    >
      <div className={opacityClassName}>
        <Image
          src={src}
          alt=""
          width={1440}
          height={150}
          sizes="100vw"
          className="block h-auto w-full object-cover"
        />
      </div>
    </motion.div>
  );
}
