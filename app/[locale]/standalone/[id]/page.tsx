import { permanentRedirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function LegacyStandaloneDetailRedirect({ params }: PageProps) {
  const { id, locale } = await params;
  permanentRedirect(`/${locale}/second-hand/${id}`);
}
