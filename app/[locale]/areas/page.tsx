import type { Metadata } from "next";
import AreasPage from "@/components/UserComp/Areas/AreasPage";
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
    ? "المناطق والوجهات العقارية | بلو هورايزون"
    : isGerman
    ? "Regionen & Standorte am Roten Meer | Blue Horizon"
    : isRussian
    ? "Районы и лучшие локации для инвестиций | Blue Horizon"
    : "Destinations & Prime Investment Areas | Blue Horizon";

  const description = isArabic
    ? "تعرف على أفضل المناطق السكنية والاستثمارية في الغردقة، الجونة، سهل حشيش، ومكادي باي."
    : isGerman
    ? "Entdecken Sie die begehrtesten Lagen für Immobilieninvestments in Hurghada, El Gouna und Sahl Hasheesh."
    : isRussian
    ? "Откройте самые престижные районы Красного моря и лучшие локации в Хургаде, Эль-Гуне и Сахль-Хашише."
    : "Discover the Red Sea's most desirable communities and explore premier area destinations in Hurghada and El Gouna.";

  return buildPageMetadata({
    title,
    description,
    locale,
    path: "/areas",
  });
}

export default function Page() {
  return <AreasPage />;
}
