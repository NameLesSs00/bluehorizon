"use client";

import { useLocale } from "@/shared/providers/LocaleProvider";

export function useTranslation() {
  const { locale, direction, dictionary } = useLocale();

  function t(path: string, fallback?: string): string {
    const keys = path.split(".");
    let current: unknown = dictionary;

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        return fallback ?? path;
      }
    }

    if (typeof current === "string") {
      return current;
    }

    return fallback ?? path;
  }

  return {
    t,
    locale,
    direction,
    dict: dictionary,
  };
}

