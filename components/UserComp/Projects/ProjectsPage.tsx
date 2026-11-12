import ProjectsHeroSection from "./ProjectsHeroSection";
import ProjectsListSection from "./ProjectsListSection";
import Footer from "@/components/UserComp/Common/Footer";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <main className="flex-1">
        <ProjectsHeroSection />
        <ProjectsListSection />
      </main>
      <Footer />
    </div>
  );
}

