import FeaturedProjectsSection from "./FeaturedProjectsSection";
import Footer from "@/components/UserComp/Common/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Home Hero & Header Section will be placed here */}
      <main className="flex-1">
        <FeaturedProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
