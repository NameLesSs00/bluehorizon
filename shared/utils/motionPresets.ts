import type { Variants } from "framer-motion";

export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const DEFAULT_VIEWPORT = {
  once: true,
  amount: 0.16,
} as const;

export const headerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: LUXURY_EASE,
    },
  },
};

export const cardGridItemVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.985 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      delay: 0.08 + index * 0.07,
      ease: LUXURY_EASE,
    },
  }),
};

export const imageSettleVariants: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: LUXURY_EASE,
    },
  },
};

export function createSlideInVariants(
  side: "start" | "end",
  isRtl: boolean,
  delay = 0.08
): Variants {
  const rawOffset = side === "start" ? -24 : 24;
  const x = isRtl ? -rawOffset : rawOffset;

  return {
    hidden: { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.65,
        delay,
        ease: LUXURY_EASE,
      },
    },
  };
}
