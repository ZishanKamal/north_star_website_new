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
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/3" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              <Users className="w-4 h-4" />
              Individual Enrollment
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Open{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Programs
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
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
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
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
                colorMap[program.color] || "from-blue-500 to-indigo-500";

              return (
                <motion.div key={program.id} variants={item}>
                  <Link href={`/open-programs/${program.slug}`}>
                    <Card className="group h-full cursor-pointer hover:scale-[1.02] transition-all duration-300">
                      <div
                        className={`h-32 bg-gradient-to-r ${gradientClass} rounded-t-2xl relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute bottom-4 left-6">
                          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
                            {program.category.replace("-", " ")}
                          </span>
                        </div>
                      </div>

                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {program.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                          {program.tagline}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
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
              <p className="text-muted-foreground">
                No programs found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Looking for Institutional Programs?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We also deliver customized training at your institution. Explore our
              institutional partnership options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/institutional-programs">
                <Button size="lg" variant="gradient">
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
