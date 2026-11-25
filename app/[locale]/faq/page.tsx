import type { Metadata } from "next";
import FaqPage from "@/components/UserComp/Faq/FaqPage";
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
    ? "الأسئلة الشائعة | بلو هورايزون للعقارات"
    : isGerman
    ? "Häufig gestellte Fragen (FAQ) | Blue Horizon Real Estate"
    : isRussian
    ? "Часто задаваемые вопросы (FAQ) | Blue Horizon Real Estate"
    : "Frequently Asked Questions (FAQ) | Blue Horizon Real Estate";

  const description = isArabic
    ? "إجابات شاملة على أكثر الأسئلة شيوعاً حول شراء وتأجير واستثمار العقارات في الغردقة والبحر الأحمر."
    : isGerman
    ? "Klare Antworten auf häufige Fragen zu Kauf, Vermietung, rechtlicher Prüfung und Investments in Hurghada."
    : isRussian
    ? "Ответы на популярные вопросы о покупке, аренде, юридической проверке и инвестициях в недвижимость Хургады и Красного моря."
    : "Find clear answers to the most common questions about buying, renting, legal verification, and investing in Hurghada and the Red Sea.";

  return buildPageMetadata({
    title,
    description,
    locale,
    path: "/faq",
  });
}

export default function Page() {
  return <FaqPage />;
}
