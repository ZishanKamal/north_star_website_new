import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { 
  CATEGORY_QUESTION_MAPPING, 
  QUICK_ASSESSMENT_MAPPING,
  MAX_CATEGORY_SCORE,
  MAX_TOTAL_SCORE,
  getLevel 
} from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ScoreResult {
  category: string;
  score: number;
  percentage: number;
  level: string;
  description: string;
}

export interface CategoryScore {
  selfAwareness: number;
  managingEmotions: number;
  empathy: number;
  socialSkill: number;
  motivatingOneself: number;
}

export function calculateScores(
  answers: Record<number, number>,
  isQuickAssessment: boolean = false
): {
  totalScore: number;
  categoryScores: CategoryScore;
  results: ScoreResult[];
  overallLevel: string;
} {
  const categories = isQuickAssessment ? QUICK_ASSESSMENT_MAPPING : CATEGORY_QUESTION_MAPPING;
  const maxCategoryScore = MAX_CATEGORY_SCORE;
  const maxScore = MAX_TOTAL_SCORE;
  const scoreMultiplier = isQuickAssessment ? 5 : 1;

  const categoryScores: CategoryScore = {
    selfAwareness: 0,
    managingEmotions: 0,
    empathy: 0,
    socialSkill: 0,
    motivatingOneself: 0,
  };

  Object.entries(categories).forEach(([category, questionIds]) => {
    const categoryScore = questionIds.reduce((sum: number, qId: number) => {
      return sum + (answers[qId] || 0);
    }, 0);
    categoryScores[category as keyof CategoryScore] = categoryScore * scoreMultiplier;
  });

  const totalScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);

  const results: ScoreResult[] = [
    {
      category: "Self-Awareness",
      score: categoryScores.selfAwareness,
      percentage: (categoryScores.selfAwareness / maxCategoryScore) * 100,
      level: getLevel(categoryScores.selfAwareness, maxCategoryScore),
      description: "Understanding your own emotions and their impact",
    },
    {
      category: "Managing Emotions",
      score: categoryScores.managingEmotions,
      percentage: (categoryScores.managingEmotions / maxCategoryScore) * 100,
      level: getLevel(categoryScores.managingEmotions, maxCategoryScore),
      description: "Managing your emotions in healthy ways",
    },
    {
      category: "Empathy",
      score: categoryScores.empathy,
      percentage: (categoryScores.empathy / maxCategoryScore) * 100,
      level: getLevel(categoryScores.empathy, maxCategoryScore),
      description: "Understanding others' emotions and needs",
    },
    {
      category: "Social Skill",
      score: categoryScores.socialSkill,
      percentage: (categoryScores.socialSkill / maxCategoryScore) * 100,
      level: getLevel(categoryScores.socialSkill, maxCategoryScore),
      description: "Building and maintaining healthy relationships",
    },
    {
      category: "Motivating Oneself",
      score: categoryScores.motivatingOneself,
      percentage: (categoryScores.motivatingOneself / maxCategoryScore) * 100,
      level: getLevel(categoryScores.motivatingOneself, maxCategoryScore),
      description: "Drive to achieve and persist through challenges",
    },
  ];

  const overallLevel = getLevel(totalScore, maxScore);

  return {
    totalScore,
    categoryScores,
    results,
    overallLevel,
  };
}

export function getRecommendations(results: ScoreResult[]): Record<string, string[]> {
  const recommendations: Record<string, string[]> = {};

  results.forEach((result) => {
    const level = result.level;
    const category = result.category;

    switch (category) {
      case "Self-Awareness":
        if (level === "Excellent") {
          recommendations[category] = [
            "Continue practicing mindfulness and self-reflection",
            "Share your insights to help others develop self-awareness",
            "Maintain a journal to track your emotional patterns",
          ];
        } else if (level === "Good") {
          recommendations[category] = [
            "Deepen your practice of mindfulness meditation",
            "Keep a daily emotion diary",
            "Seek feedback from trusted friends or mentors",
          ];
        } else {
          recommendations[category] = [
            "Start a daily mindfulness practice (even 5 minutes helps)",
            "Name your emotions throughout the day",
            "Reflect on what triggers different emotions",
            "Consider working with a therapist or coach",
          ];
        }
        break;

      case "Managing Emotions":
        if (level === "Excellent") {
          recommendations[category] = [
            "Model emotional regulation for others",
            "Share your coping strategies with your team",
            "Continue practicing stress management techniques",
          ];
        } else if (level === "Good") {
          recommendations[category] = [
            "Develop more coping strategies for stress",
            "Practice the pause-breathe-respond technique",
            "Build a toolkit of calming activities",
          ];
        } else {
          recommendations[category] = [
            "Learn and practice deep breathing exercises",
            "Take regular breaks during stressful situations",
            "Identify and avoid emotional triggers when possible",
            "Consider cognitive-behavioral therapy (CBT)",
          ];
        }
        break;

      case "Empathy":
        if (level === "Excellent") {
          recommendations[category] = [
            "Use your empathy to build stronger team connections",
            "Mentor others in developing social awareness",
            "Continue reading diverse perspectives",
          ];
        } else if (level === "Good") {
          recommendations[category] = [
            "Practice active listening in conversations",
            "Observe non-verbal cues more carefully",
            "Ask more open-ended questions",
          ];
        } else {
          recommendations[category] = [
            "Focus on truly listening without planning your response",
            "Watch for facial expressions and body language",
            "Put yourself in others' shoes regularly",
            "Read books on empathy and social dynamics",
          ];
        }
        break;

      case "Social Skill":
        if (level === "Excellent") {
          recommendations[category] = [
            "Continue nurturing your relationships",
            "Help others resolve conflicts constructively",
            "Lead by example in team collaboration",
          ];
        } else if (level === "Good") {
          recommendations[category] = [
            "Work on conflict resolution skills",
            "Practice giving constructive feedback",
            "Strengthen communication in key relationships",
          ];
        } else {
          recommendations[category] = [
            "Learn basic conflict resolution techniques",
            "Practice clear and honest communication",
            "Set healthy boundaries in relationships",
            "Seek support for relationship challenges",
          ];
        }
        break;

      case "Motivating Oneself":
        if (level === "Excellent") {
          recommendations[category] = [
            "Set even more ambitious goals",
            "Inspire and motivate others around you",
            "Share your goal-setting strategies",
          ];
        } else if (level === "Good") {
          recommendations[category] = [
            "Set clearer long-term goals",
            "Create accountability systems",
            "Celebrate small wins more often",
          ];
        } else {
          recommendations[category] = [
            "Start with small, achievable goals",
            "Find your 'why' - your deeper purpose",
            "Build a support system for accountability",
            "Focus on progress, not perfection",
          ];
        }
        break;
    }
  });

  return recommendations;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
