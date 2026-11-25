import type { Metadata } from "next";
import LocationsPage from "@/components/UserComp/Locations/LocationsPage";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const isGerman = locale === "de";
  const isRussian = locale === "ru";

  const title = isArabic
    ? "وجهات ومواقع الإيجار السياحي | بلو هورايزون"
    : isGerman
    ? "Top-Lagen für Ferienunterkünfte | Blue Horizon"
    : isRussian
    ? "Лучшие курортные локации для аренды | Blue Horizon"
    : "Top Vacation Rental Locations & Coastal Hotspots | Blue Horizon";

  const description = isArabic
    ? "استكشف أفضل الوجهات الساحلية للإيجار اليومي والشهري في الغردقة، سهل حشيش، والجونة."
    : isGerman
    ? "Buchen Sie erstklassige Ferienapartments und Villen in den schönsten Destinationen Ägyptens."
    : isRussian
    ? "Изучите лучшие направления для курортной аренды в Египте с проверенными шале, виллами и апартаментами у моря."
    : "Explore premier vacation rental destinations across Egypt with verified chalets, villas, and luxury beachfront stays.";

  return buildPageMetadata({
    title,
    description,
    locale,
    path: "/locations",
  });
}

export default function Page() {
  return <LocationsPage />;
}
