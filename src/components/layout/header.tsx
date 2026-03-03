"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { navigation, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  React.useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    setDesktopDropdown(null);
  }, [pathname]);

  // Prevent body scroll when mobile drawer is open
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  const handleDesktopDropdownEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDesktopDropdown(name);
  };

  const handleDesktopDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setDesktopDropdown(null), 150);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm border-slate-200 dark:border-slate-700"
            : "bg-white dark:bg-slate-900 border-transparent"
        )}
      >
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(148,163,184,0.06)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(148,163,184,0.06)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={mounted && resolvedTheme === "dark" ? "/brand-logo-header-darkmode.png" : "/brand-logo-header-lightmode.png"}
                alt={siteConfig.name}
                width={160}
                height={48}
                className="h-[29px] md:h-[38px] w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 flex-1 justify-end">
              {navigation.main.map((item) => {
                const hasChildren = "children" in item && item.children;

                if (hasChildren) {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleDesktopDropdownEnter(item.name)}
                      onMouseLeave={handleDesktopDropdownLeave}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                          isActive(item.href)
                            ? "text-blue-700 dark:text-blue-400"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          desktopDropdown === item.name && "rotate-180"
                        )} />
                        {isActive(item.href) && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute inset-0 bg-blue-50 dark:bg-blue-900/30 rounded-lg -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </Link>

                      {/* Desktop dropdown */}
                      <AnimatePresence>
                        {desktopDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 w-56 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-2.5 text-sm transition-colors",
                                  isActive(child.href)
                                    ? "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                                )}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                      isActive(item.href)
                        ? "text-blue-700 dark:text-blue-400"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    )}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-blue-50 dark:bg-blue-900/30 rounded-lg -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side — CTA buttons + theme + mobile burger */}
            <div className="flex items-center gap-3 ml-4">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
                <Link href={siteConfig.externalLinks.careerCounselling} target="_blank">
                  Career Counselling
                </Link>
              </Button>

              <ThemeToggle />

              {/* Mobile hamburger — hidden on lg */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay + Right Slide-out Drawer (lg:hidden) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {navigation.main.map((item) => {
                  const hasChildren = "children" in item && item.children;

                  if (hasChildren) {
                    return (
                      <div key={item.name}>
                        <button
                          onClick={() =>
                            setOpenDropdown(openDropdown === item.name ? null : item.name)
                          }
                          className={cn(
                            "flex items-center justify-between w-full px-4 py-3 text-[15px] font-medium rounded-lg transition-colors",
                            isActive(item.href)
                              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                          )}
                        >
                          {item.name}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              openDropdown === item.name && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.15 }}
                              className="overflow-hidden ml-3 mt-1 space-y-0.5"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className={cn(
                                    "block px-4 py-2.5 text-sm rounded-lg transition-colors",
                                    isActive(child.href)
                                      ? "text-blue-700 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-900/20"
                                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                                  )}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-[15px] font-medium rounded-lg transition-colors",
                        isActive(item.href)
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                {/* Divider */}
                <div className="my-3 border-t border-slate-100 dark:border-slate-700" />

                {/* CTA buttons in mobile drawer */}
                <div className="space-y-2 px-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={siteConfig.externalLinks.careerCounselling} target="_blank">
                      Career Counselling
                    </Link>
                  </Button>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
