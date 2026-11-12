import Image from "next/image";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";

interface ProjectDetailsHeroBannerProps {
  title?: string;
  imageUrl?: string | null;
}

export default function ProjectDetailsHeroBanner({
  title,
  imageUrl,
}: ProjectDetailsHeroBannerProps) {
  const resolvedUrl = getFullProjectImageUrl(imageUrl);
  const hasValidImage = Boolean(resolvedUrl && resolvedUrl.trim().length > 0);
  const altText = title ? `${title} Banner` : "Project Banner";

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
      <div className="relative h-[260px] sm:h-[360px] lg:h-[440px] w-full overflow-hidden rounded-[24px] bg-[#E8F1EC]">
        {hasValidImage ? (
          <Image
            src={resolvedUrl}
            alt={altText}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1360px"
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-8 bg-[#FAF8F5]">
            <div className="relative h-28 w-52 opacity-80">
              <Image
                src="/default-fallback.png"
                alt={altText}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

