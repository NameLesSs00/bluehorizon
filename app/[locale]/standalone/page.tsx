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

  const title = isArabic
    ? "وحدات مستقلة وشقق وفيلات للبيع | بلو هورايزون"
    : isGerman
    ? "Eigenständige Immobilien & Villen zum Verkauf | Blue Horizon"
    : "Standalone Properties & Independent Units for Sale | Blue Horizon";

  const description = isArabic
    ? "تصفح وحدات سكنية مستقلة وفيلات وشقق للبيع الفوري في الغردقة ومصر مع تفاصيل كاملة وأسعار دقيقة."
    : isGerman
    ? "Unabhängige Wohnungen, Villen und Penthouses zum Sofortkauf am Roten Meer."
    : "Explore independent apartments, private villas, and residential units available for immediate sale in Hurghada and Egypt.";

  return buildPageMetadata({
    title,
    description,
    locale,
    path: "/standalone",
  });
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F0F3FA]" />}>
      <StandaloneListPage />
    </Suspense>
  );
}
