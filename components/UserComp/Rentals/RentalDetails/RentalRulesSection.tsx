import { FiCheck, FiInfo } from "react-icons/fi";
import { RentalItem } from "@/models/rental";

interface RentalRulesSectionProps {
  unit: RentalItem;
}

export default function RentalRulesSection({ unit }: RentalRulesSectionProps) {
  const cancellationPolicy =
    unit.rulesCancellation?.trim() || "Flexible Cancellation";
  const listing = unit.listingDetails;

  const occupancyRules: { label: string; value: string }[] = [];

  // Maximum Capacity
  if (typeof unit.capacity === "number" && unit.capacity > 0) {
    occupancyRules.push({
      label: "Maximum Capacity",
      value: `Up to ${unit.capacity} Guests`,
    });
  }

  // Check-In Guideline
  if (listing?.lateCheckIn && listing.lateCheckIn.trim().length > 0) {
    occupancyRules.push({
      label: "Check-In Policy",
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
      label: "Extra Guests",
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
            Rental Terms, House Rules &amp; Cancellation
          </h2>
          <p
            className="mt-1 text-xs sm:text-sm text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Occupancy policies and cancellation terms provided for this property
          </p>
        </div>

        {cancellationPolicy && (
          <span
            className="inline-flex self-start sm:self-auto rounded-full bg-[#E5ECF6] px-3.5 py-1 text-xs font-semibold text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {cancellationPolicy}
          </span>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Cancellation Policy Card */}
        <div className="rounded-[16px] border border-[#D9E2EE] bg-[#FCFCFC] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FiCheck className="h-4 w-4 text-[#2B5FA6]" />
              <h3
                className="text-sm font-bold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Cancellation Policy
              </h3>
            </div>
            <p
              className="mt-3 text-xs sm:text-sm text-[#65706B] leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              This property operates under the verified{" "}
              <strong className="text-[#2B5FA6] font-semibold">
                {cancellationPolicy}
              </strong>{" "}
              policy as specified by the property management.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#D9E2EE]/70 flex items-center justify-between text-xs text-[#65706B]">
            <span>Policy Tier</span>
            <span className="font-semibold text-[#2B5FA6]">
              {cancellationPolicy}
            </span>
          </div>
        </div>

        {/* House Rules & Occupancy Card */}
        <div className="rounded-[16px] border border-[#D9E2EE] bg-[#FCFCFC] p-5">
          <div className="flex items-center gap-2">
            <FiInfo className="h-4 w-4 text-[#2B5FA6]" />
            <h3
              className="text-sm font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Occupancy &amp; Guidelines
            </h3>
          </div>

          {occupancyRules.length > 0 ? (
            <div
              className="mt-3 divide-y divide-[#D9E2EE] text-xs sm:text-[13px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {occupancyRules.map((rule) => (
                <div
                  key={rule.label}
                  className="flex items-center justify-between py-2.5"
                >
                  <span className="text-[#65706B]">{rule.label}</span>
                  <span className="font-semibold text-[#202326] text-right">
                    {rule.value}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p
              className="mt-3 text-xs text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              No specific occupancy guidelines recorded for this property.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
