"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getBlogById, getBlogs, getFullImageUrl } from "@/clientApi/blogsApi";
import { useTranslation } from "@/features/i18n/useTranslation";
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
  const { t, locale } = useTranslation();
  const decodedName = decodeURIComponent(name || "").trim();

  // Query blog by name
  const {
    data: blogRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["publicBlog", decodedName, locale],
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
        Language: locale,
        PageNumber: 1,
        PageSize: 100,
      });

      const normalize = (str: string) =>
        str.toLowerCase().replace(/[^a-z0-9]/g, "");
      const normalizedTarget = normalize(decodedName);

      const matched = listRes.items.find(
        (b) =>
          normalize(b.title) === normalizedTarget ||
          b.title.toLowerCase().trim() === decodedName.toLowerCase()
      );

      if (matched) {
        const singleRes = await getBlogById(matched.id);
        return singleRes.data;
      }

      if (listRes.items.length > 0) {
        const first = await getBlogById(listRes.items[0].id);
        return first.data;
      }

      return null;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Query recent articles for bottom section
  const { data: recentData } = useQuery({
    queryKey: ["publicRecentBlogs", blogRes?.id, locale],
    queryFn: async () => {
      const res = await getBlogs({
        Language: locale,
        PageNumber: 1,
        PageSize: 4,
      });
      return res;
    },
    staleTime: 1000 * 60 * 5,
  });

  const recentArticles: BlogCardData[] = (recentData?.items || [])
    .filter((item) => item.id !== blogRes?.id)
    .slice(0, 3)
    .map((item) => {
      const localeFormat = locale === "ar" ? "ar-EG" : locale === "de" ? "de-DE" : "en-US";
      const formattedDate = item.publishDate
        ? new Date(item.publishDate).toLocaleDateString(localeFormat, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "";

      return {
        id: item.id,
        title: item.title,
        category: item.blogType?.trim() || "",
        date: formattedDate,
        description: "",
        imageUrl: item.imageUrl ? getFullImageUrl(item.imageUrl) : null,
      };
    });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
        <Navbar />
        <main className="flex-1 mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-4 w-48 animate-pulse rounded bg-[#E5ECF6] mb-6" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-[#E5ECF6] mb-8" />
          <div className="h-[420px] w-full animate-pulse rounded-[24px] bg-[#F0F3FA] mb-12" />
          <div className="space-y-4">
            <div className="h-4 w-full animate-pulse rounded bg-[#F0F3FA]" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-[#F0F3FA]" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-[#F0F3FA]" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !blogRes) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
        <Navbar />
        <main className="flex-1 mx-auto flex w-full max-w-[1360px] items-center justify-center px-4 py-24 text-center">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("blogs.details.notFoundTitle")}
            </h1>
            <p
              className="mt-2 text-sm text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("blogs.details.notFoundSubtitle")}
            </p>
            <Link
              href={`/${locale}/blogs`}
              className="mt-6 inline-flex items-center rounded-full bg-[#1B3A6B] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-[#162E56]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("blogs.details.backToBlogs")}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const localeFormat = locale === "ar" ? "ar-EG" : locale === "de" ? "de-DE" : "en-US";
  const formattedDate = blogRes.publishDate
    ? new Date(blogRes.publishDate).toLocaleDateString(localeFormat, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const heroImage = blogRes.imageUrl
    ? getFullImageUrl(blogRes.imageUrl)
    : null;

  const sortedSections = [...(blogRes.sections || [])].sort(
    (a, b) => (a.sectionNumber || 0) - (b.sectionNumber || 0)
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <Navbar />

      <main className="flex-1 pb-16">
        <BlogBreadcrumb title={blogRes.title} category={blogRes.blogType} />

        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-4">
          <BlogHeroImage imageUrl={heroImage} title={blogRes.title} />

          <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8">
              <BlogMainContent
                title={blogRes.title}
                category={blogRes.blogType}
                publicationDate={formattedDate}
                sections={sortedSections}
              />
            </div>

            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <BlogShareCard title={blogRes.title} />
              <BlogTableOfContents
                sections={sortedSections}
                hasRecentArticles={recentArticles.length > 0}
              />
            </aside>
          </div>
        </div>

        <BlogRecentArticles articles={recentArticles} />
      </main>

      <Footer />
    </div>
  );
}
