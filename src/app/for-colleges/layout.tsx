import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs for Colleges | North Star",
  description:
    "Technical training, AI, programming, and industry-readiness programs designed for college and university students. Make graduates job-ready from day one.",
  openGraph: {
    title: "Programs for Colleges | North Star",
    description:
      "Technical training, AI, programming, and industry-readiness programs designed for college and university students.",
  },
};

export default function ForCollegesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
