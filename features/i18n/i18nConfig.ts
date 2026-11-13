import enDict from "@/translations/en.json";
import deDict from "@/translations/de.json";
import arDict from "@/translations/ar.json";

export type SupportedLocale = "en" | "de" | "ar";

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const SUPPORTED_LOCALES: SupportedLocale[] = ["en", "de", "ar"];

export type Dictionary = typeof enDict;

const DICTIONARIES: Record<SupportedLocale, Dictionary> = {
  en: enDict,
  de: deDict,
  ar: arDict,
};

export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export function getDictionary(locale: SupportedLocale): Dictionary {
  return DICTIONARIES[locale] || DICTIONARIES[DEFAULT_LOCALE];
}

export function getLocaleDirection(locale: SupportedLocale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

