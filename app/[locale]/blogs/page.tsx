import type { Metadata } from "next";
import BlogsPage from "@/components/UserComp/Blogs/BlogsPage";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const isGerman = locale === "de";

  const title = isArabic
    ? "مدونة العقارات والمقالات الاستثمارية | بلو هورايزون"
    : isGerman
    ? "Blog & Immobilien-Ratgeber Ägypten | Blue Horizon"
    : "Real Estate Blog & Investment Insights | Blue Horizon";

  const description = isArabic
    ? "مقالات وتحليلات حصرية عن سوق العقارات في الغردقة، نصائح الاستثمار، ودليل الشراء والإيجار في البحر الأحمر."
    : isGerman
    ? "Marktanalysen, Kauftipps und Leitfäden für Immobilieninvestitionen am Roten Meer."
    : "Discover expert market analyses, investment strategy guides, coastal luxury living trends, and Red Sea property insights.";

  return buildPageMetadata({
    title,
    description,
    locale,
    path: "/blogs",
  });
}

export default function Page() {
  return <BlogsPage />;
}
