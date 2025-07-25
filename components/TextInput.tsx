'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { formatNumber } from '@/lib/tokenCalculator';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextInput({ value, onChange, placeholder }: TextInputProps) {
  const t = useTranslations();
  const charCount = value.length;
  const wordCount = value.split(/\s+/).filter(word => word.length > 0).length;
  const estimatedTokens = Math.ceil(charCount / 4);
  
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || t('input.placeholder')}
        className="w-full h-72 p-6 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
      />
      
      {/* Live Statistics */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-gray-100 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm">
        <div className="flex items-center gap-4 text-sm text-gray-700 font-medium">
          <span className="transition-all duration-200">{t('input.stats.characters')}: {formatNumber(charCount)}</span>
          <span className="border-l pl-4 transition-all duration-200">{t('input.stats.words')}: {formatNumber(wordCount)}</span>
          <span className="border-l pl-4 transition-all duration-200">~{t('input.stats.tokens')}: {formatNumber(estimatedTokens)}</span>
        </div>
      </div>
    </div>
  );
}