"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, User, Search } from "lucide-react";
import { blogs, founder } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const categoryColors: { [key: string]: string } = {
  "Career Growth": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Soft Skills": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "Leadership": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Communication": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "Professional Development": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  "Workplace Culture": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
};

const gradientColors = [
  "from-blue-300 to-indigo-300",
  "from-purple-300 to-pink-300",
  "from-amber-300 to-orange-300",
  "from-green-300 to-emerald-300",
  "from-rose-300 to-red-300",
  "from-cyan-300 to-teal-300",
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredBlog = blogs[0];
  const otherBlogs = filteredBlogs.slice(searchQuery ? 0 : 1);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full mb-4">
              Our Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Insights &
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}Inspiration
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-8">
              Expert articles on career growth, soft skills development, and professional excellence.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {!searchQuery && (
        <section className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${featuredBlog.slug}`}>
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="grid lg:grid-cols-2">
                    <div className={`aspect-video lg:aspect-auto lg:h-full min-h-[300px] bg-gradient-to-br ${gradientColors[0]} relative`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className={`inline-block w-fit px-3 py-1 text-xs font-medium rounded-full mb-4 ${categoryColors[featuredBlog.category] || "bg-gray-100 text-gray-700"}`}>
                        {featuredBlog.category}
                      </span>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {featuredBlog.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                        {featuredBlog.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {featuredBlog.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {featuredBlog.readTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium">
                          Read more
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {searchQuery ? `Search Results (${filteredBlogs.length})` : "Latest Articles"}
            </h2>
          </motion.div>

          {otherBlogs.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {otherBlogs.map((blog, index) => (
                <motion.div key={blog.id} variants={item}>
                  <Link href={`/blog/${blog.slug}`}>
                    <Card className="group h-full cursor-pointer hover:scale-[1.02] transition-all duration-300">
                      {/* Card Header with Gradient */}
                      <div className={`h-48 bg-gradient-to-br ${gradientColors[index % gradientColors.length]} relative overflow-hidden rounded-t-2xl`}>
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[blog.category] || "bg-white/20 backdrop-blur-sm text-white"}`}>
                            {blog.category}
                          </span>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {blog.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {blog.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-800 to-pink-800 p-8 md:p-12 text-center"
          >
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-xl mx-auto">
                Get the latest insights on career growth and professional development delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:ring-2 focus:ring-white/50 outline-none"
                />
                <Button className="bg-white text-purple-600 hover:bg-purple-50 rounded-full px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
