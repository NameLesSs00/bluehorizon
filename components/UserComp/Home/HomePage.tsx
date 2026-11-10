import FeaturedProjectsSection from "./FeaturedProjectsSection";
import PopularAreasSection from "./PopularAreasSection";
import WhyBlueHorizonSection from "./WhyBlueHorizonSection";
import FaqsSection from "./FaqsSection";
import DreamHomeSection from "./DreamHomeSection";
import Footer from "@/components/UserComp/Common/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Home Hero & Header Section will be placed here */}
      <main className="flex-1">
        <FeaturedProjectsSection />
        <PopularAreasSection />
        <WhyBlueHorizonSection />
        <FaqsSection />
        <DreamHomeSection />
      </main>
      <Footer />
    </div>
  );
}
