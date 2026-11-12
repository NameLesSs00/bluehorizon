import { Metadata } from "next";
import AdminRentalLocationsPage from "@/components/adminComp/RentalLocations/AdminRentalLocationsPage";

export const metadata: Metadata = {
  title: "Rental Locations | Admin Portal | Blue Horizon",
  description: "Manage destinations and locations for rental properties",
};

export default function Page() {
  return <AdminRentalLocationsPage />;
}

