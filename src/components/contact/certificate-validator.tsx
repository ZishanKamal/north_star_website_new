"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Mail, Send, Check, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CertificateValidator() {
  const [email, setEmail] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !certificateId) {
      setStatus("error");
      setMessage("Please fill in both fields.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/certificate-validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, certificateId }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Validation details have been sent to your email.");
        setEmail("");
        setCertificateId("");
      } else {
        setStatus("error");
        setMessage(data.message || "Validation failed. Please check your details.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4">
              <Award className="w-7 h-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Certificate Validation
            </h2>
            <p className="text-muted-foreground">
              Verify the authenticity of a North Star certificate. Enter the
              details below and we&apos;ll send the validation result to your email.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7" />
                  </div>
                  <p className="font-semibold text-lg mb-1">Verification Sent!</p>
                  <p className="text-sm text-muted-foreground">{message}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setStatus("idle")}
                  >
                    Validate Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleValidate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Certificate ID *
                    </label>
                    <input
                      type="text"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="e.g. NS-2025-00123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Mail className="w-3.5 h-3.5 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-sm text-red-500">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Validating...
                      </>
                    ) : (
                      <>
                        Validate Certificate
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
    </section>
  );
}
