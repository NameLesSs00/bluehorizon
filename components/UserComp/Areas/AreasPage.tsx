import AreasHeroSection from "./AreasHeroSection";
import AreasListSection from "./AreasListSection";
import AreasCtaSection from "./AreasCtaSection";
import Footer from "@/components/UserComp/Common/Footer";

export default function AreasPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F3F5F3]">
      <main className="flex-1">
        <AreasHeroSection />
        <AreasListSection />
        <AreasCtaSection />
      </main>
      <Footer />
    </div>
  );
}
