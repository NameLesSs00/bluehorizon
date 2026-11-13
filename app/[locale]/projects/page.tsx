import { Metadata } from "next";
import ProjectsPage from "@/components/UserComp/Projects/ProjectsPage";

export const metadata: Metadata = {
  title: "Our Projects | Blue Horizon Real Estate",
  description:
    "Explore our premium developments, luxury compounds, and seaside residences across Hurghada and the Red Sea.",
};

export default function Page() {
  return <ProjectsPage />;
}

