import * as mammoth from 'mammoth';

// Maximum file size: 10MB
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Dynamically import pdfjs-dist to avoid SSR issues
let pdfjsLib: any = null;
let pdfjsLoadPromise: Promise<any> | null = null;

async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;
  
  if (!pdfjsLoadPromise && typeof window !== 'undefined') {
    pdfjsLoadPromise = import('pdfjs-dist').then((pdfjs) => {
      pdfjsLib = pdfjs;
      // Set worker for PDF.js
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      return pdfjsLib;
    });
  }
  
  return pdfjsLoadPromise;
}

export async function extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
  // Ensure PDF.js is loaded
  const pdfjs = await loadPdfJs();
  if (!pdfjs) {
    throw new Error('PDF.js could not be loaded');
  }

  try {
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export async function extractTextFromDOCX(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    if (result.messages.length > 0) {
      console.warn('DOCX extraction warnings:', result.messages);
    }
    
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from DOCX');
  }
}

// Helper to convert File to ArrayBuffer
export function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        resolve(e.target.result);
      } else {
        reject(new Error('Failed to read file as ArrayBuffer'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}