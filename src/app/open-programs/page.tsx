"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
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
  Users,
} from "lucide-react";
import { openPrograms } from "@/lib/data";
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
  rose: "bg-blue-600",
  purple: "bg-blue-700",
  blue: "bg-blue-600",
  orange: "bg-blue-600",
  green: "bg-blue-700",
  cyan: "bg-blue-600",
  violet: "bg-blue-700",
  pink: "bg-blue-600",
  amber: "bg-blue-700",
  teal: "bg-blue-600",
};

const categories = [
  { id: "all", label: "All Programs" },
  { id: "soft-skills", label: "Soft Skills" },
  { id: "technical", label: "Technical" },
  { id: "career", label: "Career" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function OpenProgramsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPrograms =
    activeCategory === "all"
      ? openPrograms
      : openPrograms.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-6">
              <Users className="w-4 h-4" />
              Individual Enrollment
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Open{" "}
              <span className="text-blue-700">
                Programs
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-500">
              Explore our signature training programs available for individual
              enrollment — from soft skills to technical excellence and career readiness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
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
                    ? "bg-blue-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Program Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {filteredPrograms.map((program) => {
              const Icon = iconMap[program.icon] || Heart;
              const gradientClass =
                colorMap[program.color] || "bg-blue-600";

              return (
                <motion.div key={program.id} variants={item}>
                  <Link href={`/open-programs/${program.slug}`}>
                    <Card className="group h-full cursor-pointer hover:scale-[1.02] transition-all duration-300">
                      <div
                        className={`h-32 ${gradientClass} rounded-t-xl relative overflow-hidden`}
                      >
                        <div className="absolute bottom-4 left-6">
                          <div className="w-14 h-14 rounded-xl bg-white/30 flex items-center justify-center">
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/30 text-white text-xs font-medium rounded-full capitalize">
                            {program.category.replace("-", " ")}
                          </span>
                        </div>
                      </div>

                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl group-hover:text-blue-700 transition-colors">
                          {program.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <p className="text-slate-500 text-sm line-clamp-3 mb-4">
                          {program.tagline}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
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

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">
                No programs found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Looking for Institutional Programs?
            </h2>
            <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
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
