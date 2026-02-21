import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Approach | North Star",
  description:
    "Discover North Star's structured approach — from school foundations to college excellence to career readiness.",
  openGraph: {
    title: "Our Approach | North Star",
    description:
      "Discover North Star's structured Classroom-to-Career framework guiding students through every stage of development.",
  },
};

export default function ApproachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
