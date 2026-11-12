import Navbar from "@/components/UserComp/Common/Navbar";
import HomeHeroSection from "./Hero/HomeHeroSection";
import FeaturedProjectsSection from "./FeaturedProjectsSection";
import PopularAreasSection from "./PopularAreasSection";
import WhyBlueHorizonSection from "./WhyBlueHorizonSection";
import FaqsSection from "./FaqsSection";
import DreamHomeSection from "./DreamHomeSection";
import Footer from "@/components/UserComp/Common/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        <HomeHeroSection />
        <PopularAreasSection />
        <FeaturedProjectsSection />
        <WhyBlueHorizonSection />
        <FaqsSection />
        <DreamHomeSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
