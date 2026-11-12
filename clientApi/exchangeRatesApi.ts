import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import { ExchangeRatesData } from "@/models/exchangeRate";

export async function getExchangeRates(): Promise<ExchangeRatesData | null> {
  const response = await apiClient.get<ApiResponse<ExchangeRatesData>>(
    "/api/Auth/exchange-rates"
  );
  return response.data?.data ?? null;
}

