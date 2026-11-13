import { Metadata } from "next";
import BlogsPage from "@/components/UserComp/Blogs/BlogsPage";

export const metadata: Metadata = {
  title: "Blogs & Insights | Blue Horizon Real Estate",
  description:
    "Discover expert market analyses, investment strategy guides, coastal luxury living trends, and architectural inspirations curated for property enthusiasts.",
};

export default function Page() {
  return <BlogsPage />;
}

