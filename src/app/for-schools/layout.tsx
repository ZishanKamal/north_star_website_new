import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs for Schools | North Star Academy",
  description:
    "Emotional intelligence, cognitive readiness, and communication training programs for K-12 students. Partner with North Star Academy for school-wide transformation.",
  openGraph: {
    title: "Programs for Schools | North Star Academy",
    description:
      "Emotional intelligence, cognitive readiness, and communication training programs for K-12 students.",
  },
};

export default function ForSchoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
