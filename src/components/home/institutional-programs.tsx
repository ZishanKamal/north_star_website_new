"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  School,
  GraduationCap,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const programCards = [
  {
    title: "For Schools",
    description:
      "Emotional intelligence, cognitive readiness, and communication programs for K-12 students.",
    icon: School,
    href: "/for-schools",
    color: "from-rose-500/10 to-orange-500/10",
    iconColor: "text-rose-500",
    borderColor: "border-rose-500/20",
  },
  {
    title: "For Colleges",
    description:
      "Technical training, AI, programming, and industry-readiness programs for higher education.",
    icon: GraduationCap,
    href: "/for-colleges",
    color: "from-blue-500/10 to-violet-500/10",
    iconColor: "text-blue-500",
    borderColor: "border-blue-500/20",
  },
  {
    title: "Open Programs",
    description:
      "Individual enrollment available for all our signature workshops and training courses.",
    icon: Briefcase,
    href: "/open-programs",
    color: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-500/20",
  },
];

export default function InstitutionalPrograms() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Programs That Transform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tailored training solutions for every stage of the academic journey —
            from school foundations to career readiness.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {programCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link href={card.href} className="block group h-full">
                  <div
                    className={`h-full rounded-2xl border ${card.borderColor} bg-gradient-to-br ${card.color} p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl bg-background/80 flex items-center justify-center mb-6 ${card.iconColor}`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {card.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/institutional-programs">
            <Button variant="outline" size="lg">
              View All Institutional Programs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
