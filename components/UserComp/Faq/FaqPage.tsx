"use client";

import { useState } from "react";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import FaqHeroSection from "./FaqHeroSection";
import FaqAccordionSection from "./FaqAccordionSection";
import FaqSupportCta from "./FaqSupportCta";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen w-full flex-col bg-white overflow-x-clip">
      <Navbar />
      <main className="flex-1 w-full overflow-x-clip">
        <FaqHeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <FaqAccordionSection
          searchQuery={searchQuery}
          onResetSearch={() => setSearchQuery("")}
        />
        <FaqSupportCta />
      </main>
      <Footer />
    </div>
  );
}
