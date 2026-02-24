import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { StudentWithScores } from './bulkScoreCalculator';

/**
 * Generate certificates for multiple students and return as ZIP file
 */
export async function generateBulkCertificates(
  students: StudentWithScores[],
  onProgress?: (current: number, total: number) => void
): Promise<Blob> {
  const zip = new JSZip();

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    
    // Generate PDF for this student
    const pdfBlob = await generateSingleCertificate(student);
    
    // Create safe filename
    const safeFileName = sanitizeFileName(student.name);
    const fileName = `Certificate_${safeFileName}_${student.class}.pdf`;
    
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
 * Generate a single certificate PDF for a student
 */
async function generateSingleCertificate(student: StudentWithScores): Promise<Blob> {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background color
  doc.setFillColor(245, 250, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Triple border system
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(3);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setLineWidth(0.5);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  doc.setLineWidth(0.3);
  doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

  // Load and add logo
  let logoData: string | null = null;
  try {
    const response = await fetch('/north-star-logo.png');
    const blob = await response.blob();
    logoData = await blobToBase64(blob);
  } catch (error) {
    console.error('Failed to load logo:', error);
  }

  const logoSize = 28;
  if (logoData) {
    const logoX = (pageWidth - logoSize) / 2;
    doc.addImage(logoData, 'PNG', logoX, 25, logoSize, logoSize);
  }

  // Title
  const yAfterLogo = logoData ? 68 : 45;
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(41, 128, 185);
  doc.text('CERTIFICATE OF COMPLETION', pageWidth / 2, yAfterLogo, { align: 'center' });

  // Subtitle
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('This is to certify that', pageWidth / 2, yAfterLogo + 15, { align: 'center' });

  // Student name
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text(student.name, pageWidth / 2, yAfterLogo + 35, { align: 'center' });

  // Name underline
  const nameY = yAfterLogo + 37;
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.5);
  doc.line(pageWidth * 0.25, nameY, pageWidth * 0.75, nameY);

  // Achievement text
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('has successfully completed the', pageWidth / 2, yAfterLogo + 50, { align: 'center' });

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(41, 128, 185);
  doc.text('Emotional Intelligence Assessment', pageWidth / 2, yAfterLogo + 61, { align: 'center' });

  // Achievement level
  const achievementText = `and demonstrated ${student.overallLevel} performance`;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(52, 152, 219);
  doc.text(achievementText, pageWidth / 2, yAfterLogo + 76, { align: 'center' });

  // Date and Location
  const formattedDate = formatDate(student.timestamp);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Date: ${formattedDate}`, 30, yAfterLogo + 90);
  doc.text('Location: Bengaluru, India', pageWidth - 30, yAfterLogo + 90, { align: 'right' });

  // Certificate ID and Signature section
  const sigY = pageHeight - 45;
  
  // Left side - Certificate ID
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text('Certificate ID:', 30, sigY);
  
  const certId = generateCertificateId(student.name);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(41, 128, 185);
  doc.text(certId, 30, sigY + 5);
  
  // Right side - Signature
  const sigX = pageWidth - 50;
  
  doc.setFontSize(18);
  doc.setFont('times', 'italic');
  doc.setTextColor(60, 60, 60);
  doc.text('Nadeem Akhter', sigX, sigY, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 100, 100);
  doc.text('CEO, North Star Academy', sigX, sigY + 6, { align: 'center' });

  // Bottom text
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text('This certificate validates the completion of the Emotional Intelligence Assessment and demonstrates', pageWidth / 2, pageHeight - 18, { align: 'center' });
  doc.text('commitment to personal development and self-awareness.', pageWidth / 2, pageHeight - 14, { align: 'center' });

  // Corner decorations
  const cornerSize = 12;
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(1.5);
  
  doc.line(14, 14, 14 + cornerSize, 14);
  doc.line(14, 14, 14, 14 + cornerSize);
  
  doc.line(pageWidth - 14, 14, pageWidth - 14 - cornerSize, 14);
  doc.line(pageWidth - 14, 14, pageWidth - 14, 14 + cornerSize);
  
  doc.line(14, pageHeight - 14, 14 + cornerSize, pageHeight - 14);
  doc.line(14, pageHeight - 14, 14, pageHeight - 14 - cornerSize);
  
  doc.line(pageWidth - 14, pageHeight - 14, pageWidth - 14 - cornerSize, pageHeight - 14);
  doc.line(pageWidth - 14, pageHeight - 14, pageWidth - 14, pageHeight - 14 - cornerSize);

  // Convert to blob
  const pdfBlob = doc.output('blob');
  return pdfBlob;
}

/**
 * Convert Blob to base64 string
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Format date string
 */
function formatDate(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

/**
 * Generate a unique certificate ID
 */
function generateCertificateId(name: string): string {
  const timestamp = Date.now().toString(36);
  const nameHash = name.slice(0, 3).toUpperCase();
  return `NS-EI-${nameHash}-${timestamp}`;
}

/**
 * Sanitize filename by removing special characters
 */
function sanitizeFileName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}
