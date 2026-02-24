/**
 * Central Configuration for Emotional Intelligence Assessment
 * All configurable parameters should be defined here for easy maintenance
 */

// ============================================================================
// QUESTIONS & ANSWERS
// ============================================================================

export interface Question {
  id: number;
  category: "selfAwareness" | "managingEmotions" | "empathy" | "socialSkill" | "motivatingOneself";
  question: string;
  options: {
    text: string;
    value: number;
  }[];
}

const commonOptions = [
  { text: "1 - Does not apply", value: 1 },
  { text: "2 - Applies very few times", value: 2 },
  { text: "3 - Applies half of the time", value: 3 },
  { text: "4 - Applies majority of the time", value: 4 },
  { text: "5 - Applies always", value: 5 },
];

export const questions: Question[] = [
  { id: 1, category: "selfAwareness", question: "I realize immediately when I lose my temper", options: commonOptions },
  { id: 2, category: "managingEmotions", question: "I can 'reframe' bad situations quickly", options: commonOptions },
  { id: 3, category: "motivatingOneself", question: "I am able to always motive myself to do difficult tasks", options: commonOptions },
  { id: 4, category: "empathy", question: "I am always able to see things from the other person's viewpoint", options: commonOptions },
  { id: 5, category: "socialSkill", question: "I am an excellent listener", options: commonOptions },
  { id: 6, category: "selfAwareness", question: "I know when I am happy", options: commonOptions },
  { id: 7, category: "managingEmotions", question: "I do not wear my 'heart on my sleeve'", options: commonOptions },
  { id: 8, category: "motivatingOneself", question: "I am usually able to prioritize important activities at my school/college and get on with them", options: commonOptions },
  { id: 9, category: "empathy", question: "I am excellent at empathizing with someone else's problem", options: commonOptions },
  { id: 10, category: "socialSkill", question: "I never interrupt other people's conversations", options: commonOptions },
  { id: 11, category: "selfAwareness", question: "I usually recognize when I am stressed", options: commonOptions },
  { id: 12, category: "managingEmotions", question: "Others can rarely tell what kind of mood I am in", options: commonOptions },
  { id: 13, category: "motivatingOneself", question: "I always meet deadlines", options: commonOptions },
  { id: 14, category: "empathy", question: "I can tell if someone is not happy with me", options: commonOptions },
  { id: 15, category: "socialSkill", question: "I am good at adapting and mixing with a variety of people", options: commonOptions },
  { id: 16, category: "selfAwareness", question: "When I am being 'emotional' I am aware of this", options: commonOptions },
  { id: 17, category: "managingEmotions", question: "I rarely get very angry at other people", options: commonOptions },
  { id: 18, category: "motivatingOneself", question: "I never waste time", options: commonOptions },
  { id: 19, category: "empathy", question: "I can tell if a group of people are not getting along with each other", options: commonOptions },
  { id: 20, category: "socialSkill", question: "People are the most interesting thing in life for me", options: commonOptions },
  { id: 21, category: "selfAwareness", question: "When I feel anxious, I usually can account for the reason(s)", options: commonOptions },
  { id: 22, category: "managingEmotions", question: "Difficult people do not annoy me", options: commonOptions },
  { id: 23, category: "motivatingOneself", question: "I do not avoid answering a question directly in order to hide truth", options: commonOptions },
  { id: 24, category: "empathy", question: "I can usually understand why people are being difficult towards me", options: commonOptions },
  { id: 25, category: "socialSkill", question: "I love to meet new people and get to know what makes them 'tick'", options: commonOptions },
  { id: 26, category: "selfAwareness", question: "I always know when I'm being unreasonable", options: commonOptions },
  { id: 27, category: "managingEmotions", question: "I can consciously alter my frame of mind or mood", options: commonOptions },
  { id: 28, category: "motivatingOneself", question: "I believe you should do the difficult things first", options: commonOptions },
  { id: 29, category: "empathy", question: "Other individuals are not 'difficult' just 'different'", options: commonOptions },
  { id: 30, category: "socialSkill", question: "I need a variety of school/college colleagues to make my tasks interesting", options: commonOptions },
  { id: 31, category: "selfAwareness", question: "Awareness of my own emotions is very important to me at all times", options: commonOptions },
  { id: 32, category: "managingEmotions", question: "I do not let stressful situations or people affect me once I have left work", options: commonOptions },
  { id: 33, category: "motivatingOneself", question: "Delayed gratification is a virtue that I hold to", options: commonOptions },
  { id: 34, category: "empathy", question: "I can understand if I am being unreasonable", options: commonOptions },
  { id: 35, category: "socialSkill", question: "I like to ask questions to find out what it is important to people", options: commonOptions },
  { id: 36, category: "selfAwareness", question: "I can tell if someone has upset or annoyed me", options: commonOptions },
  { id: 37, category: "managingEmotions", question: "I rarely worry about work or life in general", options: commonOptions },
  { id: 38, category: "motivatingOneself", question: "I believe in 'Action this Day'", options: commonOptions },
  { id: 39, category: "empathy", question: "I can understand why my actions sometimes offend others", options: commonOptions },
  { id: 40, category: "socialSkill", question: "I see working with difficult people as simply a challenge to win them over", options: commonOptions },
  { id: 41, category: "selfAwareness", question: "I can let anger 'go' quickly so that it no longer affects me", options: commonOptions },
  { id: 42, category: "managingEmotions", question: "I can suppress my emotions when I need to", options: commonOptions },
  { id: 43, category: "motivatingOneself", question: "I can always motivate myself even when I feel low", options: commonOptions },
  { id: 44, category: "empathy", question: "I can sometimes see things from others' point of view", options: commonOptions },
  { id: 45, category: "socialSkill", question: "I am good at reconciling differences with other people", options: commonOptions },
  { id: 46, category: "selfAwareness", question: "I know what makes me happy", options: commonOptions },
  { id: 47, category: "managingEmotions", question: "Others often do not know how I am feeling about things", options: commonOptions },
  { id: 48, category: "motivatingOneself", question: "Motivations has been the key to my success", options: commonOptions },
  { id: 49, category: "empathy", question: "Reasons for disagreements are always clear to me", options: commonOptions },
  { id: 50, category: "socialSkill", question: "I generally build solid relationships with those I work with", options: commonOptions },
];

export const quickQuestions: Question[] = [
  questions[0], questions[5],
  questions[1], questions[6],
  questions[2], questions[7],
  questions[3], questions[8],
  questions[4], questions[9],
];

export function getQuestions(isQuick: boolean): Question[] {
  return isQuick ? quickQuestions : questions;
}

// ============================================================================
// CATEGORY DEFINITIONS
// ============================================================================

export interface CategoryDefinition {
  id: string;
  name: string;
  group: "Understanding Yourself" | "Understanding Others";
  description: string;
  icon: string;
}

export const categoryIntroText = "This assessment evaluates 5 different areas. The first 3 are related to intrapersonal intelligence (understanding yourself) and the last 2 are related to interpersonal intelligence (understanding others).";

export const categoryDefinitions: CategoryDefinition[] = [
  {
    id: "selfAwareness",
    name: "Self-Awareness",
    group: "Understanding Yourself",
    description: "The ability to recognize what you are feeling, to understand your habitual emotional responses to events and to recognize how your emotions affect your behavior and performance. When you are self-aware, you see yourself as others see you, and have a good sense of your own abilities and current limitations.",
    icon: "Brain",
  },
  {
    id: "managingEmotions",
    name: "Managing Emotions",
    group: "Understanding Yourself",
    description: "The ability to stay focused and think clearly even when experiencing powerful emotions. Being able to manage your own emotional state is essential for taking responsibility for your actions, and can save you from hasty decisions that you later regret.",
    icon: "Heart",
  },
  {
    id: "motivatingOneself",
    name: "Motivating Oneself",
    group: "Understanding Yourself",
    description: "The ability to use your deepest emotions to move and guide you towards your goals. This ability enables you to take the initiative and to persevere in the face of obstacles and setbacks.",
    icon: "Target",
  },
  {
    id: "empathy",
    name: "Empathy",
    group: "Understanding Others",
    description: "The ability to sense, understand and respond to what other people are feeling. Self-awareness is essential to having empathy with others. If you are not aware of your own emotions, you will not be able to read the emotions of others.",
    icon: "Users",
  },
  {
    id: "socialSkill",
    name: "Social Skill",
    group: "Understanding Others",
    description: "The ability to manage, influence and inspire emotions in others. Being able to handle emotions in relationships and being able to influence and inspire others are essential foundation skills for success.",
    icon: "MessageCircle",
  },
];

export const categoryGroups = {
  "Understanding Yourself": categoryDefinitions.filter((cat) => cat.group === "Understanding Yourself"),
  "Understanding Others": categoryDefinitions.filter((cat) => cat.group === "Understanding Others"),
};

// ============================================================================
// SCORE CONFIGURATION
// ============================================================================

export const MAX_TOTAL_SCORE = 250;
export const MAX_CATEGORY_SCORE = 50;

export const LEVEL_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  MODERATE: 40,
  DEVELOPING: 20,
} as const;

export const PERFORMANCE_LEVELS = {
  EXCELLENT: "Excellent",
  GOOD: "Good",
  MODERATE: "Moderate",
  DEVELOPING: "Developing",
  NEEDS_IMPROVEMENT: "Needs Improvement",
} as const;

// ============================================================================
// SCORE FEEDBACK
// ============================================================================

export interface ScoreFeedback {
  excellent: string;
  good: string;
  moderate: string;
  needsImprovement: string;
}

export const scoreFeedback: Record<string, ScoreFeedback> = {
  selfAwareness: {
    excellent: "The student has an excellent ability to recognize their own emotions and understand how they affect their behavior. They demonstrate strong self-perception and awareness of how others see them, which enables effective self-management and personal growth.",
    good: "The student has a good ability to recognize their own emotions and how they affect their behavior. With continued practice, they can further enhance their self-perception and deepen their understanding of how others perceive them.",
    moderate: "The student has a moderate ability to recognize their own emotions and how they affect their behavior. They can benefit from further developing this skill to enhance self-perception and understand how others may see them.",
    needsImprovement: "The student shows limited awareness of their own emotions and their behavioral impact. Developing this foundational skill will significantly improve their ability to manage emotions and understand how they are perceived by others.",
  },
  managingEmotions: {
    excellent: "The student demonstrates exceptional ability to stay focused and think clearly even under stress. They consistently manage strong emotions effectively and make thoughtful decisions, showing remarkable emotional resilience in challenging situations.",
    good: "The student shows good ability to manage their emotions and maintain focus under pressure. With practice, they can further strengthen their emotional resilience and decision-making skills when facing stressful situations.",
    moderate: "The student shows some ability to stay focused under stress, but there is room for improvement in managing strong emotions and avoiding hasty decisions. Developing this skill further can lead to greater emotional resilience and better decision-making in challenging situations.",
    needsImprovement: "The student struggles to manage emotions effectively under stress, which can lead to impulsive decisions. Building this skill will help them maintain composure and think clearly during difficult situations.",
  },
  motivatingOneself: {
    excellent: "The student demonstrates outstanding drive and perseverance towards achieving their goals. They show strong intrinsic motivation and resilience, consistently pushing forward even when facing significant obstacles or setbacks.",
    good: "The student shows good drive and perseverance in pursuing their goals. They generally maintain motivation through challenges and can benefit from strategies to further strengthen their resilience during difficult times.",
    moderate: "The student shows a moderate level of drive and perseverance towards achieving goals. They may benefit from strategies to strengthen their intrinsic motivation, especially when facing conflicts, obstacles, or setbacks.",
    needsImprovement: "The student shows limited drive and perseverance when working towards goals. Developing stronger intrinsic motivation will help them persist through challenges and maintain focus on their objectives.",
  },
  empathy: {
    excellent: "The student demonstrates exceptional ability to sense, understand, and respond to the emotions of others. This strong empathic skill enables them to build deep, meaningful connections and provide valuable support to those around them.",
    good: "The student shows good ability to understand and respond to others' emotions. With continued development, they can further enhance their capacity to build meaningful connections and provide empathetic support.",
    moderate: "The student demonstrates a moderate ability to sense, understand, and respond to the emotions of others. Developing this skill further will enhance their ability to build meaningful connections and provide support to those around them.",
    needsImprovement: "The student shows limited ability to sense and respond to others' emotions. Strengthening this skill will significantly improve their capacity to build meaningful relationships and provide emotional support.",
  },
  socialSkill: {
    excellent: "The student demonstrates outstanding effectiveness in managing relationships and influencing others positively. They excel in group settings and consistently inspire peers while creating positive emotional environments.",
    good: "The student shows good effectiveness in managing relationships and working with others. They are generally comfortable in group settings and can further develop their ability to inspire and influence peers positively.",
    moderate: "The student has moderate effectiveness in managing relationships and influencing others. They may feel comfortable in group settings depending on familiarity and context. Developing this skill can help them inspire peers and create positive emotional environments.",
    needsImprovement: "The student shows limited effectiveness in managing relationships and may struggle in group settings. Building stronger social skills will help them collaborate better and feel more confident in diverse social situations.",
  },
};

export function getScoreFeedback(categoryId: string, score: number): string {
  const feedback = scoreFeedback[categoryId];
  if (!feedback) return "";
  if (score >= 40) return feedback.excellent;
  if (score >= 30) return feedback.good;
  if (score >= 20) return feedback.moderate;
  return feedback.needsImprovement;
}

// ============================================================================
// QUESTION MAPPING
// ============================================================================

export const CATEGORY_QUESTION_MAPPING = {
  selfAwareness: [1, 6, 11, 16, 21, 26, 31, 36, 41, 46],
  managingEmotions: [2, 7, 12, 17, 22, 27, 32, 37, 42, 47],
  motivatingOneself: [3, 8, 13, 18, 23, 28, 33, 38, 43, 48],
  empathy: [4, 9, 14, 19, 24, 29, 34, 39, 44, 49],
  socialSkill: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
} as const;

export const QUICK_ASSESSMENT_MAPPING = {
  selfAwareness: [1, 6],
  managingEmotions: [2, 7],
  motivatingOneself: [3, 8],
  empathy: [4, 9],
  socialSkill: [5, 10],
} as const;

// ============================================================================
// TIME CONFIGURATION
// ============================================================================

export const TIME_LIMITS = {
  FULL_ASSESSMENT: 1200,
  QUICK_ASSESSMENT: 300,
} as const;

// ============================================================================
// STUDENT FORM CONFIGURATION
// ============================================================================

export const classOrDegreeOptions = [
  "Class 8th", "Class 9th", "Class 10th", "Class 11th", "Class 12th",
  "Diploma 1st Year", "Diploma 2nd Year", "Diploma 3rd Year",
  "B.Tech 1st Year", "B.Tech 2nd Year", "B.Tech 3rd Year", "B.Tech 4th Year",
  "B.A. 1st Year", "B.A. 2nd Year", "B.A. 3rd Year",
  "B.Sc. 1st Year", "B.Sc. 2nd Year", "B.Sc. 3rd Year",
  "B.Com. 1st Year", "B.Com. 2nd Year", "B.Com. 3rd Year",
  "BBA 1st Year", "BBA 2nd Year", "BBA 3rd Year",
  "M.Tech 1st Year", "M.Tech 2nd Year",
  "M.A. 1st Year", "M.A. 2nd Year",
  "M.Sc. 1st Year", "M.Sc. 2nd Year",
  "M.Com. 1st Year", "M.Com. 2nd Year",
  "MBA 1st Year", "MBA 2nd Year",
  "Ph.D. Scholar", "Other",
];

export const ageGroupOptions = [
  "Below 10", "10-12", "13-15", "16-18", "19-22", "23-25",
  "26-30", "31-35", "36-40", "41-45", "46-50", "Above 50",
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function getLevel(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  if (percentage >= LEVEL_THRESHOLDS.EXCELLENT) return PERFORMANCE_LEVELS.EXCELLENT;
  if (percentage >= LEVEL_THRESHOLDS.GOOD) return PERFORMANCE_LEVELS.GOOD;
  if (percentage >= LEVEL_THRESHOLDS.MODERATE) return PERFORMANCE_LEVELS.MODERATE;
  if (percentage >= LEVEL_THRESHOLDS.DEVELOPING) return PERFORMANCE_LEVELS.DEVELOPING;
  return PERFORMANCE_LEVELS.NEEDS_IMPROVEMENT;
}

export function getLevelColor(level: string): string {
  switch (level) {
    case PERFORMANCE_LEVELS.EXCELLENT: return "text-green-600";
    case PERFORMANCE_LEVELS.GOOD: return "text-blue-600";
    case PERFORMANCE_LEVELS.MODERATE: return "text-yellow-600";
    case PERFORMANCE_LEVELS.DEVELOPING: return "text-orange-600";
    default: return "text-red-600";
  }
}

export function getCategoryLevel(score: number): string {
  return getLevel(score, MAX_CATEGORY_SCORE);
}

export function getOverallLevel(totalScore: number): string {
  return getLevel(totalScore, MAX_TOTAL_SCORE);
}

export type CategoryKey = keyof typeof CATEGORY_QUESTION_MAPPING;
export type PerformanceLevel = typeof PERFORMANCE_LEVELS[keyof typeof PERFORMANCE_LEVELS];
