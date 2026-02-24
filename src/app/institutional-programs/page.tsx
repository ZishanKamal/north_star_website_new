"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  School,
  GraduationCap,
  FileText,
  Award,
  TrendingUp,
  Monitor,
  HeartHandshake,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { partnershipBenefits, partnershipProcess } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Award,
  TrendingUp,
  Monitor,
  HeartHandshake,
  GraduationCap,
};

export default function InstitutionalProgramsPage() {
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
              <Building2 className="w-4 h-4" />
              Institutional Training
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Empowering{" "}
              <span className="text-blue-700">
                Institutions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
              We partner with schools and colleges to deliver customized training
              programs that transform student outcomes and institutional excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Programs By Institution Type
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Tailored solutions designed for each stage of the academic journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/for-schools" className="block group">
                <div className="h-full rounded-xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-6">
                    <School className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">For Schools</h3>
                  <p className="text-slate-500 mb-4 leading-relaxed">
                    Emotional intelligence, cognitive readiness, and communication
                    programs designed for K-12 students. Build strong foundations
                    that last a lifetime.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-700" />
                      Emotional Harmony Workshop
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-700" />
                      Cognitive Readiness Program
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-700" />
                      Effective Communication Skills
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 group-hover:gap-3 transition-all">
                    View School Programs <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/for-colleges" className="block group">
                <div className="h-full rounded-xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-6">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">For Colleges</h3>
                  <p className="text-slate-500 mb-4 leading-relaxed">
                    Technical training, AI, programming, and industry-readiness
                    programs designed to make graduates career-ready from day one.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-700" />
                      System Analysis & Design
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-700" />
                      Programming Languages & AI
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-700" />
                      Industry Readiness & Placement
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 group-hover:gap-3 transition-all">
                    View College Programs <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Partner With North Star Academy?
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Everything your institution needs for impactful, measurable training programs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {partnershipBenefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon] || FileText;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              A simple, structured process to get started with transformative training.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {partnershipProcess.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center relative"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-700 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  {index < partnershipProcess.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-slate-200" />
                  )}
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              Connect with us to discuss your institution&apos;s training needs and
              explore partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Start a Partnership
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/open-programs">
                <Button size="lg" variant="outline">
                  Individual Enrollment
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
