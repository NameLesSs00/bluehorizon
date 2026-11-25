import type { Metadata } from "next";
import ContactPage from "@/components/UserComp/Contact/ContactPage";
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
    ? "تواصل معنا | مستشارو عقارات بلو هورايزون"
    : isGerman
    ? "Kontaktieren Sie uns | Blue Horizon Real Estate"
    : isRussian
    ? "Контакты | Консультации и запросы по недвижимости | Blue Horizon"
    : "Contact Us | Real Estate Advisory & Inquiries | Blue Horizon";

  const description = isArabic
    ? "تواصل مع خبراء بلو هورايزون للحصول على استشارات عقارية، حجز جولات تفقدية، أو الاستفسار عن مشروعات الغردقة."
    : isGerman
    ? "Treten Sie mit unserem mehrsprachigen Team in Kontakt für persönliche Beratung und Besichtigungstermine."
    : isRussian
    ? "Свяжитесь со специалистами Blue Horizon Real Estate для консультаций, организации показов или инвестиционных советов в Хургаде."
    : "Get in touch with Blue Horizon Real Estate specialists for consultations, site visits, or investment guidance in Hurghada.";

  return buildPageMetadata({
    title,
    description,
    locale,
    path: "/contact",
  });
}

export default function Page() {
  return <ContactPage />;
}
