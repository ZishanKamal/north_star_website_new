import { jsPDF } from 'jspdf';
import { StudentInfo } from './store';

// Helper function to load image as base64
async function loadImageAsBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Image load timeout'));
    }, 5000);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      clearTimeout(timeout);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Image load failed'));
    };
    img.src = url;
  });
}

export interface CertificateData {
  studentInfo: StudentInfo;
  totalScore: number;
  maxScore: number;
  overallLevel: string;
  completionDate: string;
}

export async function generateCertificate(data: CertificateData): Promise<void> {
  console.log('🎓 Certificate Generation started');
  
  try {
    // Create PDF in landscape orientation for certificate
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Load logo
    let logoData: string | null = null;
    try {
      logoData = await loadImageAsBase64('/north-star-logo.png');
      console.log('✅ Logo loaded successfully');
    } catch (error) {
      console.warn('⚠️ Failed to load logo, continuing without it:', error);
    }

    // Background gradient effect with rectangles
    doc.setFillColor(245, 250, 255); // Very light blue
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Outer decorative border (thick)
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(3);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16, 'S');
    
    // Middle border
    doc.setDrawColor(52, 152, 219);
    doc.setLineWidth(0.5);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24, 'S');
    
    // Inner border
    doc.setDrawColor(52, 152, 219);
    doc.setLineWidth(0.3);
    doc.rect(14, 14, pageWidth - 28, pageHeight - 28, 'S');

    // Add logo at top if available
    if (logoData) {
      const logoW = 36.1; // 28 * 0.75 * 1.25 * 1.25 * 1.10
      const logoH = 21;   // 28 * 0.75
      doc.addImage(logoData, 'PNG', (pageWidth - logoW) / 2, 25, logoW, logoH);
    }

    // Certificate Title (moved down by 10mm)
    const yAfterLogo = logoData ? 61 : 45;
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(41, 128, 185);
    doc.text('CERTIFICATE OF COMPLETION', pageWidth / 2, yAfterLogo, { align: 'center' });

    // Subtitle below title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(41, 128, 185);
    doc.text('Emotional Intelligence Assessment', pageWidth / 2, yAfterLogo + 10, { align: 'center' });

    // Decorative line
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(0.5);
    doc.line(pageWidth * 0.2, yAfterLogo + 13, pageWidth * 0.8, yAfterLogo + 13);

    // "This is to certify that" text
    doc.setFontSize(13);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(80, 80, 80);
    doc.text('This is to certify that', pageWidth / 2, yAfterLogo + 23, { align: 'center' });

    // Student Name (larger, bold)
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(41, 128, 185);
    doc.text(data.studentInfo.name, pageWidth / 2, yAfterLogo + 35, { align: 'center' });

    // Decorative line under name (single continuous line)
    doc.setDrawColor(52, 152, 219);
    doc.setLineWidth(0.5);
    const nameY = yAfterLogo + 37;
    doc.line(pageWidth * 0.25, nameY, pageWidth * 0.75, nameY);

    // Achievement text
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text('has successfully completed the', pageWidth / 2, yAfterLogo + 47, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.text('Emotional Intelligence Assessment', pageWidth / 2, yAfterLogo + 55, { align: 'center' });
    
    // Achievement level text (no box)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('with', pageWidth / 2, yAfterLogo + 68, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(41, 128, 185);
    let achievementText = '';
    if (data.overallLevel === 'Excellent' || data.overallLevel === 'Very Strong') {
      achievementText = 'Outstanding Achievement';
    } else if (data.overallLevel === 'Strong' || data.overallLevel === 'Good') {
      achievementText = 'Commendable Performance';
    } else {
      achievementText = 'Certified Completion';
    }
    doc.text(achievementText, pageWidth / 2, yAfterLogo + 76, { align: 'center' });

    // Date and location section
    const dateY = yAfterLogo + 90;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    
    const dateObj = new Date(data.completionDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Left side - Date
    doc.text('Date of Completion:', pageWidth * 0.3, dateY, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.text(formattedDate, pageWidth * 0.3, dateY + 6, { align: 'center' });
    
    // Right side - Location
    if (data.studentInfo.city && data.studentInfo.state) {
      doc.setFont('helvetica', 'normal');
      doc.text('Location:', pageWidth * 0.7, dateY, { align: 'center' });
      doc.setFont('helvetica', 'bold');
      doc.text(`${data.studentInfo.city}, ${data.studentInfo.state}`, pageWidth * 0.7, dateY + 6, { align: 'center' });
    }

    // Signature section - simple layout without boxes
    const sigY = pageHeight - 30;
    
    // Left side - Certificate ID (no box)
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Certificate ID:', 30, sigY);
    
    const certId = `EI-${Date.now().toString().slice(-8)}`;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(41, 128, 185);
    doc.text(certId, 30, sigY + 5);
    
    // Right side - Signature (no box, no line)
    const sigX = pageWidth - 50;
    
    // Signature name (increased font size and italic)
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

    // Enhanced corner decorations
    const cornerSize = 12;
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(1.5);
    
    // Top left corner
    doc.line(14, 14, 14 + cornerSize, 14);
    doc.line(14, 14, 14, 14 + cornerSize);
    doc.line(14 + cornerSize, 14, 14 + cornerSize - 3, 14 + 3);
    doc.line(14, 14 + cornerSize, 14 + 3, 14 + cornerSize - 3);
    
    // Top right corner
    doc.line(pageWidth - 14, 14, pageWidth - 14 - cornerSize, 14);
    doc.line(pageWidth - 14, 14, pageWidth - 14, 14 + cornerSize);
    doc.line(pageWidth - 14 - cornerSize, 14, pageWidth - 14 - cornerSize + 3, 14 + 3);
    doc.line(pageWidth - 14, 14 + cornerSize, pageWidth - 14 - 3, 14 + cornerSize - 3);
    
    // Bottom left corner
    doc.line(14, pageHeight - 14, 14 + cornerSize, pageHeight - 14);
    doc.line(14, pageHeight - 14, 14, pageHeight - 14 - cornerSize);
    doc.line(14 + cornerSize, pageHeight - 14, 14 + cornerSize - 3, pageHeight - 14 - 3);
    doc.line(14, pageHeight - 14 - cornerSize, 14 + 3, pageHeight - 14 - cornerSize + 3);
    
    // Bottom right corner
    doc.line(pageWidth - 14, pageHeight - 14, pageWidth - 14 - cornerSize, pageHeight - 14);
    doc.line(pageWidth - 14, pageHeight - 14, pageWidth - 14, pageHeight - 14 - cornerSize);
    doc.line(pageWidth - 14 - cornerSize, pageHeight - 14, pageWidth - 14 - cornerSize + 3, pageHeight - 14 - 3);
    doc.line(pageWidth - 14, pageHeight - 14 - cornerSize, pageWidth - 14 - 3, pageHeight - 14 - cornerSize + 3);

    // Save the PDF
    const fileName = `EI_Certificate_${data.studentInfo.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    doc.save(fileName);
    
    console.log('✅ Certificate generated successfully:', fileName);
  } catch (error) {
    console.error('❌ Error generating certificate:', error);
    throw error;
  }
}
