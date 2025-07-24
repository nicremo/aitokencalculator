'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
// Removed translations for now

interface FileUploadProps {
  onFilesProcessed: (content: string, fileType: string) => void;
  onError: (error: string) => void;
}

export function FileUpload({ onFilesProcessed, onError }: FileUploadProps) {
  // Removed translations for now
  
  const processFile = useCallback(async (file: File) => {
    const fileType = file.name.split('.').pop()?.toLowerCase() || '';
    
    try {
      if (fileType === 'txt' || fileType === 'md') {
        // Plain text files
        const text = await file.text();
        onFilesProcessed(text, fileType);
      } else if (fileType === 'pdf') {
        // PDF files - we'll need to implement PDF parsing on the server
        // For now, we'll show a message
        onError('Fehler beim Verarbeiten der Datei: PDF noch nicht unterstützt');
      } else if (fileType === 'docx') {
        // DOCX files - we'll need to implement DOCX parsing on the server
        onError('Fehler beim Verarbeiten der Datei: DOCX noch nicht unterstützt');
      } else if (['jpg', 'jpeg', 'png', 'webp'].includes(fileType)) {
        // Image files
        onError('Fehler beim Verarbeiten der Datei: Bilder noch nicht unterstützt');
      } else {
        onError(`Fehler beim Verarbeiten der Datei: .${fileType} nicht unterstützt`);
      }
    } catch (error) {
      onError(`Fehler beim Verarbeiten der Datei: ${error}`);
    }
  }, [onError, onFilesProcessed]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      await processFile(file);
    }
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.md'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.jpg', '.jpeg', '.png', '.webp']
    },
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all",
        "hover:border-gray-300 hover:bg-gray-50/50",
        isDragActive && "border-blue-500 bg-blue-50/50"
      )}
    >
      <input {...getInputProps()} />
      
      <div className="flex justify-center mb-6">
        <Upload className="h-16 w-16 text-gray-300" />
      </div>
      
      {isDragActive ? (
        <div>
          <p className="text-lg font-medium text-blue-600">
            Verarbeite...
          </p>
        </div>
      ) : (
        <div>
          <p className="text-xl font-medium text-gray-800">
            Dateien hier ablegen oder klicken zum Hochladen
          </p>
          <p className="text-base text-gray-600 mt-3">
            Unterstützt TXT, MD, PDF, DOCX und Bilder
          </p>
        </div>
      )}
      
      <div className="flex justify-center gap-6 mt-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="h-5 w-5" />
          <span>Dokumente</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Image className="h-5 w-5" aria-hidden="true" />
          <span>Bilder</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Music className="h-5 w-5" />
          <span>Audio (bald)</span>
        </div>
      </div>
    </div>
  );
}