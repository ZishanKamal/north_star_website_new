"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Show only 6 featured posts in the carousel
const featuredPosts = blogPosts.slice(0, 6);

export default function BlogCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 350;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 32 : cardWidth + 32, behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full mb-4">
            Latest Insights
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            News &
            <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              {" "}Blog
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Stay updated with the latest trends in education, career development, and industry insights.
          </p>
        </motion.div>

        {/* Carousel controls */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex-shrink-0 w-[340px] sm:w-[380px] snap-start"
            >
              <Link href={`/blog/${post.slug}`}>
              <Card className="h-full cursor-pointer overflow-hidden group hover:shadow-2xl transition-all duration-500">
                {/* Blog image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-900 overflow-hidden">
                  {post.image ? (
                    <Image
                      src={`/images/blog/${post.image}`}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white/20">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-400">
                    Read More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Explore More link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link href="/blog">
            <Button variant="outline" size="lg">
              Explore All Blogs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
