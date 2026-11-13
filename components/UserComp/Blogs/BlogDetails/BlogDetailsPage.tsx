"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getBlogById, getBlogs, getFullImageUrl } from "@/clientApi/blogsApi";
import Navbar from "@/components/UserComp/Common/Navbar";
import BlogBreadcrumb from "./BlogBreadcrumb";
import BlogHeroImage from "./BlogHeroImage";
import BlogMainContent from "./BlogMainContent";
import BlogShareCard from "./BlogShareCard";
import BlogTableOfContents from "./BlogTableOfContents";
import BlogRecentArticles from "./BlogRecentArticles";
import Footer from "@/components/UserComp/Common/Footer";
import { BlogCardData } from "../BlogCard";

interface BlogDetailsPageProps {
  name: string;
}

export default function BlogDetailsPage({ name }: BlogDetailsPageProps) {
  const decodedName = decodeURIComponent(name || "").trim();

  // Query blog by name
  const {
    data: blogRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["publicBlog", decodedName],
    queryFn: async () => {
      if (!decodedName) return null;

      // Check if numeric ID was passed
      const numericId = parseInt(decodedName, 10);
      if (!isNaN(numericId) && numericId > 0 && String(numericId) === decodedName) {
        const res = await getBlogById(numericId);
        return res.data;
      }

      // Query blogs list and find by title
      const listRes = await getBlogs({
        Language: "en",
        PageNumber: 1,
        PageSize: 100,
      });

      const normalize = (str: string) =>
        str.toLowerCase().replace(/[^a-z0-9]/g, "");
      const normalizedTarget = normalize(decodedName);

      const matched = listRes.items.find(
        (b) =>
          b.title.toLowerCase().trim() === decodedName.toLowerCase() ||
          normalize(b.title) === normalizedTarget
      );

      if (!matched) return null;

      // Fetch full blog details with sections
      const res = await getBlogById(matched.id);
      return res.data || matched;
    },
    enabled: Boolean(decodedName),
    staleTime: 1000 * 60 * 5,
  });

  // Query recent articles for bottom section
  const { data: recentRes } = useQuery({
    queryKey: ["publicRecentBlogs", decodedName],
    queryFn: async () => {
      return await getBlogs({
        Language: "en",
        PageNumber: 1,
        PageSize: 4,
      });
    },
    staleTime: 1000 * 60 * 5,
  });

  const blog = blogRes;

  // Extract actual publication date if provided by backend data
  const rawDate =
    (blog as unknown as { createdAt?: string })?.createdAt ||
    (blog as unknown as { publishDate?: string })?.publishDate ||
    (blog as unknown as { createdDate?: string })?.createdDate ||
    (blog as unknown as { date?: string })?.date;

  const publicationDate = rawDate
    ? new Date(rawDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  // Extract category if available from backend
  const category =
    (blog as unknown as { category?: string })?.category || null;

  // Map other blogs for recent section (excluding current)
  const recentArticles: BlogCardData[] = (recentRes?.items || [])
    .filter(
      (item) =>
        item.id !== blog?.id &&
        item.title.toLowerCase().trim() !== decodedName.toLowerCase()
    )
    .slice(0, 3)
    .map((item) => {
      const itemRawDate =
        (item as unknown as { createdAt?: string })?.createdAt ||
        (item as unknown as { publishDate?: string })?.publishDate;
      const itemFormattedDate = itemRawDate
        ? new Date(itemRawDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "";

      return {
        id: item.id,
        title: item.title,
        category: (item as unknown as { category?: string })?.category || "",
        date: itemFormattedDate,
        description:
          item.sections?.[0]?.content ||
          item.sections?.[0]?.tittle ||
          "",
        imageUrl: getFullImageUrl(item.imageUrl),
      };
    });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
        <Navbar />
        <main className="flex-1 pb-16">
          <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pt-8">
            <div className="h-4 w-48 animate-pulse rounded bg-[#D9E2EE] mb-6" />
            <div className="h-[360px] sm:h-[440px] w-full animate-pulse rounded-[28px] bg-[#E5ECF6]" />
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="h-6 w-24 animate-pulse rounded-full bg-[#D9E2EE]" />
                <div className="h-10 w-3/4 animate-pulse rounded bg-[#D9E2EE]" />
                <div className="h-4 w-full animate-pulse rounded bg-[#F0F3FA]" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-[#F0F3FA]" />
              </div>
              <div className="lg:col-span-4 space-y-4">
                <div className="h-32 w-full animate-pulse rounded-[20px] bg-[#F0F3FA]" />
                <div className="h-44 w-full animate-pulse rounded-[20px] bg-[#F0F3FA]" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24 px-4 text-center">
          <div className="max-w-md rounded-[24px] border border-[#D9E2EE] bg-white p-8 sm:p-10 shadow-sm">
            <h1
              className="text-2xl font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Article Not Found
            </h1>
            <p
              className="mt-3 text-sm text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The blog article you are looking for does not exist or may have
              been removed.
            </p>
            <Link
              href="/blogs"
              className="mt-6 inline-flex rounded-full bg-[#2B5FA6] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#1B3A6B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Back to Blogs
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const heroImageUrl = blog.imageUrl ? getFullImageUrl(blog.imageUrl) : null;
  const sections = blog.sections || [];

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <Navbar />
      <main className="flex-1 pb-16">
        <BlogBreadcrumb title={blog.title} category={category} />

        <BlogHeroImage imageUrl={heroImageUrl} title={blog.title} />

        {/* Two-Column Layout */}
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Main Article Body */}
            <div className="lg:col-span-8">
              <BlogMainContent
                title={blog.title}
                category={category}
                publicationDate={publicationDate}
                sections={sections}
              />
            </div>

            {/* Right Column: Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
              {/* Share Card (replaces Written By) */}
              <BlogShareCard title={blog.title} />

              {/* Table of Contents */}
              <BlogTableOfContents
                sections={sections}
                hasRecentArticles={recentArticles.length > 0}
              />
            </aside>
          </div>
        </div>

        {/* Recent Articles Section */}
        {recentArticles.length > 0 && (
          <BlogRecentArticles articles={recentArticles} />
        )}
      </main>

      <Footer />
    </div>
  );
}

