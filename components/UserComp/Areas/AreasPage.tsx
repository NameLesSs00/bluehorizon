import AreasHeroSection from "./AreasHeroSection";
import AreasListSection from "./AreasListSection";
import AreasCtaSection from "./AreasCtaSection";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";

export default function AreasPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F0F3FA]">
      <Navbar />
      <main className="flex-1">
        <AreasHeroSection />
        <AreasListSection />
        <AreasCtaSection />
      </main>
      <Footer />
    </div>
  );
}
