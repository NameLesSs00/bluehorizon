import Image from "next/image";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";

interface ProjectGallerySectionProps {
  imageUrls?: string[];
  title?: string;
}

export default function ProjectGallerySection({
  imageUrls = [],
  title,
}: ProjectGallerySectionProps) {
  const images = (imageUrls || []).map((url) => getFullProjectImageUrl(url));

  // If no real images exist, hide the gallery entirely
  if (images.length === 0) {
    return null;
  }

  const fallbackImg = "/default-fallback.png";

  const img1 = images[0] || fallbackImg;
  const img2 = images[1] || images[0] || fallbackImg;
  const img3 = images[2] || images[0] || fallbackImg;
  const img4 = images[3] || images[1] || images[0] || fallbackImg;

  const projectTitle = title || "Project";

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16">
      <div className="mb-6">
        <h2
          className="text-2xl sm:text-[28px] font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Project Gallery
        </h2>
        <p
          className="mt-1 text-sm text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Explore your Home view and live as you love
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Left Column: Large Showcase Image */}
        <div className="relative h-[320px] sm:h-[420px] lg:h-[520px] w-full overflow-hidden rounded-[20px] bg-[#F9F7F4]">
          <Image
            src={img1}
            alt={`${projectTitle} Gallery 1`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>

        {/* Right Column: 1 Top Wide + 2 Bottom Side-by-Side */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {/* Top Wide Image */}
          <div className="relative h-[200px] sm:h-[248px] w-full overflow-hidden rounded-[20px] bg-[#F9F7F4]">
            <Image
              src={img2}
              alt={`${projectTitle} Gallery 2`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>

          {/* Bottom Row: 2 Split Images */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <div className="relative h-[180px] sm:h-[256px] w-full overflow-hidden rounded-[20px] bg-[#F9F7F4]">
              <Image
                src={img3}
                alt={`${projectTitle} Gallery 3`}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>

            <div className="relative h-[180px] sm:h-[256px] w-full overflow-hidden rounded-[20px] bg-[#F9F7F4]">
              <Image
                src={img4}
                alt={`${projectTitle} Gallery 4`}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
