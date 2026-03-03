import { blogPosts } from "@/lib/data";
import { blogContent } from "@/lib/blog-content";
import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog Post Not Found" };

  return {
    title: `${post.title} | North Star Academy Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const content = blogContent[slug];

  if (!post || !content) {
    notFound();
  }

  return <BlogPostClient post={post} content={content} />;
}
