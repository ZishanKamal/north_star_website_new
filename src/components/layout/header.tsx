"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { navigation, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on route change
  React.useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
      {/* Top bar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-white shadow-sm border-slate-200"
            : "bg-white border-transparent"
        )}
      >
        <div className="px-4 sm:px-6 lg:px-10">
          <div className="flex h-20 md:h-24 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/north-star-logo.png"
                alt={siteConfig.name}
                width={400}
                height={120}
                className="h-[72px] md:h-[96px] w-auto"
                priority
              />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-slate-700 hover:text-slate-900 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay + Right Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-800 tracking-wide uppercase">
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
                              ? "bg-blue-50 text-blue-700"
                              : "text-slate-700 hover:bg-slate-50"
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
                                      ? "text-blue-700 bg-blue-50/60"
                                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
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
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                {/* Divider */}
                <div className="my-3 border-t border-slate-100" />

                {/* Career Counselling external link */}
                <a
                  href={siteConfig.externalLinks.careerCounselling}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-[15px] font-medium rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Career Counselling ↗
                </a>
              </nav>


            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
