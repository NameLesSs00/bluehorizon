import { Metadata } from "next";
import ContactPage from "@/components/UserComp/Contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Blue Horizon Real Estate",
  description:
    "Get in touch with Blue Horizon Real Estate specialists for consultations, site visits, or investment guidance in Hurghada and the Red Sea.",
};

export default function Page() {
  return <ContactPage />;
}

