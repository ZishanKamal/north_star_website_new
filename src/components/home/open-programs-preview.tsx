"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Award,
  BarChart3,
  Code,
  Monitor,
  Settings,
  TrendingUp,
  Briefcase,
  HeartHandshake,
  Users,
} from "lucide-react";
import { openPrograms } from "@/lib/data";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Award,
  BarChart3,
  Code,
  Monitor,
  Settings,
  TrendingUp,
  Briefcase,
  HeartHandshake,
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-sm font-medium text-blue-700 dark:text-blue-400 mb-4">
            <Users className="w-4 h-4" />
            Individual Enrollment
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Open Programs
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Our signature programs are also available for individual enrollment
            — explore technical, career-readiness, and professional courses.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {previewPrograms.map((program, index) => {
            const Icon = iconMap[program.icon] || Cpu;

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
                  <div className="h-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                    <div
                      className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3"
                    >
                      <Icon className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {program.description}
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
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
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
