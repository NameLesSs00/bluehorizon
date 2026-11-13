"use client";

import Image from "next/image";
import Link from "next/link";
import { usePublicBlogsQuery } from "@/features/blogs/useBlogsQueries";
import { getFullImageUrl } from "@/clientApi/blogsApi";
import BlogCard, { BlogCardData } from "@/components/UserComp/Blogs/BlogCard";

const FALLBACK_BLOGS: BlogCardData[] = [
  {
    id: 1,
    title: "10 Tips for Choosing the Perfect Home",
    category: "Buying Guide",
    date: "Nov 6, 2026",
    description:
      "Discover essential tips to find a home that fits your lifestyle and future needs.",
    imageUrl: "/HomePage/hero/homeImage.jpg",
  },
  {
    id: 2,
    title: "Why the Red Sea Coast is Egypt's Top Destination",
    category: "Investment",
    date: "Oct 28, 2026",
    description:
      "Explore the rising value and unique lifestyle of Hurghada and its surroundings.",
    imageUrl: "/Locations/hero.png",
  },
  {
    id: 3,
    title: "Modern Living: How Real Estate Enhances Your Life",
    category: "Lifestyle",
    date: "Oct 20, 2026",
    description:
      "Discover how the right property can improve your everyday life.",
    imageUrl: "/Blogs/hero.png",
  },
];

export default function HomeBlogsSection() {
  const { data: blogsData, isLoading } = usePublicBlogsQuery({
    Language: "en",
    PageNumber: 1,
    PageSize: 3,
  });

  const apiBlogs: BlogCardData[] = (blogsData?.items || []).map((item) => {
    const rawDate =
      (item as unknown as { createdAt?: string })?.createdAt ||
      (item as unknown as { publishDate?: string })?.publishDate;
    const formattedDate = rawDate
      ? new Date(rawDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Recent";

    return {
      id: item.id,
      title: item.title,
      category:
        (item as unknown as { category?: string })?.category || "Real Estate",
      date: formattedDate,
      description:
        item.sections?.[0]?.content ||
        item.sections?.[0]?.tittle ||
        "Read more about this article.",
      imageUrl: getFullImageUrl(item.imageUrl),
    };
  });

  const displayBlogs = apiBlogs.length > 0 ? apiBlogs.slice(0, 3) : FALLBACK_BLOGS;

  return (
    <section className="bg-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              OUR BLOGS
            </p>
            <h2
              className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Real Estate Blogs
            </h2>
            <p
              className="mt-3 text-[15px] font-normal leading-[1.6] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Stay informed with the latest market trends, buying tips, and lifestyle guides.
            </p>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 self-start text-[14px] font-semibold text-[#145C4B] transition-opacity hover:opacity-80 md:self-end"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>View all articles</span>
            <Image
              src="/HomePage/FeaturedProjects/link.svg"
              alt=""
              width={9}
              height={9}
              className="h-[9px] w-[9px] shrink-0"
            />
          </Link>
        </header>

        {/* 3-Column Blogs Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="overflow-hidden rounded-[24px] border border-[#E1E7E3] bg-white p-4"
              >
                <div className="h-52 w-full animate-pulse rounded-2xl bg-[#E8F1EC]" />
                <div className="mt-4 h-5 w-24 animate-pulse rounded-full bg-[#E1E7E3]" />
                <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-[#E1E7E3]" />
                <div className="mt-2 h-4 w-full animate-pulse rounded bg-[#F3F5F3]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

