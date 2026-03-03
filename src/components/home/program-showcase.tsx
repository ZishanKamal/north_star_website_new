"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  School,
  GraduationCap,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Brain,
  Monitor,
  Settings,
  Code,
  Cpu,
  BarChart3,
  Briefcase,
  HeartHandshake,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Icon mapping ─── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Brain,
  Monitor,
  Settings,
  Code,
  Cpu,
  BarChart3,
  Briefcase,
  HeartHandshake,
  TrendingUp,
  Award,
  School,
  GraduationCap,
};

/* ─── Program data ─── */
interface ProgramCard {
  id: string;
  title: string;
  icon: string;
  href: string;
}

interface SubCategory {
  label: string;
  count: number;
  programs: ProgramCard[];
}

interface MainTab {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subCategories: SubCategory[];
  exploreHref: string;
  exploreLabel: string;
}

const tabs: MainTab[] = [
  {
    label: "Institutional Partnerships",
    icon: School,
    subCategories: [
      {
        label: "For Schools",
        count: 6,
        programs: [
          { id: "s1", title: "Empower - Emotional Agility", icon: "Heart", href: "/for-schools" },
          { id: "s2", title: "NeuroLift - Cognitive Readiness through Power Skills", icon: "Brain", href: "/for-schools" },
          { id: "s3", title: "TechOrbit - Creation of Digital Eco System", icon: "Monitor", href: "/for-schools" },
          { id: "s4", title: "STEMGRID - Creation and Support in STEM Lab", icon: "Settings", href: "/for-schools" },
          { id: "s5", title: "FutureFit - Psychometry based Personalized Career Counselling", icon: "TrendingUp", href: "/for-schools" },
          { id: "s6", title: "Complimentary Programs", icon: "HeartHandshake", href: "/for-schools" },
        ],
      },
      {
        label: "For Colleges",
        count: 5,
        programs: [
          { id: "c1", title: "NeuroLift - Cognitive Readiness through Power Skills", icon: "Brain", href: "/for-colleges" },
          { id: "c2", title: "Catalyst - Job Readiness Program", icon: "TrendingUp", href: "/for-colleges" },
          { id: "c3", title: "FutureFit - Psychometry based Personalized Career Counselling", icon: "Award", href: "/for-colleges" },
          { id: "c4", title: "ProForge - Internships and Projects", icon: "Code", href: "/for-colleges" },
          { id: "c5", title: "Complimentary Programs", icon: "HeartHandshake", href: "/for-colleges" },
        ],
      },
    ],
    exploreHref: "/institutional-programs",
    exploreLabel: "Explore more",
  },
  {
    label: "Open Programs",
    icon: Users,
    subCategories: [
      {
        label: "All Programs",
        count: 12,
        programs: [
          { id: "o1", title: "Masterclass with AI Toolsets", icon: "Cpu", href: "/open-programs/masterclass-with-ai-toolsets" },
          { id: "o2", title: "Professional Diploma in Intelligent Computing", icon: "Award", href: "/open-programs/professional-diploma-in-intelligent-computing" },
          { id: "o3", title: "Financial Computation using Tally & Advance Excel", icon: "BarChart3", href: "/open-programs/financial-computation-tally-excel" },
          { id: "o4", title: "Mastering Programming in Java, Python, C++, SQL", icon: "Code", href: "/open-programs/mastering-programming-languages" },
          { id: "o5", title: "Data Engineering & Visualization", icon: "BarChart3", href: "/open-programs/data-engineering-and-visualization" },
          { id: "o6", title: "AI/ML Eco System", icon: "Cpu", href: "/open-programs/ai-ml-eco-system" },
          { id: "o7", title: "Web Development with HTML, JS, CSS", icon: "Monitor", href: "/open-programs/web-development-html-js-css" },
          { id: "o8", title: "Full Stack with MERN", icon: "Code", href: "/open-programs/full-stack-with-mern" },
          { id: "o9", title: "Computational Problem Solving - DSA", icon: "Settings", href: "/open-programs/computational-problem-solving-dsa" },
          { id: "o10", title: "Psychometry Based Personalized Career Pathing", icon: "TrendingUp", href: "/open-programs/psychometry-based-career-pathing" },
          { id: "o11", title: "IT Projects/Internships", icon: "Briefcase", href: "/open-programs/it-projects-internships" },
          { id: "o12", title: "Catalyst - Job Readiness Program", icon: "HeartHandshake", href: "/open-programs/catalyst-job-readiness-program" },
        ],
      },
    ],
    exploreHref: "/open-programs",
    exploreLabel: "Explore more",
  },
];

/* ─── Card component ─── */
function ProgramCardItem({ program }: { program: ProgramCard }) {
  const Icon = iconMap[program.icon] || Cpu;

  return (
    <div className="flex-shrink-0 w-[220px] sm:w-[250px] md:w-[280px]">
      <div className="h-full rounded-xl border border-slate-200 dark:border-slate-700 bg-blue-50/40 dark:bg-slate-800/60 p-6 flex flex-col">
        <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center mb-5 ml-auto">
          <Icon className="w-6 h-6 text-amber-500" />
        </div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm md:text-base leading-snug mb-6 min-h-[40px] md:min-h-[44px]">
          {program.title}
        </h3>
        <div className="flex gap-2 mt-auto">
          <Link href={program.href}>
            <button className="px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold rounded-full border border-blue-700 dark:border-blue-500 text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-800 hover:bg-blue-700 hover:text-white transition-colors">
              View
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold rounded-full border border-blue-700 dark:border-blue-500 text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-800 hover:bg-blue-700 hover:text-white transition-colors">
              Enquire
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function ProgramShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const currentTab = tabs[activeTab];
  const safeActiveSub = Math.min(activeSub, currentTab.subCategories.length - 1);
  const currentSub = currentTab.subCategories[safeActiveSub];
  const programs = currentSub.programs;

  // Reset sub-category when tab changes
  useEffect(() => {
    setActiveSub(0);
  }, [activeTab]);

  // Keep arrows in sync while the user scrolls or resizes
  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  // Re-attach listeners and recalculate when tab/sub changes (AnimatePresence remounts the scroll container)
  useEffect(() => {
    // Multiple checks to catch the DOM after AnimatePresence animation completes
    const timers = [100, 300, 500].map((delay) =>
      setTimeout(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ left: 0 });
        el.addEventListener("scroll", updateArrows, { passive: true });
        updateArrows();
      }, delay)
    );

    window.addEventListener("resize", updateArrows);
    return () => {
      timers.forEach(clearTimeout);
      const el = scrollRef.current;
      if (el) el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, activeTab, activeSub]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 280 + 16; // card width + gap
    el.scrollBy({ left: direction === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Main tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1.5 gap-1.5">
            {tabs.map((tab, i) => {
              const TabIcon = tab.icon;
              const isActive = i === activeTab;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`relative flex items-center gap-2.5 px-5 md:px-8 py-3 md:py-3.5 rounded-lg transition-all duration-200 text-xs md:text-sm font-semibold ${
                    isActive
                      ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-md"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <TabIcon className={`w-5 h-5 ${isActive ? "text-blue-600" : ""}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-category filter tabs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`pills-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex justify-center mb-10"
          >
            <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700">
              {currentTab.subCategories.map((sub, i) => {
                const isActive = i === activeSub;
                return (
                  <button
                    key={sub.label}
                    onClick={() => setActiveSub(i)}
                    className={`relative px-5 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-blue-700 dark:text-blue-400"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                  >
                    {sub.label}
                    <span className="ml-1.5 text-[10px] md:text-xs font-medium px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                      {sub.count}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId={`sub-indicator-${activeTab}`}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`carousel-${activeTab}-${activeSub}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {/* Left arrow */}
            <button
              onClick={() => scroll("left")}
              className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm items-center justify-center text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-200 ${
                canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Cards — grid on mobile, horizontal scroll on desktop */}
            <div
              ref={scrollRef}
              className="flex flex-row gap-4 overflow-x-auto scroll-smooth px-1 py-2 no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {programs.map((program) => (
                <ProgramCardItem key={program.id} program={program} />
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scroll("right")}
              className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm items-center justify-center text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-200 ${
                canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </AnimatePresence>

{/* Explore more */}
        <div className="text-center mt-8">
          <Link href={currentTab.exploreHref}>
            <Button className="border border-blue-700 dark:border-blue-500 text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-800 hover:bg-blue-700 hover:text-white rounded-full px-8 transition-colors">
              {currentTab.exploreLabel}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
