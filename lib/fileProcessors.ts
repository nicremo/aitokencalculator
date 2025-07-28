import * as mammoth from 'mammoth';

// Maximum file size: 10MB
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

// PDF.js types
interface PDFJSStatic {
  getDocument: (data: { data: ArrayBuffer }) => PDFLoadingTask;
  GlobalWorkerOptions: {
    workerSrc: string;
  };
}

interface PDFLoadingTask {
  promise: Promise<PDFDocumentProxy>;
}

interface PDFDocumentProxy {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PDFPageProxy>;
}

interface PDFPageProxy {
  getTextContent: () => Promise<TextContent>;
}

interface TextContent {
  items: TextItem[];
}

interface TextItem {
  str: string;
}

declare global {
  interface Window {
    pdfjsLib?: PDFJSStatic;
  }
}

// Alternative approach: Use CDN-hosted PDF.js
async function loadPdfJsFromCDN(): Promise<PDFJSStatic> {
  if (typeof window === 'undefined') {
    throw new Error('PDF.js can only be loaded in the browser');
  }

  // Check if already loaded
  if (window.pdfjsLib) {
    return window.pdfjsLib;
  }

  // Load PDF.js from CDN
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/pdfjs-dist@5.4.54/build/pdf.min.mjs';
    
    script.onload = () => {
      if (window.pdfjsLib) {
        // Set worker
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@5.4.54/build/pdf.worker.min.mjs';
        resolve(window.pdfjsLib);
      } else {
        reject(new Error('PDF.js library not found after loading'));
      }
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load PDF.js from CDN'));
    };
    
    document.head.appendChild(script);
  });
}

export async function extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    // Load PDF.js from CDN
    const pdfjsLib = await loadPdfJsFromCDN();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
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
    if (error instanceof Error) {
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
    throw new Error('Failed to extract text from PDF: Unknown error');
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