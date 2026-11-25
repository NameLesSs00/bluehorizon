import type { Metadata } from "next";
import AboutPage from "@/components/UserComp/About/AboutPage";
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
    ? "عن بلو هورايزون | ريادة الاستثمار العقاري في البحر الأحمر"
    : isGerman
    ? "Über uns | Blue Horizon Real Estate Ägypten"
    : isRussian
    ? "О нас | Ведущее агентство недвижимости в Хургаде | Blue Horizon"
    : "About Us | Premier Real Estate Agency in Hurghada | Blue Horizon";

  const description = isArabic
    ? "تعرف على بلو هورايزون، شريكك الموثوق في شراء وتأجير واستثمار العقارات الفاخرة في الغردقة ومصر."
    : isGerman
    ? "Erfahren Sie mehr über Blue Horizon, Ihren verlässlichen Partner für Immobilien am Roten Meer."
    : isRussian
    ? "Новые стандарты недвижимости на Красном море. Надёжное сопровождение инвестиций и глубокая локальная экспертиза с Blue Horizon."
    : "Redefining real estate excellence in the Red Sea. Empower your property investments with trusted guidance and deep local expertise.";

  return buildPageMetadata({
    title,
    description,
    locale,
    path: "/about",
  });
}

export default function Page() {
  return <AboutPage />;
}
