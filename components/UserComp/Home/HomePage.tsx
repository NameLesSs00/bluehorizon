import Navbar from "@/components/UserComp/Common/Navbar";
import HomeHeroSection from "./Hero/HomeHeroSection";
import FeaturedProjectsSection from "./FeaturedProjectsSection";
import FeaturedStandaloneSection from "./FeaturedStandaloneSection";
import PopularAreasSection from "./PopularAreasSection";
import WhyBlueHorizonSection from "./WhyBlueHorizonSection";
import PopularRentalLocationsSection from "./PopularRentalLocationsSection";
import UnitsForRentSection from "./UnitsForRentSection";
import HomeBlogsSection from "./HomeBlogsSection";
import FaqsSection from "./FaqsSection";
import DreamHomeSection from "./DreamHomeSection";
import Footer from "@/components/UserComp/Common/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white overflow-x-clip w-full">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 w-full overflow-x-clip">
        <HomeHeroSection />
        <PopularAreasSection />
        <FeaturedProjectsSection />
        <WhyBlueHorizonSection />
        <FeaturedStandaloneSection />
        <PopularRentalLocationsSection />
        <UnitsForRentSection />
        <HomeBlogsSection />
        <FaqsSection />
        <DreamHomeSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
