"use client";

import { useAppStore } from "@/lib/assessment/store";
import LandingPage from "@/components/assessment/LandingPage";
import StudentInfoForm from "@/components/assessment/StudentInfoForm";
import Instructions from "@/components/assessment/Instructions";
import TestInterface from "@/components/assessment/TestInterface";
import Results from "@/components/assessment/Results";

export default function AssessmentPage() {
  const currentScreen = useAppStore((state) => state.currentScreen);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-24 md:pt-28">
      {currentScreen === "landing" && <LandingPage />}
      {currentScreen === "studentInfo" && <StudentInfoForm />}
      {currentScreen === "instructions" && <Instructions />}
      {currentScreen === "test" && <TestInterface />}
      {currentScreen === "results" && <Results />}
    </main>
  );
}
