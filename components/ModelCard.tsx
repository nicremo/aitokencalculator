'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { TokenCount, formatNumber, estimateApiCost } from '@/lib/tokenCalculator';
import { LLMModel } from '@/lib/models';

interface ModelCardProps {
  model: LLMModel;
  tokenCount: TokenCount;
}

export function ModelCard({ model, tokenCount }: ModelCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [showDetails, setShowDetails] = useState(false);

  const formatCurrency = (amount: number, maximumFractionDigits = 4) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits,
    }).format(amount);
  };

  const getColorClasses = (color: string, status: string) => {
    const statusColors = {
      fits: {
        bg: 'bg-white',
        border: 'border-gray-200',
        text: 'text-gray-600',
        progress: 'bg-gray-400',
        progressBg: 'bg-gray-100'
      },
      tight: {
        bg: 'bg-white',
        border: 'border-gray-200',
        text: 'text-amber-600',
        progress: 'bg-amber-400',
        progressBg: 'bg-gray-100'
      },
      exceeds: {
        bg: 'bg-white',
        border: 'border-gray-200',
        text: 'text-red-500',
        progress: 'bg-red-400',
        progressBg: 'bg-gray-100'
      }
    };
    
    return statusColors[status as keyof typeof statusColors] || statusColors.fits;
  };
  
  const colors = getColorClasses(model.color || 'blue', tokenCount.status);
  const cost = estimateApiCost(tokenCount.tokens, model);
  
  return (
    <div className={cn(
      "rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-md hover:border-gray-300 card-hover",
      "bg-white"
    )}>
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{model.name}</h3>
          <p className="text-sm text-gray-500">{model.provider}</p>
        </div>
        <div className="flex items-center gap-1">
          <span className={cn("text-lg font-medium", colors.text)}>
            {tokenCount.percentage.toFixed(0)}%
          </span>
        </div>
      </div>
      
      {/* Token Count */}
      <div className="mb-4">
        <p className="text-2xl font-semibold text-gray-900">
          {formatNumber(tokenCount.tokens)}
        </p>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{t('modelCard.tokens')}</p>
        <p className="text-xs text-gray-400 italic mt-1">
          ~{formatCurrency(cost)} {t('modelCard.apiCost')}
        </p>
      </div>
      
      {/* Progress Bars */}
      <div className="mb-5 space-y-2">
        {/* API Context Window */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{t('modelCard.apiContext')}</span>
            <span>{tokenCount.percentage.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-700 ease-out progress-bar", colors.progress)}
              style={{ width: `${Math.min(tokenCount.percentage, 100)}%` }}
            />
          </div>
        </div>
        
        {/* Real Chat Limit (if available) */}
        {model.realChatLimit && (
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{t('modelCard.chatLimit')}</span>
              <span>{((tokenCount.tokens / model.realChatLimit) * 100).toFixed(0)}%</span>
            </div>
            <div className="h-1 bg-gray-50 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-700 ease-out progress-bar",
                  (tokenCount.tokens / model.realChatLimit) > 1 ? "bg-red-400" : "bg-blue-400"
                )}
                style={{ width: `${Math.min((tokenCount.tokens / model.realChatLimit) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Status Message */}
      <p className={cn("text-sm font-medium mb-5", colors.text)}>
        {tokenCount.status === 'fits' && t('modelCard.status.fits')}
        {tokenCount.status === 'tight' && tokenCount.percentage <= 85 && t('modelCard.status.tight')}
        {tokenCount.status === 'tight' && tokenCount.percentage > 85 && t('modelCard.status.veryTight')}
        {tokenCount.status === 'exceeds' && t('modelCard.status.exceeds', { count: formatNumber(tokenCount.overflow || 0) })}
      </p>
      
      {/* Details Toggle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-all duration-150 hover:scale-[1.02]"
      >
        <Info className="h-3 w-3" />
        <span>{t('modelCard.details')}</span>
        <div className="transition-transform duration-200">
          {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </div>
      </button>
      
      {/* Expanded Details */}
      <div className={cn(
        "grid transition-all duration-300 ease-out",
        showDetails ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
      )}>
        <div className="overflow-hidden">
          <div className="pt-4 border-t border-gray-50 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">{t('modelCard.contextWindow')}:</span>
            <span className="font-medium text-gray-700">{formatNumber(model.contextWindow)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">{t('modelCard.maxOutput')}:</span>
            <span className="font-medium text-gray-700">{formatNumber(model.maxOutput)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">{t('modelCard.available')}:</span>
            <span className="font-medium text-gray-700">
              {formatNumber(model.contextWindow - tokenCount.tokens)}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">{t('modelCard.estimatedCost')}:</span>
            <span className="font-medium text-gray-700">{formatCurrency(cost)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">{t('modelCard.pricePerMillion')}:</span>
            <span className="font-medium text-gray-700">
              {formatCurrency(model.pricing.input, 2)} / {formatCurrency(model.pricing.output, 2)}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-50">
            {model.description}
          </div>
          {model.features && model.features.length > 0 && (
            <div className="mt-3 pt-2 border-t border-gray-50">
              <p className="text-xs font-medium text-gray-700 mb-1">{t('modelCard.features')}:</p>
              <div className="flex flex-wrap gap-1">
                {model.features.map((feature, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}