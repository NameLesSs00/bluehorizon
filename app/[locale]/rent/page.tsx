import type { Metadata } from "next";
import { Suspense } from "react";
import RentalsPage from "@/components/UserComp/Rentals/RentalsPage";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const isGerman = locale === "de";

  const title = isArabic
    ? "عقارات للإيجار وشاليهات فندقية | بلو هورايزون"
    : isGerman
    ? "Mietwohnungen & Ferienapartments | Blue Horizon"
    : "Holiday Rentals & Vacation Homes in Hurghada | Blue Horizon";

  const description = isArabic
    ? "شقق وشاليهات مفروشة بالكامل للإيجار اليومي والشهري بإطلالات بحرية مباشرة في الغردقة والجونة."
    : isGerman
    ? "Voll ausgestattete Apartments und Villen für Kurz- und Langzeitmiete am Roten Meer."
    : "Discover fully furnished luxury apartments, beach chalets, and holiday villas for vacation or long-term lease in Egypt.";

  return buildPageMetadata({
    title,
    description,
    locale,
    path: "/rent",
  });
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FCFCFC]" />}>
      <RentalsPage />
    </Suspense>
  );
}
