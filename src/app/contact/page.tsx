"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Building2,
  Users,
  Send,
  Check,
  ChevronDown,
} from "lucide-react";
import { siteConfig, faqs } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CertificateValidator from "@/components/contact/certificate-validator";
import FreeDemoForm from "@/components/contact/free-demo-form";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: "tel:" + siteConfig.phone,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: "mailto:" + siteConfig.email,
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/" + siteConfig.phone.replace(/[^0-9]/g, ""),
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.address.full,
    href: "#",
  },
];

type FormTab = "institutional" | "individual";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<FormTab>("institutional");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    role: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Route "Free Demo" requests to the dedicated demo-request API
      const isDemoRequest = activeTab === "individual" && formState.subject === "demo";
      const endpoint = isDemoRequest ? "/api/demo-request" : "/api/contact";
      const payload = isDemoRequest
        ? { name: formState.name, email: formState.email, phone: formState.phone, programInterest: "General (from contact form)" }
        : { ...formState, type: activeTab };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormState({
          name: "",
          email: "",
          phone: "",
          institution: "",
          role: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-6">
              <Mail className="w-4 h-4" />
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Let&apos;s Start a{" "}
              <span className="text-blue-700">
                Conversation
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-500">
              Whether you&apos;re an institution looking to partner or an individual
              exploring our programs — we&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    info.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block"
                >
                  <Card className="h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{info.label}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {info.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dual-Track Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Tab Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex rounded-lg bg-slate-100 p-1 mb-8"
            >
              <button
                onClick={() => setActiveTab("institutional")}
                className={
                  "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all " +
                  (activeTab === "institutional"
                    ? "bg-white shadow-sm text-slate-900"
                    : "text-slate-500 hover:text-slate-700")
                }
              >
                <Building2 className="w-4 h-4" />
                Institutional Partnership
              </button>
              <button
                onClick={() => setActiveTab("individual")}
                className={
                  "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all " +
                  (activeTab === "individual"
                    ? "bg-white shadow-sm text-slate-900"
                    : "text-slate-500 hover:text-slate-700")
                }
              >
                <Users className="w-4 h-4" />
                Individual Inquiry
              </button>
            </motion.div>

            {/* Form */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-8">
                  {submitStatus === "success" ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-slate-500">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                        {activeTab === "institutional" ? (
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Institution Name *
                            </label>
                            <input
                              type="text"
                              name="institution"
                              value={formState.institution}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                              placeholder="Your school or college name"
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Subject
                            </label>
                            <select
                              name="subject"
                              value={formState.subject}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                            >
                              <option value="">Select a topic</option>
                              <option value="enrollment">Program Enrollment</option>
                              <option value="counselling">Career Counselling</option>
                              <option value="demo">Free Demo</option>
                              <option value="certificate">Certificate Validation</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        )}
                      </div>

                      {activeTab === "institutional" && (
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Your Role
                          </label>
                          <select
                            name="role"
                            value={formState.role}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                          >
                            <option value="">Select your role</option>
                            <option value="principal">Principal</option>
                            <option value="dean">Dean / HOD</option>
                            <option value="faculty">Faculty</option>
                            <option value="placement">Placement Officer</option>
                            <option value="management">Management</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none"
                          placeholder={
                            activeTab === "institutional"
                              ? "Tell us about your institution's training needs..."
                              : "Tell us how we can help you..."
                          }
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Demo Request */}
      <FreeDemoForm />

      {/* FAQs */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Find answers to common questions about our programs and partnerships.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full text-left bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-sm">{faq.question}</h3>
                    <ChevronDown
                      className={
                        "w-5 h-5 text-slate-400 flex-shrink-0 transition-transform " +
                        (expandedFaq === index ? "rotate-180" : "")
                      }
                    />
                  </div>
                  {expandedFaq === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-slate-500 mt-3 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Validation */}
      <CertificateValidator />

      {/* Map */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border shadow-sm"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.748!2d85.3096!3d23.3441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRali+Grand+Mall%2C+Main+Road%2C+Ranchi+834001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="North Star Academy Office Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            {siteConfig.hours.weekdays} | {siteConfig.hours.saturday}
          </p>
        </div>
      </section>
    </>
  );
}
