import Image from "next/image";
import Link from "next/link";
import FeaturedProjectCard, {
  ProjectCardData,
} from "./FeaturedProjectCard";

// Temporary dummy data for initial UI presentation.
// This will be replaced once backend endpoints and hooks are connected.
const DUMMY_FEATURED_PROJECTS: ProjectCardData[] = [
  {
    id: "1",
    badge: "NEW LAUNCH",
    title: "Sodic East",
    location: "New Heliopolis",
    price: "From EGP 8,500,000",
    propertyTypes: "Apartments & villas",
    areaRange: "120–320 m²",
    developer: "SODIC",
    imageSrc: "/HomePage/FeaturedProjects/defalutProjectImage.jpg",
  },
  {
    id: "2",
    badge: "FEATURED PROJECT",
    title: "Palm Hills New Cairo",
    location: "New Cairo",
    price: "From EGP 12,000,000",
    propertyTypes: "Villas & townhouses",
    areaRange: "180–450 m²",
    developer: "Palm Hills",
    imageSrc: "/HomePage/FeaturedProjects/defalutProjectImage.jpg",
  },
  {
    id: "3",
    badge: "COASTAL LIVING",
    title: "Marassi",
    location: "North Coast",
    price: "From EGP 9,200,000",
    propertyTypes: "Chalets & apartments",
    areaRange: "90–250 m²",
    developer: "Emaar Misr",
    imageSrc: "/HomePage/FeaturedProjects/defalutProjectImage.jpg",
  },
  {
    id: "4",
    badge: "FLEXIBLE PAYMENTS",
    title: "Mountain View iCity",
    location: "6th of October",
    price: "From EGP 7,800,000",
    propertyTypes: "Apartments & iVillas",
    areaRange: "115–280 m²",
    developer: "Mountain View",
    imageSrc: "/HomePage/FeaturedProjects/defalutProjectImage.jpg",
  },
];

export default function FeaturedProjectsSection() {
  return (
    <section className="bg-[#F3F5F3] py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              DISCOVER THE EXTRAORDINARY
            </p>
            <h2
              className="mt-2 text-[32px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326] sm:text-[38px]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Featured Projects
            </h2>
            <p
              className="mt-3 text-[15px] font-normal leading-[1.6] tracking-normal text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Thoughtfully selected communities. Exceptional homes. A future
              worth investing in.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 self-start text-[14px] font-semibold leading-none text-[#145C4B] transition-opacity hover:opacity-80 md:self-end"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>Explore all projects</span>
            <Image
              src="/HomePage/FeaturedProjects/link.svg"
              alt="Arrow"
              width={9}
              height={9}
              className="h-[9px] w-[9px] shrink-0"
            />
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DUMMY_FEATURED_PROJECTS.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

