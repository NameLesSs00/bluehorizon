import Image from "next/image";

interface AreaDetailsHeroBannerProps {
  title?: string;
  imageUrl?: string | null;
}

export default function AreaDetailsHeroBanner({
  title,
  imageUrl,
}: AreaDetailsHeroBannerProps) {
  const imageSrc = imageUrl || "/Areas/heroAreaImage.jpg";
  const altText = title ? `${title} Banner` : "Area Overview Banner";

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
      <div className="relative h-[260px] sm:h-[360px] lg:h-[440px] w-full overflow-hidden rounded-[24px] bg-[#E5ECF6]">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1360px"
          className="object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
    </section>
  );
}

