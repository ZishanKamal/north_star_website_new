"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigation, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/north-star-logo.png"
                alt={siteConfig.name}
                width={250}
                height={75}
                className="h-[70px] w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-end mr-3" ref={dropdownRef}>
              {navigation.main.map((item) => {
                const hasChildren = "children" in item && item.children;

                if (hasChildren) {
                  return (
                    <div key={item.name} className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === item.name ? null : item.name)
                        }
                        className={cn(
                          "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                          isActive(item.href)
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        )}
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform",
                            openDropdown === item.name && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-white dark:bg-gray-950 shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={() => setOpenDropdown(null)}
                                className={cn(
                                  "block px-4 py-2.5 text-sm transition-colors",
                                  isActive(child.href)
                                    ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
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
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    )}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-blue-50 dark:bg-blue-950/50 rounded-lg -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
                <Link href={siteConfig.externalLinks.careerCounselling} target="_blank">
                  Career Counselling
                </Link>
              </Button>

              <Button size="sm" className="hidden md:flex" asChild>
                <Link href="/contact">
                  <Phone className="h-4 w-4" />
                  Partner With Us
                </Link>
              </Button>

              <ThemeToggle />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden"
          >
            <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-xl border-b border-gray-200 dark:border-gray-800">
              <nav className="mx-auto max-w-7xl px-4 py-6 space-y-2">
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
                            "flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-xl transition-colors",
                            isActive(item.href)
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                              : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"
                          )}
                        >
                          {item.name}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform",
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
                              className="overflow-hidden ml-4 mt-1 space-y-1"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setOpenDropdown(null);
                                  }}
                                  className={cn(
                                    "block px-4 py-2.5 text-sm rounded-lg transition-colors",
                                    isActive(child.href)
                                      ? "text-blue-600 bg-blue-50/50 dark:text-blue-400"
                                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
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
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-xl transition-colors",
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                          : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="pt-4 space-y-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link
                      href={siteConfig.externalLinks.careerCounselling}
                      target="_blank"
                    >
                      Career Counselling
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/contact">
                      <Phone className="h-4 w-4" />
                      Partner With Us
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
