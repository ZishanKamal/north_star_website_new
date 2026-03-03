"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight, Search, X } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const categories = [
  "All",
  ...Array.from(new Set(blogPosts.map((p) => p.category))),
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-sm font-medium text-blue-700 dark:text-blue-400 mb-6">
              Latest Insights & Articles
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              News &{" "}
              <span className="text-blue-700 dark:text-blue-400">
                Blog
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
              Stay updated with the latest trends in education, career
              development, AI & jobs, and industry insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg shadow-blue-500/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-slate-500 dark:text-slate-400">
                No blog posts found matching your criteria.
              </p>
              <Button
                onClick={() => {
                  setActiveCategory("All");
                  setSearch("");
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full cursor-pointer overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                    {/* Blog image */}
                    <div className="relative h-52 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-900 overflow-hidden">
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
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          <Tag className="h-3 w-3" />
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                        <span className="text-xs">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
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
          )}

          {/* Results count */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing {filteredPosts.length} of {blogPosts.length} blog posts
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
