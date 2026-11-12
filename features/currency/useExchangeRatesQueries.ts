"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getExchangeRates } from "@/clientApi/exchangeRatesApi";
import { useCurrencyStore } from "./useCurrencyStore";

export const EXCHANGE_RATES_QUERY_KEY = ["exchange-rates"] as const;

export function useExchangeRatesQuery() {
  const setAvailableCurrencies = useCurrencyStore(
    (state) => state.setAvailableCurrencies
  );

  const query = useQuery({
    queryKey: EXCHANGE_RATES_QUERY_KEY,
    queryFn: getExchangeRates,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  useEffect(() => {
    if (query.data?.rates && query.data.rates.length > 0) {
      const codes = query.data.rates.map((r) => r.currencyCode);
      setAvailableCurrencies(codes);
    }
  }, [query.data, setAvailableCurrencies]);

  return query;
}

