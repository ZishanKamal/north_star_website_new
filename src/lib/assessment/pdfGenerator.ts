import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ScoreResult } from './utils';
import { categoryDefinitions, categoryGroups, getScoreFeedback } from './config';
import { StudentInfo } from './store';

// Helper function to load image as base64
async function loadImageAsBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Image load timeout'));
    }, 5000); // 5 second timeout

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

export interface PDFData {
  testDate: string;
  totalScore: number;
  maxScore: number;
  overallLevel: string;
  results: ScoreResult[];
  recommendations: Record<string, string[]>;
  studentInfo: StudentInfo;
  chartImageData?: string; // Base64 image of the radar chart
  isQuickAssessment?: boolean; // Track assessment type
}

/**
 * Core PDF generation logic - builds and returns jsPDF document
 * This is used by both individual download and bulk generation
 */
async function buildPDFDocument(data: PDFData): Promise<jsPDF> {
  console.log('🚀 PDF Generation started');
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Load logo with timeout
  let logoBase64 = '';
  try {
    console.log('📷 Loading logo...');
    logoBase64 = await loadImageAsBase64(`/north-star-logo.png?t=${Date.now()}`);
    console.log('✅ Logo loaded successfully');
  } catch (e) {
    console.error('❌ Failed to load logo:', e);
    // Continue without logo rather than failing
  }

  // Load category icons
  const categoryIcons: Record<string, string> = {
    'Brain': '',
    'Heart': '',
    'Target': '',
    'Users': '',
    'MessageCircle': ''
  };

  const iconFiles = {
    'Brain': '/icon-self-awareness.png',
    'Heart': '/icon-managing-emotions.png',
    'Target': '/icon-motivating-oneself.png',
    'Users': '/icon-empathy.png',
    'MessageCircle': '/icon-social-skill.png'
  };

  // Try to load all category icons
  console.log('📷 Loading category icons...');
  for (const [iconName, iconPath] of Object.entries(iconFiles)) {
    try {
      categoryIcons[iconName] = await loadImageAsBase64(`${iconPath}?t=${Date.now()}`);
      console.log(`✅ Loaded icon: ${iconName}`);
    } catch (e) {
      console.warn(`⚠️ Failed to load icon ${iconName}, continuing without it`);
      // Continue without this icon
    }
  }
  console.log('📷 Icon loading complete');

  // Helper function to add watermark and footer to any page
  const addWatermarkAndFooter = () => {
    // Logo Watermark
    if (logoBase64) {
      const watermarkW = 103.125; // 80 * 0.75 * 1.25 * 1.25 * 1.10
      const watermarkH = 60;      // 80 * 0.75
      doc.saveGraphicsState();
      // @ts-ignore - GState type issue in jsPDF
      doc.setGState(new doc.GState({ opacity: 0.1 }));
      doc.addImage(logoBase64, 'PNG', (pageWidth - watermarkW) / 2, pageHeight / 2 - 20, watermarkW, watermarkH);
      doc.restoreGraphicsState();
    }

    // Footer
    const footerY = pageHeight - 25;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38);
    doc.text('NORTH STAR ACADEMY', pageWidth / 2, footerY, { align: 'center' });
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Coaching and Training Academy for the future', pageWidth / 2, footerY + 5, { align: 'center' });
    
    doc.setFontSize(7);
    doc.text('A1, 4th Floor, Rall Grand Mall, Main Road, Ranchi', pageWidth / 2, footerY + 9, { align: 'center' });
  };
  
  // ========== COVER PAGE ==========
  let yPosition = 25;

  // Top Left - Registration info
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Registered with Ministry of MSME', 20, yPosition);
  yPosition += 4;
  doc.setFont('helvetica', 'italic');
  doc.text('(Govt. of India)', 20, yPosition);
  yPosition += 5;
  doc.setFont('helvetica', 'normal');
  doc.text('An ISO 9001:2015 Certified Company', 20, yPosition);

  // Top Right - Contact info
  const rightYPosition = 25;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Call/WhatsApp on 9241959311', pageWidth - 20, rightYPosition, { align: 'right' });
  
  // Split the text into two parts with different colors
  doc.setFont('helvetica', 'normal');
  const urlText = 'www.northstaronline.in';
  const prefixText = 'Visit us at ';
  
  // Draw URL in blue (right-aligned)
  doc.setTextColor(0, 0, 255);
  doc.text(urlText, pageWidth - 20, rightYPosition + 5, { align: 'right' });
  
  // Draw prefix in black (positioned before the URL)
  const urlWidth = doc.getTextWidth(urlText);
  doc.setTextColor(0, 0, 0);
  doc.text(prefixText, pageWidth - 20 - urlWidth, rightYPosition + 5, { align: 'right' });

  // Center - North Star Academy Logo
  const logoYPosition = 10;
  if (logoBase64) {
    // Add logo (centered, 0.75x size with 1.25x horizontal stretch)
    const logoW = 51.5; // 40 * 0.75 * 1.25 * 1.25 * 1.10
    const logoH = 30;   // 40 * 0.75
    doc.addImage(logoBase64, 'PNG', (pageWidth - logoW) / 2, logoYPosition, logoW, logoH);
    yPosition = logoYPosition + logoH + 13;
  } else {
    // Fallback to text if image fails
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('NORTH STAR ACADEMY', pageWidth / 2, logoYPosition, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('www.northstaronline.in', pageWidth / 2, logoYPosition + 6, { align: 'center' });
    yPosition = logoYPosition + 21;
  }

  // Discover -> Build -> Augment arrows (proper arrow shapes)
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  
  const arrowY = yPosition;
  const arrowHeight = 10;
  const arrowWidth = 40;
  const arrowTip = 5;
  const arrowGap = 2;
  const startX = (pageWidth - (arrowWidth * 3 + arrowTip * 3 + arrowGap * 2)) / 2;
  
  // Helper function to draw arrow
  const drawArrow = (x: number, colors: number[], text: string) => {
    doc.setFillColor(colors[0], colors[1], colors[2]);
    doc.setDrawColor(colors[0], colors[1], colors[2]);
    
    // Main rectangle
    doc.rect(x, arrowY, arrowWidth, arrowHeight, 'F');
    
    // Arrow point (triangle)
    doc.triangle(
      x + arrowWidth, arrowY,
      x + arrowWidth + arrowTip, arrowY + arrowHeight / 2,
      x + arrowWidth, arrowY + arrowHeight,
      'F'
    );
    
    // Text
    doc.setTextColor(255, 255, 255);
    doc.text(text, x + arrowWidth / 2, arrowY + arrowHeight / 2 + 1.5, { align: 'center' });
  };
  
  // Discover (Gray)
  drawArrow(startX, [128, 128, 128], 'Discover');
  
  // Build (Orange)
  drawArrow(startX + arrowWidth + arrowTip + arrowGap, [255, 140, 0], 'Build');
  
  // Augment (Red)
  drawArrow(startX + (arrowWidth + arrowTip + arrowGap) * 2, [220, 38, 38], 'Augment');
  
  yPosition += arrowHeight + 15;
  doc.setTextColor(0, 0, 0);

  // Main Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138); // Dark blue
  const assessmentType = data.isQuickAssessment ? 'QUICK' : 'COMPREHENSIVE';
  doc.text(`${assessmentType} EMOTIONAL STATE ASSESSMENT REPORT`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  // Student Information Box
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  
  // Always 7 fields: Name, School, Class, Age, City, State, Date
  const infoBoxHeight = 54;
  
  doc.rect(35, yPosition, pageWidth - 70, infoBoxHeight, 'S');
  
  yPosition += 8;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Name of the Student:', 40, yPosition);
  doc.setFont('helvetica', 'italic');
  doc.text(data.studentInfo.name, 90, yPosition);
  yPosition += 6;
  
  // Always show all fields, use blank if not provided
  doc.setFont('helvetica', 'bold');
  doc.text('School/College:', 40, yPosition);
  doc.setFont('helvetica', 'italic');
  doc.text(data.studentInfo.school || '', 90, yPosition);
  yPosition += 6;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Class/Degree:', 40, yPosition);
  doc.setFont('helvetica', 'italic');
  doc.text(data.studentInfo.classOrDegree || '', 90, yPosition);
  yPosition += 6;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Age Group (years):', 40, yPosition);
  doc.setFont('helvetica', 'italic');
  doc.text(data.studentInfo.ageGroup || '', 90, yPosition);
  yPosition += 6;
  
  doc.setFont('helvetica', 'bold');
  doc.text('City:', 40, yPosition);
  doc.setFont('helvetica', 'italic');
  doc.text(data.studentInfo.city || '', 90, yPosition);
  yPosition += 6;
  
  doc.setFont('helvetica', 'bold');
  doc.text('State:', 40, yPosition);
  doc.setFont('helvetica', 'italic');
  doc.text(data.studentInfo.state || '', 90, yPosition);
  yPosition += 6;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Date of Assessment:', 40, yPosition);
  doc.setFont('helvetica', 'italic');
  doc.text(data.testDate, 90, yPosition);

  // Add watermark and footer to page 1
  addWatermarkAndFooter();

  // Purpose Text Box at Bottom
  yPosition = pageHeight - 60;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.rect(35, yPosition, pageWidth - 70, 20, 'S');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(0, 0, 0);
  const purposeText = 'This self-assessment questionnaire is designed to help you evaluate your strengths and weaknesses and your overall level of emotional intelligence.';
  const splitPurpose = doc.splitTextToSize(purposeText, pageWidth - 80);
  doc.text(splitPurpose, pageWidth / 2, yPosition + 7, { align: 'center', maxWidth: pageWidth - 80 });

  // ========== PAGE 2: RESULTS ==========
  doc.addPage();
  addWatermarkAndFooter();
  yPosition = 20;

  // Category Explanation Section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  
  // Split text with proper wrapping while maintaining bold keywords
  const fullText = 'This assessment evaluates 5 different areas. The first 3 are related to intrapersonal intelligence (understanding yourself) and the last 2 are related to interpersonal intelligence (understanding others).';
  const maxWidth = pageWidth - 50;
  
  // Split into lines that fit
  const words = fullText.split(' ');
  let currentLine = '';
  const lines: string[] = [];
  
  words.forEach(word => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const testWidth = doc.getTextWidth(testLine);
    
    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) lines.push(currentLine);
  
  // Render each line, making intrapersonal and interpersonal bold
  lines.forEach(line => {
    let xPos = 25;
    const parts = line.split(/(intrapersonal|interpersonal)/);
    
    parts.forEach(part => {
      if (part === 'intrapersonal' || part === 'interpersonal') {
        doc.setFont('helvetica', 'bold');
        doc.text(part, xPos, yPosition);
        xPos += doc.getTextWidth(part);
        doc.setFont('helvetica', 'normal');
      } else if (part) {
        doc.text(part, xPos, yPosition);
        xPos += doc.getTextWidth(part);
      }
    });
    
    yPosition += 5;
  });
  
  yPosition += 5;

  // Understanding Yourself Section
  doc.setFillColor(59, 130, 246);
  doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Understanding Yourself', 25, yPosition + 5.5);
  yPosition += 12;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  
  categoryGroups["Understanding Yourself"].forEach((category) => {
    const iconImage = categoryIcons[category.icon];
    
    if (iconImage) {
      // Add icon image (8mm x 8mm)
      try {
        doc.addImage(iconImage, 'PNG', 23, yPosition - 3, 8, 8);
      } catch (e) {
        console.error('Failed to add icon image:', e);
      }
    }
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`${category.name}:`, 33, yPosition);
    yPosition += 4;
    doc.setFont('helvetica', 'italic');
    const descLines = doc.splitTextToSize(category.description, pageWidth - 55);
    descLines.forEach((line: string) => {
      doc.text(line, 33, yPosition);
      yPosition += 3.5;
    });
    yPosition += 3;
  });

  yPosition += 3;

  // Understanding Others Section
  doc.setFillColor(59, 130, 246);
  doc.rect(20, yPosition, pageWidth - 40, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Understanding Others', 25, yPosition + 5.5);
  yPosition += 12;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  categoryGroups["Understanding Others"].forEach((category) => {
    const iconImage = categoryIcons[category.icon];
    
    if (iconImage) {
      // Add icon image (8mm x 8mm)
      try {
        doc.addImage(iconImage, 'PNG', 23, yPosition - 3, 8, 8);
      } catch (e) {
        console.error('Failed to add icon image:', e);
      }
    }
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`${category.name}:`, 33, yPosition);
    yPosition += 4;
    doc.setFont('helvetica', 'italic');
    const descLines = doc.splitTextToSize(category.description, pageWidth - 55);
    descLines.forEach((line: string) => {
      doc.text(line, 33, yPosition);
      yPosition += 3.5;
    });
    yPosition += 3;
  });

  yPosition += 5;

  // Add explanatory text about scoring
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  const scoringText = "Based on your responses, the assessment scores you on max score of 50 against each of the 5 different groups.";
  const scoringLines = doc.splitTextToSize(scoringText, pageWidth - 40);
  scoringLines.forEach((line: string) => {
    doc.text(line, 20, yPosition);
    yPosition += 5;
  });

  // Start a new page for Overall Score
  doc.addPage();
  addWatermarkAndFooter();
  yPosition = 20;

  // Overall Score Section
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(20, yPosition, pageWidth - 40, 30, 3, 3, 'F');
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Overall Score', pageWidth / 2, yPosition + 10, { align: 'center' });
  
  doc.setFontSize(28);
  doc.setTextColor(41, 98, 255);
  doc.text(`${data.totalScore} / ${data.maxScore}`, pageWidth / 2, yPosition + 22, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const percentage = ((data.totalScore / data.maxScore) * 100).toFixed(1);
  doc.text(`${percentage}% - ${data.overallLevel}`, pageWidth / 2, yPosition + 28, { align: 'center' });

  yPosition += 40;

  // Radar Chart from captured image
  console.log('📊 PDF: Chart data exists:', !!data.chartImageData);
  console.log('📊 PDF: Chart data length:', data.chartImageData?.length || 0);
  
  if (data.chartImageData && data.chartImageData.length > 100) {
    console.log('✅ PDF: Adding chart to PDF...');
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Emotional Profile', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;
    
    // Add the radar chart image - use 2:1 aspect ratio matching the captured 800x400 source
    const chartWidth = 160;
    const chartHeight = 80;
    const xPos = (pageWidth - chartWidth) / 2;
    
    try {
      // Verify the image data format
      if (!data.chartImageData.startsWith('data:image/')) {
        console.error('❌ PDF: Invalid image data format');
        throw new Error('Invalid image data format');
      }
      
      console.log('📝 PDF: Calling doc.addImage...');
      doc.addImage(data.chartImageData, 'PNG', xPos, yPosition, chartWidth, chartHeight);
      console.log('✅ PDF: Chart added successfully!');
      yPosition += chartHeight + 10;
    } catch (error) {
      console.error('❌ PDF: Failed to add chart image:', error);
      // Add error text to PDF
      doc.setFontSize(10);
      doc.setTextColor(200, 0, 0);
      doc.text('Chart could not be added to PDF', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
    }
  } else {
    console.warn('No valid chart image data provided to PDF generator');
  }

  // Category Scores Table
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Category Breakdown', 20, yPosition);
  yPosition += 5;

  const tableData = data.results.map(result => [
    result.category,
    result.description,
    `${result.score}/50`,
    `${result.percentage.toFixed(1)}%`,
    result.level
  ]);

  autoTable(doc, {
    startY: yPosition,
    head: [['Category', 'Description', 'Score', 'Percentage', 'Level']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [41, 98, 255],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10
    },
    bodyStyles: {
      fontSize: 9
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    columnStyles: {
      0: { cellWidth: 35 },
      1: { cellWidth: 55 },
      2: { cellWidth: 20, halign: 'center' },
      3: { cellWidth: 25, halign: 'center' },
      4: { cellWidth: 30, halign: 'center' }
    },
    didParseCell: function(data) {
      // Color code the Level column based on score
      if (data.column.index === 4 && data.section === 'body') {
        const score = parseInt(tableData[data.row.index][2].split('/')[0]);
        let color: [number, number, number];
        
        if (score >= 40) {
          color = [34, 197, 94]; // Green for excellent (40-50)
        } else if (score >= 30) {
          color = [59, 130, 246]; // Blue for good (30-39)
        } else if (score >= 20) {
          color = [251, 191, 36]; // Amber for moderate (20-29)
        } else {
          color = [239, 68, 68]; // Red for needs improvement (0-19)
        }
        
        data.cell.styles.textColor = color;
        data.cell.styles.fontStyle = 'bold';
      }
    },
    margin: { left: 20, right: 20 }
  });

  // @ts-ignore - autoTable adds finalY to doc
  yPosition = doc.lastAutoTable.finalY + 15;

  // Score Analysis Section
  if (yPosition > pageHeight - 50) {
    doc.addPage();
    addWatermarkAndFooter();
    yPosition = 20;
  }

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Score Analysis', 20, yPosition);
  yPosition += 8;

  // Category ID mapping
  const categoryIdMap: Record<string, string> = {
    "Self-Awareness": "selfAwareness",
    "Managing Emotions": "managingEmotions",
    "Motivating Oneself": "motivatingOneself",
    "Empathy": "empathy",
    "Social Skill": "socialSkill",
  };

  data.results.forEach((result) => {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      addWatermarkAndFooter();
      yPosition = 20;
    }

    const categoryId = categoryIdMap[result.category];
    const feedback = getScoreFeedback(categoryId, result.score);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(41, 98, 255);
    doc.text(`${result.category}`, 20, yPosition);
    yPosition += 5;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Score: ${result.score}/50 - ${result.level}`, 25, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const feedbackLines = doc.splitTextToSize(feedback, pageWidth - 50);
    feedbackLines.forEach((line: string) => {
      if (yPosition > pageHeight - 15) {
        doc.addPage();
        addWatermarkAndFooter();
        yPosition = 20;
      }
      doc.text(line, 25, yPosition);
      yPosition += 4;
    });
    yPosition += 6;
  });

  yPosition += 5;

  // Recommendations Section
  if (yPosition > pageHeight - 50) {
    doc.addPage();
    addWatermarkAndFooter();
    yPosition = 20;
  }

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Personalized Recommendations', 20, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  Object.entries(data.recommendations).forEach(([category, recs]) => {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      addWatermarkAndFooter();
      yPosition = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(41, 98, 255);
    doc.text(`${category}:`, 20, yPosition);
    yPosition += 5;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    recs.forEach((rec, index) => {
      if (yPosition > pageHeight - 15) {
        doc.addPage();
        addWatermarkAndFooter();
        yPosition = 20;
      }

      const lines = doc.splitTextToSize(`• ${rec}`, pageWidth - 50);
      lines.forEach((line: string) => {
        doc.text(line, 25, yPosition);
        yPosition += 4;
      });
    });

    yPosition += 3;
  });

  // Footer
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `© ${new Date().getFullYear()} North Star Academy - Confidential`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - 20,
      pageHeight - 10,
      { align: 'right' }
    );
  }

  // Return the document instead of saving
  console.log('✅ PDF Document generation complete');
  return doc;
}

/**
 * Generate PDF and download it (used by Results component)
 */
export async function generatePDF(data: PDFData): Promise<void> {
  const doc = await buildPDFDocument(data);
  
  // Save the PDF
  const fileName = `ESA_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  console.log('💾 Saving PDF:', fileName);
  doc.save(fileName);
  console.log('✅ PDF saved successfully');
}

/**
 * Generate PDF document and return it as jsPDF (for bulk processing)
 * This reuses the exact same PDF generation logic as generatePDF
 */
export async function generatePDFDocument(data: PDFData): Promise<jsPDF> {
  return await buildPDFDocument(data);
}
