"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setShowVideo(false);
    setIsPaused(false);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setShowVideo(false);
    setIsPaused(false);
  }, []);

  // Autoplay — rotates every 6 seconds, pauses on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const current = testimonials[activeIndex];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Partners Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from the institutions that have transformed their students&apos;
            outcomes through our programs.
          </p>
        </motion.div>

        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { if (!showVideo) setIsPaused(false); }}
        >
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-background rounded-2xl p-8 md:p-12 shadow-lg border"
          >
            <Quote className="w-8 h-8 text-primary/20 mb-4" />

            {/* Video embed if available */}
            {current.videoUrl && showVideo ? (
              <div className="relative mb-8 rounded-xl overflow-hidden aspect-video">
                <iframe
                  src={`${current.videoUrl}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Testimonial from ${current.name}`}
                />
              </div>
            ) : current.videoUrl ? (
              (() => {
                const videoId = current.videoUrl.split("/embed/")[1]?.split("?")[0];
                return (
                  <button
                    onClick={() => {
                      setShowVideo(true);
                      setIsPaused(true);
                    }}
                    className="relative w-full mb-8 rounded-xl overflow-hidden aspect-video group cursor-pointer"
                    aria-label="Play video testimonial"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt={`Video testimonial from ${current.name}`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                    {/* YouTube-style play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                        <svg viewBox="0 0 68 48" className="w-full h-full drop-shadow-lg">
                          <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#ff0000" />
                          <path d="M45 24 27 14v20" fill="#fff" />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              })()
            ) : null}

            <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-black dark:border-white bg-background flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-foreground">
                  {current.name
                    .split(" ")
                    .filter((p) => !["Dr.", "Mr.", "Mrs.", "Ms.", "Prof."].includes(p))
                    .slice(0, 2)
                    .map((p) => p.charAt(0))
                    .join("")}
                </span>
              </div>
              <div>
                <p className="font-semibold text-blue-600">
                  {current.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {current.role}, {current.institution}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setShowVideo(false);
                    setIsPaused(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-primary w-8"
                      : "bg-primary/20 hover:bg-primary/40"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
