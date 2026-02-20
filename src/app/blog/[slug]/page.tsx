"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2, Twitter, Linkedin, Facebook, Copy, Check } from "lucide-react";
import { blogs, founder, siteConfig } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const gradientColors = [
  "from-blue-500 to-indigo-500",
  "from-purple-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-green-500 to-emerald-500",
  "from-rose-500 to-red-500",
  "from-cyan-500 to-teal-500",
];

const categoryColors: { [key: string]: string } = {
  "Career Growth": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Soft Skills": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "Leadership": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Communication": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "Professional Development": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  "Workplace Culture": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
};

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blogIndex = blogs.findIndex((b) => b.slug === slug);
  const blog = blogs[blogIndex];

  if (!blog) {
    notFound();
  }

  // Get related blogs (excluding current)
  const relatedBlogs = blogs.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <BlogPostContent 
      blog={blog} 
      blogIndex={blogIndex}
      relatedBlogs={relatedBlogs}
    />
  );
}

function BlogPostContent({ 
  blog, 
  blogIndex,
  relatedBlogs 
}: { 
  blog: typeof blogs[0]; 
  blogIndex: number;
  relatedBlogs: typeof blogs;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gradient = gradientColors[blogIndex % gradientColors.length];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className={`inline-block px-4 py-1.5 text-sm font-medium rounded-full mb-6 ${categoryColors[blog.category] || "bg-gray-100 text-gray-700"}`}>
              {blog.category}
            </span>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {blog.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500">
                  {founder.image ? (
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                      {founder.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{founder.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blog.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`aspect-video rounded-3xl bg-gradient-to-br ${gradient} relative overflow-hidden shadow-2xl`}
          >
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-2xl"
            >
              {/* This would be the actual blog content - for now showing excerpt */}
              <p className="lead text-xl text-gray-600 dark:text-gray-400">
                {blog.excerpt}
              </p>
              
              <h2>Introduction</h2>
              <p>
                In today's rapidly evolving professional landscape, staying ahead requires a combination of technical expertise and refined soft skills. This article explores key strategies to help you excel in your career journey.
              </p>

              <h2>Key Insights</h2>
              <p>
                Success in the modern workplace isn't just about what you know—it's about how you apply that knowledge, communicate with others, and adapt to changing circumstances. Here are some important considerations:
              </p>

              <ul>
                <li>Continuous learning and skill development</li>
                <li>Effective communication across all levels</li>
                <li>Building meaningful professional relationships</li>
                <li>Embracing change and staying adaptable</li>
                <li>Developing emotional intelligence</li>
              </ul>

              <h2>Practical Applications</h2>
              <p>
                Theory is important, but practical application is where real growth happens. Consider implementing these strategies in your daily work routine to see meaningful improvements in your professional development.
              </p>

              <blockquote>
                "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
              </blockquote>

              <h2>Conclusion</h2>
              <p>
                Your career is a marathon, not a sprint. Focus on consistent growth, maintain a positive attitude, and never stop learning. The investment you make in yourself today will pay dividends for years to come.
              </p>
            </motion.article>

            {/* Share Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="sticky top-28 space-y-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Share</p>
                <button
                  onClick={handleCopyLink}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </a>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Author Card */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500">
                    {founder.image ? (
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                        {founder.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {founder.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {founder.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {founder.bio}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/about/founder">
                        View Profile
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Related Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Continue reading with these related posts
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedBlogs.map((relatedBlog, index) => (
              <motion.div
                key={relatedBlog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${relatedBlog.slug}`}>
                  <Card className="group h-full cursor-pointer hover:scale-[1.02] transition-all duration-300">
                    <div className={`h-40 bg-gradient-to-br ${gradientColors[(blogs.indexOf(relatedBlog)) % gradientColors.length]} relative overflow-hidden rounded-t-2xl`}>
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                    <CardContent className="p-6">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${categoryColors[relatedBlog.category] || "bg-gray-100 text-gray-700"}`}>
                        {relatedBlog.category}
                      </span>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2 line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {relatedBlog.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
