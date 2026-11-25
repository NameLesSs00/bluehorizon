import { permanentRedirect } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LegacyStandaloneRedirect({ params }: PageProps) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/second-hand`);
}
