import type { Metadata } from "next";
import { Suspense } from "react";
import StandaloneListPage from "@/components/UserComp/Standalone/StandaloneListPage";
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
    ? "وحدات مستعملة وشقق وفيلات للبيع | بلو هورايزون"
    : isGerman
    ? "Bestandsimmobilien & Villen zum Verkauf | Blue Horizon"
    : isRussian
    ? "Вторичная недвижимость, квартиры и виллы на продажу | Blue Horizon"
    : "Second Hand Properties & Units for Sale | Blue Horizon";

  const description = isArabic
    ? "تصفح وحدات سكنية مستعملة وفيلات وشقق للبيع الفوري في الغردقة ومصر مع تفاصيل كاملة وأسعار دقيقة."
    : isGerman
    ? "Bestandswohnungen, Villen und Penthouses zum Sofortkauf am Roten Meer."
    : isRussian
    ? "Изучите готовые квартиры, частные виллы и объекты вторичного жилья для немедленной покупки в Хургаде и Египте."
    : "Explore second hand apartments, private villas, and residential units available for immediate sale in Hurghada and Egypt.";

  return buildPageMetadata({
    title,
    description,
    locale,
    path: "/second-hand",
  });
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F0F3FA]" />}>
      <StandaloneListPage />
    </Suspense>
  );
}
