"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Target,
  BookOpen,
  Users,
  Clock,
  Award,
  Heart,
  Brain,
  MessageSquare,
  Settings,
  Code,
  BarChart3,
  Cpu,
  HeartHandshake,
  Briefcase,
  Globe,
} from "lucide-react";
import { openPrograms, siteConfig } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const iconMap: { [key: string]: React.ElementType } = {
  Heart,
  Brain,
  MessageSquare,
  Settings,
  Code,
  BarChart3,
  Cpu,
  HeartHandshake,
  Briefcase,
  Globe,
};

const colorMap: {
  [key: string]: { gradient: string; light: string; dark: string };
} = {
  rose: { gradient: "bg-blue-600", light: "bg-slate-50", dark: "" },
  purple: { gradient: "bg-blue-700", light: "bg-slate-50", dark: "" },
  blue: { gradient: "bg-blue-600", light: "bg-slate-50", dark: "" },
  orange: { gradient: "bg-blue-600", light: "bg-slate-50", dark: "" },
  green: { gradient: "bg-blue-700", light: "bg-slate-50", dark: "" },
  cyan: { gradient: "bg-blue-600", light: "bg-slate-50", dark: "" },
  violet: { gradient: "bg-blue-700", light: "bg-slate-50", dark: "" },
  pink: { gradient: "bg-blue-600", light: "bg-slate-50", dark: "" },
  amber: { gradient: "bg-blue-700", light: "bg-slate-50", dark: "" },
};

interface ProgramContentProps {
  program: (typeof openPrograms)[0];
}

export default function ProgramContent({ program }: ProgramContentProps) {
  const Icon = iconMap[program.icon] || Heart;
  const colors = colorMap[program.color] || colorMap.blue;

  const relatedPrograms = openPrograms
    .filter((p) => p.category === program.category && p.id !== program.id)
    .slice(0, 3);

  const features = [
    { icon: Target, label: "Practical Focus", description: "Hands-on exercises and real-world applications" },
    { icon: BookOpen, label: "Expert Content", description: "Curriculum designed by industry professionals" },
    { icon: Users, label: "Interactive Sessions", description: "Engaging group activities and discussions" },
    { icon: Clock, label: "Flexible Learning", description: "Learn at your own pace with flexible scheduling" },
  ];

  return (
    <>
      {/* Hero */}
      <section className={`relative pt-32 pb-20 ${colors.light} ${colors.dark} overflow-hidden`}>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link
              href="/open-programs"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Open Programs
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl ${colors.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <span className={`px-4 py-1.5 ${colors.gradient} text-white text-sm font-medium rounded-lg capitalize`}>
                  {program.category.replace("-", " ")}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {program.title}
              </h1>

              <p className="text-xl text-slate-500 mb-8">
                {program.tagline}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Enroll Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={`tel:${siteConfig.phone}`}>Talk to Advisor</a>
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
              <div className={`aspect-video rounded-xl ${colors.gradient} shadow-lg overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className="h-24 w-24 text-white/50" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold mb-6">About This Program</h2>
                <div className="prose prose-lg max-w-none">
                  {program.description.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-slate-500 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold mb-6">Program Objective</h2>
                <Card className="bg-slate-50 border-0">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colors.gradient} flex items-center justify-center`}>
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-slate-600">{program.objective}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold mb-6">What You&apos;ll Get</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <feature.icon className="h-6 w-6 text-blue-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{feature.label}</h3>
                            <p className="text-sm text-slate-500">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-28"
              >
                <Card className="overflow-hidden">
                  <div className={`h-4 ${colors.gradient}`} />
                  <CardContent className="p-6 space-y-6">
                    <h3 className="text-xl font-bold">Get Started Today</h3>
                    <ul className="space-y-3">
                      {[
                        "Personalized learning path",
                        "Expert instructors",
                        "Certificate of completion",
                        "Access to materials",
                        "Community support",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-slate-500">
                          <Check className="h-5 w-5 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 space-y-3">
                      <Button className="w-full" size="lg" asChild>
                        <Link href="/contact">Enroll Now</Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <a
                          href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Chat on WhatsApp
                        </a>
                      </Button>
                    </div>
                    <p className="text-center text-sm text-slate-500">
                      Have questions?{" "}
                      <Link href="/contact" className="text-blue-700 hover:underline">
                        Contact us
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      {relatedPrograms.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Related Programs</h2>
              <p className="text-slate-500">Explore other programs in the same category</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPrograms.map((related, index) => {
                const RelatedIcon = iconMap[related.icon] || Heart;
                const relatedColors = colorMap[related.color] || colorMap.blue;

                return (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/open-programs/${related.slug}`}>
                      <Card className="group h-full cursor-pointer hover:scale-[1.02] transition-all duration-300">
                        <div className={`h-24 ${relatedColors.gradient} rounded-t-xl relative`}>
                          <div className="absolute bottom-3 left-4">
                            <div className="w-10 h-10 rounded-lg bg-white/30 flex items-center justify-center">
                              <RelatedIcon className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <h3 className="font-semibold group-hover:text-blue-700 transition-colors mb-2">
                            {related.title}
                          </h3>
                          <p className="text-sm text-slate-500 line-clamp-2">{related.tagline}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Award className="h-16 w-16 mx-auto text-yellow-500 mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-slate-500 mb-8">
              Join our community of learners and transform your skills with North Star.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start Learning Today
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/open-programs">View All Programs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
