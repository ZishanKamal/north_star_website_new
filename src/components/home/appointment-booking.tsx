"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, CheckCircle } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_USERNAME = process.env.NEXT_PUBLIC_CALCOM_USERNAME || "";

export default function AppointmentBooking() {
  const [isCalReady, setIsCalReady] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "booking" });
      cal("ui", {
        theme: "auto",
        styles: { branding: { brandColor: "#1d4ed8" } },
        hideEventTypeDetails: false,
      });
      setIsCalReady(true);
    })();
  }, []);

  if (!CAL_USERNAME) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/50 dark:from-slate-900 dark:to-slate-800/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-5">
            <CalendarDays className="w-7 h-7 text-blue-700 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Book a Free Consultation
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Schedule a one-on-one session with our team to discuss how we can
            help transform your career or institution&apos;s training outcomes.
          </p>
        </motion.div>

        {/* Benefits row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10"
        >
          {[
            { icon: Clock, text: "30-Minute Session" },
            { icon: CheckCircle, text: "No Commitment" },
            { icon: CalendarDays, text: "Pick Your Slot" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Cal.com Inline Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-4xl mx-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden"
        >
          {!isCalReady && (
            <div className="flex items-center justify-center py-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          )}
          <Cal
            namespace="booking"
            calLink={CAL_USERNAME}
            style={{ width: "100%", height: "100%", overflow: "auto" }}
            config={{ layout: "month_view" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
