"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PiBookOpenTextLight, PiArticleLight } from "react-icons/pi";
import { usePublicBlogsQuery } from "@/features/blogs/useBlogsQueries";
import { getFullImageUrl } from "@/clientApi/blogsApi";
import { useTranslation } from "@/features/i18n/useTranslation";
import {
  cardGridItemVariants,
  headerContainerVariants,
  headerItemVariants,
} from "@/shared/utils/motionPresets";
import BlogCard, { BlogCardData } from "@/components/UserComp/Blogs/BlogCard";
import HomeEmptyState from "./HomeEmptyState";
import HomeSectionBgIcon from "./HomeSectionBgIcon";

export default function HomeBlogsSection() {
  const { t, locale, direction } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.14 });

  const { data: blogsData, isLoading } = usePublicBlogsQuery({
    Language: locale,
    PageNumber: 1,
    PageSize: 3,
  });

  const apiBlogs: BlogCardData[] = (blogsData?.items || []).map((item) => {
    const rawDate =
      (item as unknown as { createdAt?: string })?.createdAt ||
      (item as unknown as { publishDate?: string })?.publishDate;

    let formattedDate = t("home.blogs.recent", "Recent");
    if (rawDate) {
      try {
        formattedDate = new Date(rawDate).toLocaleDateString(
          locale === "ar"
            ? "ar-EG"
            : locale === "de"
            ? "de-DE"
            : locale === "ru"
            ? "ru-RU"
            : "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        );
      } catch {
        formattedDate = t("home.blogs.recent", "Recent");
      }
    }

    return {
      id: item.id,
      title: item.title,
      category:
        (item as unknown as { category?: string })?.category ||
        (item as unknown as { categoryName?: string })?.categoryName ||
        "Real Estate",
      date: formattedDate,
      description:
        item.sections?.[0]?.content ||
        item.sections?.[0]?.tittle ||
        t("home.blogs.readMore", "Read more about this article."),
      imageUrl: getFullImageUrl(item.imageUrl),
    };
  });

  const displayBlogs = apiBlogs.slice(0, 3);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-8 sm:py-10 lg:py-12"
    >
      <HomeSectionBgIcon leftIcon={PiBookOpenTextLight} rightIcon={PiArticleLight} />

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.header
          variants={headerContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              variants={headerItemVariants}
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#B8963E]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("home.blogs.eyebrow", "OUR BLOGS")}
            </motion.p>
            <motion.h2
              variants={headerItemVariants}
              className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("home.blogs.heading", "Real Estate Blogs")}
            </motion.h2>
            <motion.p
              variants={headerItemVariants}
              className="mt-3 text-[15px] font-normal leading-[1.6] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t(
                "home.blogs.subtitle",
                "Insights, guides, and trends to help you make informed property decisions."
              )}
            </motion.p>
          </div>

          <motion.div variants={headerItemVariants} className="self-start md:self-end shrink-0">
            <Link
              href={`/${locale}/blogs`}
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#2B5FA6] transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>{t("home.blogs.exploreAll", "Explore all articles")}</span>
              <Image
                src="/HomePage/FeaturedProjects/link.svg"
                alt=""
                width={9}
                height={9}
                className={`h-[9px] w-[9px] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  direction === "rtl"
                    ? "scale-x-[-1] group-hover:-translate-x-0.5"
                    : "group-hover:translate-x-0.5"
                }`}
              />
            </Link>
          </motion.div>
        </motion.header>

        {/* 3-Column Blogs Grid or Empty State */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="overflow-hidden rounded-[24px] border border-[#D9E2EE] bg-white p-4"
              >
                <div className="h-52 w-full animate-pulse rounded-2xl bg-[#E5ECF6]" />
                <div className="mt-4 h-5 w-24 animate-pulse rounded-full bg-[#D9E2EE]" />
                <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-[#D9E2EE]" />
                <div className="mt-2 h-4 w-full animate-pulse rounded bg-[#F0F3FA]" />
              </div>
            ))}
          </div>
        ) : displayBlogs.length === 0 ? (
          <HomeEmptyState
            illustrationSrc="/HomePage/roi-growth.svg"
            message={t("home.blogs.noBlogsFound", "No articles published yet.")}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayBlogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                custom={idx}
                variants={cardGridItemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
