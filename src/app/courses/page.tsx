"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Brain, MessageSquare, Settings, Code, BarChart3, Cpu, HeartHandshake, Briefcase, Globe, Filter } from "lucide-react";
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

const categories = [
  { id: "all", label: "All Courses" },
  { id: "soft-skills", label: "Soft Skills" },
  { id: "technical", label: "Technical" },
  { id: "career", label: "Career" },
];

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

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCourses = activeCategory === "all" 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 text-base font-medium rounded-full mb-4">
              Our Programs
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Explore Our
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}Courses
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Comprehensive training programs designed to nurture technical proficiency, 
              emotional intelligence, and career readiness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Course Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course) => {
              const Icon = iconMap[course.icon] || Heart;
              const gradientClass = colorMap[course.color] || "from-blue-500 to-indigo-500";
              
              return (
                <motion.div key={course.id} variants={item}>
                  <Link href={`/courses/${course.slug}`}>
                    <Card className="group h-full cursor-pointer hover:scale-[1.02] transition-all duration-300">
                      {/* Card Header with Gradient */}
                      <div className={`h-32 bg-gradient-to-r ${gradientClass} rounded-t-2xl relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute bottom-4 left-6">
                          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
                            {course.category.replace("-", " ")}
                          </span>
                        </div>
                      </div>
                      
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
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

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No courses found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Not Sure Which Course to Choose?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Book a free consultation call with our team to discuss your goals.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Book Free Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
