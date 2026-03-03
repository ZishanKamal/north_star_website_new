"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { siteConfig, navigation } from "@/lib/data";

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/brand-logo-header-darkmode.png"
                alt={siteConfig.name}
                width={160}
                height={48}
                className="h-[29px] md:h-[38px] w-auto"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: siteConfig.socialLinks.facebook },
                { icon: Instagram, href: siteConfig.socialLinks.instagram },
                { icon: Linkedin, href: siteConfig.socialLinks.linkedin },
                { icon: PinterestIcon, href: siteConfig.socialLinks.pinterest },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
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
