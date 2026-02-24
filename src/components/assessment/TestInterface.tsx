"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useAppStore } from "@/lib/assessment/store";
import { getQuestions } from "@/lib/assessment/config";
import { formatTime } from "@/lib/assessment/utils";

export default function TestInterface() {
  const {
    currentQuestion,
    answers,
    timeRemaining,
    isQuickAssessment,
    setAnswer,
    nextQuestion,
    previousQuestion,
    setTimeRemaining,
    completeTest,
  } = useAppStore();

  const questions = getQuestions(isQuickAssessment);
  const currentQ = questions[currentQuestion - 1];
  const progress = (currentQuestion / questions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
      if (timeRemaining <= 0) {
        completeTest();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeRemaining, setTimeRemaining, completeTest]);

  const handleAnswer = (value: number) => {
    setAnswer(currentQuestion, value);
  };

  const canGoNext = answers[currentQuestion] !== undefined;

  // Scroll to top when question changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentQuestion]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full">
        {/* Header with Timer */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-slate-600">
            Question {currentQuestion} of {questions.length}
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-200 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-slate-100"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  answers[currentQuestion] === option.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion] === option.value
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-slate-300'
                  }`}>
                    {answers[currentQuestion] === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-slate-700 font-medium">{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-100 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={nextQuestion}
            disabled={!canGoNext}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors"
          >
            {currentQuestion === questions.length ? 'Finish' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
