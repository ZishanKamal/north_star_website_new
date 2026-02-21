"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { partners } from "@/lib/data";

export default function PartnerCarousel() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-lg font-semibold uppercase tracking-wider text-muted-foreground">
            Trusted by Leading Institutions
          </p>
        </motion.div>

        {/* Contained marquee with CSS animation */}
        <div className="relative overflow-hidden rounded-xl">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/60 to-transparent z-10 pointer-events-none" />

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
                    className="flex flex-col items-center gap-3 shrink-0 transition-all duration-300 opacity-70 hover:opacity-100 w-28"
                  >
                    <div
                      className="w-20 h-20 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
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
                    <span className="text-xs text-muted-foreground font-medium text-center leading-tight w-full h-8 flex items-start justify-center">
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
