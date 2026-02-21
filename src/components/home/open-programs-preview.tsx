"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Brain,
  MessageSquare,
  Settings,
  Code,
  Cpu,
  Users,
} from "lucide-react";
import { openPrograms } from "@/lib/data";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Brain,
  MessageSquare,
  Settings,
  Code,
  Cpu,
};

const colorMap: Record<string, string> = {
  rose: "from-rose-300 to-pink-300",
  purple: "from-purple-300 to-violet-300",
  blue: "from-blue-300 to-indigo-300",
  orange: "from-orange-300 to-amber-300",
  green: "from-green-300 to-emerald-300",
  cyan: "from-cyan-300 to-blue-300",
};

// Show first 6 programs as a preview
const previewPrograms = openPrograms.slice(0, 6);

export default function OpenProgramsPreview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-4">
            <Users className="w-4 h-4" />
            Individual Enrollment
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Open Programs
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Our signature programs are also available for individual enrollment
            — explore soft skills, technical, and career-readiness courses.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {previewPrograms.map((program, index) => {
            const Icon = iconMap[program.icon] || Heart;
            const gradientClass =
              colorMap[program.color] || "from-blue-300 to-indigo-300";

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full"
              >
                <Link
                  href={`/open-programs/${program.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                    <div
                      className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3"
                    >
                      <Icon className="w-5 h-5 text-blue-700" />
                    </div>
                    <h3 className="font-semibold text-sm text-slate-800 group-hover:text-blue-700 transition-colors">
                      {program.shortTitle}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {program.tagline}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-slate-500 mb-4">
            Also available as institutional programs for schools and colleges.
          </p>
          <Link href="/open-programs">
            <Button variant="outline" size="lg">
              View All Programs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
