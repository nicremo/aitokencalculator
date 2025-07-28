import * as mammoth from 'mammoth';
import { PDFDocument } from 'pdf-lib';

// Maximum file size: 10MB
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

// PDF text extraction using pdf-lib
export async function extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    
    // pdf-lib doesn't have built-in text extraction
    // So we'll provide metadata and page count info
    const pageCount = pages.length;
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    
    let extractedText = `PDF-Dokument mit ${pageCount} Seiten\n\n`;
    
    // Try to extract form field values if any
    if (fields.length > 0) {
      extractedText += 'Formularfelder gefunden:\n';
      fields.forEach(field => {
        const fieldName = field.getName();
        extractedText += `- ${fieldName}\n`;
      });
      extractedText += '\n';
    }
    
    // Get document info
    const title = pdfDoc.getTitle();
    const author = pdfDoc.getAuthor();
    const subject = pdfDoc.getSubject();
    
    if (title) extractedText += `Titel: ${title}\n`;
    if (author) extractedText += `Autor: ${author}\n`;
    if (subject) extractedText += `Betreff: ${subject}\n`;
    
    // Estimate content based on page count
    // Average page has about 500 words ≈ 2000-3000 characters
    const estimatedChars = pageCount * 2500;
    extractedText += `\nGeschätzter Textinhalt: ${estimatedChars.toLocaleString('de-DE')} Zeichen\n`;
    extractedText += `\nHinweis: Dies ist eine Schätzung basierend auf ${pageCount} Seiten. Eine durchschnittliche PDF-Seite enthält etwa 500 Wörter.`;
    
    return extractedText;
  } catch (error) {
    console.error('Error processing PDF:', error);
    
    // Fallback to file size estimation
    const fileSizeKB = arrayBuffer.byteLength / 1024;
    const estimatedPages = Math.max(1, Math.round(fileSizeKB / 50));
    
    return `PDF-Dokument (${fileSizeKB.toFixed(0)} KB)\nGeschätzte Seiten: ${estimatedPages}\nGeschätzter Inhalt: ${estimatedPages * 2500} Zeichen`;
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