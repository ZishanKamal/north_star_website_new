"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Eye,
  Compass,
  Users,
  Lightbulb,
  Rocket,
  Building2,
  Award,
  Quote,
} from "lucide-react";
import { siteConfig, founder, teamMembers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Compass,
    title: "Guidance",
    description:
      "Providing clear direction to help institutions and students navigate their path toward success.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Embracing new methods and technologies to deliver cutting-edge training programs.",
  },
  {
    icon: Users,
    title: "Partnership",
    description:
      "Building lasting relationships with institutions to create sustained impact.",
  },
  {
    icon: Rocket,
    title: "Impact",
    description:
      "Fostering measurable transformation in every student we work with.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/3" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              <Building2 className="w-4 h-4" />
              About North Star
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Your Guiding{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                North Star
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
              In a metaphorical sense, the &ldquo;North Star&rdquo; describes a guiding
              principle that provides direction and guidance. We are that steady,
              reliable partner — helping institutions and students navigate their
              paths toward excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Description */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about.png"
                    alt="North Star"
                    width={600}
                    height={450}
                    className="object-contain w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                {siteConfig.tagline}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {siteConfig.description}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Through multi-level intervention — from emotional intelligence and
                cognitive readiness to technical skills and career preparation — we
                ensure holistic development that prepares students for real-world
                challenges and opportunities.
              </p>
              <Link href="/approach">
                <Button variant="outline">
                  Our Approach <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower institutions with transformative training programs
                    that develop leaders, build career-ready graduates, and create
                    measurable impact. We partner with schools and colleges to
                    illuminate the path to personal and professional fulfillment.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
                    <Eye className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the leading institutional training partner — where every
                    school and college has access to world-class development
                    programs that build emotionally intelligent, technically
                    proficient, and career-ready graduates.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
              <Award className="w-4 h-4" />
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Message from the Chief Coach
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-muted/30 rounded-3xl p-8 md:p-12 border"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 flex flex-col items-center w-32">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-primary/10">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="font-bold text-sm">{founder.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {founder.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-primary/20" />
                  {founder.message.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Credentials */}
              <div className="mt-8 pt-8 border-t">
                <ul className="space-y-2">
                  {founder.credentials.map((cred) => (
                    <li
                      key={cred}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team & Mentors */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
              <Users className="w-4 h-4" />
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Team & Mentors
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              A team of experienced educators, industry professionals, and certified trainers dedicated to transforming institutional learning.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => {
              const colors = [
                "from-blue-500 to-cyan-500",
                "from-purple-500 to-pink-500",
                "from-orange-500 to-amber-500",
                "from-emerald-500 to-teal-500",
              ];
              const initials = member.name
                .split(" ")
                .slice(0, 2)
                .map((p) => p.charAt(0))
                .join("");

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow overflow-hidden">
                    <div className={cn("h-1.5 bg-gradient-to-r", colors[index % colors.length])} />
                    <CardContent className="p-6">
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-primary/10 flex items-center justify-center mb-4">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-primary">
                            {initials}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                      <p className="text-sm text-primary font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Drives Us
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Our core values guide everything we do at North Star.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Partner With Us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how North Star can help your institution deliver
              transformative training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="gradient">
                  Start a Partnership
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/institutional-programs">
                <Button size="lg" variant="outline">
                  View Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
