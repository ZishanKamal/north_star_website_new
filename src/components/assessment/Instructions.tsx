"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, FileText, BarChart3, ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/assessment/store";

export default function Instructions() {
  const startTest = useAppStore((state) => state.startTest);
  const isQuickAssessment = useAppStore((state) => state.isQuickAssessment);

  const steps = [
    { icon: FileText, title: isQuickAssessment ? "10 Questions" : "50 Questions", description: "Answer questions about your emotional responses and behaviors" },
    { icon: Clock, title: isQuickAssessment ? "5 Minutes" : "20 Minutes", description: "Complete the assessment within the time limit" },
    { icon: CheckCircle2, title: "Be Honest", description: "There are no right or wrong answers - just be yourself" },
    { icon: BarChart3, title: "Get Results", description: "Receive detailed insights and personalized recommendations" },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 text-center">
            Before You Begin
          </h1>
          <p className="text-lg text-slate-600 text-center mb-12">
            Please read these instructions carefully
          </p>

          <div className="space-y-6 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl"
              >
                <div className="flex-shrink-0">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">Important Notes:</h3>
            <ul className="space-y-2 text-blue-800">
              <li>&bull; Your progress will be auto-saved</li>
              <li>&bull; Answer based on how you typically behave</li>
              <li>&bull; The timer will start when you click &quot;Begin Test&quot;</li>
              <li>&bull; All data stays private on your device</li>
            </ul>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => startTest(isQuickAssessment)}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-blue-700 rounded-lg shadow-xl hover:bg-blue-800 transition-all"
          >
            Begin Test
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
