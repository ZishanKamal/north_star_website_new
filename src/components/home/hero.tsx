"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  { src: "/images/hero/banner-boy.png", alt: "Professional training" },
  { src: "/images/hero/banner-girl.png", alt: "Student empowerment" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-16 overflow-hidden bg-white">

      {/* ── Banner with overlay on all screen sizes ── */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full"
          >
            <Image
              src={banners[current].src}
              alt={banners[current].alt}
              width={1920}
              height={800}
              className="w-full h-auto block"
              priority
              sizes="100vw"
            />

            {/* Overlay — left side, all screen sizes */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-4 md:px-10 lg:px-16">
                <div className="max-w-[52%] md:max-w-xl">
                  {/* Stats */}
                  <div className="flex flex-wrap gap-x-3 md:gap-x-10 gap-y-1 md:gap-y-4 mb-3 md:mb-8">
                    {[
                      { label: "Helped build", value: "50+", desc: "Partners" },
                      { label: "Students", value: "10K+", desc: "Impacted" },
                      { label: "Programs", value: "200+", desc: "Delivered" },
                      { label: "Partner", value: "95%", desc: "Satisfaction" },
                    ].map((stat) => (
                      <div key={stat.desc}>
                        <p className="text-[8px] md:text-xs font-semibold text-amber-400 leading-tight">
                          {stat.label}
                        </p>
                        <p className="text-lg md:text-5xl font-bold text-amber-400 leading-none">
                          {stat.value}
                        </p>
                        <p className="text-[8px] md:text-xs text-white/80 leading-tight">
                          {stat.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tagline */}
                  <h1 className="text-sm sm:text-xl md:text-4xl lg:text-[3.5rem] font-bold text-white leading-tight drop-shadow-sm">
                    Developing Leaders,<br />
                    Empowering Institutions
                  </h1>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-amber-400" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Below banner: subtitle + CTAs ── */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <p className="text-sm md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            We partner with schools and colleges to deliver transformative
            training programs — from emotional intelligence to technical
            excellence and career readiness.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact">
              <Button size="lg" className="group bg-blue-700 hover:bg-blue-800 text-white w-full sm:w-auto">
                <Building2 className="w-4 h-4 mr-2" />
                Partner With Us
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/open-programs">
              <Button size="lg" variant="outline" className="group w-full sm:w-auto">
                <Users className="w-4 h-4 mr-2" />
                Explore Programs
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
