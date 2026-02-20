import { Metadata } from "next";
import { blogs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog | North Star Online",
  description: "Expert articles on career growth, soft skills development, and professional excellence.",
};

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
