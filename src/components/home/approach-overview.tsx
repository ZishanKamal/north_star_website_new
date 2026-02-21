"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { approachSteps } from "@/lib/data";
import { School, GraduationCap, Briefcase } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  School,
  GraduationCap,
  Briefcase,
};

export default function ApproachOverview() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            From Classrooms to Careers
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Our structured approach guides students through every stage of their
            development journey.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[6.75rem] left-[8%] right-[8%] h-0.5 z-0">
              <div className="h-full bg-slate-200" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {approachSteps.map((step, index) => {
                const Icon = iconMap[step.icon] || School;
                const colors = [
                  "text-blue-700 bg-blue-50",
                  "text-blue-700 bg-blue-50",
                  "text-blue-700 bg-blue-50",
                ];
                const stageColors = [
                  "text-blue-700",
                  "text-blue-700",
                  "text-blue-700",
                ];

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-center relative"
                  >
                    {/* Stage label sits above the icon/line */}
                    <span className={`inline-block text-sm font-bold uppercase tracking-widest ${stageColors[index]} mb-3`}>
                      {step.stage}
                    </span>
                    <div
                      className={`w-16 h-16 rounded-full ${colors[index]} flex items-center justify-center mx-auto mb-6 relative z-10`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/approach">
            <Button variant="outline" size="lg">
              Discover Our Approach
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
