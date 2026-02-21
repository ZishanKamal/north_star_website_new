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
    <div className="w-full md:flex-shrink-0 md:w-[280px]">
      <div className="h-full rounded-xl border border-slate-200 bg-blue-50/40 p-6 flex flex-col">
        <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-5 ml-auto">
          <Icon className="w-6 h-6 text-amber-500" />
        </div>
        <h3 className="font-semibold text-slate-800 text-base leading-snug mb-6 min-h-[44px]">
          {program.title}
        </h3>
        <div className="flex gap-2 mt-auto">
          <Link href={program.href}>
            <button className="px-5 py-2 text-sm font-semibold rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
              View
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-5 py-2 text-sm font-semibold rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const currentTab = tabs[activeTab];
  const safeActiveSub = Math.min(activeSub, currentTab.subCategories.length - 1);
  const currentSub = currentTab.subCategories[safeActiveSub];
  const programs = currentSub.programs;

  // Reset sub-category and scroll when tab changes
  useEffect(() => {
    setActiveSub(0);
    setPage(0);
  }, [activeTab]);

  useEffect(() => {
    setPage(0);
  }, [activeSub]);

  // Calculate pages based on visible width
  const updatePages = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const visibleWidth = el.clientWidth;
    const scrollWidth = el.scrollWidth;
    const pages = Math.max(1, Math.ceil(scrollWidth / visibleWidth));
    setTotalPages(pages);
  }, []);

  useEffect(() => {
    updatePages();
    window.addEventListener("resize", updatePages);
    return () => window.removeEventListener("resize", updatePages);
  }, [updatePages, programs]);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const el = scrollRef.current;
      if (!el) return;
      const visibleWidth = el.clientWidth;
      const newPage =
        direction === "right"
          ? Math.min(page + 1, totalPages - 1)
          : Math.max(page - 1, 0);
      el.scrollTo({ left: newPage * visibleWidth, behavior: "smooth" });
      setPage(newPage);
    },
    [page, totalPages]
  );

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
                className={`flex flex-col items-center gap-2 px-6 py-3 rounded-lg transition-all text-base font-semibold ${
                  isActive
                    ? "text-blue-700 border-b-2 border-blue-700"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <TabIcon className="w-8 h-8" />
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
                  className={`px-6 py-2.5 rounded-full text-base font-medium border transition-colors ${
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
            className="relative"
          >
            {/* Left arrow */}
            {page > 0 && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Cards — grid on mobile, horizontal scroll on desktop */}
            <div
              ref={scrollRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row gap-5 md:overflow-x-auto md:scroll-smooth px-1 py-2 md:no-scrollbar md:justify-center"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {programs.map((program) => (
                <ProgramCardItem key={program.id} program={program} />
              ))}
            </div>

            {/* Right arrow */}
            {page < totalPages - 1 && programs.length > 3 && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === page ? "bg-slate-500" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        )}

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
