import { Metadata } from "next";
import AdminRentalsPage from "@/components/adminComp/Rentals/AdminRentalsPage";

export const metadata: Metadata = {
  title: "Rental Properties | Admin Portal | Blue Horizon",
  description: "Manage vacation rentals, luxury villas, and holiday apartments",
};

export default function Page() {
  return <AdminRentalsPage />;
}

