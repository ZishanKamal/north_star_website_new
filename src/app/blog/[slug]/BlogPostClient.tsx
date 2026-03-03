"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
};

export default function BlogPostClient({
  post,
  content,
}: {
  post: BlogPost;
  content: string;
}) {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-12 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-lg">
                <Tag className="h-3.5 w-3.5" />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section className="bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-4xl mx-auto -mt-4"
            >
              <div className="relative w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={`/images/blog/${post.image}`}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-strong:text-slate-900 dark:prose-strong:text-white prose-a:text-blue-700 dark:prose-a:text-blue-400"
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </motion.article>

          {/* Bottom nav */}
          <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Blog Posts
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
