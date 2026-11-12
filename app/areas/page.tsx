import { Metadata } from "next";
import AreasPage from "@/components/UserComp/Areas/AreasPage";

export const metadata: Metadata = {
  title: "Areas | Blue Horizon Real Estate",
  description:
    "Discover the Red Sea's most desirable communities and explore premier area destinations.",
};

export default function Page() {
  return <AreasPage />;
}