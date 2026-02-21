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
    <section className="relative pt-16 overflow-hidden bg-white">
      {/* Banner images - crossfade, shown in full */}
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

          {/* Overlay content — positioned on top of the banner */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-2xl">
                {/* Stats Row - gold numbers */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-wrap gap-x-10 gap-y-4 mb-8"
                >
                  {[
                    { label: "Institutional", value: "50+", desc: "Partners" },
                    { label: "Students", value: "10K+", desc: "Impacted" },
                    { label: "Programs", value: "200+", desc: "Delivered" },
                    { label: "Partner", value: "95%", desc: "Satisfaction" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.desc}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <p className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-0.5 drop-shadow-sm">
                        {stat.label}
                      </p>
                      <p className="text-4xl md:text-5xl font-bold text-amber-500 leading-none drop-shadow-sm">
                        {stat.value}
                      </p>
                      <p className="text-xs text-white mt-0.5 font-medium drop-shadow-sm">
                        {stat.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Main Tagline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-tight mb-5 drop-shadow-md"
                >
                  Developing Leaders,
                  <br />
                  Empowering Institutions
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-base md:text-lg text-white/90 max-w-xl mb-8 leading-relaxed drop-shadow-sm"
                >
                  We partner with schools and colleges to deliver transformative
                  training programs — from emotional intelligence to technical
                  excellence and career readiness.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/contact">
                    <Button size="xl" className="group bg-amber-500 hover:bg-amber-600 text-white">
                      <Building2 className="w-5 h-5 mr-2" />
                      Partner With Us
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/open-programs">
                    <Button size="xl" variant="outline" className="group border-white text-white hover:bg-white/20">
                      <Users className="w-5 h-5 mr-2" />
                      Explore Programs
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-amber-500" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
