import type { Metadata } from "next";
import BlogDetailsPage from "@/components/UserComp/Blogs/BlogDetails/BlogDetailsPage";
import { resolveBlogByNameOrId } from "@/clientApi/resolversApi";
import { buildPageMetadata } from "@/shared/utils/seoMetadata";
import { buildArticleJsonLd } from "@/shared/utils/jsonLd";
import { toUrlSlug } from "@/shared/utils/slug";

interface PageProps {
  params: Promise<{ name: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name, locale } = await params;
  const blog = await resolveBlogByNameOrId(name, locale);

  const title = blog?.title || "Blog Article";
  const description =
    blog?.sections?.[0]?.content?.slice(0, 160) ||
    "Explore luxury Red Sea real estate trends, neighborhood guides, and investment insights.";
  const primaryImage = blog?.imageUrl;
  const slug = toUrlSlug(blog?.title, blog?.id || name);

  return buildPageMetadata({
    title,
    description,
    locale,
    path: `/blogs/${slug}`,
    image: primaryImage,
    type: "article",
  });
}

export default async function Page({ params }: PageProps) {
  const { name, locale } = await params;
  const blog = await resolveBlogByNameOrId(name, locale);
  const slug = toUrlSlug(blog?.title, blog?.id || name);

  const schemaJsonLd = blog
    ? buildArticleJsonLd({
        title: blog.title,
        description: blog.sections?.[0]?.content?.slice(0, 160),
        image: blog.imageUrl,
        url: `/${locale}/blogs/${slug}`,
        datePublished: blog.publishDate,
      })
    : null;

  return (
    <>
      {schemaJsonLd && (
        <script
          id="json-ld-blog"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      )}
      <BlogDetailsPage name={name} />
    </>
  );
}
