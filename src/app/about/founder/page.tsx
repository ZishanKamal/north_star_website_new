"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  GraduationCap, 
  Award, 
  Target,
  Heart,
  Brain,
  MessageSquare,
  Settings,
  Code,
  BarChart3,
  Cpu,
  Briefcase,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { founder } from "@/lib/data";
import { Button } from "@/components/ui/button";

const keyOfferings = [
  { title: "Emotional Harmony", icon: Heart, description: "Equipping individuals with tools to navigate complexities of emotions" },
  { title: "Cognitive Readiness", icon: Brain, description: "Building mental agility for an ever-evolving professional landscape" },
  { title: "Business Communication", icon: MessageSquare, description: "Enhancing communication skills for the global business arena" },
  { title: "System Design", icon: Settings, description: "Understanding system interaction and delivery principles" },
  { title: "Programming Languages", icon: Code, description: "Mastering languages that drive innovation in tech" },
  { title: "AI Ecosystem", icon: Cpu, description: "Understanding AI technologies and applications" },
  { title: "Data Visualization", icon: BarChart3, description: "Communicating complex information through visuals" },
  { title: "Counselling & Job Readiness", icon: Briefcase, description: "Guidance for academic and professional growth" },
];

export default function FounderPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to About Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 text-base font-medium rounded-full mb-4">
              About Me
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Message from
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}Chief Coach
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Guided by expertise, driven by passion for transforming lives through education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[300px_1fr] gap-16 items-start">
            {/* Image & Credentials */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-44 h-44 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-3xl p-3 shadow-2xl">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={281}
                    height={281}
                    className="rounded-2xl"
                  />
                </div>
              </div>

              {/* Credentials Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {founder.name}
                </h3>
                <div className="space-y-3">
                  {founder.credentials.map((credential: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 flex items-center justify-center flex-shrink-0">
                        {index === 0 && <GraduationCap className="h-4 w-4 text-blue-600" />}
                        {index === 1 && <Award className="h-4 w-4 text-blue-600" />}
                        {index === 2 && <Award className="h-4 w-4 text-blue-600" />}
                        {index === 3 && <Target className="h-4 w-4 text-blue-600" />}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{credential}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Dear Esteemed Educators, Students, and Institutions,
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {founder.message.split("\n\n").map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Warm regards,</p>
                <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {founder.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Chief Coach & Trainer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Offerings */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 text-base font-medium rounded-full mb-4">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Key
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}Offerings
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyOfferings.map((offering, index) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 flex items-center justify-center mb-4">
                  <offering.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{offering.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{offering.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
