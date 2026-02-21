import { notFound } from "next/navigation";
import { openPrograms } from "@/lib/data";
import ProgramContent from "@/components/program/program-content";

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = openPrograms.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  return <ProgramContent program={program} />;
}
