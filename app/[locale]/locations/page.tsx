import { Metadata } from "next";
import LocationsPage from "@/components/UserComp/Locations/LocationsPage";

export const metadata: Metadata = {
  title: "Prime Coastal & Urban Locations | Blue Horizon Real Estate",
  description:
    "Explore premier real estate investment destinations across Egypt with verified compounds, standalone villas, and luxury rentals.",
};

export default function Page() {
  return <LocationsPage />;
}

