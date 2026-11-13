"use client";

import Link from "next/link";
import BlogCard, { BlogCardData } from "../BlogCard";

interface BlogRecentArticlesProps {
  articles: BlogCardData[];
}

export default function BlogRecentArticles({
  articles,
}: BlogRecentArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section
      id="recent-articles"
      className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 mb-16 sm:mb-24"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Recent Articles
          </h2>
          <p
            className="mt-1 text-sm text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Explore more market analysis and buying guides
          </p>
        </div>

        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2B5FA6] hover:text-[#1B3A6B] transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span>View All Articles</span>
          <span>&rarr;</span>
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {articles.map((article) => (
          <BlogCard key={article.id} blog={article} />
        ))}
      </div>
    </section>
  );
}

