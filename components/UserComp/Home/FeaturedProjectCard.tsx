import Image from "next/image";

export interface ProjectCardData {
  id: string;
  badge: string;
  title: string;
  location: string;
  price: string;
  propertyTypes: string;
  areaRange: string;
  developer: string;
  imageSrc: string;
}

interface FeaturedProjectCardProps {
  project: ProjectCardData;
}

export default function FeaturedProjectCard({
  project,
}: FeaturedProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[16px] border border-[#E6EAE7] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100">
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute top-[14px] left-[14px] rounded-full bg-white px-3 py-1.5 shadow-sm">
          <span
            className="block text-[10px] font-medium uppercase leading-none tracking-normal text-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.badge}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-1.5">
          <h3
            className="text-[20px] font-normal leading-none tracking-normal text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {project.title}
          </h3>

          <div className="flex items-center gap-1.5 pt-0.5">
            <Image
              src="/HomePage/FeaturedProjects/location.svg"
              alt="Location"
              width={11}
              height={13}
              className="h-[13px] w-[11px] shrink-0"
            />
            <span
              className="text-[12px] font-normal leading-none tracking-normal text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {project.location}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p
            className="text-[18px] font-bold leading-none tracking-normal text-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.price}
          </p>
          <p
            className="text-[11px] font-normal leading-none tracking-normal text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.propertyTypes} &middot; {project.areaRange}
          </p>
        </div>

        <div className="mt-4 border-t border-[#E8ECE9] pt-3.5">
          <div className="flex items-center justify-between">
            <span
              className="text-[12px] font-semibold leading-none tracking-normal text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              By {project.developer}
            </span>
            <Image
              src="/HomePage/FeaturedProjects/link.svg"
              alt="View project"
              width={9}
              height={9}
              className="h-[9px] w-[9px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

