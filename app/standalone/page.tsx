import { Metadata } from "next";
import StandaloneListPage from "@/components/UserComp/Standalone/StandaloneListPage";

export const metadata: Metadata = {
  title: "Standalone Units | Blue Horizon Real Estate",
  description:
    "Explore independent apartments, villas, and residential units available for immediate sale in Hurghada and across Egypt.",
};

export default function Page() {
  return <StandaloneListPage />;
}
