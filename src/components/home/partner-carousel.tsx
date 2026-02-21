"use client";

import Image from "next/image";
import { partners } from "@/lib/data";

export default function PartnerCarousel() {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Trusted by Leading Institutions
          </p>
        </div>

        {/* Contained marquee with CSS animation */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex marquee-track">
            {/* Render the set twice for seamless loop */}
            {[0, 1].map((setIndex) => (
              <div
                key={setIndex}
                className="flex gap-20 items-start shrink-0 px-8"
                aria-hidden={setIndex === 1}
              >
                {partners.map((partner) => (
                  <div
                    key={`${partner.name}-${setIndex}`}
                    className="flex flex-col items-center gap-3 shrink-0 transition-all duration-200 opacity-60 hover:opacity-100 w-28"
                  >
                    <div
                      className="w-20 h-20 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden"
                    >
                      {partner.logo ? (
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={72}
                          height={72}
                          className="object-contain w-[72px] h-[72px] p-1"
                        />
                      ) : (
                        <span className="text-blue-600 font-bold text-base tracking-tight">
                          {partner.initials}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium text-center leading-tight w-full h-8 flex items-start justify-center">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 25s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
