"use client";

import { FiCheck, FiInfo } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { RentalItem } from "@/models/rental";

interface RentalRulesSectionProps {
  unit: RentalItem;
}

export default function RentalRulesSection({ unit }: RentalRulesSectionProps) {
  const { t } = useTranslation();
  const cancellationPolicy =
    unit.rulesCancellation?.trim() || t("rent.details.flexibleCancellation");
  const listing = unit.listingDetails;

  const occupancyRules: { label: string; value: string }[] = [];

  // Maximum Capacity
  if (typeof unit.capacity === "number" && unit.capacity > 0) {
    occupancyRules.push({
      label: t("rent.details.maxCapacity"),
      value: t("rent.details.guestsCount").replace("{count}", String(unit.capacity)),
    });
  }

  // Check-In Guideline
  if (listing?.lateCheckIn && listing.lateCheckIn.trim().length > 0) {
    occupancyRules.push({
      label: t("rent.details.checkInPolicy"),
      value: listing.lateCheckIn,
    });
  }

  // Extra Guests Guideline
  if (listing?.extraPeople && listing.extraPeople.trim().length > 0) {
    const feeText =
      typeof listing.extraPeopleFee === "number" && listing.extraPeopleFee > 0
        ? ` (${listing.extraPeopleFee.toLocaleString()} EGP fee)`
        : "";
    occupancyRules.push({
      label: t("rent.details.extraGuests"),
      value: `${listing.extraPeople}${feeText}`,
    });
  }

  // If both cancellation and occupancy details are completely empty, hide section
  if (!unit.rulesCancellation && occupancyRules.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-6 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {t("rent.details.rulesTitle")}
          </h2>
          <p
            className="mt-1 text-xs sm:text-sm text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("rent.details.cancellation")}: {cancellationPolicy}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E5ECF6] px-3.5 py-1 text-xs font-semibold text-[#2B5FA6]">
          <FiCheck className="h-3.5 w-3.5" />
          <span>{t("rent.details.verifiedRental")}</span>
        </div>
      </div>

      {occupancyRules.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {occupancyRules.map((rule) => (
            <div
              key={rule.label}
              className="flex items-start gap-3 rounded-[14px] bg-[#F0F3FA] p-3.5"
            >
              <FiInfo className="h-4 w-4 text-[#2B5FA6] shrink-0 mt-0.5" />
              <div>
                <span
                  className="block text-xs font-bold uppercase tracking-wider text-[#65706B]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {rule.label}
                </span>
                <span
                  className="mt-0.5 block text-xs sm:text-sm font-semibold text-[#202326]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {rule.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
