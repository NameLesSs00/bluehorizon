import type { Metadata } from "next";
import HomePage from "@/components/UserComp/Home/HomePage";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";
import { buildOrganizationJsonLd } from "@/shared/utils/jsonLd";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const isGerman = locale === "de";

  const title = isArabic
    ? "بلو هورايزون | عقارات فاخرة وشاليهات للإيجار في البحر الأحمر والغردقة"
    : isGerman
    ? "Blue Horizon | Luxusimmobilien & Ferienwohnungen in Hurghada"
    : "Blue Horizon | Luxury Real Estate, Beachfront Compounds & Rentals in Egypt";

  const description = isArabic
    ? "اكتشف أفضل الكمبوندات والشقق الفاخرة، والوحدات الفندقية للإيجار في الغردقة، الجونة، وسهل حشيش بأفضل الأسعار وخطط السداد."
    : isGerman
    ? "Entdecken Sie Premium-Strandapartments, Luxusresorts und Feriendomizile am Roten Meer mit Blue Horizon Real Estate."
    : "Discover premium beachfront compounds, investment apartments, and holiday rentals in Hurghada and the Red Sea with Blue Horizon Real Estate.";

  return buildPageMetadata({
    title,
    description,
    locale,
    path: "/",
  });
}

export default async function Home() {
  const orgJsonLd = buildOrganizationJsonLd();

  return (
    <>
      <script
        id="json-ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <HomePage />
    </>
  );
}
