"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  School,
  GraduationCap,
  Briefcase,
  RefreshCw,
  Gift,
  Users,
  MessageCircle,
  Target,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { approachSteps, methodology } from "@/lib/data";

const stageIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  School,
  GraduationCap,
  Briefcase,
};

const methodIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  RefreshCw,
  Gift,
  Users,
  MessageCircle,
};

const stageColors = [
  {
    bg: "",
    icon: "text-blue-700 bg-blue-50",
    border: "border-slate-200",
    badge: "bg-blue-50 text-blue-700",
  },
  {
    bg: "",
    icon: "text-blue-700 bg-blue-50",
    border: "border-slate-200",
    badge: "bg-blue-50 text-blue-700",
  },
  {
    bg: "",
    icon: "text-blue-700 bg-blue-50",
    border: "border-slate-200",
    badge: "bg-blue-50 text-blue-700",
  },
];

export default function ApproachPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-6">
              <Target className="w-4 h-4" />
              Our Methodology
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              From Classrooms{" "}
              <span className="text-blue-700">
                to Careers
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
              Our structured approach guides students through every stage — building
              emotional foundations in schools, technical excellence in colleges, and
              career readiness for the workforce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The North Star Academy Journey
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Three integrated stages that prepare students for lifelong success.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-16">
            {approachSteps.map((step, index) => {
              const Icon = stageIconMap[step.icon] || School;
              const colors = stageColors[index];
              const isReversed = index % 2 !== 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    isReversed ? "md:direction-rtl" : ""
                  }`}
                >
                  <div className={isReversed ? "md:order-2" : ""}>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${colors.badge}`}
                    >
                      Stage {step.id}: {step.stage}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <div className="space-y-2">
                      {step.programs.map((prog) => (
                        <div key={prog} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-blue-700 flex-shrink-0" />
                          <span className="text-sm font-medium">{prog}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={isReversed ? "md:order-1" : ""}>
                    <div className={`rounded-2xl overflow-hidden border ${colors.border} shadow-md aspect-[4/3] relative`}>
                      <Image
                        src={`/images/approach/${["schools", "colleges", "careers"][index]}.jpg`}
                        alt={step.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-slate-900/5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-4">
              <Lightbulb className="w-4 h-4" />
              What Makes Us Different
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Training Methodology
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              We go beyond traditional teaching with methods designed for lasting impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {methodology.map((method, index) => {
              const Icon = methodIconMap[method.icon] || RefreshCw;
              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold mb-2">{method.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {method.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              Let&apos;s design a customized training roadmap for your students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Start a Partnership
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/institutional-programs">
                <Button size="lg" variant="outline">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
