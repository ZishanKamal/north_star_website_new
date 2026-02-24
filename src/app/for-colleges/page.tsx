"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Settings,
  Code,
  Cpu,
  BarChart3,
  Briefcase,
  CheckCircle,
  Quote,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { collegePrograms, testimonials, partnershipProcess } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Settings,
  Code,
  Cpu,
  BarChart3,
  Briefcase,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  orange: { bg: "bg-blue-50", text: "text-blue-700", border: "border-slate-200" },
  green: { bg: "bg-blue-50", text: "text-blue-700", border: "border-slate-200" },
  violet: { bg: "bg-blue-50", text: "text-blue-700", border: "border-slate-200" },
  cyan: { bg: "bg-blue-50", text: "text-blue-700", border: "border-slate-200" },
  amber: { bg: "bg-blue-50", text: "text-blue-700", border: "border-slate-200" },
};

export default function ForCollegesPage() {
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
              <GraduationCap className="w-4 h-4" />
              For Colleges & Universities
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
              Technical{" "}
              <span className="text-blue-700">
                Excellence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
              Industry-relevant technical training, AI ecosystem awareness, and
              career-readiness programs that make graduates job-ready from day one.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our College Programs
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Comprehensive programs covering the full spectrum of technical and professional skills.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-12">
            {collegePrograms.map((program, index) => {
              const Icon = iconMap[program.icon] || Code;
              const colors = colorMap[program.color] || colorMap.green;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-xl border ${colors.border} bg-white p-8 md:p-10`}
                >
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-slate-900">{program.title}</h3>
                      <p className="text-slate-500 leading-relaxed">
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

      {/* Placement Stats */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Why Colleges Choose North Star Academy
            </h2>
            <p className="text-lg text-slate-500">
              We bridge the gap between academics and industry requirements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Industry-Aligned Curriculum",
                description: "Programs designed in consultation with industry professionals and aligned with current market demands.",
              },
              {
                title: "Hands-On Learning",
                description: "Project-based approach with real-world scenarios, coding exercises, and portfolio-building activities.",
              },
              {
                title: "Placement Support",
                description: "Interview preparation, resume building, mock sessions, and direct industry connections.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-slate-200 p-6 text-center"
              >
                <h3 className="font-bold text-lg mb-2 text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Our Partnership Works
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              A structured process to deliver impactful programs at your institution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {partnershipProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What College Partners Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials
              .filter(
                (t) =>
                  !t.institution.toLowerCase().includes("school")
              )
              .slice(0, 2)
              .map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-slate-200 p-8 relative"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-100" />
                  <p className="text-slate-600 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-700">
                        {testimonial.name
                          .split(" ")
                          .filter((p) => !["Dr.", "Mr.", "Mrs.", "Ms.", "Prof."].includes(p))
                          .slice(0, 2)
                          .map((p) => p.charAt(0))
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-slate-500">
                        {testimonial.role}, {testimonial.institution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-4">
              <Award className="w-4 h-4" />
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Impact at Partner Institutions
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Measurable outcomes from our college partnerships across Jharkhand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                institution: "BIT Mesra",
                program: "Industry Readiness & Placement Prep",
                stats: [
                  { label: "Students Trained", value: "120+", icon: Users },
                  { label: "Placement Rate Improvement", value: "35%", icon: TrendingUp },
                ],
                highlight: "Partnered for 3 semesters — mock interviews, resume building, and technical training led to a 35% jump in campus placements.",
                color: "orange",
              },
              {
                institution: "Ranchi University",
                program: "AI Ecosystem & Data Visualization",
                stats: [
                  { label: "Students Trained", value: "200+", icon: Users },
                  { label: "Project Completion Rate", value: "92%", icon: Award },
                ],
                highlight: "Hands-on AI and data visualization workshops across 4 departments — 92% of students completed real-world capstone projects.",
                color: "blue",
              },
              {
                institution: "St. Xavier's College",
                program: "Programming Languages & System Analysis",
                stats: [
                  { label: "Students Trained", value: "85+", icon: Users },
                  { label: "Skill Assessment Gain", value: "40%", icon: TrendingUp },
                ],
                highlight: "Intensive coding bootcamp over 8 weeks — average skill assessment scores improved by 40% across all participants.",
                color: "violet",
              },
            ].map((caseStudy, index) => {
              const colorClasses: Record<string, { border: string; bg: string; text: string }> = {
                orange: { border: "border-slate-200", bg: "bg-blue-50", text: "text-blue-700" },
                blue: { border: "border-slate-200", bg: "bg-blue-50", text: "text-blue-700" },
                violet: { border: "border-slate-200", bg: "bg-blue-50", text: "text-blue-700" },
              };
              const colors = colorClasses[caseStudy.color];

              return (
                <motion.div
                  key={caseStudy.institution}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl border ${colors.border} p-6 hover:shadow-md transition-shadow`}
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} ${colors.text} text-xs font-medium mb-4`}>
                    <GraduationCap className="w-3 h-3" />
                    {caseStudy.institution}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-slate-900">{caseStudy.program}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {caseStudy.highlight}
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    {caseStudy.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <stat.icon className={`w-4 h-4 mx-auto mb-1 ${colors.text}`} />
                        <p className="text-xl font-bold">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your College&apos;s Training?
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              Equip your students with skills that matter. Let&apos;s design a program
              tailored to your institution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Schedule a Discussion
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/for-schools">
                <Button size="lg" variant="outline">
                  See School Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
