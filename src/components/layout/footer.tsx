"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { siteConfig, navigation } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* CTA Section */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-900/40 text-blue-300 text-sm font-medium rounded-lg mb-4">
              PARTNER WITH NORTH STAR ACADEMY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Ready to transform your institution?
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Let&apos;s build something extraordinary together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
            >
              Start a Conversation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/north-star-logo.png"
                alt={siteConfig.name}
                width={500}
                height={150}
                className="h-[60px] md:h-[120px] w-auto"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
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
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 hover:bg-blue-700 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Programs</h3>
            <ul className="space-y-3">
              {navigation.footer.programs.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.footer.quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={siteConfig.externalLinks.careerCounselling}
                  target="_blank"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
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
                <MapPin className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">{siteConfig.address.full}</span>
              </li>
              <li>
                <Link
                  href={`tel:${siteConfig.phone}`}
                  className="flex gap-3 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  {siteConfig.phone}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="flex gap-3 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  {siteConfig.email}
                </Link>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-slate-800 rounded-lg">
              <p className="text-xs text-slate-500 mb-2">Hours of Operation</p>
              <p className="text-sm text-slate-400">{siteConfig.hours.weekdays}</p>
              <p className="text-sm text-slate-400">{siteConfig.hours.saturday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {currentYear} {siteConfig.name}. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
