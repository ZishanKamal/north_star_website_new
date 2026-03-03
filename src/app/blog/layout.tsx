import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | North Star Academy",
  description:
    "Stay updated with the latest trends in education, career development, AI & jobs, and industry insights from North Star Academy.",
  openGraph: {
    title: "Blog | North Star Academy",
    description:
      "Stay updated with the latest trends in education, career development, AI & jobs, and industry insights from North Star Academy.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
