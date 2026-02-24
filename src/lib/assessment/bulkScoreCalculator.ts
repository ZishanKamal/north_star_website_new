import { CSVStudentData } from './csvParser';
import { CATEGORY_QUESTION_MAPPING, getLevel, MAX_TOTAL_SCORE } from './config';

export interface CategoryScores {
  selfAwareness: number;
  managingEmotions: number;
  motivatingOneself: number;
  empathy: number;
  socialSkill: number;
}

export interface StudentWithScores extends CSVStudentData {
  categoryScores: CategoryScores;
  totalScore: number;
  overallLevel: string;
}

/**
 * Calculate scores for a single student
 */
export function calculateStudentScores(student: CSVStudentData): StudentWithScores {
  const categoryScores: CategoryScores = {
    selfAwareness: 0,
    managingEmotions: 0,
    motivatingOneself: 0,
    empathy: 0,
    socialSkill: 0,
  };

  // Calculate each category score
  Object.entries(CATEGORY_QUESTION_MAPPING).forEach(([category, questionNumbers]) => {
    const score = questionNumbers.reduce((sum, qNum) => {
      // qNum is 1-indexed, array is 0-indexed
      return sum + (student.responses[qNum - 1] || 0);
    }, 0);
    categoryScores[category as keyof CategoryScores] = score;
  });

  // Calculate total score (sum of all 50 responses)
  const totalScore = student.responses.reduce((sum, score) => sum + score, 0);

  // Determine overall level based on total score
  const overallLevel = getLevel(totalScore, MAX_TOTAL_SCORE);

  return {
    ...student,
    categoryScores,
    totalScore,
    overallLevel,
  };
}

/**
 * Calculate scores for all students
 */
export function calculateBulkScores(students: CSVStudentData[]): StudentWithScores[] {
  return students.map(calculateStudentScores);
}

// Note: getLevel and getCategoryLevel are now imported from ./config
// for centralized configuration management
