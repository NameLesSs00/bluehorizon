"use client";

import Image from "next/image";
import { useState } from "react";

interface BlogHeroImageProps {
  imageUrl?: string | null;
  title: string;
}

export default function BlogHeroImage({
  imageUrl,
  title,
}: BlogHeroImageProps) {
  const [imageError, setImageError] = useState(false);

  const resolvedSrc =
    !imageError && imageUrl && imageUrl.trim().length > 0
      ? imageUrl
      : "/default-fallback.png";

  return (
    <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-2">
      <div className="relative h-[340px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden rounded-[24px] sm:rounded-[28px] border border-[#D9E2EE] bg-[#F0F3FA] shadow-sm">
        <Image
          src={resolvedSrc}
          alt={title || "Blog cover"}
          fill
          priority
          sizes="(max-width: 1360px) 100vw, 1360px"
          onError={() => setImageError(true)}
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}

