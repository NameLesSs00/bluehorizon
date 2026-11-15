import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectsPage from "@/components/UserComp/Projects/ProjectsPage";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const isGerman = locale === "de";

  const title = isArabic
    ? "المشروعات والكمبوندات السكنية | بلو هورايزون"
    : isGerman
    ? "Immobilienprojekte & Compounds in Hurghada | Blue Horizon"
    : "Residential Projects & Luxury Compounds in Hurghada | Blue Horizon";

  const description = isArabic
    ? "استكشف أحدث المشروعات والكمبوندات الفاخرة المطلة على البحر في الغردقة، الجونة، وسهل حشيش مع خطط سداد مرنة."
    : isGerman
    ? "Entdecken Sie neue Wohnresorts, Luxus-Compounds und Strandimmobilien am Roten Meer."
    : "Explore premium residential compounds, beachfront developments, and master-planned communities in Hurghada and the Red Sea.";

  return buildPageMetadata({
    title,
    description,
    locale,
    path: "/projects",
  });
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F0F3FA]" />}>
      <ProjectsPage />
    </Suspense>
  );
}
