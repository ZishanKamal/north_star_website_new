import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { StudentWithScores } from './bulkScoreCalculator';
import { generatePDF, PDFData } from './pdfGenerator';
import { ScoreResult, getRecommendations } from './utils';
import { categoryDefinitions, getScoreFeedback } from './config';
import { getLevel } from './config';

/**
 * Generate PDF reports for multiple students and return as ZIP file
 * This reuses the existing generatePDF function to maintain consistency
 */
export async function generateBulkReports(
  students: StudentWithScores[],
  onProgress?: (current: number, total: number) => void
): Promise<Blob> {
  const zip = new JSZip();

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    
    // Generate PDF for this student using existing PDF generator
    const pdfBlob = await generateSingleReportBlob(student);
    
    // Create safe filename
    const safeFileName = sanitizeFileName(student.name);
    const fileName = `EI_Report_${safeFileName}.pdf`;
    
    // Add to ZIP
    zip.file(fileName, pdfBlob);
    
    // Report progress
    if (onProgress) {
      onProgress(i + 1, students.length);
    }
  }

  // Generate ZIP file
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  return zipBlob;
}

/**
 * Generate a single PDF report for a student by reusing existing PDF generator
 */
async function generateSingleReportBlob(student: StudentWithScores): Promise<Blob> {
  // Convert student data to PDFData format
  const pdfData: PDFData = {
    testDate: new Date(student.timestamp).toISOString(),
    totalScore: student.totalScore,
    maxScore: 250,
    overallLevel: student.overallLevel,
    results: buildScoreResults(student),
    recommendations: buildRecommendations(student),
    studentInfo: {
      name: student.name,
      email: student.email,
      whatsapp: student.mobile,
      school: student.school,
      classOrDegree: student.class,
    },
    chartImageData: undefined, // No chart for bulk reports
    isQuickAssessment: false,
  };

  // Use the existing generatePDF function but capture the output as blob
  return await generatePDFAsBlob(pdfData);
}

/**
 * Wrapper to call existing generatePDF and return blob instead of downloading
 */
async function generatePDFAsBlob(data: PDFData): Promise<Blob> {
  // Import the existing PDF generation logic
  // We need to modify the existing generatePDF to optionally return blob
  // For now, let's create a temporary implementation that calls the same internal logic
  
  const { generatePDFDocument } = await import('./pdfGenerator');
  const doc = await generatePDFDocument(data);
  return doc.output('blob');
}

/**
 * Build ScoreResult array from student category scores
 */
function buildScoreResults(student: StudentWithScores): ScoreResult[] {
  const categories = [
    { key: 'selfAwareness', name: 'Self-Awareness', score: student.categoryScores.selfAwareness, max: 50 },
    { key: 'managingEmotions', name: 'Managing Emotions', score: student.categoryScores.managingEmotions, max: 50 },
    { key: 'motivatingOneself', name: 'Motivating Oneself', score: student.categoryScores.motivatingOneself, max: 50 },
    { key: 'empathy', name: 'Empathy', score: student.categoryScores.empathy, max: 50 },
    { key: 'socialSkill', name: 'Social Skills', score: student.categoryScores.socialSkill, max: 50 },
  ];

  return categories.map(cat => {
    const percentage = (cat.score / cat.max) * 100;
    const level = getLevel(cat.score, cat.max); // Use centralized getLevel
    const categoryDef = categoryDefinitions.find(def => def.id === cat.key);
    const description = categoryDef?.description || '';

    return {
      category: cat.name,
      score: cat.score,
      percentage,
      level,
      description,
    };
  });
}

/**
 * Build recommendations from student scores
 * Uses the same getRecommendations function as the Results component
 */
function buildRecommendations(student: StudentWithScores): Record<string, string[]> {
  // Convert student scores to ScoreResult format that getRecommendations expects
  const scoreResults = buildScoreResults(student);
  
  // Use the same recommendation logic as the Results component
  return getRecommendations(scoreResults);
}

// Note: getLevel is now imported from ./config for centralized configuration

/**
 * Sanitize filename by removing special characters
 */
function sanitizeFileName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}
