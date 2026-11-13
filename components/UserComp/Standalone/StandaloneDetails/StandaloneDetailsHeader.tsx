"use client";

import { motion } from "framer-motion";
import { StandaloneUnitItem } from "@/models/standaloneUnit";
import { useTranslation } from "@/features/i18n/useTranslation";

interface StandaloneDetailsHeaderProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneDetailsHeader({ unit }: StandaloneDetailsHeaderProps) {
  const { t } = useTranslation();

  const currencySymbol =
    unit.currencyCode === "USD"
      ? "$ "
      : unit.currencyCode === "EUR"
      ? "€ "
      : unit.currencyCode === "GBP"
      ? "£ "
      : unit.currencyCode
      ? `${unit.currencyCode} `
      : "EGP ";

  const formattedPrice =
    typeof unit.price === "number" && unit.price > 0
      ? `${currencySymbol}${unit.price.toLocaleString()}`
      : t("standaloneDetail.header.priceOnRequest", "Price on request");

  const locationParts: string[] = [];
  if (unit.country)
    locationParts.push(`${t("standaloneDetail.header.country", "Country")}: ${unit.country}`);
  if (unit.city)
    locationParts.push(`${t("standaloneDetail.header.city", "City")}: ${unit.city}`);
  if (unit.district || unit.street) {
    locationParts.push(
      `${t("standaloneDetail.header.street", "Street")}: ${[unit.street, unit.district].filter(Boolean).join(", ")}`
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4"
    >
      {/* Title & Location Info */}
      <div>
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B5FA6]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {unit.name}
        </h1>

        {locationParts.length > 0 && (
          <p
            className="mt-2 text-xs sm:text-sm text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {locationParts.join("   ")}
          </p>
        )}
      </div>

      {/* Asking Price on Right */}
      <div className="md:text-right shrink-0">
        <span
          className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("standaloneDetail.header.askingResalePrice", "Asking Resale Price")}
        </span>
        <div
          className="mt-0.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B5FA6]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {formattedPrice}
        </div>
      </div>
    </motion.div>
  );
}
