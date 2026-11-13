"use client";

import { ProjectPriceDto, SUPPORTED_PROJECT_CURRENCIES } from "@/models/project";

interface ProjectPricesFieldsProps {
  prices: ProjectPriceDto[];
  onChange: (updatedPrices: ProjectPriceDto[]) => void;
}

const currencyMeta: Record<string, { label: string; symbol: string; hint: string }> = {
  USD: { label: "US Dollar (USD)", symbol: "$", hint: "International standard" },
  EUR: { label: "Euro (EUR)", symbol: "€", hint: "European buyers" },
  GBP: { label: "British Pound (GBP)", symbol: "£", hint: "UK buyers" },
  EGP: { label: "Egyptian Pound (EGP)", symbol: "EGP", hint: "Local Egyptian market" },
};

export default function ProjectPricesFields({
  prices,
  onChange,
}: ProjectPricesFieldsProps) {
  function handlePriceChange(
    currency: string,
    field: "minimumPrice" | "maximumPrice",
    value: string
  ) {
    const num = parseFloat(value) || 0;
    const updated = SUPPORTED_PROJECT_CURRENCIES.map((curr) => {
      const existing = prices.find((p) => p.currency.toUpperCase() === curr) || {
        currency: curr,
        minimumPrice: 0,
        maximumPrice: 0,
      };

      if (curr === currency) {
        return {
          ...existing,
          [field]: num,
        };
      }
      return existing;
    });

    onChange(updated);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-[#C5D3E8] bg-[#F9F7F4] p-5">
      <div>
        <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#2B5FA6]">
          Pricing Across All Supported Currencies *
        </h4>
        <p className="mt-0.5 text-[12px] text-[#65706B]">
          Set the starting (minimum) and ceiling (maximum) price for each currency.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SUPPORTED_PROJECT_CURRENCIES.map((curr) => {
          const meta = currencyMeta[curr] || {
            label: curr,
            symbol: curr,
            hint: "",
          };
          const priceObj = prices.find((p) => p.currency.toUpperCase() === curr) || {
            currency: curr,
            minimumPrice: 0,
            maximumPrice: 0,
          };

          return (
            <div
              key={curr}
              className="rounded-xl border border-[#D0D9EA] bg-white p-4 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-[#E2E8F3] pb-2">
                <span className="text-[13px] font-bold text-[#202326]">
                  {meta.label}
                </span>
                <span className="rounded-md bg-[#2B5FA6]/10 px-2 py-0.5 text-[11px] font-semibold text-[#2B5FA6]">
                  {meta.symbol}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-[#65706B]">
                    Min Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    required
                    value={priceObj.minimumPrice || ""}
                    onChange={(e) =>
                      handlePriceChange(curr, "minimumPrice", e.target.value)
                    }
                    placeholder="e.g. 150000"
                    className="mt-1 w-full rounded-lg border border-[#D0D9EA] bg-white px-2.5 py-1.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#1B3A6B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#65706B]">
                    Max Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    required
                    value={priceObj.maximumPrice || ""}
                    onChange={(e) =>
                      handlePriceChange(curr, "maximumPrice", e.target.value)
                    }
                    placeholder="e.g. 600000"
                    className="mt-1 w-full rounded-lg border border-[#D0D9EA] bg-white px-2.5 py-1.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#1B3A6B] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

