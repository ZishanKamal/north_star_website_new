"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Brain, MessageSquare, Settings, Code, BarChart3, Cpu, HeartHandshake, Briefcase, Globe } from "lucide-react";
import { courses } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const colorMap: { [key: string]: string } = {
  rose: "from-rose-300 to-pink-300",
  purple: "from-purple-300 to-violet-300",
  blue: "from-blue-300 to-indigo-300",
  orange: "from-orange-300 to-amber-300",
  green: "from-green-300 to-emerald-300",
  cyan: "from-cyan-300 to-blue-300",
  violet: "from-violet-300 to-purple-300",
  pink: "from-pink-300 to-rose-300",
  amber: "from-amber-300 to-yellow-300",
  teal: "from-blue-300 to-indigo-300",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function CoursesSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 text-base font-medium rounded-full mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Explore Our
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}Courses
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Our courses in System Design, Programming Languages and AI Ecosystem cater 
            directly to the needs of India&apos;s tech-driven economy, providing individuals with 
            the technical prowess necessary for success in the IT sector.
          </p>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {courses.slice(0, 8).map((course) => {
            const Icon = iconMap[course.icon] || Heart;
            const gradientClass = colorMap[course.color] || "from-blue-500 to-indigo-500";
            
            return (
              <motion.div key={course.id} variants={item}>
                <Link href={`/courses/${course.slug}`}>
                  <Card className="group h-full cursor-pointer hover:scale-[1.02] transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${gradientClass} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {course.shortTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                        {course.tagline}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                        Learn more
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" asChild>
            <Link href="/courses">
              View All Courses
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
