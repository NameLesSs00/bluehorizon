import { Metadata } from "next";
import AboutPage from "@/components/UserComp/About/AboutPage";

export const metadata: Metadata = {
  title: "About Us | Blue Horizon Real Estate",
  description:
    "Redefining real estate excellence in the Red Sea. Empower your property investments with trusted guidance, seamless digital search and deep local expertise.",
};

export default function Page() {
  return <AboutPage />;
}

