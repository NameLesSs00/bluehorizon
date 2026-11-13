"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StandaloneUnitItem } from "@/models/standaloneUnit";
import { useTranslation } from "@/features/i18n/useTranslation";

interface StandaloneSpecsBarProps {
  unit: StandaloneUnitItem;
}

export default function StandaloneSpecsBar({ unit }: StandaloneSpecsBarProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const specs: { label: string; value: string }[] = [];

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

  if (typeof unit.price === "number" && unit.price > 0) {
    specs.push({
      label: t("standaloneDetail.specs.totalPrice", "TOTAL PRICE"),
      value: `${currencySymbol}${unit.price.toLocaleString()}`,
    });
  }

  if (typeof unit.area === "number" && unit.area > 0) {
    specs.push({
      label: t("standaloneDetail.specs.totalArea", "TOTAL AREA"),
      value: `${unit.area} m²`,
    });
  }

  if (unit.propertyType) {
    specs.push({
      label: t("standaloneDetail.specs.unitType", "UNIT TYPE"),
      value: unit.propertyType,
    });
  }

  if (unit.view) {
    specs.push({
      label: t("standaloneDetail.specs.primaryView", "PRIMARY VIEW"),
      value: unit.view,
    });
  }

  if (typeof unit.noBedRoom === "number" && unit.noBedRoom > 0) {
    specs.push({
      label: t("standaloneDetail.specs.bedrooms", "BEDROOMS"),
      value: `${unit.noBedRoom} ${
        unit.noBedRoom === 1
          ? t("standaloneDetail.specs.room", "Room")
          : t("standaloneDetail.specs.rooms", "Rooms")
      }`,
    });
  }

  if (typeof unit.noBathRoom === "number" && unit.noBathRoom > 0) {
    specs.push({
      label: t("standaloneDetail.specs.bathrooms", "BATHROOMS"),
      value: `${unit.noBathRoom} ${
        unit.noBathRoom === 1
          ? t("standaloneDetail.specs.bath", "Bath")
          : t("standaloneDetail.specs.baths", "Baths")
      }`,
    });
  }

  if (typeof unit.noKitchen === "number" && unit.noKitchen > 0) {
    specs.push({
      label: t("standaloneDetail.specs.kitchens", "KITCHENS"),
      value: `${unit.noKitchen} ${t("standaloneDetail.specs.kitchen", "Kitchen")}`,
    });
  }

  if (unit.floorName) {
    specs.push({
      label: t("standaloneDetail.specs.floor", "FLOOR"),
      value: unit.floorName,
    });
  } else if (typeof unit.floorNumber === "number") {
    specs.push({
      label: t("standaloneDetail.specs.floor", "FLOOR"),
      value:
        unit.floorNumber === 0
          ? t("standaloneDetail.specs.ground", "Ground")
          : `${unit.floorNumber}th`,
    });
  }

  if (specs.length === 0) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6 rounded-[20px] border border-[#D9E2EE] bg-white p-5 sm:p-6 shadow-sm"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-6">
        {specs.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: idx * 0.06, ease: "easeOut" }}
            className="flex flex-col items-center text-center px-2 border-r border-[#D9E2EE] last:border-r-0"
          >
            <span
              className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.label}
            </span>
            <span
              className="mt-1 block text-sm sm:text-base font-bold text-[#202326] text-center leading-snug"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
