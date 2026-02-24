export interface CSVStudentData {
  timestamp: string;
  name: string;
  email: string;
  mobile: string;
  school: string;
  class: string;
  responses: number[]; // Array of 50 responses (1-5)
}

export interface ParsedCSVResult {
  success: boolean;
  data?: CSVStudentData[];
  error?: string;
}

/**
 * Parse CSV file from Google Forms export
 * Expected format: Timestamp, Name, Email, Mobile, School/College, Class/Year, Q1, Q2, ..., Q50
 */
export function parseCSV(csvContent: string): ParsedCSVResult {
  try {
    const lines = csvContent.trim().split('\n');
    
    if (lines.length < 2) {
      return { success: false, error: 'CSV file is empty or has no data rows' };
    }

    const students: CSVStudentData[] = [];

    // Skip header row (index 0) and process data rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Parse CSV line (handle commas within quotes)
      const values = parseCSVLine(line);

      if (values.length < 56) { // 6 info fields + 50 questions
        return { 
          success: false, 
          error: `Row ${i + 1}: Expected at least 56 columns, found ${values.length}` 
        };
      }

      // Extract student info (first 6 columns)
      const timestamp = values[0];
      const name = values[1];
      const email = values[2];
      const mobile = values[3];
      const school = values[4];
      const classYear = values[5];

      // Extract responses (columns 6-55, which are the 50 questions)
      const responses: number[] = [];
      
      for (let j = 6; j < 56; j++) {
        const answer = values[j];
        // Extract number from format like "4 - Applies majority of the time"
        const match = answer.match(/^(\d)/);
        if (match) {
          const value = parseInt(match[1]);
          if (value >= 1 && value <= 5) {
            responses.push(value);
          } else {
            return { 
              success: false, 
              error: `Row ${i + 1}, Question ${j - 5}: Invalid response value "${value}"` 
            };
          }
        } else {
          return { 
            success: false, 
            error: `Row ${i + 1}, Question ${j - 5}: Could not parse response "${answer}"` 
          };
        }
      }

      if (responses.length !== 50) {
        return { 
          success: false, 
          error: `Row ${i + 1}: Expected 50 responses, found ${responses.length}` 
        };
      }

      students.push({
        timestamp,
        name,
        email,
        mobile,
        school,
        class: classYear,
        responses,
      });
    }

    if (students.length === 0) {
      return { success: false, error: 'No valid student data found in CSV' };
    }

    return { success: true, data: students };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to parse CSV: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

/**
 * Parse a single CSV line handling quoted values with commas
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current.trim());
  
  return result;
}
