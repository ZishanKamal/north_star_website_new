import { Metadata } from "next";
import { courses } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Courses | North Star Online",
  description: "Explore our comprehensive training programs in soft skills, technical skills, and career development.",
};

export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
