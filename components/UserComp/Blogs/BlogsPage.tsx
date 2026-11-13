"use client";

import { FormEvent, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import BlogsHeroSection from "./BlogsHeroSection";
import BlogsFilterBar, { BlogCategory } from "./BlogsFilterBar";
import BlogsGridSection from "./BlogsGridSection";
import { BlogCardData } from "./BlogCard";
import { getBlogs, getFullImageUrl } from "@/clientApi/blogsApi";
import { useTranslation } from "@/features/i18n/useTranslation";

export default function BlogsPage() {
  const { locale } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");

  // Public Query fetching from pre-existing clientApi
  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["publicBlogs", currentPage, locale],
    queryFn: async () => {
      return await getBlogs({
        Language: locale,
        PageNumber: currentPage,
        PageSize: 6,
      });
    },
    staleTime: 1000 * 60 * 5,
  });

  // Map API items to display cards
  const allBlogs: BlogCardData[] = useMemo(() => {
    const items = blogsData?.items || [];
    return items.map((item) => {
      const assignedCategory = item.blogType?.trim() || "";
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
        category: assignedCategory,
        date: formattedDate,
        description: "",
        imageUrl: item.imageUrl ? getFullImageUrl(item.imageUrl) : null,
      };
    });
  }, [blogsData, locale]);

  // Client-side filtering by category & search query
  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((blog) => {
      // Category Filter
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category.toLowerCase().includes(selectedCategory.toLowerCase());

      // Search Query Filter
      const q = activeSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.description.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allBlogs, selectedCategory, activeSearch]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveSearch("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <Navbar />

      <main className="flex-1 pb-10">
        <BlogsHeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          totalArticles={blogsData?.totalCount}
        />

        <BlogsFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
        />

        <BlogsGridSection
          blogs={filteredBlogs}
          isLoading={isLoading}
          currentPage={blogsData?.pageNumber || currentPage}
          totalPages={blogsData?.totalPages || 1}
          onPageChange={setCurrentPage}
          onResetFilters={handleResetFilters}
        />
      </main>

      <Footer />
    </div>
  );
}
