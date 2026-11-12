"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CurrencyState {
  currentCurrency: string;
  availableCurrencies: string[];
  setCurrency: (code: string) => void;
  setAvailableCurrencies: (currencies: string[]) => void;
}

const DEFAULT_CURRENCIES = ["USD", "EUR", "GBP", "EGP"];

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currentCurrency: "USD",
      availableCurrencies: DEFAULT_CURRENCIES,
      setCurrency: (code: string) =>
        set({ currentCurrency: code.toUpperCase() }),
      setAvailableCurrencies: (currencies: string[]) => {
        if (!currencies || currencies.length === 0) return;
        const normalized = Array.from(
          new Set(currencies.map((c) => c.toUpperCase()))
        );
        set((state) => ({
          availableCurrencies: normalized,
          currentCurrency: normalized.includes(state.currentCurrency)
            ? state.currentCurrency
            : normalized[0] || "USD",
        }));
      },
    }),
    {
      name: "bluehorizon-currency-storage",
    }
  )
);

