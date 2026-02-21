"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center rounded-xl bg-slate-50 border border-slate-200 p-12 md:p-16"
        >
          <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
            <Handshake className="w-8 h-8 text-blue-700" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Partner With Us
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Transform your institution&apos;s training outcomes. Let&apos;s
            design a customized program that develops your students into
            industry-ready professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                Start a Partnership
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/institutional-programs">
              <Button size="lg" variant="outline">
                Explore Programs
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
