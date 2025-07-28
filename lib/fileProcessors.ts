import * as mammoth from 'mammoth';

// Maximum file size: 10MB
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Type for PDF.js
interface PDFJSLib {
  getDocument: (data: { data: ArrayBuffer }) => { promise: Promise<PDFDocument> };
  GlobalWorkerOptions: { workerSrc: string };
  version: string;
}

interface PDFDocument {
  numPages: number;
  getPage: (pageNum: number) => Promise<PDFPage>;
}

interface PDFPage {
  getTextContent: () => Promise<{ items: Array<{ str: string }> }>;
}

// Dynamically import pdfjs-dist to avoid SSR issues
let pdfjsLib: PDFJSLib | null = null;
let pdfjsLoadPromise: Promise<PDFJSLib> | null = null;

async function loadPdfJs(): Promise<PDFJSLib | null> {
  if (pdfjsLib) return pdfjsLib;
  
  if (!pdfjsLoadPromise && typeof window !== 'undefined') {
    pdfjsLoadPromise = import('pdfjs-dist').then((pdfjs) => {
      pdfjsLib = pdfjs as unknown as PDFJSLib;
      // Set worker for PDF.js
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      return pdfjsLib;
    });
  }
  
  return pdfjsLoadPromise || null;
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
        .map((item) => item.str)
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