'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image, Music, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { extractTextFromPDF, extractTextFromDOCX, fileToArrayBuffer } from '@/lib/fileProcessors';

interface FileUploadProps {
  onFilesProcessed: (content: string, fileType: string) => void;
  onError: (error: string) => void;
}

export function FileUpload({ onFilesProcessed, onError }: FileUploadProps) {
  const t = useTranslations();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingFile, setProcessingFile] = useState<string>('');
  
  const processFile = useCallback(async (file: File) => {
    const fileType = file.name.split('.').pop()?.toLowerCase() || '';
    setProcessingFile(file.name);
    
    try {
      if (fileType === 'txt' || fileType === 'md') {
        // Plain text files
        const text = await file.text();
        onFilesProcessed(text, fileType);
      } else if (fileType === 'pdf') {
        // PDF files
        const arrayBuffer = await fileToArrayBuffer(file);
        const text = await extractTextFromPDF(arrayBuffer);
        onFilesProcessed(text, fileType);
      } else if (fileType === 'docx') {
        // DOCX files
        const arrayBuffer = await fileToArrayBuffer(file);
        const text = await extractTextFromDOCX(arrayBuffer);
        onFilesProcessed(text, fileType);
      } else if (['jpg', 'jpeg', 'png', 'webp'].includes(fileType)) {
        // Image files - still not supported for now
        onError(t('fileUpload.errors.imagesNotSupported'));
      } else {
        onError(t('fileUpload.errors.fileTypeNotSupported', { fileType }));
      }
    } catch (error) {
      onError(t('fileUpload.errors.processingError', { error: String(error) }));
    }
  }, [onError, onFilesProcessed, t]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsProcessing(true);
    try {
      for (const file of acceptedFiles) {
        await processFile(file);
      }
    } finally {
      setIsProcessing(false);
      setProcessingFile('');
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
        "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200",
        "hover:border-gray-300 hover:bg-gray-50/50 hover:scale-[1.01]",
        isDragActive && "border-blue-500 bg-blue-50/50 scale-[1.02]"
      )}
    >
      <input {...getInputProps()} />
      
      <div className="flex justify-center mb-6">
        {isProcessing ? (
          <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
        ) : (
          <Upload className={cn(
            "h-16 w-16 text-gray-300 transition-all duration-200",
            isDragActive && "text-blue-500 scale-110 animate-pulse"
          )} />
        )}
      </div>
      
      {isProcessing ? (
        <div>
          <p className="text-lg font-medium text-blue-600">
            {t('fileUpload.processing')}
          </p>
          {processingFile && (
            <p className="text-sm text-gray-600 mt-2">
              {processingFile}
            </p>
          )}
        </div>
      ) : isDragActive ? (
        <div>
          <p className="text-lg font-medium text-blue-600">
            {t('fileUpload.dropHere')}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-xl font-medium text-gray-800">
            {t('fileUpload.title')}
          </p>
          <p className="text-base text-gray-600 mt-3">
            {t('fileUpload.subtitle')}
          </p>
        </div>
      )}
      
      <div className="flex justify-center gap-6 mt-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="h-5 w-5" />
          <span>{t('fileUpload.types.documents')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image className="h-5 w-5" aria-hidden="true" />
          <span>{t('fileUpload.types.images')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Music className="h-5 w-5" />
          <span>{t('fileUpload.types.audio')}</span>
        </div>
      </div>
    </div>
  );
}