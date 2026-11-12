"use client";

import { FormEvent, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Footer from "@/components/UserComp/Common/Footer";
import BlogsHeroSection from "./BlogsHeroSection";
import BlogsFilterBar, { BlogCategory } from "./BlogsFilterBar";
import BlogsGridSection from "./BlogsGridSection";
import { BlogCardData } from "./BlogCard";
import { getBlogs, getFullImageUrl } from "@/clientApi/blogsApi";

const CATEGORY_LIST = [
  "Buying Guide",
  "Investment",
  "Lifestyle",
  "Market Insights",
  "Red Sea News",
];

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");

  // Public Query fetching from pre-existing clientApi
  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["publicBlogs", currentPage],
    queryFn: async () => {
      return await getBlogs({
        Language: "en",
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
      const formattedDate = item.publishDate
        ? new Date(item.publishDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "";
      const sectionSnippet =
        item.sections?.[0]?.content ||
        item.sections?.[0]?.tittle ||
        "";

      return {
        id: item.id,
        title: item.title,
        category: assignedCategory,
        date: formattedDate,
        description: sectionSnippet,
        imageUrl: getFullImageUrl(item.imageUrl),
      };
    });
  }, [blogsData?.items]);

  // Client-side filtering by category and search
  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        activeSearch.trim().length === 0 ||
        blog.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
        blog.description.toLowerCase().includes(activeSearch.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allBlogs, selectedCategory, activeSearch]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
    setCurrentPage(1);
  };

  const handleCategorySelect = (category: BlogCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveSearch("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  const totalPages = blogsData?.totalPages || 1;
  const totalCount = blogsData?.totalCount || 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#F3F5F3]">
      <main className="flex-1 pb-8">
        <BlogsHeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          totalArticles={totalCount}
        />

        <BlogsFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        <BlogsGridSection
          blogs={filteredBlogs}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onResetFilters={handleResetFilters}
        />
      </main>

      <Footer />
    </div>
  );
}

