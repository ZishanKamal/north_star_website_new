import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TokenData } from "./supabase";
import { TIME_LIMITS } from "./config";

export type AppScreen = "landing" | "studentInfo" | "instructions" | "test" | "results";

export interface StudentInfo {
  name: string;
  email: string;
  whatsapp: string;
  school?: string;
  classOrDegree?: string;
  ageGroup?: string;
  city?: string;
  state?: string;
  howHeard?: string;
  interestedInCounseling?: boolean;
}

interface AppState {
  currentScreen: AppScreen;
  currentQuestion: number;
  answers: Record<number, number>;
  timeRemaining: number;
  testStartTime: number | null;
  testCompleted: boolean;
  studentInfo: StudentInfo;
  isQuickAssessment: boolean;
  assessmentToken?: TokenData;

  setScreen: (screen: AppScreen) => void;
  setCurrentQuestion: (question: number) => void;
  setAnswer: (questionId: number, value: number) => void;
  setTimeRemaining: (time: number) => void;
  setStudentInfo: (info: StudentInfo) => void;
  startTest: (isQuick?: boolean) => void;
  completeTest: () => void;
  resetTest: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentScreen: "landing",
      currentQuestion: 1,
      answers: {},
      timeRemaining: TIME_LIMITS.FULL_ASSESSMENT,
      testStartTime: null,
      testCompleted: false,
      isQuickAssessment: false,
      studentInfo: {
        name: "",
        email: "",
        whatsapp: "",
      },

      setScreen: (screen) => {
        set({ currentScreen: screen });
        if (typeof window !== 'undefined') window.scrollTo(0, 0);
      },
      setCurrentQuestion: (question) => set({ currentQuestion: question }),
      setAnswer: (questionId, value) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: value },
        })),
      setTimeRemaining: (time) => set({ timeRemaining: time }),
      setStudentInfo: (info) => set({ studentInfo: info }),

      startTest: (isQuick = false) => {
        set({
          currentScreen: "test",
          testStartTime: Date.now(),
          currentQuestion: 1,
          timeRemaining: isQuick ? TIME_LIMITS.QUICK_ASSESSMENT : TIME_LIMITS.FULL_ASSESSMENT,
          isQuickAssessment: isQuick,
        });
        if (typeof window !== 'undefined') window.scrollTo(0, 0);
      },

      completeTest: () => {
        set({
          testCompleted: true,
          currentScreen: "results",
        });
        if (typeof window !== 'undefined') window.scrollTo(0, 0);
      },

      resetTest: () => {
        set({
          currentScreen: "landing",
          currentQuestion: 1,
          answers: {},
          timeRemaining: TIME_LIMITS.FULL_ASSESSMENT,
          testStartTime: null,
          testCompleted: false,
          isQuickAssessment: false,
          studentInfo: {
            name: "",
            email: "",
            whatsapp: "",
          },
        });
        if (typeof window !== 'undefined') window.scrollTo(0, 0);
      },

      nextQuestion: () => {
        const current = get().currentQuestion;
        const isQuick = get().isQuickAssessment;
        const maxQuestions = isQuick ? 10 : 50;
        if (current < maxQuestions) {
          set({ currentQuestion: current + 1 });
          if (typeof window !== 'undefined') window.scrollTo(0, 0);
        } else {
          get().completeTest();
        }
      },

      previousQuestion: () => {
        const current = get().currentQuestion;
        if (current > 1) {
          set({ currentQuestion: current - 1 });
          if (typeof window !== 'undefined') window.scrollTo(0, 0);
        }
      },
    }),
    {
      name: "ei-test-storage",
    }
  )
);
