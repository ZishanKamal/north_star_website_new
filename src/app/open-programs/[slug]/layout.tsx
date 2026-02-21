import { Metadata } from "next";
import { openPrograms } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = openPrograms.find((p) => p.slug === slug);

  if (!program) {
    return {
      title: "Program Not Found | North Star",
    };
  }

  return {
    title: `${program.title} | North Star`,
    description: program.tagline,
    openGraph: {
      title: `${program.title} | North Star`,
      description: program.tagline,
    },
  };
}

export default function OpenProgramDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
