import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Programs | North Star",
  description:
    "Explore our open enrollment programs — from emotional intelligence to technical skills and career readiness. Enroll individually in any of our signature programs.",
  openGraph: {
    title: "Open Programs | North Star",
    description:
      "Explore our open enrollment programs — from emotional intelligence to technical skills and career readiness.",
  },
};

export default function OpenProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
