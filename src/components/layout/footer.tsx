"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { siteConfig, courses, navigation } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 text-gray-300 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        {/* Glowing Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* CTA Section */}
      <div className="relative border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full mb-4">
              LEARN ABOUT NORTH STAR ACADEMY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to explore more?
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Register now to embark on your journey!
              </span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/north-star-logo.png"
                alt="North Star Academy"
                width={250}
                height={75}
                className="h-[70px] w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: siteConfig.socialLinks.facebook },
                { icon: Twitter, href: siteConfig.socialLinks.twitter },
                { icon: Instagram, href: siteConfig.socialLinks.instagram },
                { icon: Linkedin, href: siteConfig.socialLinks.linkedin },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 hover:bg-blue-600 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Our Courses */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Our Courses</h3>
            <ul className="space-y-3">
              {courses.slice(0, 7).map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {course.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={siteConfig.externalLinks.careerCounselling}
                  target="_blank"
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Career Counselling
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">{siteConfig.address.full}</span>
              </li>
              <li>
                <Link
                  href={`tel:${siteConfig.phone}`}
                  className="flex gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  {siteConfig.phone}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="flex gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  {siteConfig.email}
                </Link>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
              <p className="text-xs text-gray-500 mb-2">Hours of Operation</p>
              <p className="text-sm text-gray-400">{siteConfig.hours.weekdays}</p>
              <p className="text-sm text-gray-400">{siteConfig.hours.saturday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} {siteConfig.name}. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
