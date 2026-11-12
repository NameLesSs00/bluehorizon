import { Metadata } from "next";
import AdminStandaloneUnitsPage from "@/components/adminComp/StandaloneUnits/AdminStandaloneUnitsPage";

export const metadata: Metadata = {
  title: "StandAlone Props | Blue Horizon Admin",
  description: "Manage standalone properties outside compound projects.",
};

export default function Page() {
  return <AdminStandaloneUnitsPage />;
}

