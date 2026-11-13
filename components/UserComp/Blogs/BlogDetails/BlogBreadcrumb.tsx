import Link from "next/link";

interface BlogBreadcrumbProps {
  title?: string;
  category?: string | null;
}

export default function BlogBreadcrumb({
  title,
  category,
}: BlogBreadcrumbProps) {
  const currentLabel = category || title || "Blog Details";

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-6 mb-4 flex items-center gap-2 text-[13px] text-[#6B7570]"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Link href="/" className="transition-colors hover:text-[#2B5FA6]">
        Home
      </Link>
      <span className="text-[#6B7570]/60">/</span>
      <Link href="/blogs" className="transition-colors hover:text-[#2B5FA6]">
        Blogs
      </Link>
      <span className="text-[#6B7570]/60">/</span>
      <span className="font-semibold text-[#202326] truncate max-w-[300px] sm:max-w-md">
        {currentLabel}
      </span>
    </nav>
  );
}
