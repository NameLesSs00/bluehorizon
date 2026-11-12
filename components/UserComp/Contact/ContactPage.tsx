import ContactHeroSection from "./ContactHeroSection";
import ContactInfoSection from "./ContactInfoSection";
import ContactOfficeLocationsSection from "./ContactOfficeLocationsSection";
import ContactCtaSection from "./ContactCtaSection";
import Footer from "@/components/UserComp/Common/Footer";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F3F5F3]">
      <main className="flex-1 pb-12 sm:pb-16">
        <ContactHeroSection />
        <ContactInfoSection />
        <ContactOfficeLocationsSection />
        <ContactCtaSection />
      </main>
      <Footer />
    </div>
  );
}

