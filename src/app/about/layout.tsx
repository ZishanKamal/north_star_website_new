import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | North Star Academy",
  description:
    "Learn about North Star Academy's mission, vision, and the team behind our transformative institutional training programs. Developing leaders, empowering institutions.",
  openGraph: {
    title: "About Us | North Star Academy",
    description:
      "Learn about North Star Academy's mission, vision, and the team behind our transformative institutional training programs.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
