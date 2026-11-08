import { Metadata } from "next";
import AreasPage from "@/components/UserComp/Areas/AreasPage";

export const metadata: Metadata = {
  title: "Areas | Blue Horizon Real Estate",
  description:
    "Discover the Red Sea's most desirable communities and find the area that fits the way you want to live.",
};

export default function Page() {
  return <AreasPage />;
}

