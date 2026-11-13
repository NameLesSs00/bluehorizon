import { Suspense } from "react";
import type { Metadata } from "next";
import RentalsPage from "@/components/UserComp/Rentals/RentalsPage";

export const metadata: Metadata = {
  title: "Rental Properties & Short/Long-Term Stays | Blue Horizon",
  description:
    "Discover fully furnished luxury apartments, chalets, and villas available for long-term lease or seasonal stay across Egypt's most sought-after prime neighborhoods.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FCFCFC]" />}>
      <RentalsPage />
    </Suspense>
  );
}

