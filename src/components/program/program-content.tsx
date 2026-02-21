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
  rose: { gradient: "from-rose-500 to-pink-500", light: "bg-rose-50", dark: "dark:bg-rose-950/30" },
  purple: { gradient: "from-purple-500 to-violet-500", light: "bg-purple-50", dark: "dark:bg-purple-950/30" },
  blue: { gradient: "from-blue-500 to-indigo-500", light: "bg-blue-50", dark: "dark:bg-blue-950/30" },
  orange: { gradient: "from-orange-500 to-amber-500", light: "bg-orange-50", dark: "dark:bg-orange-950/30" },
  green: { gradient: "from-green-500 to-emerald-500", light: "bg-green-50", dark: "dark:bg-green-950/30" },
  cyan: { gradient: "from-cyan-500 to-blue-500", light: "bg-cyan-50", dark: "dark:bg-cyan-950/30" },
  violet: { gradient: "from-violet-500 to-purple-500", light: "bg-violet-50", dark: "dark:bg-violet-950/30" },
  pink: { gradient: "from-pink-500 to-rose-500", light: "bg-pink-50", dark: "dark:bg-pink-950/30" },
  amber: { gradient: "from-amber-500 to-yellow-500", light: "bg-amber-50", dark: "dark:bg-amber-950/30" },
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
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r ${colors.gradient} opacity-10 rounded-full blur-3xl`} />
          <div className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r ${colors.gradient} opacity-10 rounded-full blur-3xl`} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link
              href="/open-programs"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Open Programs
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colors.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <span className={`px-4 py-1.5 bg-gradient-to-r ${colors.gradient} text-white text-sm font-medium rounded-full capitalize`}>
                  {program.category.replace("-", " ")}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {program.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
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
              <div className={`aspect-video rounded-3xl bg-gradient-to-r ${colors.gradient} shadow-2xl overflow-hidden`}>
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
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {program.description.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold mb-6">Program Objective</h2>
                <Card className={`${colors.light} ${colors.dark} border-0`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${colors.gradient} flex items-center justify-center`}>
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-foreground/80">{program.objective}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold mb-6">What You&apos;ll Get</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colors.light} ${colors.dark} flex items-center justify-center`}>
                            <feature.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{feature.label}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
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
                  <div className={`h-4 bg-gradient-to-r ${colors.gradient}`} />
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
                        <li key={index} className="flex items-center gap-3 text-muted-foreground">
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
                    <p className="text-center text-sm text-muted-foreground">
                      Have questions?{" "}
                      <Link href="/contact" className="text-primary hover:underline">
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
        <section className="py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Related Programs</h2>
              <p className="text-muted-foreground">Explore other programs in the same category</p>
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
                        <div className={`h-24 bg-gradient-to-r ${relatedColors.gradient} rounded-t-2xl relative`}>
                          <div className="absolute bottom-3 left-4">
                            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <RelatedIcon className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <h3 className="font-semibold group-hover:text-primary transition-colors mb-2">
                            {related.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{related.tagline}</p>
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
            <p className="text-xl text-muted-foreground mb-8">
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
