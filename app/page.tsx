import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/features/i18n/i18nConfig";

export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
