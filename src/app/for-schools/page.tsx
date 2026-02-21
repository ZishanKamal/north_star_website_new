"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  School,
  Heart,
  Brain,
  MessageSquare,
  CheckCircle,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { schoolPrograms, testimonials, partnershipProcess } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Brain,
  MessageSquare,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  rose: { bg: "bg-rose-500/10", text: "text-rose-500", border: "border-rose-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
};

export default function ForSchoolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-background to-orange-500/3" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-sm font-medium text-rose-600 mb-6">
              <School className="w-4 h-4" />
              For Schools (K-12)
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Building Strong{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Foundations
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our school programs develop emotional intelligence, cognitive readiness,
              and communication skills — setting students up for lifelong success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {schoolPrograms.map((program, index) => {
              const Icon = iconMap[program.icon] || Heart;
              const colors = colorMap[program.color] || colorMap.rose;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-2xl border ${colors.border} bg-gradient-to-r from-background to-muted/30 p-8 md:p-10`}
                >
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
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

      {/* Why Schools Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Schools Choose North Star
            </h2>
            <p className="text-lg text-muted-foreground">
              We understand that young minds need more than just academics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Age-Appropriate Content",
                description: "Programs designed specifically for different age groups and developmental stages.",
              },
              {
                title: "Experienced Facilitators",
                description: "Certified coaches who know how to engage and inspire young learners.",
              },
              {
                title: "Seamless Integration",
                description: "Programs that fit into your academic calendar without disrupting regular classes.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-2xl border p-6 text-center"
              >
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, seamless process to bring transformative programs to your school.
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
                <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What School Partners Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials
              .filter((t) => t.institution.toLowerCase().includes("school"))
              .slice(0, 2)
              .map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background rounded-2xl border p-8 relative"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-rose-500/10" />
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-rose-500">
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
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.institution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              Bring North Star to Your School
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let&apos;s discuss how our programs can benefit your students and institution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="gradient">
                  Schedule a Discussion
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/for-colleges">
                <Button size="lg" variant="outline">
                  See College Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
