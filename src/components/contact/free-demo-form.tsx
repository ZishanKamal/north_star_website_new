"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Send, Check, AlertCircle, Loader2, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { openPrograms } from "@/lib/data";

export default function FreeDemoForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    programInterest: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name || !formState.email) {
      setStatus("error");
      setMessage("Please provide your name and email.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Demo request received! We'll contact you shortly.");
        setFormState({ name: "", email: "", phone: "", programInterest: "" });
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-4">
              <Play className="w-4 h-4" />
              Experience It First
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Book a Free Demo
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              See our programs in action. Request a free demo session and discover
              how North Star Academy can transform learning at your institution.
            </p>
          </div>

          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Demo Requested!</h3>
                  <p className="text-slate-500">{message}</p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setStatus("idle")}
                  >
                    Request Another Demo
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <User className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
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
                        <Mail className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
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

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Phone className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
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
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Program of Interest
                      </label>
                      <select
                        name="programInterest"
                        value={formState.programInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                      >
                        <option value="">Select a program (optional)</option>
                        <option value="institutional-general">Institutional Programs (General)</option>
                        <option value="school-programs">School Programs</option>
                        <option value="college-programs">College Programs</option>
                        {openPrograms.slice(0, 5).map((p) => (
                          <option key={p.slug} value={p.title}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-sm text-red-500 bg-red-50 px-4 py-3 rounded-lg"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {message}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Requesting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Request Free Demo
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-slate-500">
                    We&apos;ll contact you within 24 hours to schedule your demo session.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
