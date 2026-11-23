"use client";

import Image from "next/image";

interface HomeHeaderIllustrationsProps {
  primarySrc: string;
  secondarySrc?: string;
}

export default function HomeHeaderIllustrations({
  primarySrc,
  secondarySrc,
}: HomeHeaderIllustrationsProps) {
  return (
    <div
      className="pointer-events-none select-none hidden sm:flex items-center gap-3 lg:gap-4 shrink-0"
      aria-hidden="true"
    >
      {secondarySrc && (
        <div className="flex h-18 w-18 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border border-[#E2E8F3] bg-[#F8FAFD] p-2.5 shadow-2xs rotate-2">
          <Image
            src={secondarySrc}
            alt=""
            width={160}
            height={160}
            className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
          />
        </div>
      )}
      <div className="flex h-20 w-20 sm:h-22 sm:w-22 items-center justify-center rounded-2xl border border-[#E2E8F3] bg-white p-2.5 shadow-xs -rotate-2">
        <Image
          src={primarySrc}
          alt=""
          width={160}
          height={160}
          className="h-16 w-16 sm:h-18 sm:w-18 object-contain"
        />
      </div>
    </div>
  );
}
