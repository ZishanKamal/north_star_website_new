"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Users,
  Lightbulb,
  Brain,
  Theater,
  Handshake,
  Wrench,
} from "lucide-react";
import { whyChooseUs } from "@/lib/data";

const iconMap: { [key: string]: React.ElementType } = {
  Users,
  Lightbulb,
  Brain,
  Theater,
  HandshakeIcon: Handshake,
  Wrench,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Image Side - Smaller */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:col-span-2"
          >
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/why.png"
                  alt="Why Choose North Star Academy"
                  width={400}
                  height={350}
                  className="object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  20+
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Years of Excellence</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side - Larger */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 text-base font-medium rounded-full mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Transform Your Future with
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}Expert Guidance
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
                It&apos;s a firm belief at North Star that everyone needs to operate at their 
                best potential and we are committed to help you achieve the same.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {whyChooseUs.map((feature) => {
                const Icon = iconMap[feature.icon] || Users;
                return (
                  <motion.div
                    key={feature.id}
                    variants={item}
                    className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
