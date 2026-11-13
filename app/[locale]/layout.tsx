import { notFound } from "next/navigation";
import LocaleProvider from "@/shared/providers/LocaleProvider";
import FloatingWhatsAppButton from "@/components/UserComp/Common/FloatingWhatsAppButton";
import ScrollToTop from "@/components/UserComp/Common/ScrollToTop";
import { isValidLocale, SupportedLocale } from "@/features/i18n/i18nConfig";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <LocaleProvider locale={locale as SupportedLocale}>
      <ScrollToTop />
      {children}
      <FloatingWhatsAppButton />
    </LocaleProvider>
  );
}
