import AboutHeroSection from "./AboutHeroSection";
import AboutMetricsSection from "./AboutMetricsSection";
import AboutVisionMissionSection from "./AboutVisionMissionSection";
import AboutProcessSection from "./AboutProcessSection";
import AboutOfferSection from "./AboutOfferSection";
import AboutCtaSection from "./AboutCtaSection";
import Footer from "@/components/UserComp/Common/Footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <main className="flex-1 pb-12 sm:pb-16">
        <AboutHeroSection />
        <AboutMetricsSection />
        <AboutVisionMissionSection />
        <AboutProcessSection />
        <AboutOfferSection />
        <AboutCtaSection />
      </main>
      <Footer />
    </div>
  );
}

