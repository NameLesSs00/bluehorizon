"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  Dictionary,
  getDictionary,
  getLocaleDirection,
  SupportedLocale,
  DEFAULT_LOCALE,
} from "@/features/i18n/i18nConfig";

interface LocaleContextValue {
  locale: SupportedLocale;
  direction: "ltr" | "rtl";
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  direction: "ltr",
  dictionary: getDictionary(DEFAULT_LOCALE),
});

interface LocaleProviderProps {
  locale: SupportedLocale;
  children: ReactNode;
}

export default function LocaleProvider({
  locale,
  children,
}: LocaleProviderProps) {
  const direction = getLocaleDirection(locale);
  const dictionary = getDictionary(locale);

  return (
    <LocaleContext.Provider value={{ locale, direction, dictionary }}>
      <div dir={direction} className="min-h-screen">
        {children}
      </div>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

