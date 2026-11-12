export interface ExchangeRateItem {
  currencyCode: string;
  amount: number;
}

export interface ExchangeRatesData {
  baseCurrency: string;
  baseAmount: number;
  lastUpdated: string;
  rates: ExchangeRateItem[];
}

