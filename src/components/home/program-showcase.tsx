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
  MessageSquare,
  Settings,
  Code,
  Cpu,
  BarChart3,
  Briefcase,
  HeartHandshake,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Icon mapping ─── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Brain,
  MessageSquare,
  Settings,
  Code,
  Cpu,
  BarChart3,
  Briefcase,
  HeartHandshake,
  Globe,
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
        count: 3,
        programs: [
          { id: "s1", title: "Emotional Harmony Workshop", icon: "Heart", href: "/for-schools" },
          { id: "s2", title: "Cognitive Readiness Program", icon: "Brain", href: "/for-schools" },
          { id: "s3", title: "Effective Communication Skills", icon: "MessageSquare", href: "/for-schools" },
        ],
      },
      {
        label: "For Colleges",
        count: 5,
        programs: [
          { id: "c1", title: "System Analysis & Design", icon: "Settings", href: "/for-colleges" },
          { id: "c2", title: "Programming Languages", icon: "Code", href: "/for-colleges" },
          { id: "c3", title: "AI Ecosystem", icon: "Cpu", href: "/for-colleges" },
          { id: "c4", title: "Data Visualization", icon: "BarChart3", href: "/for-colleges" },
          { id: "c5", title: "Industry Readiness & Placement", icon: "Briefcase", href: "/for-colleges" },
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
        label: "Soft Skills",
        count: 3,
        programs: [
          { id: "o1", title: "Workshop on Emotional Harmony", icon: "Heart", href: "/open-programs/emotional-harmony" },
          { id: "o2", title: "Workshop on Cognitive Readiness", icon: "Brain", href: "/open-programs/cognitive-readiness" },
          { id: "o3", title: "Effective Business Communication", icon: "MessageSquare", href: "/open-programs/business-communication" },
        ],
      },
      {
        label: "Technical",
        count: 4,
        programs: [
          { id: "o4", title: "System Analysis and Design", icon: "Settings", href: "/open-programs/system-analysis-and-design" },
          { id: "o5", title: "Programming Languages", icon: "Code", href: "/open-programs/programming-languages" },
          { id: "o6", title: "Data Visualization", icon: "BarChart3", href: "/open-programs/data-visualization" },
          { id: "o7", title: "AI Ecosystem", icon: "Cpu", href: "/open-programs/artificial-intelligence-ecosystem" },
        ],
      },
      {
        label: "Career",
        count: 3,
        programs: [
          { id: "o8", title: "Counselling Services", icon: "HeartHandshake", href: "/open-programs/counselling-services" },
          { id: "o9", title: "Industry Readiness", icon: "Briefcase", href: "/open-programs/industry-readiness" },
          { id: "o10", title: "Study Abroad", icon: "Globe", href: "/open-programs/study-abroad" },
        ],
      },
    ],
    exploreHref: "/open-programs",
    exploreLabel: "Explore more",
  },
];

/* ─── Card component ─── */
function ProgramCardItem({ program }: { program: ProgramCard }) {
  const Icon = iconMap[program.icon] || Heart;

  return (
    <div className="flex-shrink-0 w-[220px] sm:w-[250px] md:w-[280px]">
      <div className="h-full rounded-xl border border-slate-200 bg-blue-50/40 p-6 flex flex-col">
        <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-5 ml-auto">
          <Icon className="w-6 h-6 text-amber-500" />
        </div>
        <h3 className="font-semibold text-slate-800 text-sm md:text-base leading-snug mb-6 min-h-[40px] md:min-h-[44px]">
          {program.title}
        </h3>
        <div className="flex gap-2 mt-auto">
          <Link href={program.href}>
            <button className="px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
              View
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
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

  // Check overflow after the entering animation completes (AnimatePresence)
  const handleAnimationComplete = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    setCanScrollLeft(false);
    setCanScrollRight(el.scrollWidth > el.clientWidth + 1);
  }, []);

  // Keep arrows in sync while the user scrolls or resizes
  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 280 + 16; // card width + gap
    el.scrollBy({ left: direction === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Main tabs */}
        <div className="flex justify-center gap-8 mb-8">
          {tabs.map((tab, i) => {
            const TabIcon = tab.icon;
            const isActive = i === activeTab;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`flex flex-col items-center gap-2 px-4 md:px-6 py-3 rounded-lg transition-all text-xs md:text-base font-semibold ${
                  isActive
                    ? "text-blue-700 border-b-2 border-blue-700"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <TabIcon className="w-5 h-5 md:w-8 md:h-8" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-category filter pills */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`pills-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex justify-center flex-wrap gap-3 mb-10"
          >
            {currentTab.subCategories.map((sub, i) => {
              const isActive = i === activeSub;
              return (
                <button
                  key={sub.label}
                  onClick={() => setActiveSub(i)}
                  className={`px-4 md:px-6 py-1.5 md:py-2.5 rounded-full text-xs md:text-base font-medium border transition-colors ${
                    isActive
                      ? "bg-blue-700 text-white border-blue-700"
                      : "bg-white text-slate-600 border-slate-300 hover:border-blue-400 hover:text-blue-700"
                  }`}
                >
                  {sub.label} ({sub.count})
                </button>
              );
            })}
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
            onAnimationComplete={handleAnimationComplete}
            className="relative"
          >
            {/* Left arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

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
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </AnimatePresence>

{/* Explore more */}
        <div className="text-center mt-8">
          <Link href={currentTab.exploreHref}>
            <Button className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-8">
              {currentTab.exploreLabel}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
