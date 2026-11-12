import type { Metadata } from "next";
import BlogDetailsPage from "@/components/UserComp/Blogs/BlogDetails/BlogDetailsPage";

interface PageProps {
  params: Promise<{ name: string }>;
}

export const metadata: Metadata = {
  title: "Blog Details | Blue Horizon Real Estate",
  description:
    "Explore in-depth property insights, market analyses, and coastal investment guides.",
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const blogName = resolvedParams.name || "";

  return <BlogDetailsPage name={blogName} />;
}
