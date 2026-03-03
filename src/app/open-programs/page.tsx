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
  CheckCircle,
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

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  violet: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-slate-200 dark:border-slate-700" },
  blue: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-slate-200 dark:border-slate-700" },
  green: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-slate-200 dark:border-slate-700" },
  orange: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-slate-200 dark:border-slate-700" },
  cyan: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-slate-200 dark:border-slate-700" },
  purple: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-slate-200 dark:border-slate-700" },
  rose: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-slate-200 dark:border-slate-700" },
  amber: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-slate-200 dark:border-slate-700" },
  pink: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-slate-200 dark:border-slate-700" },
};

export default function OpenProgramsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-sm font-medium text-blue-700 dark:text-blue-400 mb-6">
              <Users className="w-4 h-4" />
              Individual Enrollment
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Open{" "}
              <span className="text-blue-700 dark:text-blue-400">
                Programs
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
              Explore our training programs available for individual enrollment
              — from AI and programming to career readiness and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {openPrograms.map((program, index) => {
              const Icon = iconMap[program.icon] || Cpu;
              const colors = colorMap[program.color] || colorMap.blue;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`rounded-xl border ${colors.border} bg-white dark:bg-slate-800 p-8 md:p-10`}
                >
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className={`w-12 h-12 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                        {program.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
                        Key Outcomes
                      </h4>
                      <ul className="space-y-3">
                        {program.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2 text-sm">
                            <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.text}`} />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Looking for Institutional Programs?
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              We also deliver customized training at your institution. Explore our
              institutional partnership options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/institutional-programs">
                <Button size="lg">
                  Institutional Programs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
