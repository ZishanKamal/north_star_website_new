import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institutional Programs | North Star Academy",
  description:
    "Customized training programs for schools and colleges. Partner with North Star Academy for transformative institutional training.",
  openGraph: {
    title: "Institutional Programs | North Star Academy",
    description:
      "Customized training programs for schools and colleges. Partner with North Star Academy for transformative institutional training.",
  },
};

export default function InstitutionalProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
