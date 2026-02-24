"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, Timer, BarChart3, ArrowRight, Key, X, AlertCircle } from "lucide-react";
import { useAppStore } from "@/lib/assessment/store";
import { validateToken, incrementTokenUsage } from "@/lib/assessment/supabase";

export default function LandingPage() {
  const setScreen = useAppStore((state) => state.setScreen);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [tokenError, setTokenError] = useState("");
  const [validating, setValidating] = useState(false);

  const handleFullAssessment = () => {
    setShowTokenModal(true);
    setTokenError("");
    setTokenInput("");
  };

  const handleTokenValidation = async () => {
    if (!tokenInput.trim()) {
      setTokenError("Please enter a token code");
      return;
    }

    setValidating(true);
    setTokenError("");

    const result = await validateToken(tokenInput.trim());
    
    if (result.valid && result.token) {
      useAppStore.setState({ 
        assessmentToken: result.token,
        isQuickAssessment: false 
      });
      if (result.token.id) {
        await incrementTokenUsage(result.token.id);
      }
      setShowTokenModal(false);
      setScreen("studentInfo");
    } else {
      setTokenError(result.error || "Invalid token");
    }
    
    setValidating(false);
  };

  const features = [
    { icon: Brain, title: "Scientifically Validated", description: "Based on Goleman's proven EI model" },
    { icon: Timer, title: "Flexible Assessment", description: "Choose between full (20 min) or quick (5 min) evaluation" },
    { icon: BarChart3, title: "Detailed Insights", description: "Visual reports with actionable recommendations" },
    { icon: Sparkles, title: "Personal Growth", description: "Identify strengths and areas for development" },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full text-center"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-700 mb-6">
          Emotional State Assessment
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
          Discover your emotional strengths and areas for growth with our
          comprehensive assessment.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 justify-center items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFullAssessment}
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-blue-700 rounded-lg shadow-xl hover:bg-blue-800 transition-all duration-300"
          >
            Start Full Assessment (50 Questions)
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              useAppStore.setState({ isQuickAssessment: true });
              setScreen("studentInfo");
            }}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-300"
          >
            <Timer className="w-4 h-4" />
            Quick Assessment (10 Questions)
          </motion.button>
        </div>

        <p className="text-sm text-slate-500 mb-12">
          Full assessment: 20 minutes &bull; Quick assessment: 5 minutes
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100"
            >
              <feature.icon className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* What is EI Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-8 bg-blue-50 rounded-3xl"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What is Emotional Intelligence?
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Emotional Intelligence (EI) is the ability to understand, use, and
            manage your own emotions in positive ways to relieve stress,
            communicate effectively, empathize with others, and overcome
            challenges.
          </p>
        </motion.div>
      </motion.div>

      {/* Token Validation Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-700 rounded-xl">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Access Token Required
                </h2>
              </div>
              <button
                onClick={() => setShowTokenModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <p className="text-slate-600 mb-6">
              The full assessment requires a valid access token. Please enter your token code below:
            </p>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={tokenInput}
                  onChange={(e) => {
                    setTokenInput(e.target.value.toUpperCase());
                    setTokenError("");
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleTokenValidation()}
                  placeholder="XXXX-XXXX-XXXX"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:outline-none transition-colors font-mono text-center text-lg"
                  maxLength={14}
                />
              </div>

              {tokenError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-600">{tokenError}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowTokenModal(false)}
                  className="flex-1 px-6 py-3 rounded-lg bg-slate-200 text-slate-900 font-semibold hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTokenValidation}
                  disabled={validating}
                  className="flex-1 px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50"
                >
                  {validating ? "Validating..." : "Continue"}
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">
                  Don&apos;t have a token? Contact your administrator or try our{" "}
                  <button
                    onClick={() => {
                      setShowTokenModal(false);
                      useAppStore.setState({ isQuickAssessment: true });
                      setScreen("studentInfo");
                    }}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Quick Assessment
                  </button>
                  {" "}instead (no token required)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
