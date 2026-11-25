"use client";

import Image from "next/image";

interface HomeEmptyStateProps {
  illustrationSrc: string;
  message: string;
  surfaceClassName?: string;
}

export default function HomeEmptyState({
  illustrationSrc,
  message,
  surfaceClassName = "bg-transparent",
}: HomeEmptyStateProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-[#E2E8F3] px-6 py-10 text-center ${surfaceClassName}`}
    >
      <Image
        src={illustrationSrc}
        alt=""
        width={210}
        height={120}
        className="h-24 w-auto select-none pointer-events-none object-contain opacity-90 sm:h-28"
        aria-hidden="true"
      />
      <p
        className="text-[15px] font-semibold text-[#202326]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {message}
      </p>
    </div>
  );
}
