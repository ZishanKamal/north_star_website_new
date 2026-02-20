import { Metadata } from "next";
import { blogs } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: "Article Not Found | North Star Online",
    };
  }

  return {
    title: `${blog.title} | North Star Online Blog`,
    description: blog.excerpt,
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
