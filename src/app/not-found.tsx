"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-slate-50">
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 404 Number */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-[150px] sm:text-[200px] font-bold leading-none text-blue-700"
          >
            404
          </motion.h1>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-lg text-slate-500 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/">
                <Home className="h-5 w-5" />
                Go to Homepage
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/institutional-programs">
                <Search className="h-5 w-5" />
                Explore Programs
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
